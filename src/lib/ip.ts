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

/** True when the request's Origin (or Referer) matches the Host it was sent to. */
export function isSameOrigin(req: Request): boolean {
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  if (!host) return false;
  const source = req.headers.get("origin") ?? req.headers.get("referer");
  if (!source) return false;
  try {
    return new URL(source).host === host;
  } catch {
    return false;
  }
}
