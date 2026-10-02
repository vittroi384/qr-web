import type { MetadataRoute } from "next";
import { DEFAULT_LOCALE, LANDING_SLUGS, LOCALES, localePath } from "@/lib/i18n";
import { getSettings } from "@/lib/settings";

// site_url is editable at runtime, so this must not be prerendered.
export const dynamic = "force-dynamic";

type Page = { path: string; changeFrequency: "weekly" | "monthly" | "yearly"; priority: number; /** Same priority in every locale. */ flat?: boolean };

const PAGES: Page[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  // Per-type landing pages are the main search entry points.
  ...Object.values(LANDING_SLUGS).map((slug): Page => ({ path: `/${slug}`, changeFrequency: "monthly", priority: 0.8, flat: true })),
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
      // English is the primary edition; the Korean translation ranks slightly lower.
      priority: locale === DEFAULT_LOCALE || p.flat ? p.priority : Math.round(p.priority * 0.8 * 10) / 10,
      alternates: {
        languages: {
          ...Object.fromEntries(LOCALES.map((l) => [l, url(localePath(l, p.path))])),
          "x-default": url(localePath(DEFAULT_LOCALE, p.path)),
        },
      },
    })),
  );
}
