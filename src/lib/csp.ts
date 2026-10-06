/**
 * Content-Security-Policy, delivered Report-Only for now (2026-10-06): the browser reports what the
 * policy WOULD block to /api/csp-report without blocking anything. Once a couple of weeks of reports
 * show no legitimate violations (AdSense creatives, Umami, Pretendard), the header switches to
 * enforcing. Scripts are nonce-based: the proxy mints a nonce per request, Next.js attaches it to
 * its own inline/framework scripts, and the two <Script> tags (AdSense, Umami) receive it as a prop.
 * `'strict-dynamic'` then lets the nonced AdSense loader pull in its child scripts.
 *
 * Styles cannot use the nonce: React `style={{…}}` attributes and AdSense's inline styles need
 * 'unsafe-inline' (a nonce would make browsers ignore it), so style-src stays a host allowlist.
 */
export const CSP_REPORT_PATH = "/api/csp-report";

const AD_HOSTS = [
  "https://pagead2.googlesyndication.com",
  "https://*.googlesyndication.com",
  "https://*.doubleclick.net",
  "https://*.google.com",
  "https://*.googleadservices.com",
  "https://*.adtrafficquality.google",
  "https://*.gstatic.com",
];

export function buildCsp(nonce: string, opts: { admin: boolean; dev: boolean }): string {
  const directives = [
    `default-src 'self'`,
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${opts.dev ? " 'unsafe-eval'" : ""} https://pagead2.googlesyndication.com https://*.googlesyndication.com https://*.adtrafficquality.google`,
    `style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net`,
    `font-src 'self' data: https://cdn.jsdelivr.net`,
    // AdSense creatives come from many hosts; QR previews are data:/blob: URLs.
    `img-src 'self' data: blob: https:`,
    `connect-src 'self' ${AD_HOSTS.join(" ")}`,
    `frame-src ${AD_HOSTS.join(" ")}`,
    `object-src 'none'`,
    `base-uri 'self'`,
    `form-action 'self'`,
    `frame-ancestors ${opts.admin ? "'none'" : "'self'"}`,
    `report-uri ${CSP_REPORT_PATH}`,
  ];
  return directives.join("; ");
}

/** Per-request nonce: 16 random bytes, base64 (what the CSP spec expects). */
export function makeNonce(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin);
}
