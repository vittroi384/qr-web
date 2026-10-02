import { NextResponse, type NextRequest } from "next/server";
import { writeAudit } from "@/lib/audit";
import { SESSION_COOKIE } from "@/lib/auth";
import { getRequestMeta } from "@/lib/ip";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const meta = getRequestMeta(req);
  writeAudit({ action: "logout", ip: meta.ip, userAgent: meta.userAgent });
  const res = NextResponse.redirect(new URL("/admin/login", req.url), { status: 303 });
  res.cookies.set(SESSION_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}
