import { LOG_EVENTS, QR_TYPES, type LogEvent, type QrType } from "./types";

const MAX_STRING = 4000;
const FIXED_MASK = "****";

export function isQrType(value: unknown): value is QrType {
  return typeof value === "string" && (QR_TYPES as readonly string[]).includes(value);
}

export function isLogEvent(value: unknown): value is LogEvent {
  return typeof value === "string" && (LOG_EVENTS as readonly string[]).includes(value);
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
 * Final, unconditional pass right before a row is written: every known secret field becomes a
 * fixed-length mask so neither the plaintext nor its length reaches the database or exports.
 */
export function hardenSecretsForStorage(
  type: QrType,
  payload: Record<string, string | number | boolean>,
): Record<string, string | number | boolean> {
  if (type === "wifi" && payload.password !== undefined && payload.password !== "") {
    return { ...payload, password: FIXED_MASK };
  }
  // A raw WIFI: string pasted into the free-text type carries the password too.
  if (type === "text" && typeof payload.text === "string" && /^WIFI:/i.test(payload.text)) {
    return { ...payload, text: maskEncodedSecrets("wifi", payload.text) };
  }
  return payload;
}

/** Mask secrets inside the encoded QR string (applied BEFORE any truncation). */
export function maskEncodedSecrets(type: QrType, encoded: string): string {
  // Also catch raw WIFI: strings typed into the free-text type.
  if (type !== "wifi" && !/^WIFI:/i.test(encoded)) return encoded;
  // P: value runs to the first unescaped ';'. If the string was cut mid-value there is no
  // terminator, so also mask an unterminated tail.
  return encoded.replace(/P:(?:\\.|[^;\\])*(?:;|$)/, `P:${FIXED_MASK};`);
}

/** Strip large fields (logo image) from style options before storing. */
export function sanitizeOptionsForStorage(options: unknown): Record<string, string | number | boolean> {
  const out: Record<string, string | number | boolean> = {};
  if (!options || typeof options !== "object") return out;
  for (const [key, value] of Object.entries(options as Record<string, unknown>)) {
    if (key === "logoDataUrl") {
      out.hasLogo = Boolean(value);
      continue;
    }
    if (typeof value === "string") out[key] = value.slice(0, 64);
    else if (typeof value === "number" || typeof value === "boolean") out[key] = value;
  }
  return out;
}
