import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_MARKER_HEADER, GATE_COOKIE, GATE_TTL_SEC, adminEntryPath, adminMarker, createGateToken, gateSatisfied, ipAllowedForAdmin } from "@/lib/adminAccess";
import { REMEMBER_TTL_SEC, SESSION_COOKIE, createSessionToken, sessionCookieOptionsFor, sessionRenewalDue, verifySessionToken } from "@/lib/auth";
import { LANG_COOKIE, isLocale, localeFromPath, preferredLocale } from "@/lib/i18n/locales";
import { getClientIpFromHeaders, isFromThisSite } from "@/lib/ip";

const HTTPS = process.env.NODE_ENV === "production" && Boolean(process.env.DOMAIN);

const LANG_COOKIE_TTL_SEC = 60 * 60 * 24 * 365;
/** Crawlers and audit tools must always see the English root (hreflang does the rest). */
const BOT_UA = /bot|crawl|spider|slurp|facebookexternalhit|preview|lighthouse|headless/i;

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
 * 1) Public pages: tag the request with its UI locale ("/<code>/..." → code, else en); "/en/*" → "/*" (301);
 *    a first visit to "/" is sent to the visitor's language edition (Accept-Language, remembered in a cookie).
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
    const saved = req.cookies.get(LANG_COOKIE)?.value;
    const internal = isFromThisSite(req.headers); // a link on this site (language menu, footer, …)
    // A first visit to the root goes to the visitor's own language edition (browser language,
    // or the edition they used before). Only the root: deep links from search already match the
    // searcher's language via hreflang. Links from inside the site (the language menu) never
    // bounce, and crawlers always get English.
    if (pathname === "/" && req.method === "GET" && !internal && !BOT_UA.test(req.headers.get("user-agent") ?? "")) {
      const target = isLocale(saved) ? saved : preferredLocale(req.headers.get("accept-language"));
      if (target !== "en") {
        const url = req.nextUrl.clone();
        url.pathname = `/${target}`;
        const res = NextResponse.redirect(url, 302);
        res.headers.set("Vary", "Accept-Language, Cookie");
        if (saved !== target) res.cookies.set(LANG_COOKIE, target, { sameSite: "lax", secure: HTTPS, path: "/", maxAge: LANG_COOKIE_TTL_SEC });
        return res;
      }
    }
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-locale", locale);
    requestHeaders.delete(ADMIN_MARKER_HEADER); // never trust a client-sent marker on public pages
    const res = NextResponse.next({ request: { headers: requestHeaders } });
    // Navigating inside the site (including the language menu) makes that edition the remembered one.
    if (internal && saved !== locale) res.cookies.set(LANG_COOKIE, locale, { sameSite: "lax", secure: HTTPS, path: "/", maxAge: LANG_COOKIE_TTL_SEC });
    if (pathname === "/") res.headers.set("Vary", "Accept-Language, Cookie");
    return res;
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

  const sessionToken = req.cookies.get(SESSION_COOKIE)?.value;
  const userAgent = req.headers.get("user-agent");
  const ok = await verifySessionToken(sessionToken, userAgent);
  if (ok) {
    const res = NextResponse.next({ request: { headers: adminHeaders } });
    // Sliding expiry for "remember this device": a remembered session used at least once a month
    // never asks for the password again. The gate cookie slides with it so the entry stays open too.
    if (await sessionRenewalDue(sessionToken)) {
      res.cookies.set(SESSION_COOKIE, await createSessionToken(userAgent, REMEMBER_TTL_SEC), sessionCookieOptionsFor(REMEMBER_TTL_SEC));
      const gate = await createGateToken();
      if (gate) res.cookies.set(GATE_COOKIE, gate, { httpOnly: true, sameSite: "strict", secure: HTTPS, path: "/", maxAge: GATE_TTL_SEC });
    }
    return withAdminHeaders(res);
  }

  const loginUrl = new URL("/admin/login", req.url);
  loginUrl.searchParams.set("next", pathname);
  return withAdminHeaders(NextResponse.redirect(loginUrl));
}

export const config = {
  // Everything except Next internals, API routes and static files.
  // /admin is listed separately so dotted paths (e.g. ".rsc" suffixes) can never skip the guard.
  matcher: ["/admin/:path*", "/((?!api|_next/static|_next/image|favicon.ico|icon.svg|ads.txt|robots.txt|sitemap.xml|.*\\..*).*)"],
};
