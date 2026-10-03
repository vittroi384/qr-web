import { NextResponse, type NextRequest } from "next/server";
import { pageContextFromReferer } from "@/lib/analytics";
import { getRequestMeta, ipLimitKey } from "@/lib/ip";
import { insertLog } from "@/lib/logs";
import {
  hardenSecretsForStorage,
  isLogEvent,
  isQrType,
  maskWifiPasswords,
  sanitizeOptionsForStorage,
  sanitizePayloadForStorage,
} from "@/lib/qr/sanitize";
import { errorFields, logEvent } from "@/lib/log";
import { rateLimit } from "@/lib/rateLimit";
import { getSettings, isOn } from "@/lib/settings";
import { incrementFunnel } from "@/lib/stats";

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
  const limit = rateLimit(`log:${ipLimitKey(meta.ip)}`, RATE_LIMIT, RATE_WINDOW_MS);
  if (!limit.ok) {
    logEvent("warn", "log.rate_limited", { ip: meta.ip });
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
  const encodedPreview = typeof body.encoded === "string" ? maskWifiPasswords(body.encoded).slice(0, 200) : null;

  // Which page (and UI language) the save happened on — only trusted from a same-origin Referer.
  const context = pageContextFromReferer(meta.referer, req.headers.get("x-forwarded-host") ?? req.headers.get("host"));

  try {
    await insertLog({
      qrType: body.type,
      event: body.event,
      payload,
      encodedPreview,
      options,
      ...meta,
      ...context,
    });
  } catch (err) {
    logEvent("error", "log.insert_failed", { ip: meta.ip, type: body.type, ...errorFields(err) });
    return NextResponse.json({ ok: false, error: "storage" }, { status: 500 });
  }

  // Funnel "save" step, counted here so it always matches qr_logs. A failure must not fail the save.
  try {
    await incrementFunnel("save", body.type, context.locale);
  } catch (err) {
    logEvent("error", "funnel.increment_failed", { type: body.type, ...errorFields(err) });
  }

  return NextResponse.json({ ok: true });
}
