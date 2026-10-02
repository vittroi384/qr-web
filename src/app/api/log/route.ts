import { NextResponse, type NextRequest } from "next/server";
import { getRequestMeta } from "@/lib/ip";
import { insertLog, pruneOldLogs } from "@/lib/logs";
import { isLogEvent, isQrType, sanitizeOptionsForStorage, sanitizePayloadForStorage } from "@/lib/qr/sanitize";
import { rateLimit } from "@/lib/rateLimit";
import { getSettings, isOn } from "@/lib/settings";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 16 * 1024;
const RATE_LIMIT = 30; // requests
const RATE_WINDOW_MS = 60_000;

export async function POST(req: NextRequest) {
  const settings = getSettings();
  if (!isOn(settings.logging_enabled)) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  const meta = getRequestMeta(req);
  if (!rateLimit(`log:${meta.ip}`, RATE_LIMIT, RATE_WINDOW_MS)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "too_large" }, { status: 413 });
  }

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  if (!isQrType(body.type) || !isLogEvent(body.event)) {
    return NextResponse.json({ ok: false, error: "invalid_fields" }, { status: 400 });
  }

  const payload = sanitizePayloadForStorage(body.type, body.payload, {
    maskWifiPassword: isOn(settings.mask_wifi_password),
  });
  const options = sanitizeOptionsForStorage(body.options);
  let encodedPreview: string | null = null;
  if (typeof body.encoded === "string") {
    encodedPreview = body.encoded.slice(0, 200);
    if (body.type === "wifi" && isOn(settings.mask_wifi_password)) {
      encodedPreview = encodedPreview.replace(/P:(?:\\.|[^;])*;/, "P:****;");
    }
  }

  insertLog({
    qrType: body.type,
    event: body.event,
    payload,
    encodedPreview,
    options,
    ...meta,
  });

  // Opportunistic retention cleanup instead of a cron job.
  const retention = Number.parseInt(settings.log_retention_days, 10);
  if (retention > 0 && Math.random() < 0.01) pruneOldLogs(retention);

  return NextResponse.json({ ok: true });
}
