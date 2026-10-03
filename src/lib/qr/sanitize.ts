import { LOG_EVENTS, QR_TYPES, type LogEvent, type QrType } from "./types";

const MAX_STRING = 4000;
const FIXED_MASK = "****";

/**
 * One WIFI: block: from "WIFI:" to its ";;" terminator, or to the end of the string when the
 * terminator is missing (truncated). Backslash escapes (\; \: \\ …) are skipped as a unit so an
 * escaped ";" inside a value never ends the block early.
 */
const WIFI_BLOCK = /WIFI:(?:\\.|[^\\])*?(?:;;|$)/gi;
/** A P: (password) field at a field boundary inside one block; the value runs to the first unescaped ";". */
const WIFI_PASSWORD_FIELD = /(^WIFI:|;)P:(?:\\.|[^;\\])*(?:;|$)/gi;

export function isQrType(value: unknown): value is QrType {
  return typeof value === "string" && (QR_TYPES as readonly string[]).includes(value);
}

export function isLogEvent(value: unknown): value is LogEvent {
  return typeof value === "string" && (LOG_EVENTS as readonly string[]).includes(value);
}

/**
 * Replaces the password of every WIFI: block found anywhere in the string with a fixed mask —
 * whatever comes before it, however many blocks there are, and even when the string was cut off
 * in the middle of the password. Safe to call on any text; strings without "WIFI:" are returned
 * unchanged. Shared by the browser (before the beacon leaves) and the server (before storage).
 */
export function maskWifiPasswords(value: string): string {
  if (!/WIFI:/i.test(value)) return value;
  return value.replace(WIFI_BLOCK, (block) => block.replace(WIFI_PASSWORD_FIELD, `$1P:${FIXED_MASK};`));
}

/**
 * Partial mask for payment identifiers (Pix key, UPI ID, IBAN): the first two and last two
 * characters stay so an admin can still tell entries apart, the rest becomes "****". Short values
 * are masked whole. These identifiers are semi-public (people print them), but the log is not the
 * place to keep a list of them in clear text.
 */
export function maskIdentifier(value: string): string {
  const v = value.trim();
  if (!v) return v;
  return v.length <= 6 ? FIXED_MASK : `${v.slice(0, 2)}${FIXED_MASK}${v.slice(-2)}`;
}

/** Start of the Pix key inside a BR Code: GUI sub-field, then sub-field id 01 and its two-digit length. */
const PIX_KEY_START = "0014br.gov.bcb.pix01";
/** The pa= parameter of a upi://pay link. */
const UPI_PA_PARAM = /(upi:\/\/pay\?(?:[^&\s]*&)*?pa=)([^&\s]+)/gi;
/** The IBAN line of an EPC payload: line 7 (after BCD, version, charset, SCT, BIC, name). */
const EPC_IBAN_LINE = /(BCD\n[^\n]*\n[^\n]*\nSCT\n[^\n]*\n[^\n]*\n)([^\n]+)/g;

/** Which payload field holds the account identifier for the bank-transfer types. */
const PAYMENT_IDENTIFIER_FIELD: Partial<Record<QrType, string>> = { pix: "key", upi: "vpa", epc: "iban" };

/**
 * Masks the Pix key, UPI ID or IBAN wherever it appears inside an encoded string (the stored
 * preview, batch samples). Strings without one of the three formats come back unchanged. The
 * masked Pix string is no longer a valid BR Code (lengths and CRC no longer add up) — intended.
 */
export function maskPaymentIdentifiers(value: string): string {
  let out = value;
  let from = 0;
  for (;;) {
    const at = out.indexOf(PIX_KEY_START, from);
    if (at < 0) break;
    const lenAt = at + PIX_KEY_START.length;
    const len = Number.parseInt(out.slice(lenAt, lenAt + 2), 10);
    if (!Number.isFinite(len)) break;
    const key = out.slice(lenAt + 2, lenAt + 2 + len);
    const masked = maskIdentifier(key);
    out = `${out.slice(0, lenAt)}${String(masked.length).padStart(2, "0")}${masked}${out.slice(lenAt + 2 + key.length)}`;
    from = lenAt + 2 + masked.length;
  }
  if (/upi:\/\/pay/i.test(out)) out = out.replace(UPI_PA_PARAM, (_m, head: string, vpa: string) => `${head}${maskIdentifier(vpa)}`);
  if (out.includes("BCD\n")) out = out.replace(EPC_IBAN_LINE, (_m, head: string, iban: string) => `${head}${maskIdentifier(iban)}`);
  return out;
}

/** Keep only primitive fields, clamp string length, optionally mask secrets before persisting. */
export function sanitizePayloadForStorage(
  type: QrType,
  payload: unknown,
  opts: { maskWifiPassword: boolean },
): Record<string, string | number | boolean> {
  const out: Record<string, string | number | boolean> = {};
  if (!payload || typeof payload !== "object") return out;
  for (const [key, value] of Object.entries(payload as Record<string, unknown>)) {
    if (!/^[a-zA-Z_][a-zA-Z0-9_]{0,40}$/.test(key)) continue;
    if (typeof value === "string") out[key] = value.slice(0, MAX_STRING);
    else if (typeof value === "number" || typeof value === "boolean") out[key] = value;
  }
  if (type === "wifi" && opts.maskWifiPassword && typeof out.password === "string" && out.password) {
    out.password = "*".repeat(Math.min(out.password.length, 12));
  }
  return out;
}

/**
 * Final, unconditional pass right before a row is written: the Wi-Fi password field becomes a
 * fixed-length mask so neither the plaintext nor its length reaches the database or exports, and
 * every string value — whatever the QR type (free text, batch samples, …) — has the password of
 * any embedded WIFI: string masked too. Payment identifiers (Pix key, UPI ID, IBAN) are partially
 * masked in their own field and inside any embedded encoded string.
 */
export function hardenSecretsForStorage(
  type: QrType,
  payload: Record<string, string | number | boolean>,
): Record<string, string | number | boolean> {
  const out: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(payload)) {
    out[key] = typeof value === "string" ? maskPaymentIdentifiers(maskWifiPasswords(value)) : value;
  }
  if (type === "wifi" && out.password !== undefined && out.password !== "") out.password = FIXED_MASK;
  const identifier = PAYMENT_IDENTIFIER_FIELD[type];
  if (identifier && typeof out[identifier] === "string") out[identifier] = maskIdentifier(out[identifier] as string);
  return out;
}

/**
 * Strip large and free-text fields from style options before storing: the logo image becomes a
 * flag and the frame label (visitor-written text) is kept only as its length.
 */
export function sanitizeOptionsForStorage(options: unknown): Record<string, string | number | boolean> {
  const out: Record<string, string | number | boolean> = {};
  if (!options || typeof options !== "object") return out;
  for (const [key, value] of Object.entries(options as Record<string, unknown>)) {
    if (key === "logoDataUrl") {
      out.hasLogo = Boolean(value);
      continue;
    }
    if (key === "frameText") {
      out.frameTextLength = typeof value === "string" ? Array.from(value).length : 0;
      continue;
    }
    if (typeof value === "string") out[key] = value.slice(0, 64);
    else if (typeof value === "number" || typeof value === "boolean") out[key] = value;
  }
  return out;
}
