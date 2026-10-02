import { NextResponse, type NextRequest } from "next/server";
import { getRequestMeta } from "@/lib/ip";
import { AUDIT_RETENTION_DAYS, insertLog, pruneOldAudit, pruneOldLogs } from "@/lib/logs";
import {
  hardenSecretsForStorage,
  isLogEvent,
  isQrType,
  maskEncodedSecrets,
  sanitizeOptionsForStorage,
  sanitizePayloadForStorage,
} from "@/lib/qr/sanitize";
import { rateLimit } from "@/lib/rateLimit";
import { getSettings, isOn } from "@/lib/settings";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 16 * 1024;
const RATE_LIMIT = 30; // requests
const RATE_WINDOW_MS = 60_000;

export async function POST(req: NextRequest) {
  const settings = await getSettings();
  if (!isOn(settings.logging_enabled)) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  const meta = getRequestMeta(req);
  const limit = rateLimit(`log:${meta.ip}`, RATE_LIMIT, RATE_WINDOW_MS);
  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSec) } },
    );
  }

  // Reject oversized bodies before buffering them. Caddy also caps request bodies.
  const declared = Number.parseInt(req.headers.get("content-length") ?? "", 10);
  if (Number.isFinite(declared) && declared > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "too_large" }, { status: 413 });
  }
  const rawBytes = new Uint8Array(await req.arrayBuffer());
  if (rawBytes.byteLength > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "too_large" }, { status: 413 });
  }

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(new TextDecoder().decode(rawBytes));
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }
  if (!body || typeof body !== "object" || !isQrType(body.type) || !isLogEvent(body.event)) {
    return NextResponse.json({ ok: false, error: "invalid_fields" }, { status: 400 });
  }

  // Secrets are always masked before anything touches the database — no setting turns this off.
  const payload = hardenSecretsForStorage(
    body.type,
    sanitizePayloadForStorage(body.type, body.payload, { maskWifiPassword: true }),
  );
  const options = sanitizeOptionsForStorage(body.options);
  const encodedPreview =
    typeof body.encoded === "string" ? maskEncodedSecrets(body.type, body.encoded).slice(0, 200) : null;

  await insertLog({
    qrType: body.type,
    event: body.event,
    payload,
    encodedPreview,
    options,
    ...meta,
  });

  // Opportunistic retention cleanup instead of a cron job.
  if (Math.random() < 0.01) {
    const retention = Number.parseInt(settings.log_retention_days, 10);
    await Promise.all([pruneOldLogs(retention), pruneOldAudit(AUDIT_RETENTION_DAYS)]);
  }

  return NextResponse.json({ ok: true });
}
