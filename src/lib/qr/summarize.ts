import { CRYPTO_COINS, PAYMENT_PROVIDERS, SOCIAL_PLATFORMS } from "./encoders";
import type { QrType } from "./types";

/**
 * A one-line, human-readable description of a saved payload for the admin log list, plus the
 * facet keys the auto-classification panel groups by. Works on the stored (already masked)
 * payload, so it never sees Wi-Fi passwords.
 */
export type LogSummary = {
  /** Main line, e.g. "example.com", "@brand on Instagram", "Cafe-Guest (WPA)". */
  primary: string;
  /** Muted detail, e.g. "/menu/summer", "Hello…", "Hong Gildong · ACME". */
  secondary: string;
  /** Hostname for link-like types (url, file, social via template) — used by the "도메인" facet. */
  domain?: string;
  /** Platform / provider / coin label — used by the "플랫폼" facet. */
  platform?: string;
};

type Obj = Record<string, unknown>;

const str = (v: unknown): string => (typeof v === "string" ? v.trim() : "");

/** "example.com/path?x" → { host: "example.com", path: "/path?x" }; tolerant of missing scheme. */
export function splitUrl(raw: string): { host: string; path: string } | null {
  const s = raw.trim();
  if (!s) return null;
  try {
    const u = new URL(/^[a-z][a-z0-9+.-]*:/i.test(s) ? s : `https://${s}`);
    const host = u.hostname.replace(/^www\./, "").toLowerCase();
    if (!host) return null;
    const path = `${u.pathname}${u.search}`.replace(/\/$/, "");
    return { host, path: path === "" || path === "/" ? "" : path };
  } catch {
    return null;
  }
}

function clip(s: string, n: number): string {
  return s.length > n ? `${s.slice(0, n - 1)}…` : s;
}

/** Keeps "+" plus at most two leading digits and the last four: "+82 10-1234-5678" → "+82 ···5678". */
function maskPhone(raw: string): string {
  const plus = raw.trim().startsWith("+");
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";
  if (digits.length < 6) return "···";
  const head = plus ? `+${digits.slice(0, 2)} ` : "";
  return `${head}···${digits.slice(-4)}`;
}

function labelOf(list: readonly { id: string; label: string }[], id: string): string {
  return list.find((p) => p.id === id)?.label ?? id;
}

export function summarizeLog(type: QrType | string, payloadJson: string | null): LogSummary {
  let p: Obj = {};
  try {
    const parsed = payloadJson ? JSON.parse(payloadJson) : {};
    if (parsed && typeof parsed === "object") p = parsed as Obj;
  } catch {
    // Unreadable payload: fall through to the raw preview.
  }

  // Batch exports log { count, mode, sample } under the dominant type.
  if (typeof p.count === "number" && typeof p.sample === "string") {
    const firstItem = p.sample.split(" | ")[0] ?? "";
    const u = splitUrl(firstItem);
    return {
      primary: `일괄 ${p.count.toLocaleString()}개`,
      secondary: clip(p.sample, 70),
      domain: u && u.host.includes(".") ? u.host : undefined,
    };
  }

  switch (type) {
    case "url":
    case "file": {
      const u = splitUrl(str(p.url));
      if (!u) return { primary: str(p.url) || "(빈 값)", secondary: "" };
      return { primary: u.host, secondary: clip(u.path, 60), domain: u.host.includes(".") ? u.host : undefined };
    }
    case "social": {
      const platform = labelOf(SOCIAL_PLATFORMS, str(p.platform));
      const handle = str(p.handle);
      // A pasted profile link is summarised by its host; a bare handle gets an "@".
      const u = /^https?:\/\//i.test(handle) || /\.[a-z]{2,}\//i.test(handle) ? splitUrl(handle) : null;
      return {
        primary: handle ? (u ? u.host : handle.startsWith("@") ? handle : `@${handle}`) : platform,
        secondary: platform,
        platform,
        domain: u?.host,
      };
    }
    case "whatsapp":
      return { primary: maskPhone(str(p.phone)) || "(번호 없음)", secondary: clip(str(p.message), 60), platform: "WhatsApp" };
    case "text":
      return { primary: clip(str(p.text).replace(/\s+/g, " "), 80) || "(빈 값)", secondary: "" };
    case "wifi": {
      const enc = str(p.encryption) || "WPA";
      return { primary: str(p.ssid) || "(SSID 없음)", secondary: enc === "nopass" ? "비밀번호 없음" : enc, platform: enc };
    }
    case "vcard": {
      const name = [str(p.firstName), str(p.lastName)].filter(Boolean).join(" ");
      const org = [str(p.org), str(p.title)].filter(Boolean).join(" · ");
      return { primary: name || org || "(이름 없음)", secondary: name ? org : "" };
    }
    case "email": {
      const to = str(p.to);
      const dom = to.includes("@") ? to.split("@")[1].toLowerCase() : undefined;
      return { primary: to || "(받는 사람 없음)", secondary: clip(str(p.subject), 60), domain: dom };
    }
    case "sms":
      return { primary: maskPhone(str(p.phone)) || "(번호 없음)", secondary: clip(str(p.message), 60) };
    case "phone":
      return { primary: maskPhone(str(p.phone)) || "(번호 없음)", secondary: "" };
    case "geo": {
      const lat = str(p.lat);
      const lng = str(p.lng);
      return { primary: lat && lng ? `${lat}, ${lng}` : "(좌표 없음)", secondary: "" };
    }
    case "event": {
      const start = str(p.start);
      const when = start ? start.replace("T", " ") : "";
      return { primary: str(p.title) || "(제목 없음)", secondary: [when, str(p.location)].filter(Boolean).join(" · ") };
    }
    case "payment": {
      const provider = labelOf(PAYMENT_PROVIDERS, str(p.provider));
      const amount = str(p.amount);
      return { primary: str(p.handle) || provider, secondary: [provider, amount ? `금액 ${amount}` : ""].filter(Boolean).join(" · "), platform: provider };
    }
    case "crypto": {
      const coin = labelOf(CRYPTO_COINS, str(p.coin));
      const addr = str(p.address);
      const short = addr.length > 14 ? `${addr.slice(0, 8)}…${addr.slice(-4)}` : addr;
      const amount = str(p.amount);
      return { primary: short || coin, secondary: [coin, amount ? `금액 ${amount}` : ""].filter(Boolean).join(" · "), platform: coin };
    }
    default:
      return { primary: clip(payloadJson ?? "", 80), secondary: "" };
  }
}

/* ---------- Visitor language (Accept-Language → Korean display name) ---------- */

const languageNames = new Intl.DisplayNames(["ko"], { type: "language" });
const regionNames = new Intl.DisplayNames(["ko"], { type: "region" });

/** "pt-BR,pt;q=0.9,en;q=0.8" → "포르투갈어 (브라질)". Unknown/empty → "(알 수 없음)". */
export function visitorLanguage(acceptLanguage: string | null | undefined): string {
  const first = (acceptLanguage ?? "").split(",")[0]?.trim().split(";")[0]?.trim();
  if (!first || first === "*") return "(알 수 없음)";
  const [lang, region] = first.split(/[-_]/);
  try {
    const l = languageNames.of(lang.toLowerCase()) ?? lang;
    const r = region && region.length === 2 ? regionNames.of(region.toUpperCase()) : undefined;
    return r ? `${l} (${r})` : l;
  } catch {
    return first;
  }
}

/* ---------- Facets for the classification panel ---------- */

export type Facet = { key: string; count: number };

/** Top N values of a derived key over the rows (ties keep insertion order). */
export function topFacets<T>(rows: readonly T[], key: (row: T) => string | undefined, n = 6): Facet[] {
  const counts = new Map<string, number>();
  for (const r of rows) {
    const k = key(r);
    if (!k) continue;
    counts.set(k, (counts.get(k) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([key, count]) => ({ key, count }));
}
