import type { Metadata } from "next";
import { en } from "./en";
import { ko, type Dict } from "./ko";
import { landingEn } from "./landing.en";
import { landingKo } from "./landing.ko";
import type { QrType } from "@/lib/qr/types";

export type { Dict };
export type Locale = "ko" | "en";
/** English is the primary language and lives at the root; Korean is served under "/ko". */
export const LOCALES: readonly Locale[] = ["en", "ko"];
export const DEFAULT_LOCALE: Locale = "en";

const DICTS: Record<Locale, Dict> = { ko, en };

export function isLocale(value: unknown): value is Locale {
  return value === "ko" || value === "en";
}

export function getDict(locale: Locale): Dict {
  return DICTS[locale];
}

/** "/about" → "/about" (en) or "/ko/about" (ko). "/" → "/" or "/ko". */
export function localePath(locale: Locale, path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === DEFAULT_LOCALE) return clean;
  return clean === "/" ? `/${locale}` : `/${locale}${clean}`;
}

/** "/ko/about" → "/about", "/ko" → "/", "/about" → "/about". */
export function stripLocale(pathname: string): string {
  for (const l of LOCALES) {
    if (l === DEFAULT_LOCALE) continue;
    if (pathname === `/${l}`) return "/";
    if (pathname.startsWith(`/${l}/`)) return pathname.slice(l.length + 1);
  }
  return pathname || "/";
}

/** Canonical + hreflang links for a public page. `path` is the unprefixed (English) path. */
export function alternatesFor(locale: Locale, path: string): NonNullable<Metadata["alternates"]> {
  return {
    canonical: localePath(locale, path),
    languages: {
      en: localePath("en", path),
      ko: localePath("ko", path),
      "x-default": localePath(DEFAULT_LOCALE, path),
    },
  };
}

/* ---------- Per-type landing pages (/wifi-qr-code, /ko/wifi-qr-code, …) ---------- */

/** Long-form copy for one QR type's landing page. Every type has its own text, not a template. */
export type LandingCopy = {
  /** H1, e.g. "Wi-Fi QR Code Generator". */
  title: string;
  /** One sentence under the H1. */
  subtitle: string;
  /** <title> before the site name, e.g. "Wi-Fi QR Code Generator — Free, No Sign-up". */
  metaTitle: string;
  /** Meta description, about 140–160 characters. */
  metaDescription: string;
  sections: {
    howTitle: string;
    how: string[];
    usesTitle: string;
    uses: string[];
    tipsTitle: string;
    tips: string[];
  };
  faq: { q: string; a: string }[];
};

/** URL slug per type. English slugs are used in both locales (/wifi-qr-code, /ko/wifi-qr-code). */
export const LANDING_SLUGS: Record<QrType, string> = {
  url: "url-qr-code",
  social: "social-media-qr-code",
  whatsapp: "whatsapp-qr-code",
  text: "text-qr-code",
  wifi: "wifi-qr-code",
  vcard: "vcard-qr-code",
  email: "email-qr-code",
  sms: "sms-qr-code",
  phone: "phone-number-qr-code",
  geo: "location-qr-code",
  event: "calendar-event-qr-code",
  payment: "paypal-qr-code",
  crypto: "bitcoin-qr-code",
  file: "pdf-qr-code",
};

export function typeToSlug(type: QrType): string {
  return LANDING_SLUGS[type];
}

export function slugToType(slug: string): QrType | null {
  const hit = (Object.entries(LANDING_SLUGS) as [QrType, string][]).find(([, s]) => s === slug);
  return hit ? hit[0] : null;
}

const LANDINGS: Record<Locale, Record<QrType, LandingCopy>> = { en: landingEn, ko: landingKo };

export function getLanding(locale: Locale): Record<QrType, LandingCopy> {
  return LANDINGS[locale];
}
