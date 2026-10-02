import { NextResponse, type NextRequest } from "next/server";
import { GATE_COOKIE, gateSatisfied } from "@/lib/adminAccess";
import { writeAudit } from "@/lib/audit";
import { SESSION_COOKIE, sessionCookieOptions, verifySessionToken } from "@/lib/auth";
import { getRequestMeta, isSameOrigin } from "@/lib/ip";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  // Only a real, same-origin admin session may add a "logout" entry to the audit trail.
  if (!isSameOrigin(req)) {
    return NextResponse.json({ ok: false, error: "bad_origin" }, { status: 403 });
  }
  const authed = await verifySessionToken(req.cookies.get(SESSION_COOKIE)?.value, req.headers.get("user-agent"));
  if (authed) {
    const meta = getRequestMeta(req);
    await writeAudit({ action: "logout", ip: meta.ip, userAgent: meta.userAgent });
  }
  // Don't reveal the admin login page to callers that never passed the gate.
  const gated = await gateSatisfied(req.cookies.get(GATE_COOKIE)?.value);
  const res = NextResponse.redirect(new URL(gated ? "/admin/login" : "/", req.url), { status: 303 });
  // Deleting a __Host- cookie needs the same Secure/SameSite attributes it was set with.
  res.cookies.set(SESSION_COOKIE, "", { ...sessionCookieOptions, maxAge: 0 });
  res.headers.set("Cache-Control", "no-store");
  return res;
}
