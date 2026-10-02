/**
 * Client IP resolution. In production the app is only reachable through Caddy
 * (docker-compose exposes no host port for the app), and Caddy overwrites both
 * X-Real-IP (Caddyfile header_up) and X-Forwarded-For with the real peer address,
 * discarding anything the client sent. So: trust X-Real-IP first, then the
 * *last* X-Forwarded-For hop (the one appended by our proxy), never the first.
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
