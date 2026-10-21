import { NextResponse, type NextRequest } from "next/server";
import { isLocale } from "@/lib/i18n/locales";
import { getClientIp, ipLimitKey, publicPostRejection } from "@/lib/ip";
import { errorFields, logEvent } from "@/lib/log";
import { rateLimit } from "@/lib/rateLimit";
import { getSettings, isOn } from "@/lib/settings";
import { incrementSource } from "@/lib/stats";
import { isSourceKey } from "@/lib/traffic";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 512; // { source, locale } is well under 100 bytes
const RATE_LIMIT = 10; // the browser sends one per session
const SITE_RATE_LIMIT = 600; // upserts per minute, whole site
const RATE_WINDOW_MS = 60_000;

/**
 * Anonymous visit counter: { source, locale } → +1 on today's row, sent once per browser session
 * by the first page (src/components/VisitBeacon.tsx). The IP is used only for the in-memory rate limit.
 */
export async function POST(req: NextRequest) {
  const settings = await getSettings();
  if (!isOn(settings.logging_enabled)) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  const rejection = publicPostRejection(req);
  if (rejection) return NextResponse.json({ ok: false, error: rejection.error }, { status: rejection.status });

  const limit = rateLimit(`visit:${ipLimitKey(getClientIp(req))}`, RATE_LIMIT, RATE_WINDOW_MS);
  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSec) } },
    );
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
  const { source, locale } = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  if (!isSourceKey(source) || !isLocale(locale)) {
    return NextResponse.json({ ok: false, error: "invalid_fields" }, { status: 400 });
  }

  const siteLimit = rateLimit("visit:all", SITE_RATE_LIMIT, RATE_WINDOW_MS);
  if (!siteLimit.ok) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429, headers: { "Retry-After": String(siteLimit.retryAfterSec) } });
  }

  try {
    await incrementSource(source, locale);
  } catch (err) {
    logEvent("error", "visit.increment_failed", { source, ...errorFields(err) });
    return NextResponse.json({ ok: false, error: "storage" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
