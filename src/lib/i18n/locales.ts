/** Locale codes only — imported by the proxy, so this file must stay free of dictionary imports. */
export const LOCALE_CODES = ["en", "ko", "es", "pt", "de", "fr", "ja", "hi", "id"] as const;
export type Locale = (typeof LOCALE_CODES)[number];
export const DEFAULT_LOCALE: Locale = "en";

/** Native names for the language switcher. */
export const LOCALE_NAMES: Record<Locale, { short: string; full: string }> = {
  en: { short: "EN", full: "English" },
  ko: { short: "KO", full: "한국어" },
  es: { short: "ES", full: "Español" },
  pt: { short: "PT", full: "Português" },
  de: { short: "DE", full: "Deutsch" },
  fr: { short: "FR", full: "Français" },
  ja: { short: "JA", full: "日本語" },
  hi: { short: "HI", full: "हिन्दी" },
  id: { short: "ID", full: "Bahasa Indonesia" },
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALE_CODES as readonly string[]).includes(value);
}

/** "/es/about" → "es", "/about" → "en". */
export function localeFromPath(pathname: string): Locale {
  const seg = pathname.split("/")[1];
  return isLocale(seg) && seg !== DEFAULT_LOCALE ? seg : DEFAULT_LOCALE;
}
