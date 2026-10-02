import { getDb } from "./db";

export const SETTING_KEYS = [
  "site_name",
  "site_url",
  "site_description",
  "footer_notice",
  "adsense_client",
  "ads_enabled",
  "ad_placeholders",
  "ad_slot_top",
  "ad_slot_left",
  "ad_slot_right",
  "ad_slot_bottom",
  "ad_slot_incontent",
  "logging_enabled",
  "log_retention_days",
] as const;

export type SettingKey = (typeof SETTING_KEYS)[number];
export type Settings = Record<SettingKey, string>;

export const DEFAULT_SETTINGS: Settings = {
  site_name: "QR Maker",
  site_url: "http://localhost:3000",
  site_description: "Free QR code generator for links, Wi-Fi, vCards, WhatsApp, social profiles, crypto payments, files and more. No sign-up, codes never expire.",
  footer_notice: "What you enter may be stored on our server to improve the service.",
  adsense_client: "",
  ads_enabled: "0",
  ad_placeholders: "0",
  ad_slot_top: "",
  ad_slot_left: "",
  ad_slot_right: "",
  ad_slot_bottom: "",
  ad_slot_incontent: "",
  logging_enabled: "1",
  log_retention_days: "90",
};

export const SETTING_LABELS: Record<SettingKey, string> = {
  site_name: "사이트 이름",
  site_url: "사이트 URL (https://example.com)",
  site_description: "사이트 설명 (메타 태그)",
  footer_notice: "푸터 고지 문구",
  adsense_client: "AdSense 게시자 ID (ca-pub-xxxxxxxxxxxxxxxx)",
  ads_enabled: "광고 표시",
  ad_placeholders: "광고 자리 점선 표시 (레이아웃 확인용)",
  ad_slot_top: "광고 슬롯 ID — 상단 가로",
  ad_slot_left: "광고 슬롯 ID — 왼쪽 세로",
  ad_slot_right: "광고 슬롯 ID — 오른쪽 세로",
  ad_slot_bottom: "광고 슬롯 ID — 하단 가로",
  ad_slot_incontent: "광고 슬롯 ID — 본문 중간",
  logging_enabled: "방문자 입력 기록 저장",
  log_retention_days: "기록 보관 일수 (0 = 무제한)",
};

export const BOOLEAN_SETTINGS: SettingKey[] = ["ads_enabled", "ad_placeholders", "logging_enabled"];

const CACHE_TTL_MS = 30_000;
let cache: { value: Settings; at: number } | null = null;

export function getSettings(): Settings {
  if (cache && Date.now() - cache.at < CACHE_TTL_MS) return cache.value;
  const rows = getDb().prepare("SELECT key, value FROM settings").all() as { key: string; value: string }[];
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

/** Writes changed keys only; returns [key, old, new] tuples for auditing. */
export function updateSettings(patch: Partial<Settings>): Array<[SettingKey, string, string]> {
  const db = getDb();
  const current = getSettings();
  const changes: Array<[SettingKey, string, string]> = [];
  const upsert = db.prepare(
    "INSERT INTO settings (key, value, updated_at) VALUES (?, ?, datetime('now')) ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at",
  );
  const tx = db.transaction(() => {
    for (const key of SETTING_KEYS) {
      const next = patch[key];
      if (next === undefined) continue;
      const trimmed = next.trim();
      if (trimmed === current[key]) continue;
      upsert.run(key, trimmed);
      changes.push([key, current[key], trimmed]);
    }
  });
  tx();
  invalidateSettingsCache();
  return changes;
}
