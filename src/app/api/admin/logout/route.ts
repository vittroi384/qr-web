import { NextResponse, type NextRequest } from "next/server";
import { writeAudit } from "@/lib/audit";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { getRequestMeta, isSameOrigin } from "@/lib/ip";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  // Only a real, same-origin admin session may add a "logout" entry to the audit trail.
  if (!isSameOrigin(req)) {
    return NextResponse.json({ ok: false, error: "bad_origin" }, { status: 403 });
  }
  const authed = await verifySessionToken(req.cookies.get(SESSION_COOKIE)?.value);
  if (authed) {
    const meta = getRequestMeta(req);
    writeAudit({ action: "logout", ip: meta.ip, userAgent: meta.userAgent });
  }
  const res = NextResponse.redirect(new URL("/admin/login", req.url), { status: 303 });
  res.cookies.set(SESSION_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}
