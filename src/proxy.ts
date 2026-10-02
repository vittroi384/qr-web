import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_MARKER_HEADER, GATE_COOKIE, GATE_TTL_SEC, adminEntryPath, adminMarker, createGateToken, gateSatisfied, ipAllowedForAdmin } from "@/lib/adminAccess";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { localeFromPath } from "@/lib/i18n/locales";
import { getClientIpFromHeaders } from "@/lib/ip";

const HTTPS = process.env.NODE_ENV === "production" && Boolean(process.env.DOMAIN);

/** Serve the app's ordinary 404 page so a protected path looks exactly like a missing one. */
function notFound(req: NextRequest): NextResponse {
  const url = req.nextUrl.clone();
  url.pathname = "/__not_found__";
  url.search = "";
  // Drop any client-sent admin marker so the 404 renders with the public chrome, like any 404.
  const headers = new Headers(req.headers);
  headers.delete(ADMIN_MARKER_HEADER);
  return NextResponse.rewrite(url, { status: 404, request: { headers } });
}

function withAdminHeaders(res: NextResponse): NextResponse {
  res.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  res.headers.set("Cache-Control", "no-store");
  return res;
}

/**
 * 1) Public pages: tag the request with its UI locale ("/<code>/..." → code, else en); "/en/*" → "/*" (301).
 * 2) Secret admin entry path (ADMIN_PATH): set the gate cookie and send the owner to the login page.
 * 3) /admin/*: invisible (404) unless gate cookie + allowed IP; then session check or login redirect.
 */
export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const entry = adminEntryPath();

  if (entry && pathname === entry) {
    if (!ipAllowedForAdmin(getClientIpFromHeaders(req.headers))) return notFound(req);
    const token = await createGateToken();
    if (!token) return notFound(req); // SESSION_SECRET missing → gate cannot be issued safely
    const res = NextResponse.redirect(new URL("/admin/login", req.url));
    res.cookies.set(GATE_COOKIE, token, {
      httpOnly: true,
      sameSite: "strict",
      secure: HTTPS,
      path: "/",
      maxAge: GATE_TTL_SEC,
    });
    return withAdminHeaders(res);
  }

  if (!pathname.startsWith("/admin")) {
    // Old English URLs lived under /en; English is now the root.
    if (pathname === "/en" || pathname.startsWith("/en/")) {
      const url = req.nextUrl.clone();
      url.pathname = pathname.slice(3) || "/";
      return NextResponse.redirect(url, 301);
    }
    const locale = localeFromPath(pathname);
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-locale", locale);
    requestHeaders.delete(ADMIN_MARKER_HEADER); // never trust a client-sent marker on public pages
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  // ---- /admin/* ----
  if (!ipAllowedForAdmin(getClientIpFromHeaders(req.headers))) return notFound(req);
  if (!(await gateSatisfied(req.cookies.get(GATE_COOKIE)?.value))) return notFound(req);

  // Admin UI is Korean only; also neutralise any spoofed x-locale header.
  const adminHeaders = new Headers(req.headers);
  adminHeaders.set("x-locale", "ko");
  adminHeaders.set(ADMIN_MARKER_HEADER, adminMarker()); // root layout: compact admin footer
  if (pathname === "/admin/login") {
    return withAdminHeaders(NextResponse.next({ request: { headers: adminHeaders } }));
  }

  const ok = await verifySessionToken(req.cookies.get(SESSION_COOKIE)?.value, req.headers.get("user-agent"));
  if (ok) return withAdminHeaders(NextResponse.next({ request: { headers: adminHeaders } }));

  const loginUrl = new URL("/admin/login", req.url);
  loginUrl.searchParams.set("next", pathname);
  return withAdminHeaders(NextResponse.redirect(loginUrl));
}

export const config = {
  // Everything except Next internals, API routes and static files.
  // /admin is listed separately so dotted paths (e.g. ".rsc" suffixes) can never skip the guard.
  matcher: ["/admin/:path*", "/((?!api|_next/static|_next/image|favicon.ico|icon.svg|ads.txt|robots.txt|sitemap.xml|.*\\..*).*)"],
};
