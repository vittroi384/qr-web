import type { QrPayloadMap, QrType, WifiPayload, VCardPayload, EventPayload } from "./types";

/** Escape characters that are structural in WIFI: strings. */
function escapeWifi(value: string): string {
  return value.replace(/([\\;,:"])/g, "\\$1");
}

/** Escape per vCard 3.0 (RFC 2426) / iCalendar (RFC 5545) TEXT. */
function escapeText(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");
}

function normalizePhone(value: string): string {
  return value.replace(/[^\d+]/g, "");
}

export function encodeUrl(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) return "";
  if (/^[a-z][a-z0-9+.-]*:/i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

export function encodeWifi(p: WifiPayload): string {
  if (!p.ssid.trim()) return "";
  const parts = [`WIFI:T:${p.encryption};`, `S:${escapeWifi(p.ssid)};`];
  if (p.encryption !== "nopass" && p.password) parts.push(`P:${escapeWifi(p.password)};`);
  if (p.hidden) parts.push("H:true;");
  return parts.join("") + ";";
}

export function encodeVCard(p: VCardPayload): string {
  const hasName = p.firstName.trim() || p.lastName.trim();
  if (!hasName && !p.phone.trim() && !p.mobile.trim() && !p.email.trim()) return "";
  const lines = ["BEGIN:VCARD", "VERSION:3.0"];
  lines.push(`N:${escapeText(p.lastName)};${escapeText(p.firstName)};;;`);
  const fullName = [p.lastName, p.firstName].filter(Boolean).join(" ").trim() || p.org;
  lines.push(`FN:${escapeText(fullName)}`);
  if (p.org) lines.push(`ORG:${escapeText(p.org)}`);
  if (p.title) lines.push(`TITLE:${escapeText(p.title)}`);
  if (p.phone) lines.push(`TEL;TYPE=WORK,VOICE:${p.phone.trim()}`);
  if (p.mobile) lines.push(`TEL;TYPE=CELL:${p.mobile.trim()}`);
  if (p.email) lines.push(`EMAIL;TYPE=INTERNET:${p.email.trim()}`);
  if (p.website) lines.push(`URL:${encodeUrl(p.website)}`);
  if (p.address) lines.push(`ADR;TYPE=WORK:;;${escapeText(p.address)};;;;`);
  if (p.note) lines.push(`NOTE:${escapeText(p.note)}`);
  lines.push("END:VCARD");
  return lines.join("\r\n");
}

export function encodeEmail(p: QrPayloadMap["email"]): string {
  if (!p.to.trim()) return "";
  const params = new URLSearchParams();
  if (p.subject) params.set("subject", p.subject);
  if (p.body) params.set("body", p.body);
  const query = params.toString().replace(/\+/g, "%20");
  return `mailto:${p.to.trim()}${query ? `?${query}` : ""}`;
}

export function encodeSms(p: QrPayloadMap["sms"]): string {
  const phone = normalizePhone(p.phone);
  if (!phone) return "";
  return `SMSTO:${phone}:${p.message}`;
}

export function encodePhone(p: QrPayloadMap["phone"]): string {
  const phone = normalizePhone(p.phone);
  return phone ? `tel:${phone}` : "";
}

export function encodeGeo(p: QrPayloadMap["geo"]): string {
  const lat = Number.parseFloat(p.lat);
  const lng = Number.parseFloat(p.lng);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return "";
  if (lat < -90 || lat > 90 || lng < -180 || lng > 180) return "";
  return `geo:${lat},${lng}`;
}

/** datetime-local ("2026-10-02T14:30") → iCal UTC stamp ("20261002T053000Z"). */
function toIcalUtc(local: string): string | null {
  const d = new Date(local);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

/** datetime-local or date → iCal DATE ("20261002"). */
function toIcalDate(local: string): string | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(local);
  return m ? `${m[1]}${m[2]}${m[3]}` : null;
}

export function encodeEvent(p: EventPayload): string {
  if (!p.title.trim() || !p.start) return "";
  const lines = ["BEGIN:VEVENT"];
  lines.push(`SUMMARY:${escapeText(p.title)}`);
  if (p.allDay) {
    const start = toIcalDate(p.start);
    if (!start) return "";
    lines.push(`DTSTART;VALUE=DATE:${start}`);
    const end = toIcalDate(p.end || p.start);
    if (end) lines.push(`DTEND;VALUE=DATE:${end}`);
  } else {
    const start = toIcalUtc(p.start);
    if (!start) return "";
    lines.push(`DTSTART:${start}`);
    const end = toIcalUtc(p.end || p.start);
    if (end) lines.push(`DTEND:${end}`);
  }
  if (p.location) lines.push(`LOCATION:${escapeText(p.location)}`);
  if (p.description) lines.push(`DESCRIPTION:${escapeText(p.description)}`);
  lines.push("END:VEVENT");
  return lines.join("\r\n");
}

/** Build the final string that goes into the QR code. Empty string means "nothing to render". */
export function encodePayload<T extends QrType>(type: T, payload: QrPayloadMap[T]): string {
  switch (type) {
    case "url":
      return encodeUrl((payload as QrPayloadMap["url"]).url);
    case "text":
      return (payload as QrPayloadMap["text"]).text;
    case "wifi":
      return encodeWifi(payload as WifiPayload);
    case "vcard":
      return encodeVCard(payload as VCardPayload);
    case "email":
      return encodeEmail(payload as QrPayloadMap["email"]);
    case "sms":
      return encodeSms(payload as QrPayloadMap["sms"]);
    case "phone":
      return encodePhone(payload as QrPayloadMap["phone"]);
    case "geo":
      return encodeGeo(payload as QrPayloadMap["geo"]);
    case "event":
      return encodeEvent(payload as EventPayload);
    default:
      return "";
  }
}
