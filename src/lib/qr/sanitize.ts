import { DEFAULT_PAYLOADS, DEFAULT_STYLE, LOG_EVENTS, QR_TYPES, type LogEvent, type QrType } from "./types";

/**
 * Total characters kept across all string fields of one row (and the cap for any single field).
 * A QR code holds at most 2953 bytes (version 40, binary), so no honest save needs more; the cap
 * keeps a flooding client from storing ~16 KB per request (Content-Length cap) and filling the
 * disk at 30 rows/min per IP.
 */
const MAX_PAYLOAD_CHARS = 3000;
const MAX_STRING = MAX_PAYLOAD_CHARS;
const FIXED_MASK = "****";

/** Fields a batch export reports (under the dominant type "url" or "text"). */
const BATCH_PAYLOAD_KEYS: readonly string[] = ["count", "mode", "sample"];
/** Option keys the client may report; the logo and the label text are reduced to a flag / a length. */
const OPTION_KEYS: readonly string[] = [...Object.keys(DEFAULT_STYLE), "frameTextLength"];

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

/*
 * Personal data policy (2026-10-06, ADR-004 extension): contact details are kept only in part and
 * free-text bodies only up to BODY_KEEP characters, so the admin can still tell what kind of QR was
 * made (domain, platform, type) without the log being a list of phone numbers and messages.
 */
const PHONE_FIELDS: Partial<Record<QrType, readonly string[]>> = { whatsapp: ["phone"], sms: ["phone"], phone: ["phone"], vcard: ["phone", "mobile"] };
const EMAIL_FIELDS: Partial<Record<QrType, readonly string[]>> = { email: ["to"], vcard: ["email"] };
/** Long opaque identifiers: first and last four characters stay. */
const LONG_ID_FIELDS: Partial<Record<QrType, readonly string[]>> = { crypto: ["address"], payment: ["handle"] };
const BODY_FIELDS: Partial<Record<QrType, readonly string[]>> = {
  text: ["text"],
  email: ["subject", "body"],
  sms: ["message"],
  whatsapp: ["message"],
  event: ["description"],
  vcard: ["note", "address"],
  pix: ["description"],
  upi: ["note"],
  epc: ["remittance", "info"],
  crypto: ["label"],
};
const BODY_KEEP = 40;
/** Coordinates rounded to 2 decimals (~1 km): enough to see the region, not the doorstep. */
const GEO_DECIMALS = 2;

/** "010-1234-5678" → "010-****-5678": first three and last four digits stay, other digits become "*". */
export function maskPhoneNumber(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (digits.length < 8) return maskIdentifier(value);
  let seen = 0;
  return value.replace(/\d/g, (d) => {
    seen++;
    return seen <= 3 || seen > digits.length - 4 ? d : "*";
  });
}

/** "user@example.com" → "us****@example.com"; anything without "@" falls back to the identifier mask. */
export function maskEmail(value: string): string {
  const at = value.indexOf("@");
  if (at <= 0) return maskIdentifier(value);
  return `${value.slice(0, Math.min(2, at))}${FIXED_MASK}${value.slice(at)}`;
}

/** Long identifier: first and last four characters stay (wallet addresses are 26–62 characters). */
export function maskLongIdentifier(value: string): string {
  const v = value.trim();
  return v.length <= 12 ? maskIdentifier(v) : `${v.slice(0, 4)}${FIXED_MASK}${v.slice(-4)}`;
}

/** Free text: the first BODY_KEEP characters plus the original length. */
export function clipBody(value: string): string {
  const chars = Array.from(value);
  return chars.length <= BODY_KEEP ? value : `${chars.slice(0, BODY_KEEP).join("")}… (${chars.length}자)`;
}

function roundCoordinate(value: string): string {
  const n = Number.parseFloat(value);
  return Number.isFinite(n) ? n.toFixed(GEO_DECIMALS) : value;
}

/** Types whose encoded string is safe to keep as a 200-character preview after the payload masks above. */
const PREVIEW_KEPT: ReadonlySet<QrType> = new Set<QrType>(["url", "social", "file", "wifi", "pix", "upi", "epc"]);

/**
 * What goes into encoded_preview. Batch samples are already masked strings; URL-like types keep the
 * (masked) client string; every other type would repeat the contact or body we just masked, so it
 * keeps no preview at all. The preview only feeds the admin text search.
 */
export function previewForStorage(type: QrType, event: LogEvent, clientEncoded: unknown): string | null {
  if (typeof clientEncoded !== "string" || !clientEncoded) return null;
  if (event === "batch" || PREVIEW_KEPT.has(type)) return maskPaymentIdentifiers(maskWifiPasswords(clientEncoded)).slice(0, 200);
  return null;
}

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

/**
 * Keep only the fields this QR type actually has (plus the batch summary fields for a batch
 * event), primitives only, with per-field and total length caps; optionally mask secrets.
 * Unknown keys are dropped so a row can never carry more than the type's own data.
 */
export function sanitizePayloadForStorage(
  type: QrType,
  payload: unknown,
  opts: { maskWifiPassword: boolean; event?: LogEvent },
): Record<string, string | number | boolean> {
  const out: Record<string, string | number | boolean> = {};
  if (!payload || typeof payload !== "object") return out;
  const allowed = new Set<string>(Object.keys(DEFAULT_PAYLOADS[type]));
  if (opts.event === "batch") for (const k of BATCH_PAYLOAD_KEYS) allowed.add(k);
  let budget = MAX_PAYLOAD_CHARS;
  for (const [key, value] of Object.entries(payload as Record<string, unknown>)) {
    if (!allowed.has(key)) continue;
    if (typeof value === "string") {
      const kept = value.slice(0, Math.min(MAX_STRING, budget));
      budget -= kept.length;
      out[key] = kept;
    } else if (typeof value === "number" || typeof value === "boolean") out[key] = value;
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
  const apply = (fields: readonly string[] | undefined, fn: (v: string) => string) => {
    for (const f of fields ?? []) if (typeof out[f] === "string" && out[f]) out[f] = fn(out[f] as string);
  };
  apply(PHONE_FIELDS[type], maskPhoneNumber);
  apply(EMAIL_FIELDS[type], maskEmail);
  apply(LONG_ID_FIELDS[type], maskLongIdentifier);
  apply(BODY_FIELDS[type], clipBody);
  if (type === "geo") apply(["lat", "lng"], roundCoordinate);
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
    if (!OPTION_KEYS.includes(key)) continue;
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
