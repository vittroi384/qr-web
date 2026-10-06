import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  // No floating "N" badge in dev (keeps screenshots clean).
  devIndicators: false,
  // Dev only: let a Cloudflare quick tunnel (used to show work in progress) load dev assets.
  allowedDevOrigins: ["*.trycloudflare.com"],
  // Caddy sets the same headers at the edge; repeating them here covers requests that never pass
  // Caddy (the owner's SSH tunnel to 127.0.0.1:3000, `next dev`). HSTS stays Caddy-only: it must
  // not be sent over plain HTTP to localhost.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(self), payment=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
