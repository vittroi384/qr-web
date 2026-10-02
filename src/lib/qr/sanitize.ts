import { LOG_EVENTS, QR_TYPES, type LogEvent, type QrType } from "./types";

const MAX_STRING = 4000;

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
