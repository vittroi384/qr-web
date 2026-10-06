/** Locale codes only — imported by the proxy, so this file must stay free of dictionary imports. */
export const LOCALE_CODES = ["en", "ko", "es", "pt", "de", "fr", "ja", "hi", "id", "zh"] as const;
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
  zh: { short: "ZH", full: "中文（简体）" },
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALE_CODES as readonly string[]).includes(value);
}

/** "/es/about" → "es", "/about" → "en". */
export function localeFromPath(pathname: string): Locale {
  const seg = pathname.split("/")[1];
  return isLocale(seg) && seg !== DEFAULT_LOCALE ? seg : DEFAULT_LOCALE;
}

/** Cookie remembering the edition a visitor last chose or was sent to (see src/proxy.ts). */
export const LANG_COOKIE = "qr_lang";

/**
 * Best supported locale for an Accept-Language header ("ko-KR,ko;q=0.9,en;q=0.8" → "ko").
 * Region tags fall back to their language ("pt-BR" → pt); unknown languages are skipped, so a
 * header listing only unsupported languages yields English.
 */
export function preferredLocale(acceptLanguage: string | null | undefined): Locale {
  if (!acceptLanguage) return DEFAULT_LOCALE;
  const ranked = acceptLanguage
    .split(",")
    .map((part, index) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.map((p) => p.trim()).find((p) => p.startsWith("q="));
      const weight = q ? Number.parseFloat(q.slice(2)) : 1;
      return { lang: tag.trim().toLowerCase().split("-")[0], weight: Number.isFinite(weight) ? weight : 0, index };
    })
    .filter((r) => r.lang && r.weight > 0)
    .sort((a, b) => b.weight - a.weight || a.index - b.index);
  for (const r of ranked) if (isLocale(r.lang)) return r.lang;
  return DEFAULT_LOCALE;
}
