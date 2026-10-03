import type { Metadata } from "next";
import { en } from "./en";
import { ko, type Dict } from "./ko";
import { landingEn, useCasesEn } from "./landing.en";
import { landingKo, useCasesKo } from "./landing.ko";
import { es } from "./es";
import { pt } from "./pt";
import { de } from "./de";
import { fr } from "./fr";
import { ja } from "./ja";
import { hi } from "./hi";
import { id } from "./id";
import { landingEs, useCasesEs } from "./landing.es";
import { landingPt, useCasesPt } from "./landing.pt";
import { landingDe, useCasesDe } from "./landing.de";
import { landingFr, useCasesFr } from "./landing.fr";
import { landingJa, useCasesJa } from "./landing.ja";
import { landingHi, useCasesHi } from "./landing.hi";
import { landingId, useCasesId } from "./landing.id";
import { DEFAULT_LOCALE, LOCALE_CODES, LOCALE_NAMES, isLocale, localeFromPath, type Locale } from "./locales";
import type { QrPayloadMap, QrType } from "@/lib/qr/types";

export type { Dict, Locale };
export { DEFAULT_LOCALE, LOCALE_NAMES, isLocale, localeFromPath };
/** English is the primary language and lives at the root; every other locale is served under "/<code>". */
export const LOCALES: readonly Locale[] = LOCALE_CODES;

const DICTS: Record<Locale, Dict> = { en, ko, es, pt, de, fr, ja, hi, id };

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
      ...Object.fromEntries(LOCALES.map((l) => [l, localePath(l, path)])),
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
  pix: "pix-qr-code",
  upi: "upi-qr-code",
  epc: "epc-qr-code",
};

export function typeToSlug(type: QrType): string {
  return LANDING_SLUGS[type];
}

export function slugToType(slug: string): QrType | null {
  const hit = (Object.entries(LANDING_SLUGS) as [QrType, string][]).find(([, s]) => s === slug);
  return hit ? hit[0] : null;
}

const LANDINGS: Record<Locale, Record<QrType, LandingCopy>> = {
  en: landingEn,
  ko: landingKo,
  es: landingEs,
  pt: landingPt,
  de: landingDe,
  fr: landingFr,
  ja: landingJa,
  hi: landingHi,
  id: landingId,
};

export function getLanding(locale: Locale): Record<QrType, LandingCopy> {
  return LANDINGS[locale];
}

/* ---------- Use-case landing pages (/restaurant-menu-qr-code, …) ---------- */

export type UseCaseId =
  | "restaurant_menu"
  | "wedding"
  | "business_card"
  | "google_review"
  | "wifi_cafe"
  | "with_logo"
  | "instagram"
  | "youtube"
  | "bulk";

/** Generator UI to arrange on first render, for landings whose topic is a feature rather than a type. */
export type LandingUiHints = {
  /** Open the collapsed Style section. */
  openStyle?: boolean;
  /** Scroll to the logo upload field and highlight it once. */
  focusLogo?: boolean;
};

/** Same page template as a type landing, but the copy is about the situation, not the format. */
export const USE_CASES: readonly {
  id: UseCaseId;
  slug: string;
  type: QrType;
  /** Payload fields to preselect, e.g. the Google Review platform. */
  initialPayload?: Partial<QrPayloadMap>;
  /** Generator UI to open or highlight on load (the logo landing opens the Style section). */
  initialUi?: LandingUiHints;
}[] = [
  { id: "restaurant_menu", slug: "restaurant-menu-qr-code", type: "url" },
  { id: "wedding", slug: "wedding-qr-code", type: "url" },
  { id: "business_card", slug: "business-card-qr-code", type: "vcard" },
  { id: "google_review", slug: "google-review-qr-code", type: "social", initialPayload: { social: { platform: "google_review", handle: "" } } },
  { id: "wifi_cafe", slug: "wifi-qr-code-for-cafe", type: "wifi" },
  { id: "with_logo", slug: "qr-code-with-logo", type: "url", initialUi: { openStyle: true, focusLogo: true } },
  { id: "instagram", slug: "instagram-qr-code", type: "social", initialPayload: { social: { platform: "instagram", handle: "" } } },
  { id: "youtube", slug: "youtube-qr-code", type: "social", initialPayload: { social: { platform: "youtube", handle: "" } } },
  // Rendered with the batch tool in place of the generator (see LandingPage); the type is nominal.
  { id: "bulk", slug: "bulk-qr-code-generator", type: "url" },
];

const USE_CASE_COPY: Record<Locale, Record<UseCaseId, LandingCopy>> = {
  en: useCasesEn,
  ko: useCasesKo,
  es: useCasesEs,
  pt: useCasesPt,
  de: useCasesDe,
  fr: useCasesFr,
  ja: useCasesJa,
  hi: useCasesHi,
  id: useCasesId,
};

export type LandingTarget =
  | { kind: "type"; slug: string; type: QrType; copy: LandingCopy; initialPayload?: undefined; initialUi?: undefined }
  | {
      kind: "useCase";
      slug: string;
      type: QrType;
      copy: LandingCopy;
      id: UseCaseId;
      initialPayload?: Partial<QrPayloadMap>;
      initialUi?: LandingUiHints;
    };

/** Resolves any landing slug (type or use case) to its copy; null for unknown slugs. */
export function resolveLanding(locale: Locale, slug: string): LandingTarget | null {
  const type = slugToType(slug);
  if (type) return { kind: "type", slug, type, copy: LANDINGS[locale][type] };
  const uc = USE_CASES.find((u) => u.slug === slug);
  if (uc) {
    return { kind: "useCase", slug, type: uc.type, copy: USE_CASE_COPY[locale][uc.id], id: uc.id, initialPayload: uc.initialPayload, initialUi: uc.initialUi };
  }
  return null;
}

/** All landing paths (types + use cases), unprefixed — for the sitemap. */
export function allLandingSlugs(): string[] {
  return [...Object.values(LANDING_SLUGS), ...USE_CASES.map((u) => u.slug)];
}
