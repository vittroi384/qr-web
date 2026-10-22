import type { GuidePost } from "../types";
import { post as size } from "./qr-code-size-for-printing";
import { post as format } from "./png-vs-svg-qr-code";
import { post as scan } from "./qr-code-wont-scan";
import { post as menu } from "./qr-code-for-restaurant-menu";
import { post as card } from "./qr-code-on-business-card";
import { post as dynamic } from "./static-vs-dynamic-qr-codes";
import { post as logo } from "./add-logo-to-qr-code";
import { post as wifi } from "./wifi-qr-code-guide";

/** /guides articles, newest first as listed here. */
export const GUIDES: readonly GuidePost[] = [size, format, scan, menu, card, dynamic, logo, wifi];

/** Short labels for the footer column; the full titles are too long for a 13px link list. */
export const GUIDE_SHORT_TITLES: Record<string, string> = {
  "qr-code-size-for-printing": "QR code size for printing",
  "png-vs-svg-qr-code": "PNG vs SVG",
  "qr-code-wont-scan": "Why a QR code won't scan",
  "qr-code-for-restaurant-menu": "Restaurant menu QR code",
  "qr-code-on-business-card": "QR code on a business card",
  "static-vs-dynamic-qr-codes": "Static vs dynamic QR codes",
  "add-logo-to-qr-code": "Adding a logo",
  "wifi-qr-code-guide": "Wi-Fi QR code guide",
};

export function getGuide(slug: string): GuidePost | null {
  return GUIDES.find((g) => g.slug === slug) ?? null;
}
