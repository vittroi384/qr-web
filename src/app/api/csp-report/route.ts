import { NextResponse, type NextRequest } from "next/server";
import { getRequestMeta, ipLimitKey } from "@/lib/ip";
import { logEvent } from "@/lib/log";
import { rateLimit } from "@/lib/rateLimit";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 8 * 1024;
const RATE_LIMIT = 10; // reports per IP per minute
const SITE_RATE_LIMIT = 300; // whole site per minute — a flood must not drown the container log
const RATE_WINDOW_MS = 60_000;

type Report = Record<string, unknown>;

function str(value: unknown, max: number): string | undefined {
  return typeof value === "string" && value.length > 0 ? value.slice(0, max) : undefined;
}

/**
 * Browsers POST here what the Content-Security-Policy-Report-Only header would have blocked (see
 * src/lib/csp.ts). Two wire formats arrive: the legacy `application/csp-report` body
 * `{ "csp-report": {...} }` (report-uri) and the Reporting API's `application/reports+json` array.
 * Each report becomes one structured stdout line ("csp.violation"); nothing is stored in the database.
 * Review with:  docker compose logs app | grep csp.violation
 */
export async function POST(req: NextRequest) {
  const meta = getRequestMeta(req);
  if (!rateLimit(`csp:${ipLimitKey(meta.ip)}`, RATE_LIMIT, RATE_WINDOW_MS).ok) return new NextResponse(null, { status: 429 });
  if (!rateLimit("csp:all", SITE_RATE_LIMIT, RATE_WINDOW_MS).ok) return new NextResponse(null, { status: 429 });

  const declared = Number.parseInt(req.headers.get("content-length") ?? "", 10);
  if (Number.isFinite(declared) && declared > MAX_BODY_BYTES) return new NextResponse(null, { status: 413 });
  const raw = new Uint8Array(await req.arrayBuffer());
  if (raw.byteLength > MAX_BODY_BYTES) return new NextResponse(null, { status: 413 });

  let parsed: unknown;
  try {
    parsed = JSON.parse(new TextDecoder().decode(raw));
  } catch {
    return new NextResponse(null, { status: 400 });
  }

  const reports: Report[] = [];
  if (Array.isArray(parsed)) {
    for (const item of parsed.slice(0, 10)) {
      const body = (item as Report)?.body;
      if (body && typeof body === "object") reports.push(body as Report);
    }
  } else if (parsed && typeof parsed === "object") {
    const legacy = (parsed as Report)["csp-report"];
    reports.push((legacy && typeof legacy === "object" ? legacy : parsed) as Report);
  }
  if (reports.length === 0) return new NextResponse(null, { status: 400 });

  for (const r of reports) {
    logEvent("warn", "csp.violation", {
      document: str(r["document-uri"] ?? r.documentURL, 300),
      directive: str(r["effective-directive"] ?? r.effectiveDirective ?? r["violated-directive"], 80),
      blocked: str(r["blocked-uri"] ?? r.blockedURL, 300),
      source: str(r["source-file"] ?? r.sourceFile, 300),
      line: typeof (r["line-number"] ?? r.lineNumber) === "number" ? (r["line-number"] ?? r.lineNumber) : undefined,
      disposition: str(r.disposition, 20),
      ua: meta.userAgent?.slice(0, 200),
    });
  }
  return new NextResponse(null, { status: 204 });
}
