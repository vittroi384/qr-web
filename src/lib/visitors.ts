import type { QrLogRow } from "./logs";

/**
 * Admin views count people, not saves: a visitor is one IP (a phone and a laptop count twice,
 * a shared office network once). Pure helpers so they can be unit-tested without a database.
 */

export type Visitor = {
  /** "" when the row had no IP. */
  ip: string;
  firstAt: Date;
  lastAt: Date;
  saves: number;
  /** QR types this visitor saved, most used first. */
  types: { type: string; c: number }[];
  /** Newest row: language, page, device and the summary line come from it. */
  latest: QrLogRow;
};

/** Groups rows by IP; visitors come back most recently active first. */
export function groupVisitors(rows: readonly QrLogRow[]): Visitor[] {
  const byIp = new Map<string, { v: Visitor; types: Map<string, number> }>();
  for (const r of rows) {
    const ip = r.ip ?? "";
    const at = new Date(r.created_at);
    let g = byIp.get(ip);
    if (!g) {
      g = { v: { ip, firstAt: at, lastAt: at, saves: 0, types: [], latest: r }, types: new Map() };
      byIp.set(ip, g);
    }
    g.v.saves += 1;
    if (at < g.v.firstAt) g.v.firstAt = at;
    if (at > g.v.lastAt || (at.getTime() === g.v.lastAt.getTime() && r.id > g.v.latest.id)) {
      g.v.lastAt = at;
      g.v.latest = r;
    }
    g.types.set(r.qr_type, (g.types.get(r.qr_type) ?? 0) + 1);
  }
  return [...byIp.values()]
    .map(({ v, types }) => ({ ...v, types: [...types.entries()].map(([type, c]) => ({ type, c })).sort((a, b) => b.c - a.c) }))
    .sort((a, b) => b.lastAt.getTime() - a.lastAt.getTime());
}

/** Consecutive saves of the same QR by the same visitor, shown as one log line. */
export type LogRun = {
  /** Newest first, as listed. */
  rows: QrLogRow[];
  /** Save methods in this run, most used first. */
  events: { event: string; c: number }[];
};

/** Merges neighbouring rows (newest-first list) that share IP, type and payload. */
export function collapseRuns(rows: readonly QrLogRow[]): LogRun[] {
  const runs: QrLogRow[][] = [];
  for (const r of rows) {
    const prev = runs[runs.length - 1]?.[0];
    if (prev && prev.ip === r.ip && prev.qr_type === r.qr_type && prev.payload_json === r.payload_json) {
      runs[runs.length - 1].push(r);
    } else {
      runs.push([r]);
    }
  }
  return runs.map((rs) => {
    const counts = new Map<string, number>();
    for (const r of rs) counts.set(r.event, (counts.get(r.event) ?? 0) + 1);
    return { rows: rs, events: [...counts.entries()].map(([event, c]) => ({ event, c })).sort((a, b) => b.c - a.c) };
  });
}

/** Short browser name from the User-Agent, enough to tell phones from desktops at a glance. */
export function browserOf(ua: string | null): string {
  if (!ua) return "";
  const mobile = /Mobile|Android|iPhone|iPad/i.test(ua);
  const name = /Edg\//.test(ua)
    ? "Edge"
    : /SamsungBrowser/.test(ua)
      ? "Samsung"
      : /Chrome\//.test(ua)
        ? "Chrome"
        : /Safari\//.test(ua)
          ? "Safari"
          : /Firefox\//.test(ua)
            ? "Firefox"
            : ua.split(/[\s/]/)[0] ?? "";
  return `${name}${mobile ? " · 모바일" : ""}`;
}

/* ---------- IPs left out of the admin numbers (the owner's own tests) ---------- */

export type IpList = { exact: string[]; prefixes: string[] };

export const IP_LIST_MAX = 100;

/**
 * Parses the "통계에서 뺄 IP" setting: one entry per line (commas and spaces also split). A trailing
 * "*" matches by prefix, for IPv6 addresses whose last part changes ("2001:db8:1:2:*").
 * Returns null when an entry is not IP-shaped or there are too many.
 */
export function parseIpList(text: string): IpList | null {
  const list: IpList = { exact: [], prefixes: [] };
  const tokens = text.split(/[\s,]+/).filter(Boolean);
  if (tokens.length > IP_LIST_MAX) return null;
  for (const t of tokens) {
    if (t.length > 46 || !/^[0-9a-f:.]+\*?$/i.test(t) || t === "*") return null;
    const v = t.toLowerCase();
    if (v.endsWith("*")) list.prefixes.push(v.slice(0, -1));
    else list.exact.push(v);
  }
  return list;
}

/** The stored form: one entry per line. */
export function formatIpList(list: IpList): string {
  return [...list.exact, ...list.prefixes.map((p) => `${p}*`)].join("\n");
}
