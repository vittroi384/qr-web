import type {
  CryptoPayload,
  EventPayload,
  PaymentPayload,
  QrPayloadMap,
  QrType,
  SocialPayload,
  VCardPayload,
  WhatsAppPayload,
  WifiPayload,
} from "./types";

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

// Schemes a scanner may legitimately open. Script/data URIs are refused outright.
const ALLOWED_URL_SCHEMES = new Set(["http", "https", "mailto", "tel", "sms", "geo", "ftp", "market", "itms-apps"]);

/**
 * "example.com:8080/menu", "localhost:3000" — a host with a port, which a scheme regex would
 * otherwise read as the unknown scheme "example.com". Dotted hosts or localhost only, so plain
 * text such as "Note:1234" is not turned into a link. Shared with the batch row classifier.
 */
export const HOST_WITH_PORT = /^(?:localhost|[\w-]+(?:\.[\w-]+)+):\d{1,5}(?:[/?#]\S*)?$/i;

export function encodeUrl(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) return "";
  const scheme = /^([a-z][a-z0-9+.-]*):/i.exec(trimmed);
  if (scheme) {
    if (ALLOWED_URL_SCHEMES.has(scheme[1].toLowerCase())) return trimmed;
    return HOST_WITH_PORT.test(trimmed) ? `https://${trimmed}` : "";
  }
  return `https://${trimmed}`;
}

/** Social / app-link presets: an ID or handle becomes a canonical profile URL. */
export type SocialPlatform = {
  id: string;
  label: string;
  /** `{handle}` is replaced with the normalised handle. */
  template: string;
  placeholder: string;
  /** Strip a leading "@" from handles (false for platforms where the ID is a code). */
  stripAt: boolean;
};

export const SOCIAL_PLATFORMS: readonly SocialPlatform[] = [
  { id: "instagram", label: "Instagram", template: "https://www.instagram.com/{handle}/", placeholder: "@username", stripAt: true },
  { id: "youtube", label: "YouTube", template: "https://www.youtube.com/@{handle}", placeholder: "@channel", stripAt: true },
  { id: "tiktok", label: "TikTok", template: "https://www.tiktok.com/@{handle}", placeholder: "@username", stripAt: true },
  { id: "x", label: "X (Twitter)", template: "https://x.com/{handle}", placeholder: "@username", stripAt: true },
  { id: "threads", label: "Threads", template: "https://www.threads.net/@{handle}", placeholder: "@username", stripAt: true },
  { id: "facebook", label: "Facebook", template: "https://www.facebook.com/{handle}", placeholder: "page.name", stripAt: true },
  { id: "linkedin", label: "LinkedIn", template: "https://www.linkedin.com/in/{handle}/", placeholder: "profile-id", stripAt: true },
  { id: "kakao_openchat", label: "카카오톡 오픈채팅", template: "https://open.kakao.com/o/{handle}", placeholder: "오픈채팅 링크 뒤 코드 (예: gAbCdEf)", stripAt: false },
  { id: "kakao_channel", label: "카카오톡 채널", template: "https://pf.kakao.com/{handle}", placeholder: "채널 ID (예: _AbCdE)", stripAt: false },
  { id: "naver_blog", label: "네이버 블로그", template: "https://blog.naver.com/{handle}", placeholder: "블로그 ID", stripAt: true },
  { id: "naver_smartstore", label: "네이버 스마트스토어", template: "https://smartstore.naver.com/{handle}", placeholder: "스토어 ID", stripAt: true },
  { id: "github", label: "GitHub", template: "https://github.com/{handle}", placeholder: "username", stripAt: true },
  { id: "telegram", label: "Telegram", template: "https://t.me/{handle}", placeholder: "@username", stripAt: true },
  { id: "line", label: "LINE", template: "https://line.me/R/ti/p/{handle}", placeholder: "@line-id", stripAt: false },
  { id: "spotify", label: "Spotify", template: "https://open.spotify.com/artist/{handle}", placeholder: "artist ID", stripAt: true },
  { id: "pinterest", label: "Pinterest", template: "https://www.pinterest.com/{handle}/", placeholder: "username", stripAt: true },
  { id: "snapchat", label: "Snapchat", template: "https://www.snapchat.com/add/{handle}", placeholder: "username", stripAt: true },
  { id: "twitch", label: "Twitch", template: "https://www.twitch.tv/{handle}", placeholder: "channel", stripAt: true },
  { id: "discord", label: "Discord", template: "https://discord.gg/{handle}", placeholder: "invite code", stripAt: false },
  { id: "reddit", label: "Reddit", template: "https://www.reddit.com/user/{handle}/", placeholder: "username", stripAt: true },
  { id: "linktree", label: "Linktree", template: "https://linktr.ee/{handle}", placeholder: "username", stripAt: true },
  { id: "calendly", label: "Calendly", template: "https://calendly.com/{handle}", placeholder: "username", stripAt: true },
  { id: "google_review", label: "Google Review", template: "https://search.google.com/local/writereview?placeid={handle}", placeholder: "Place ID (ChIJ...)", stripAt: false },
  { id: "yelp", label: "Yelp", template: "https://www.yelp.com/biz/{handle}", placeholder: "business-slug", stripAt: false },
  { id: "whatsapp_channel", label: "WhatsApp Channel", template: "https://whatsapp.com/channel/{handle}", placeholder: "channel code", stripAt: false },
  { id: "signal", label: "Signal", template: "https://signal.me/#p/{handle}", placeholder: "+14155552671", stripAt: false },
  { id: "medium", label: "Medium", template: "https://medium.com/@{handle}", placeholder: "@username", stripAt: true },
  { id: "substack", label: "Substack", template: "https://{handle}.substack.com", placeholder: "publication", stripAt: true },
];

export function encodeSocial(p: SocialPayload): string {
  const platform = SOCIAL_PLATFORMS.find((s) => s.id === p.platform);
  let handle = p.handle.trim();
  if (!platform || !handle) return "";
  // Pasting a full profile URL is common; accept it as-is when it is http(s).
  if (/^https?:\/\//i.test(handle)) return encodeUrl(handle);
  if (platform.stripAt) handle = handle.replace(/^@+/, "");
  // Handles are path segments: keep the ID characters, drop whitespace and slashes.
  handle = handle.replace(/[\s/]+/g, "");
  if (!handle) return "";
  return platform.template.replace("{handle}", encodeURIComponent(handle));
}

/** Payment-link presets. `{handle}` is the username; `{amount}` (optional) is a plain decimal. */
export type PaymentProvider = {
  id: string;
  label: string;
  template: string;
  /** Template used when an amount is given; omitted → amount unsupported. */
  amountTemplate?: string;
  placeholder: string;
};

export const PAYMENT_PROVIDERS: readonly PaymentProvider[] = [
  { id: "paypal", label: "PayPal.Me", template: "https://paypal.me/{handle}", amountTemplate: "https://paypal.me/{handle}/{amount}", placeholder: "username" },
  { id: "venmo", label: "Venmo", template: "https://venmo.com/u/{handle}", amountTemplate: "https://venmo.com/u/{handle}?txn=pay&amount={amount}", placeholder: "username" },
  { id: "cashapp", label: "Cash App", template: "https://cash.app/${handle}", amountTemplate: "https://cash.app/${handle}/{amount}", placeholder: "cashtag" },
  { id: "buymeacoffee", label: "Buy Me a Coffee", template: "https://buymeacoffee.com/{handle}", placeholder: "username" },
  { id: "kofi", label: "Ko-fi", template: "https://ko-fi.com/{handle}", placeholder: "username" },
  { id: "patreon", label: "Patreon", template: "https://www.patreon.com/{handle}", placeholder: "creator" },
  { id: "revolut", label: "Revolut.Me", template: "https://revolut.me/{handle}", placeholder: "username" },
  { id: "wise", label: "Wise", template: "https://wise.com/pay/me/{handle}", placeholder: "username" },
];

export function encodePayment(p: PaymentPayload): string {
  const provider = PAYMENT_PROVIDERS.find((x) => x.id === p.provider);
  let handle = p.handle.trim();
  if (!provider || !handle) return "";
  if (/^https?:\/\//i.test(handle)) return encodeUrl(handle);
  handle = handle.replace(/^[@$]+/, "").replace(/[\s/]+/g, "");
  if (!handle) return "";
  const amount = p.amount.trim();
  const amountOk = /^\d+(\.\d{1,2})?$/.test(amount) && Number(amount) > 0;
  const template = provider.amountTemplate && amountOk ? provider.amountTemplate : provider.template;
  return template.replace("{handle}", encodeURIComponent(handle)).replace("{amount}", amount);
}

/** Crypto payment URIs. Bitcoin-style coins follow BIP-21; Ethereum uses the EIP-681 address form. */
export type CryptoCoin = { id: string; label: string; scheme: string; supportsAmount: boolean; placeholder: string };

export const CRYPTO_COINS: readonly CryptoCoin[] = [
  { id: "bitcoin", label: "Bitcoin (BTC)", scheme: "bitcoin", supportsAmount: true, placeholder: "bc1q..." },
  { id: "ethereum", label: "Ethereum (ETH)", scheme: "ethereum", supportsAmount: false, placeholder: "0x..." },
  { id: "litecoin", label: "Litecoin (LTC)", scheme: "litecoin", supportsAmount: true, placeholder: "ltc1q..." },
  { id: "dogecoin", label: "Dogecoin (DOGE)", scheme: "dogecoin", supportsAmount: true, placeholder: "D..." },
  { id: "bitcoincash", label: "Bitcoin Cash (BCH)", scheme: "bitcoincash", supportsAmount: true, placeholder: "q..." },
  { id: "solana", label: "Solana (SOL)", scheme: "solana", supportsAmount: true, placeholder: "address" },
];

export function encodeCrypto(p: CryptoPayload): string {
  const coin = CRYPTO_COINS.find((c) => c.id === p.coin);
  const address = p.address.trim();
  // Wallet addresses are base58/bech32/hex: refuse anything that could smuggle URI syntax.
  if (!coin || !address || !/^[A-Za-z0-9]{20,128}$/.test(address)) return "";
  const params = new URLSearchParams();
  const amount = p.amount.trim();
  if (coin.supportsAmount && amount && /^\d+(\.\d{1,8})?$/.test(amount) && Number(amount) > 0) params.set("amount", amount);
  if (p.label.trim()) params.set("label", p.label.trim().slice(0, 60));
  const query = params.toString().replace(/\+/g, "%20");
  return `${coin.scheme}:${address}${query ? `?${query}` : ""}`;
}

export function encodeWhatsApp(p: WhatsAppPayload): string {
  // wa.me wants the international number with digits only (no +, spaces or dashes).
  const digits = p.phone.replace(/\D/g, "").replace(/^0+/, "");
  if (digits.length < 7 || digits.length > 15) return "";
  const message = p.message.trim();
  return `https://wa.me/${digits}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
}

export function encodeWifi(p: WifiPayload): string {
  if (!p.ssid.trim()) return "";
  const parts = [`WIFI:T:${p.encryption};`, `S:${escapeWifi(p.ssid)};`];
  if (p.encryption !== "nopass" && p.password) parts.push(`P:${escapeWifi(p.password)};`);
  if (p.hidden) parts.push("H:true;");
  return parts.join("") + ";";
}

// Built at runtime: TypeScript rejects the `u` flag literal when targeting ES2017.
const EAST_ASIAN_NAME = new RegExp("[\\p{Script=Hangul}\\p{Script=Han}\\p{Script=Hiragana}\\p{Script=Katakana}]", "u");

/**
 * Formatted name: family name first for Korean/Chinese/Japanese names ("홍 길동"), given name
 * first otherwise ("John Smith"). FN is mandatory in vCard 3.0, so with no name at all it falls
 * back to the organisation, then a phone number, then the e-mail — never an empty value.
 */
function vCardFullName(p: VCardPayload): string {
  const first = p.firstName.trim();
  const last = p.lastName.trim();
  const ordered = EAST_ASIAN_NAME.test(first + last) ? [last, first] : [first, last];
  return ordered.filter(Boolean).join(" ") || p.org.trim() || p.mobile.trim() || p.phone.trim() || p.email.trim();
}

export function encodeVCard(p: VCardPayload): string {
  const hasName = p.firstName.trim() || p.lastName.trim();
  if (!hasName && !p.phone.trim() && !p.mobile.trim() && !p.email.trim()) return "";
  const lines = ["BEGIN:VCARD", "VERSION:3.0"];
  lines.push(`N:${escapeText(p.lastName)};${escapeText(p.firstName)};;;`);
  lines.push(`FN:${escapeText(vCardFullName(p))}`);
  if (p.org) lines.push(`ORG:${escapeText(p.org)}`);
  if (p.title) lines.push(`TITLE:${escapeText(p.title)}`);
  if (p.phone) lines.push(`TEL;TYPE=WORK,VOICE:${escapeText(p.phone.trim())}`);
  if (p.mobile) lines.push(`TEL;TYPE=CELL:${escapeText(p.mobile.trim())}`);
  if (p.email) lines.push(`EMAIL;TYPE=INTERNET:${escapeText(p.email.trim())}`);
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

/** "20261002" → "20261003" (UTC arithmetic on a date-only value). */
function nextDay(ical: string): string {
  const d = new Date(`${ical.slice(0, 4)}-${ical.slice(4, 6)}-${ical.slice(6, 8)}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10).replace(/-/g, "");
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
    // DTEND for all-day events is exclusive (RFC 5545). With no end given, the event is one
    // day long, so DTEND must be the day after DTSTART.
    // RFC 5545: DTEND for all-day events is exclusive, so "ends on the 5th" → DTEND = 6th.
    const endDate = p.end ? toIcalDate(p.end) : null;
    const end = endDate ? nextDay(endDate) : nextDay(start);
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
    case "social":
      return encodeSocial(payload as SocialPayload);
    case "whatsapp":
      return encodeWhatsApp(payload as WhatsAppPayload);
    case "payment":
      return encodePayment(payload as PaymentPayload);
    case "crypto":
      return encodeCrypto(payload as CryptoPayload);
    case "file":
      return encodeUrl((payload as QrPayloadMap["file"]).url);
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
