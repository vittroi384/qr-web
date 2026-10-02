import type { Metadata } from "next";
import { en } from "./en";
import { ko, type Dict } from "./ko";

export type { Dict };
export type Locale = "ko" | "en";
export const LOCALES: readonly Locale[] = ["ko", "en"];
export const DEFAULT_LOCALE: Locale = "ko";

const DICTS: Record<Locale, Dict> = { ko, en };

export function isLocale(value: unknown): value is Locale {
  return value === "ko" || value === "en";
}

export function getDict(locale: Locale): Dict {
  return DICTS[locale];
}

/** "/about" → "/about" (ko) or "/en/about" (en). "/" → "/" or "/en". */
export function localePath(locale: Locale, path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === DEFAULT_LOCALE) return clean;
  return clean === "/" ? `/${locale}` : `/${locale}${clean}`;
}

/** "/en/about" → "/about", "/en" → "/", "/about" → "/about". */
export function stripLocale(pathname: string): string {
  for (const l of LOCALES) {
    if (l === DEFAULT_LOCALE) continue;
    if (pathname === `/${l}`) return "/";
    if (pathname.startsWith(`/${l}/`)) return pathname.slice(l.length + 1);
  }
  return pathname || "/";
}

/** Canonical + hreflang links for a public page. `path` is the Korean (unprefixed) path. */
export function alternatesFor(locale: Locale, path: string): NonNullable<Metadata["alternates"]> {
  return {
    canonical: localePath(locale, path),
    languages: {
      ko: localePath("ko", path),
      en: localePath("en", path),
      "x-default": localePath("ko", path),
    },
  };
}
