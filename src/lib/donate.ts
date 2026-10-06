import type { Locale } from "@/lib/i18n/locales";
import type { Settings } from "@/lib/settings";

/**
 * Which support link a page shows: Korean pages prefer the Korean-only link (a Toss transfer link
 * finishes in a few taps for Korean visitors), everyone else gets the global one (Ko-fi etc.).
 * Empty string = show nothing.
 */
export function donateUrlFor(s: Pick<Settings, "donate_url" | "donate_url_ko">, locale: Locale): string {
  if (locale === "ko" && s.donate_url_ko) return s.donate_url_ko;
  return s.donate_url || "";
}
