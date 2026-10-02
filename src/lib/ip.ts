import type { NextRequest } from "next/server";

/** Client IP behind Caddy/nginx: first hop of X-Forwarded-For, else X-Real-IP. */
export function getClientIp(req: NextRequest | Request): string {
  const headers = req.headers;
  const xff = headers.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0]?.trim();
    if (first) return first;
  }
  const real = headers.get("x-real-ip");
  if (real) return real.trim();
  return "unknown";
}

export function getRequestMeta(req: NextRequest | Request) {
  return {
    ip: getClientIp(req),
    userAgent: req.headers.get("user-agent")?.slice(0, 512) ?? null,
    referer: req.headers.get("referer")?.slice(0, 512) ?? null,
    acceptLanguage: req.headers.get("accept-language")?.slice(0, 128) ?? null,
  };
}
