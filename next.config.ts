import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  // No floating "N" badge in dev (keeps screenshots clean).
  devIndicators: false,
};

export default nextConfig;
