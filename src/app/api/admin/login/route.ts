import { NextResponse, type NextRequest } from "next/server";
import { writeAudit } from "@/lib/audit";
import {
  SESSION_COOKIE,
  clearLoginFailures,
  createSessionToken,
  isLockedOut,
  recordLoginFailure,
  sessionCookieOptions,
  verifyPassword,
} from "@/lib/auth";
import { getRequestMeta } from "@/lib/ip";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const meta = getRequestMeta(req);
  if (isLockedOut(meta.ip)) {
    return NextResponse.json({ ok: false, error: "locked" }, { status: 429 });
  }

  let password = "";
  try {
    const body = await req.json();
    password = typeof body?.password === "string" ? body.password : "";
  } catch {
    // fall through with empty password
  }

  if (!password || !verifyPassword(password)) {
    recordLoginFailure(meta.ip);
    writeAudit({ action: "login_failed", ip: meta.ip, userAgent: meta.userAgent });
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 401 });
  }

  clearLoginFailures(meta.ip);
  writeAudit({ action: "login", ip: meta.ip, userAgent: meta.userAgent });
  const token = await createSessionToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, token, sessionCookieOptions);
  return res;
}
