import { CRYPTO_COINS, PAYMENT_PROVIDERS, encodeUrl } from "./encoders";
import type { QrPayloadMap, QrType } from "./types";

/** Longest free text the generator accepts (the textarea's maxLength). */
export const TEXT_MAX = 2000;

/**
 * Why a filled-in field cannot become a QR code. Empty required fields are not issues — the form
 * marks those with its "Required" badge — so an issue only exists when a value is present but wrong.
 */
export type ValidationReason =
  | "urlScheme"
  | "coordNumber"
  | "latRange"
  | "lngRange"
  | "phoneChars"
  | "phoneNoDigits"
  | "phoneTooLong"
  | "paymentAmount"
  | "cryptoAddress"
  | "cryptoAmount"
  | "textMax";

export type ValidationIssue = { field?: string; reason: ValidationReason };

const COORD = /^[-+]?\d+(\.\d+)?$/;
const PHONE_CHARS = /^[\d+\s\-()]*$/;
/** Same shapes the encoders accept (encodePayment / encodeCrypto). */
const MONEY = /^\d+(\.\d{1,2})?$/;
const CRYPTO_AMOUNT = /^\d+(\.\d{1,8})?$/;
const CRYPTO_ADDRESS = /^[A-Za-z0-9]{20,128}$/;

/** The encoder refuses the scheme (javascript:, data:, …) — encodeUrl is the single source of truth. */
function urlIssue(url: string, field: string): ValidationIssue | null {
  return url.trim() && !encodeUrl(url) ? { field, reason: "urlScheme" } : null;
}

function coordIssue(value: string, field: "lat" | "lng"): ValidationIssue | null {
  const v = value.trim();
  if (!v) return null;
  if (!COORD.test(v)) return { field, reason: "coordNumber" };
  const n = Number(v);
  const limit = field === "lat" ? 90 : 180;
  if (n < -limit || n > limit) return { field, reason: field === "lat" ? "latRange" : "lngRange" };
  return null;
}

function phoneIssue(value: string, field: string, maxDigits?: number): ValidationIssue | null {
  if (!value.trim()) return null;
  if (!PHONE_CHARS.test(value)) return { field, reason: "phoneChars" };
  const digits = value.replace(/\D/g, "");
  if (!digits) return { field, reason: "phoneNoDigits" };
  if (maxDigits && digits.length > maxDigits) return { field, reason: "phoneTooLong" };
  return null;
}

/**
 * Explains an input the encoder would silently turn into an empty string (or quietly drop a part
 * of). Pure and synchronous, so the UI can run it on every keystroke next to encodePayload.
 * Returns the first problem found, or null when the payload is fine (or still empty).
 */
export function validatePayload<T extends QrType>(type: T, payload: QrPayloadMap[T]): ValidationIssue | null {
  switch (type) {
    case "url":
    case "file":
      return urlIssue((payload as QrPayloadMap["url"]).url, "url");
    case "vcard":
      return urlIssue((payload as QrPayloadMap["vcard"]).website, "website");
    case "geo": {
      const p = payload as QrPayloadMap["geo"];
      return coordIssue(p.lat, "lat") ?? coordIssue(p.lng, "lng");
    }
    case "phone":
    case "sms":
      return phoneIssue((payload as QrPayloadMap["phone"]).phone, "phone");
    case "whatsapp":
      // wa.me takes the international number: at most 15 digits (E.164).
      return phoneIssue((payload as QrPayloadMap["whatsapp"]).phone, "phone", 15);
    case "payment": {
      const p = payload as QrPayloadMap["payment"];
      const provider = PAYMENT_PROVIDERS.find((x) => x.id === p.provider);
      const amount = p.amount.trim();
      // The amount field only exists for providers whose link can carry one.
      if (provider?.amountTemplate && amount && (!MONEY.test(amount) || Number(amount) <= 0)) {
        return { field: "amount", reason: "paymentAmount" };
      }
      return null;
    }
    case "crypto": {
      const p = payload as QrPayloadMap["crypto"];
      const coin = CRYPTO_COINS.find((c) => c.id === p.coin);
      const address = p.address.trim();
      if (address && !CRYPTO_ADDRESS.test(address)) return { field: "address", reason: "cryptoAddress" };
      const amount = p.amount.trim();
      if (coin?.supportsAmount && amount && (!CRYPTO_AMOUNT.test(amount) || Number(amount) <= 0)) {
        return { field: "amount", reason: "cryptoAmount" };
      }
      return null;
    }
    case "text":
      return (payload as QrPayloadMap["text"]).text.length > TEXT_MAX ? { field: "text", reason: "textMax" } : null;
    default:
      return null;
  }
}
