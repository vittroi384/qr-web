import { NextResponse, type NextRequest } from "next/server";
import { getRequestMeta, ipLimitKey } from "@/lib/ip";
import { logEvent } from "@/lib/log";
import { rateLimit } from "@/lib/rateLimit";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 8 * 1024;
const RATE_LIMIT = 10; // reports
const RATE_WINDOW_MS = 60_000;

/** Browser noise that says nothing actionable about our code (cross-origin scripts, benign layout loops). */
const IGNORED = [/^ResizeObserver loop/i, /^Script error\.?$/i];

function str(value: unknown, max: number): string | undefined {
  return typeof value === "string" && value.length > 0 ? value.slice(0, max) : undefined;
}

/**
 * Client-side error sink for ClientErrorReporter: one structured stdout line per report
 * ("client.error"), no database table. Always answers 204 for accepted or ignored reports.
 */
export async function POST(req: NextRequest) {
  const meta = getRequestMeta(req);
  if (!rateLimit(`client-error:${ipLimitKey(meta.ip)}`, RATE_LIMIT, RATE_WINDOW_MS).ok) {
    return new NextResponse(null, { status: 429 });
  }

  const declared = Number.parseInt(req.headers.get("content-length") ?? "", 10);
  if (Number.isFinite(declared) && declared > MAX_BODY_BYTES) return new NextResponse(null, { status: 413 });
  const raw = new Uint8Array(await req.arrayBuffer());
  if (raw.byteLength > MAX_BODY_BYTES) return new NextResponse(null, { status: 413 });

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(new TextDecoder().decode(raw));
  } catch {
    return new NextResponse(null, { status: 400 });
  }
  const message = body && typeof body === "object" ? str(body.message, 500) : undefined;
  if (!message) return new NextResponse(null, { status: 400 });
  if (IGNORED.some((re) => re.test(message))) return new NextResponse(null, { status: 204 });

  logEvent("error", "client.error", {
    message,
    stack: str(body.stack, 2000),
    url: str(body.url, 300),
    ua: str(body.ua, 300) ?? meta.userAgent?.slice(0, 300),
    ip: meta.ip,
  });
  return new NextResponse(null, { status: 204 });
}
