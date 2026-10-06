/**
 * Client IP resolution. In production the app is reached through Caddy (its only published port
 * is 127.0.0.1:3000, for the owner's SSH tunnel), and Caddy overwrites both X-Real-IP (Caddyfile
 * header_up) and X-Forwarded-For with the real peer address, discarding anything the client sent.
 * So: trust X-Real-IP first, then the *last* X-Forwarded-For hop (the one appended by our
 * proxy), never the first.
 */
export function getClientIpFromHeaders(headers: Headers): string {
  const real = headers.get("x-real-ip")?.trim();
  if (real) return real;
  const xff = headers.get("x-forwarded-for");
  if (xff) {
    const hops = xff.split(",").map((s) => s.trim()).filter(Boolean);
    const last = hops.at(-1);
    if (last) return last;
  }
  return "unknown";
}

export function getClientIp(req: Request): string {
  return getClientIpFromHeaders(req.headers);
}

export function getRequestMetaFromHeaders(headers: Headers) {
  return {
    ip: getClientIpFromHeaders(headers),
    userAgent: headers.get("user-agent")?.slice(0, 512) ?? null,
    referer: headers.get("referer")?.slice(0, 512) ?? null,
    acceptLanguage: headers.get("accept-language")?.slice(0, 128) ?? null,
  };
}

export function getRequestMeta(req: Request) {
  return getRequestMetaFromHeaders(req.headers);
}

/** Expands an IPv6 address to its eight hextets (lower-case, no leading zeros); null when malformed. */
function ipv6Hextets(ip: string): string[] | null {
  const halves = ip.split("%")[0].split("::"); // drop a zone id ("fe80::1%eth0")
  if (halves.length > 2) return null;
  const head = halves[0] ? halves[0].split(":") : [];
  const tail = halves.length === 2 && halves[1] ? halves[1].split(":") : [];
  const missing = 8 - head.length - tail.length;
  if (halves.length === 1 ? missing !== 0 : missing < 1) return null;
  const groups = [...head, ...Array<string>(missing).fill("0"), ...tail];
  if (groups.some((g) => !/^[0-9a-f]{1,4}$/i.test(g))) return null;
  return groups.map((g) => g.toLowerCase().replace(/^0+(?=.)/, ""));
}

/**
 * Key for per-client rate limits and login lockouts. IPv6 clients get a whole /64 (the prefix an
 * ISP hands one subscriber, who can otherwise rotate through 2^64 addresses to dodge a per-address
 * limit); IPv4 and IPv4-mapped addresses are used as they are.
 */
export function ipLimitKey(ip: string): string {
  const mapped = /^::ffff:(\d{1,3}(?:\.\d{1,3}){3})$/i.exec(ip);
  if (mapped) return mapped[1];
  if (!ip.includes(":")) return ip;
  const hextets = ipv6Hextets(ip);
  return hextets ? `${hextets.slice(0, 4).join(":")}::/64` : ip;
}

/**
 * True when the request's Origin (or Referer) matches the Host it was sent to. Browsers always
 * send Origin on a POST — sendBeacon and fetch included — so a POST from another site (or with
 * "Origin: null" after a no-referrer policy) never matches, and a request with neither header is
 * refused too.
 */
export function isSameOrigin(req: Request): boolean {
  return urlHostMatches(req.headers.get("origin") ?? req.headers.get("referer"), requestHost(req.headers));
}

/**
 * True when the request was navigated to from a page of this site (Referer host = our host).
 * Compares against the Host header the visitor used, never `nextUrl.host`: inside the container
 * that is the internal address (app:3000), so a Referer from the public domain would never match
 * and every language-menu click would look like a fresh visit.
 */
export function isFromThisSite(headers: Headers): boolean {
  return urlHostMatches(headers.get("referer"), requestHost(headers));
}

/** The host the visitor addressed, as the proxy forwarded it. */
function requestHost(headers: Headers): string | null {
  return headers.get("x-forwarded-host") ?? headers.get("host");
}

function urlHostMatches(url: string | null, host: string | null): boolean {
  if (!url || !host) return false;
  try {
    return new URL(url).host === host;
  } catch {
    return false;
  }
}

/** True when the body is declared as JSON (any charset parameter is fine). */
export function isJsonRequest(req: Request): boolean {
  return /^application\/json(?:\s*;|\s*$)/i.test(req.headers.get("content-type") ?? "");
}

/**
 * Guard for the public write endpoints (/api/log, /api/funnel): the request must come from a page
 * of this site and carry a JSON body. Returns the error code to answer with, or null when fine.
 * Without this, any other website could make its visitors' browsers write rows here under their
 * own IPs, which no per-IP limit catches.
 */
export function publicPostRejection(req: Request): { status: 403 | 415; error: string } | null {
  if (!isSameOrigin(req)) return { status: 403, error: "bad_origin" };
  if (!isJsonRequest(req)) return { status: 415, error: "json_required" };
  return null;
}
