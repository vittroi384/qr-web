import { sql } from "drizzle-orm";
import { db } from "./db";
import { settings } from "./db/schema";

export const SETTING_KEYS = [
  "site_name",
  "site_url",
  "site_description",
  "footer_notice",
  "privacy_contact",
  "adsense_client",
  "ads_enabled",
  "ad_placeholders",
  "ad_slot_top",
  "ad_slot_left",
  "ad_slot_right",
  "ad_slot_bottom",
  "ad_slot_incontent",
  "ad_slot_inarticle",
  "logging_enabled",
  "log_retention_days",
  "affiliate_print_url",
  "affiliate_print_label",
  "affiliate_print_note",
  "donate_url",
  "analytics_script_url",
  "analytics_website_id",
] as const;

export type SettingKey = (typeof SETTING_KEYS)[number];
export type Settings = Record<SettingKey, string>;

/**
 * Public URL before the owner saves one in the admin settings (a stored value always wins):
 * https://DOMAIN when Caddy serves a domain, else SITE_URL, else the local dev address.
 */
function defaultSiteUrl(): string {
  const domain = process.env.DOMAIN?.trim().replace(/^https?:\/\//i, "").replace(/\/+$/, "");
  if (domain && !domain.startsWith(":")) return `https://${domain}`;
  const siteUrl = process.env.SITE_URL?.trim().replace(/\/+$/, "");
  return siteUrl || "http://localhost:3000";
}

export const DEFAULT_SETTINGS: Settings = {
  site_name: "QR Maker",
  site_url: defaultSiteUrl(),
  site_description: "Free QR code generator for links, Wi-Fi, vCards, WhatsApp, social profiles, crypto payments, files and more. No sign-up, codes never expire.",
  footer_notice: "What you enter may be stored on our server to improve the service.",
  // Shown in the privacy policy's contact section; empty = the contact sentence is omitted.
  privacy_contact: "",
  adsense_client: "",
  ads_enabled: "0",
  ad_placeholders: "0",
  ad_slot_top: "",
  ad_slot_left: "",
  ad_slot_right: "",
  ad_slot_bottom: "",
  ad_slot_incontent: "",
  ad_slot_inarticle: "",
  logging_enabled: "1",
  log_retention_days: "90",
  // Monetisation slots: an empty URL hides the slot entirely.
  affiliate_print_url: "",
  affiliate_print_label: "Print stickers & table tents",
  affiliate_print_note: "Affiliate link — we may earn a commission at no extra cost to you.",
  donate_url: "",
  // Umami visitor analytics: both empty = no script injected.
  analytics_script_url: "",
  analytics_website_id: "",
};

export const SETTING_LABELS: Record<SettingKey, string> = {
  site_name: "사이트 이름",
  site_url: "사이트 URL (https://example.com)",
  site_description: "사이트 설명 (메타 태그)",
  footer_notice: "푸터 고지 문구",
  privacy_contact: "개인정보 문의 연락처 (이메일)",
  adsense_client: "AdSense 게시자 ID (ca-pub-xxxxxxxxxxxxxxxx)",
  ads_enabled: "광고 표시",
  ad_placeholders: "광고 자리 점선 표시 (레이아웃 확인용)",
  ad_slot_top: "광고 슬롯 ID — 상단 가로",
  ad_slot_left: "광고 슬롯 ID — 왼쪽 세로",
  ad_slot_right: "광고 슬롯 ID — 오른쪽 세로",
  ad_slot_bottom: "광고 슬롯 ID — 하단 가로",
  ad_slot_incontent: "광고 슬롯 ID — 본문 중간",
  ad_slot_inarticle: "광고 슬롯 ID — 글 사이 (인아티클)",
  logging_enabled: "방문자 입력 기록 저장",
  log_retention_days: "기록 보관 일수 (0 = 무제한)",
  affiliate_print_url: "인쇄 제휴 링크 URL (비우면 숨김)",
  affiliate_print_label: "인쇄 제휴 링크 문구",
  affiliate_print_note: "인쇄 제휴 고지 문구",
  donate_url: "후원 링크 URL (Buy Me a Coffee 등, 비우면 숨김)",
  analytics_script_url: "Umami 스크립트 URL (https://example.com/umami/script.js)",
  analytics_website_id: "Umami 웹사이트 ID (UUID)",
};

export const BOOLEAN_SETTINGS: SettingKey[] = ["ads_enabled", "ad_placeholders", "logging_enabled"];

export const PRIVACY_CONTACT_MAX = 200;

/** Empty, or a single line of at most 200 characters (an e-mail address or free text). */
export function isValidPrivacyContact(value: string): boolean {
  return value.length <= PRIVACY_CONTACT_MAX && !/[\r\n]/.test(value);
}

/** True when the contact can be rendered as a mailto: link (one token containing "@"). */
export function isEmailLike(value: string): boolean {
  return /^[^\s@]+@[^\s@]+$/.test(value);
}

const CACHE_TTL_MS = 30_000;
let cache: { value: Settings; at: number } | null = null;

/** Settings merged over the defaults, cached in memory for 30s (every page render reads them). */
export async function getSettings(): Promise<Settings> {
  if (cache && Date.now() - cache.at < CACHE_TTL_MS) return cache.value;
  const rows = await db.select({ key: settings.key, value: settings.value }).from(settings);
  const merged: Settings = { ...DEFAULT_SETTINGS };
  for (const row of rows) {
    if ((SETTING_KEYS as readonly string[]).includes(row.key)) {
      merged[row.key as SettingKey] = row.value;
    }
  }
  cache = { value: merged, at: Date.now() };
  return merged;
}

export function invalidateSettingsCache() {
  cache = null;
}

export function isOn(value: string): boolean {
  return value === "1" || value === "true";
}

/** Writes changed keys only (in one transaction); returns [key, old, new] tuples for auditing. */
export async function updateSettings(patch: Partial<Settings>): Promise<Array<[SettingKey, string, string]>> {
  invalidateSettingsCache(); // compare against the stored values, not a stale cache
  const current = await getSettings();
  const changes: Array<[SettingKey, string, string]> = [];
  for (const key of SETTING_KEYS) {
    const next = patch[key];
    if (next === undefined) continue;
    const trimmed = next.trim();
    if (trimmed === current[key]) continue;
    changes.push([key, current[key], trimmed]);
  }
  if (changes.length > 0) {
    await db
      .insert(settings)
      .values(changes.map(([key, , value]) => ({ key, value, updatedAt: sql`now()` })))
      .onConflictDoUpdate({
        target: settings.key,
        set: { value: sql`excluded.value`, updatedAt: sql`excluded.updated_at` },
      });
  }
  invalidateSettingsCache();
  return changes;
}
