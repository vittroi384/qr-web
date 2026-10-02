import type { MetadataRoute } from "next";
import { getSettings } from "@/lib/settings";

// site_url is editable at runtime, so this must not be prerendered.
export const dynamic = "force-dynamic";

export default function robots(): MetadataRoute.Robots {
  const base = getSettings().site_url.replace(/\/$/, "");
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin", "/api"] }],
    sitemap: `${base}/sitemap.xml`,
  };
}
