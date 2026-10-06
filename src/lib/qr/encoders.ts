import type {
  CryptoPayload,
  EpcPayload,
  EventPayload,
  PaymentPayload,
  PixPayload,
  QrPayloadMap,
  QrType,
  SocialPayload,
  UpiPayload,
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
  // Map share links: the short code after the share URL, or the whole link pasted (auto-detected).
  { id: "naver_map", label: "네이버 지도", template: "https://naver.me/{handle}", placeholder: "공유 링크 끝 코드 (예: 5abCdEfG) 또는 전체 링크", stripAt: false },
  { id: "kakao_map", label: "카카오맵", template: "https://kko.kakao.com/{handle}", placeholder: "공유 링크 끝 코드 또는 전체 링크", stripAt: false },
  { id: "google_maps", label: "Google 지도", template: "https://maps.app.goo.gl/{handle}", placeholder: "공유 링크 끝 코드 또는 전체 링크", stripAt: false },
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

/* ---------- Regional bank-transfer QR codes: Pix (Brazil), UPI (India), EPC / GiroCode (SEPA) ---------- */

/**
 * Money amount for the three bank-transfer formats: digits with an optional decimal part of one or
 * two places, written with "." or ",". Returns the canonical "12.50" form, or null when the text is
 * not an amount or is zero. Pix, UPI and EPC all read the dot form with two decimals.
 */
export function formatAmount(raw: string): string | null {
  const m = /^(\d{1,12})(?:[.,](\d{1,2}))?$/.exec(raw.trim());
  if (!m) return null;
  const value = `${m[1]}.${(m[2] ?? "").padEnd(2, "0")}`;
  return Number(value) > 0 ? value : null;
}

/** "São Paulo" → "Sao Paulo": decomposes accented letters and drops the combining marks. */
export function stripDiacritics(value: string): string {
  return value.normalize("NFD").replace(/[̀-ͯ]/g, "");
}

/**
 * CRC-16/CCITT-FALSE as four upper-case hex digits: polynomial 0x1021, initial value 0xFFFF, no
 * reflection, no final XOR, over the UTF-8 bytes of the input. This is the variant the BR Code
 * manual's example and public Pix libraries use (check value for "123456789" is 29B1).
 */
export function crc16ccitt(input: string): string {
  let crc = 0xffff;
  for (const byte of new TextEncoder().encode(input)) {
    crc ^= byte << 8;
    for (let i = 0; i < 8; i++) {
      crc = crc & 0x8000 ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

/* ----- Pix: Banco Central do Brasil "BR Code" (EMV QRCPS merchant-presented mode, TLV) ----- */

const PIX_GUI = "br.gov.bcb.pix";

/** EMV TLV: two-digit id, two-digit length, value. Callers keep every value under 100 characters. */
function tlv(id: string, value: string): string {
  return `${id}${String(value.length).padStart(2, "0")}${value}`;
}

const PIX_EVP = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const PIX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PIX_PHONE = /^\+55\d{10,11}$/;
const PIX_CPF_CNPJ = /^(\d{11}|\d{14})$/;

/**
 * Pix keys as people type them → the form the DICT expects: a formatted CPF "123.456.789-09" or
 * CNPJ "12.345.678/0001-95" becomes digits only, a phone keeps "+55" and its digits, e-mails and
 * random keys (EVP) are kept as typed. Eleven bare digits are a CPF, so a phone must start with "+".
 */
export function normalizePixKey(raw: string): string {
  const key = raw.trim();
  if (/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(key) || /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(key)) return key.replace(/\D/g, "");
  if (key.startsWith("+")) return `+${key.slice(1).replace(/\D/g, "")}`;
  return key;
}

export function isValidPixKey(key: string): boolean {
  return key.length <= 77 && (PIX_EVP.test(key) || PIX_EMAIL.test(key) || PIX_PHONE.test(key) || PIX_CPF_CNPJ.test(key));
}

/** Pix txid (EMV 62-05): letters and digits only, 1–25 characters. */
export const PIX_TXID = /^[A-Za-z0-9]{1,25}$/;

/** Name, city and description are plain ASCII in a BR Code: accents are stripped and whitespace collapsed. */
function pixText(value: string, max: number): string {
  return stripDiacritics(value)
    .replace(/[^\x20-\x7e]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max)
    .trim();
}

/**
 * Static Pix BR Code ("Pix copia e cola"). Field order follows the BCB manual's static example:
 * 00 format, 26 merchant account info (GUI + key + optional description), 52 MCC 0000, 53 currency
 * 986, 54 amount (optional), 58 BR, 59 name (≤25), 60 city (≤15), 62-05 txid ("***" when none),
 * 63 CRC over everything before it including the "6304" prefix.
 */
export function encodePix(p: PixPayload): string {
  const key = normalizePixKey(p.key);
  if (!key || !isValidPixKey(key)) return "";
  const name = pixText(p.name, 25);
  const city = pixText(p.city, 15);
  if (!name || !city) return "";
  const amount = p.amount.trim() ? formatAmount(p.amount) : null;
  if (p.amount.trim() && !amount) return "";
  const txid = p.txid.trim();
  if (txid && !PIX_TXID.test(txid)) return "";
  let account = tlv("00", PIX_GUI) + tlv("01", key);
  // Template 26 holds at most 99 characters; the description takes whatever the key leaves over.
  const description = pixText(p.description, 99 - account.length - 4);
  if (description) account += tlv("02", description);
  const body =
    tlv("00", "01") +
    tlv("26", account) +
    tlv("52", "0000") +
    tlv("53", "986") +
    (amount ? tlv("54", amount) : "") +
    tlv("58", "BR") +
    tlv("59", name) +
    tlv("60", city) +
    tlv("62", tlv("05", txid || "***")) +
    "6304";
  return body + crc16ccitt(body);
}

/* ----- UPI: NPCI "UPI Linking Specification" deep link ----- */

/** A UPI ID / VPA: "name@bank" — user part letters, digits, ".", "-", "_"; handle letters and digits. */
export const UPI_VPA = /^[A-Za-z0-9][A-Za-z0-9._-]+@[A-Za-z][A-Za-z0-9]+$/;

/**
 * upi://pay?pa=…&pn=…[&am=…]&cu=INR[&tn=…] — the static form from the NPCI spec: pa and pn are
 * mandatory, am is optional (the payer types it when absent), cu is always INR. Nothing else
 * (tr, tid, mc, url) is added; those belong to PSP-generated dynamic codes.
 */
export function encodeUpi(p: UpiPayload): string {
  const vpa = p.vpa.trim();
  if (!UPI_VPA.test(vpa)) return "";
  const name = p.name.replace(/\s+/g, " ").trim().slice(0, 99);
  if (!name) return "";
  const amount = p.amount.trim() ? formatAmount(p.amount) : null;
  if (p.amount.trim() && !amount) return "";
  const note = p.note.replace(/\s+/g, " ").trim().slice(0, 80);
  const params = [`pa=${vpa}`, `pn=${encodeURIComponent(name)}`];
  if (amount) params.push(`am=${amount}`);
  params.push("cu=INR");
  if (note) params.push(`tn=${encodeURIComponent(note)}`);
  return `upi://pay?${params.join("&")}`;
}

/* ----- EPC QR / GiroCode: EPC069-12 v2 (SEPA credit transfer) ----- */

/** Total payload cap from the guideline (QR version 13, error level M). */
export const EPC_MAX_BYTES = 331;
export const EPC_MAX_AMOUNT = 999999999.99;

/** IBAN lengths of the SEPA countries (ISO 13616 registry); other countries fall back to the generic shape. */
const IBAN_LENGTHS: Record<string, number> = {
  AD: 24, AT: 20, BE: 16, BG: 22, CH: 21, CY: 28, CZ: 24, DE: 22, DK: 18, EE: 20, ES: 24, FI: 18, FR: 27, GB: 22, GI: 23, GR: 27,
  HR: 21, HU: 28, IE: 22, IS: 26, IT: 27, LI: 21, LT: 20, LU: 20, LV: 21, MC: 27, MT: 31, NL: 18, NO: 15, PL: 28, PT: 25, RO: 24,
  SE: 24, SI: 19, SK: 24, SM: 27, VA: 22,
};

/** ISO 7064 mod 97-10 over digits and letters (A=10 … Z=35), streamed so no big integers are needed. */
function mod97(value: string): number {
  let rest = 0;
  for (const ch of value) {
    const n = Number.parseInt(ch, 36);
    rest = (rest * (n > 9 ? 100 : 10) + n) % 97;
  }
  return rest;
}

/** "de89 3704 0044 0532 0130 00" → "DE89370400440532013000". */
export function normalizeIban(raw: string): string {
  return raw.replace(/\s+/g, "").toUpperCase();
}

/** Country code, two check digits, BBAN; country-specific length when known; mod-97 remainder must be 1. */
export function isValidIban(raw: string): boolean {
  const iban = normalizeIban(raw);
  if (!/^[A-Z]{2}\d{2}[A-Z0-9]{11,30}$/.test(iban)) return false;
  const expected = IBAN_LENGTHS[iban.slice(0, 2)];
  if (expected ? iban.length !== expected : iban.length < 15) return false;
  return mod97(iban.slice(4) + iban.slice(0, 4)) === 1;
}

/** BIC / SWIFT code: 8 or 11 characters (bank, country, location, optional branch). */
export const BIC = /^[A-Z]{6}[A-Z0-9]{2}(?:[A-Z0-9]{3})?$/;

/** ISO 11649 structured creditor reference ("RF18 5390 0754 7034"); it goes in the structured remittance line. */
export function isCreditorReference(raw: string): boolean {
  const ref = raw.replace(/\s+/g, "").toUpperCase();
  return /^RF\d{2}[A-Z0-9]{1,21}$/.test(ref) && mod97(ref.slice(4) + ref.slice(0, 4)) === 1;
}

/** Line feeds separate EPC elements, so a value can never contain one. */
function oneLine(value: string, max: number): string {
  return value.replace(/\s+/g, " ").trim().slice(0, max).trim();
}

/**
 * EPC069-12 v2 payload: up to 12 elements separated by LF — "BCD", "002", "1" (UTF-8), "SCT", BIC
 * (optional since v2), name (≤70), IBAN, "EUR<amount>" (optional, 0.01–999999999.99), purpose
 * (left empty), structured reference OR unstructured text (≤140; only one of the two), then
 * payee-to-payer information (≤70). Trailing empty elements are dropped, and the whole thing
 * must fit in 331 bytes of UTF-8.
 */
export function encodeEpc(p: EpcPayload): string {
  const name = oneLine(p.name, 70);
  if (!name) return "";
  const iban = normalizeIban(p.iban);
  if (!isValidIban(iban)) return "";
  const bic = p.bic.replace(/\s+/g, "").toUpperCase();
  if (bic && !BIC.test(bic)) return "";
  const amount = p.amount.trim() ? formatAmount(p.amount) : null;
  if (p.amount.trim() && (!amount || Number(amount) > EPC_MAX_AMOUNT)) return "";
  const remittance = oneLine(p.remittance, 140);
  const structured = isCreditorReference(remittance);
  const lines = [
    "BCD",
    "002",
    "1",
    "SCT",
    bic,
    name,
    iban,
    amount ? `EUR${amount}` : "",
    "",
    structured ? remittance.replace(/\s+/g, "").toUpperCase() : "",
    structured ? "" : remittance,
    oneLine(p.info, 70),
  ];
  while (lines.length && lines[lines.length - 1] === "") lines.pop();
  const payload = lines.join("\n");
  return new TextEncoder().encode(payload).length <= EPC_MAX_BYTES ? payload : "";
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
    case "pix":
      return encodePix(payload as PixPayload);
    case "upi":
      return encodeUpi(payload as UpiPayload);
    case "epc":
      return encodeEpc(payload as EpcPayload);
    default:
      return "";
  }
}
