import { and, count, countDistinct, desc, gte, isNotNull, isNull, sql, type SQL } from "drizzle-orm";
import type { FunnelStep } from "./analytics";
import { db } from "./db";
import { crawlerDaily, funnelDaily, qrLogs, sourceDaily } from "./db/schema";
import { DISPLAY_TZ, kstDayStart, kstToday } from "./time";
import { classifySource } from "./traffic";

/** Funnel row key used when the locale is unknown (no same-origin Referer on a save). */
export const UNKNOWN_LOCALE = "unknown";

/** Adds 1 to today's (KST) counter for this locale × type × step. */
export async function incrementFunnel(step: FunnelStep, qrType: string, locale: string | null): Promise<void> {
  await db
    .insert(funnelDaily)
    .values({ day: kstToday(), locale: locale ?? UNKNOWN_LOCALE, qrType, step, count: 1 })
    .onConflictDoUpdate({
      target: [funnelDaily.day, funnelDaily.locale, funnelDaily.qrType, funnelDaily.step],
      set: { count: sql`${funnelDaily.count} + 1` },
    });
}

/** Adds 1 to today's (KST) visit counter for this locale × source (first page of a session). */
export async function incrementSource(source: string, locale: string | null): Promise<void> {
  await db
    .insert(sourceDaily)
    .values({ day: kstToday(), locale: locale ?? UNKNOWN_LOCALE, source, count: 1 })
    .onConflictDoUpdate({
      target: [sourceDaily.day, sourceDaily.locale, sourceDaily.source],
      set: { count: sql`${sourceDaily.count} + 1` },
    });
}

/** Adds 1 to today's (KST) page-fetch counter for this crawler. */
export async function incrementCrawler(crawler: string): Promise<void> {
  await db
    .insert(crawlerDaily)
    .values({ day: kstToday(), crawler, count: 1 })
    .onConflictDoUpdate({
      target: [crawlerDaily.day, crawlerDaily.crawler],
      set: { count: sql`${crawlerDaily.count} + 1` },
    });
}

export const STATS_DAYS = 30;

/** The last `days` KST calendar days ending today, oldest first ("YYYY-MM-DD"). */
export function lastKstDays(days: number, today = kstToday()): string[] {
  const end = new Date(`${today}T00:00:00Z`);
  return Array.from({ length: days }, (_, i) => {
    const d = new Date(end);
    d.setUTCDate(d.getUTCDate() - (days - 1 - i));
    return d.toISOString().slice(0, 10);
  });
}

export type FunnelRow = { qrType: string; select: number; preview: number; save: number };
export type SourceRow = { source: string; visits: number; users: number; saves: number };

/**
 * Everything the /admin/stats page shows, over the last 30 KST days (today included).
 * `exclude` (from ipNotExcluded) leaves the owner's test IPs out; the funnel has no IPs, so it can't.
 */
export async function getStats(exclude?: SQL) {
  const days = lastKstDays(STATS_DAYS);
  const since = and(gte(qrLogs.createdAt, kstDayStart(days[0])), exclude);
  const kstDay = sql<string>`to_char(${qrLogs.createdAt} AT TIME ZONE ${DISPLAY_TZ}, 'YYYY-MM-DD')`;
  const kstHour = sql<number>`extract(hour from ${qrLogs.createdAt} AT TIME ZONE ${DISPLAY_TZ})::int`;
  // "Users" = distinct IPs: one person on two networks counts twice, a shared network once.
  const users = countDistinct(qrLogs.ip);

  // Saves made before the source column existed: the page URL may still carry ?utm_source=… (ChatGPT adds one).
  const legacyUtm = sql<string>`lower(substring(${qrLogs.referer} from 'utm_source=([^&#]+)'))`;

  const [byDayRows, byLocale, byPage, byTypeEvent, byHourRows, funnelRows, usersRows, usersByType, visitRows, savesBySource, legacyRows, crawlerRows] = await Promise.all([
    db.select({ day: kstDay, c: count(), users }).from(qrLogs).where(since).groupBy(sql`1`),
    db
      .select({ locale: qrLogs.locale, users, c: count() })
      .from(qrLogs)
      .where(since)
      .groupBy(qrLogs.locale)
      .orderBy(desc(users), desc(count())),
    db
      .select({ page: qrLogs.page, users, c: count() })
      .from(qrLogs)
      .where(since)
      .groupBy(qrLogs.page)
      .orderBy(desc(users), desc(count()))
      .limit(15),
    db
      .select({ qrType: qrLogs.qrType, event: qrLogs.event, c: count() })
      .from(qrLogs)
      .where(since)
      .groupBy(qrLogs.qrType, qrLogs.event),
    db.select({ hour: kstHour, c: count() }).from(qrLogs).where(since).groupBy(sql`1`),
    db
      .select({ qrType: funnelDaily.qrType, step: funnelDaily.step, c: sql<number>`sum(${funnelDaily.count})::int` })
      .from(funnelDaily)
      .where(gte(funnelDaily.day, days[0]))
      .groupBy(funnelDaily.qrType, funnelDaily.step),
    db.select({ c: users }).from(qrLogs).where(since),
    db
      .select({ qrType: qrLogs.qrType, users, saves: count() })
      .from(qrLogs)
      .where(since)
      .groupBy(qrLogs.qrType)
      .orderBy(desc(users), desc(count())),
    db
      .select({ source: sourceDaily.source, c: sql<number>`sum(${sourceDaily.count})::int` })
      .from(sourceDaily)
      .where(gte(sourceDaily.day, days[0]))
      .groupBy(sourceDaily.source),
    db
      .select({ source: qrLogs.source, users, saves: count() })
      .from(qrLogs)
      .where(and(since, isNotNull(qrLogs.source)))
      .groupBy(qrLogs.source),
    db
      .select({ utm: legacyUtm, users, saves: count() })
      .from(qrLogs)
      .where(and(since, isNull(qrLogs.source), sql`${qrLogs.referer} like '%utm_source=%'`))
      .groupBy(sql`1`),
    db
      .select({ crawler: crawlerDaily.crawler, c: sql<number>`sum(${crawlerDaily.count})::int` })
      .from(crawlerDaily)
      .where(gte(crawlerDaily.day, days[0]))
      .groupBy(crawlerDaily.crawler)
      .orderBy(desc(sql`2`)),
  ]);

  // Fill empty days/hours with zero so the charts keep a fixed axis.
  const dayCounts = new Map(byDayRows.map((r) => [r.day, r]));
  const byDay = days.map((day) => ({ day, c: dayCounts.get(day)?.c ?? 0, users: dayCounts.get(day)?.users ?? 0 }));
  const hourCounts = new Map(byHourRows.map((r) => [Number(r.hour), r.c]));
  const byHour = Array.from({ length: 24 }, (_, hour) => ({ hour, c: hourCounts.get(hour) ?? 0 }));

  const total = byDay.reduce((sum, d) => sum + d.c, 0);

  const funnelMap = new Map<string, FunnelRow>();
  for (const r of funnelRows) {
    const row = funnelMap.get(r.qrType) ?? { qrType: r.qrType, select: 0, preview: 0, save: 0 };
    if (r.step === "select" || r.step === "preview" || r.step === "save") row[r.step] += Number(r.c);
    funnelMap.set(r.qrType, row);
  }
  const funnel = [...funnelMap.values()].sort((a, b) => b.select - a.select || b.save - a.save);

  // One row per source: visits (anonymous counter) next to saves and saving users (qr_logs).
  const sourceMap = new Map<string, SourceRow>();
  const sourceRow = (key: string) => sourceMap.get(key) ?? { source: key, visits: 0, users: 0, saves: 0 };
  for (const r of visitRows) sourceMap.set(r.source, { ...sourceRow(r.source), visits: Number(r.c) });
  for (const r of savesBySource) {
    if (r.source) sourceMap.set(r.source, { ...sourceRow(r.source), users: r.users, saves: r.saves });
  }
  const sources = [...sourceMap.values()].sort((a, b) => b.visits - a.visits || b.users - a.users);

  // Older saves, attributed by their utm_source only (one person counted per utm value).
  const legacyMap = new Map<string, { source: string; users: number; saves: number }>();
  for (const r of legacyRows) {
    let utm = r.utm ?? "";
    try {
      utm = decodeURIComponent(utm);
    } catch {
      // keep the raw value
    }
    const key = classifySource(null, utm, "") ?? "direct";
    const row = legacyMap.get(key) ?? { source: key, users: 0, saves: 0 };
    legacyMap.set(key, { source: key, users: row.users + r.users, saves: row.saves + r.saves });
  }
  const legacySources = [...legacyMap.values()].sort((a, b) => b.users - a.users || b.saves - a.saves);

  const crawlers = crawlerRows.map((r) => ({ crawler: r.crawler, c: Number(r.c) }));

  return {
    days: STATS_DAYS,
    total,
    users: usersRows[0]?.c ?? 0,
    usersByType,
    byDay,
    byLocale,
    byPage,
    byTypeEvent,
    byHour,
    funnel,
    sources,
    legacySources,
    crawlers,
  };
}

export type Stats = Awaited<ReturnType<typeof getStats>>;
