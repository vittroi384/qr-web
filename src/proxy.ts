import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

// 1) Tells the root layout which UI locale the path belongs to ("/en/..." → en, else ko).
// 2) Guards every /admin page except the login screen. API routes verify on their own.
export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!pathname.startsWith("/admin")) {
    const locale = pathname === "/en" || pathname.startsWith("/en/") ? "en" : "ko";
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-locale", locale);
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  // Admin UI is Korean only; also neutralise any spoofed x-locale header.
  const adminHeaders = new Headers(req.headers);
  adminHeaders.set("x-locale", "ko");
  if (pathname === "/admin/login") return NextResponse.next({ request: { headers: adminHeaders } });

  const ok = await verifySessionToken(req.cookies.get(SESSION_COOKIE)?.value);
  if (ok) return NextResponse.next({ request: { headers: adminHeaders } });

  const loginUrl = new URL("/admin/login", req.url);
  loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  // Everything except Next internals, API routes and static files.
  // /admin is listed separately so dotted paths (e.g. ".rsc" suffixes) can never skip the guard.
  matcher: ["/admin/:path*", "/((?!api|_next/static|_next/image|favicon.ico|ads.txt|robots.txt|sitemap.xml|.*\\..*).*)"],
};
