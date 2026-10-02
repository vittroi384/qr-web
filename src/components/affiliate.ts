import type { Locale } from "@/lib/i18n";
import { getDict } from "@/lib/i18n";
import { DEFAULT_SETTINGS, type Settings } from "@/lib/settings";
import type { AffiliateInfo } from "./AffiliateCard";

/**
 * Server-only: the print affiliate slot for this locale, or null when no URL is set. Admin text
 * that is still the stock English default is swapped for the dictionary's localized default.
 */
export function resolveAffiliate(s: Settings, locale: Locale): AffiliateInfo | null {
  if (!s.affiliate_print_url) return null;
  const t = getDict(locale).affiliate;
  return {
    url: s.affiliate_print_url,
    label: s.affiliate_print_label === DEFAULT_SETTINGS.affiliate_print_label ? t.defaultLabel : s.affiliate_print_label,
    note: s.affiliate_print_note === DEFAULT_SETTINGS.affiliate_print_note ? t.defaultNote : s.affiliate_print_note,
    heading: t.heading,
    sponsored: t.sponsored,
  };
}
