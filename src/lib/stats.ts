import { and, count, countDistinct, desc, gte, sql, type SQL } from "drizzle-orm";
import type { FunnelStep } from "./analytics";
import { db } from "./db";
import { funnelDaily, qrLogs } from "./db/schema";
import { DISPLAY_TZ, kstDayStart, kstToday } from "./time";

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

  const [byDayRows, byLocale, byPage, byTypeEvent, byHourRows, funnelRows, usersRows, usersByType] = await Promise.all([
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

  return { days: STATS_DAYS, total, users: usersRows[0]?.c ?? 0, usersByType, byDay, byLocale, byPage, byTypeEvent, byHour, funnel };
}

export type Stats = Awaited<ReturnType<typeof getStats>>;
