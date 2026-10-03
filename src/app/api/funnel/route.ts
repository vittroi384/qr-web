import { NextResponse, type NextRequest } from "next/server";
import { parseFunnelBody } from "@/lib/analytics";
import { getClientIp, ipLimitKey } from "@/lib/ip";
import { errorFields, logEvent } from "@/lib/log";
import { rateLimit } from "@/lib/rateLimit";
import { getSettings, isOn } from "@/lib/settings";
import { incrementFunnel } from "@/lib/stats";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 1024; // { step, type, locale } is well under 100 bytes
const RATE_LIMIT = 60; // requests
const RATE_WINDOW_MS = 60_000;

/**
 * Anonymous funnel counter: { step: "select" | "preview", type, locale } → +1 on today's row.
 * Nothing identifying is stored — the IP is used only for the in-memory rate limit.
 */
export async function POST(req: NextRequest) {
  const settings = await getSettings();
  if (!isOn(settings.logging_enabled)) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  const limit = rateLimit(`funnel:${ipLimitKey(getClientIp(req))}`, RATE_LIMIT, RATE_WINDOW_MS);
  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSec) } },
    );
  }

  const declared = Number.parseInt(req.headers.get("content-length") ?? "", 10);
  if (Number.isFinite(declared) && declared > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "too_large" }, { status: 413 });
  }
  const rawBytes = new Uint8Array(await req.arrayBuffer());
  if (rawBytes.byteLength > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "too_large" }, { status: 413 });
  }

  let raw: unknown;
  try {
    raw = JSON.parse(new TextDecoder().decode(rawBytes));
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }
  const body = parseFunnelBody(raw);
  if (!body) {
    return NextResponse.json({ ok: false, error: "invalid_fields" }, { status: 400 });
  }

  try {
    await incrementFunnel(body.step, body.type, body.locale);
  } catch (err) {
    logEvent("error", "funnel.increment_failed", { type: body.type, ...errorFields(err) });
    return NextResponse.json({ ok: false, error: "storage" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
