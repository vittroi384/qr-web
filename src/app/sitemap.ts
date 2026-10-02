import type { MetadataRoute } from "next";
import { LOCALES, localePath } from "@/lib/i18n";
import { getSettings } from "@/lib/settings";

// site_url is editable at runtime, so this must not be prerendered.
export const dynamic = "force-dynamic";

const PAGES: { path: string; changeFrequency: "weekly" | "monthly" | "yearly"; priority: number }[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/batch", changeFrequency: "monthly", priority: 0.6 },
  { path: "/about", changeFrequency: "yearly", priority: 0.4 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSettings().site_url.replace(/\/$/, "");
  const now = new Date();
  const url = (path: string) => (path === "/" ? `${base}/` : `${base}${path}`);
  return PAGES.flatMap((p) =>
    LOCALES.map((locale) => ({
      url: url(localePath(locale, p.path)),
      lastModified: now,
      changeFrequency: p.changeFrequency,
      // The English pages are translations; keep the Korean originals slightly ahead.
      priority: locale === "ko" ? p.priority : Math.round(p.priority * 0.8 * 10) / 10,
      alternates: { languages: Object.fromEntries(LOCALES.map((l) => [l, url(localePath(l, p.path))])) },
    })),
  );
}
