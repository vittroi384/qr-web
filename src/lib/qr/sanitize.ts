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
 * any embedded WIFI: string masked too.
 */
export function hardenSecretsForStorage(
  type: QrType,
  payload: Record<string, string | number | boolean>,
): Record<string, string | number | boolean> {
  const out: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(payload)) {
    out[key] = typeof value === "string" ? maskWifiPasswords(value) : value;
  }
  if (type === "wifi" && out.password !== undefined && out.password !== "") out.password = FIXED_MASK;
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
