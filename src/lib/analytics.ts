import { isLocale, localeFromPath, stripLocale, type Locale } from "./i18n";
import { isQrType } from "./qr/sanitize";
import type { QrType } from "./qr/types";

const MAX_PAGE_LENGTH = 200;

/**
 * Locale and unprefixed page path of the page a request came from, read from its Referer.
 * Only a same-origin Referer counts (host must equal the request host); anything else → nulls.
 * "https://site/ko/wifi-qr-code?x=1" → { locale: "ko", page: "/wifi-qr-code" }.
 */
export function pageContextFromReferer(
  referer: string | null | undefined,
  host: string | null | undefined,
): { locale: Locale | null; page: string | null } {
  const none = { locale: null, page: null };
  if (!referer || !host) return none;
  let url: URL;
  try {
    url = new URL(referer);
  } catch {
    return none;
  }
  if ((url.protocol !== "http:" && url.protocol !== "https:") || url.host !== host) return none;
  return { locale: localeFromPath(url.pathname), page: stripLocale(url.pathname).slice(0, MAX_PAGE_LENGTH) };
}

/** Funnel steps. "select" and "preview" come from the browser; "save" is counted by /api/log. */
export const FUNNEL_STEPS = ["select", "preview", "save"] as const;
export type FunnelStep = (typeof FUNNEL_STEPS)[number];
export type ClientFunnelStep = Exclude<FunnelStep, "save">;

export type FunnelBody = { step: ClientFunnelStep; type: QrType; locale: Locale };

/** Validates a POST /api/funnel body; null when any field is missing or unknown. */
export function parseFunnelBody(body: unknown): FunnelBody | null {
  if (!body || typeof body !== "object") return null;
  const { step, type, locale } = body as Record<string, unknown>;
  if (step !== "select" && step !== "preview") return null;
  if (!isQrType(type) || !isLocale(locale)) return null;
  return { step, type, locale };
}
