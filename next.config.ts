import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  // No floating "N" badge in dev (keeps screenshots clean).
  devIndicators: false,
  // Dev only: let a Cloudflare quick tunnel (used to show work in progress) load dev assets.
  allowedDevOrigins: ["*.trycloudflare.com"],
};

export default nextConfig;
