import { count, desc, gte, sql } from "drizzle-orm";
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

/** Everything the /admin/stats page shows, over the last 30 KST days (today included). */
export async function getStats() {
  const days = lastKstDays(STATS_DAYS);
  const since = gte(qrLogs.createdAt, kstDayStart(days[0]));
  const kstDay = sql<string>`to_char(${qrLogs.createdAt} AT TIME ZONE ${DISPLAY_TZ}, 'YYYY-MM-DD')`;
  const kstHour = sql<number>`extract(hour from ${qrLogs.createdAt} AT TIME ZONE ${DISPLAY_TZ})::int`;

  const [byDayRows, byLocale, byPage, byTypeEvent, byHourRows, funnelRows] = await Promise.all([
    db.select({ day: kstDay, c: count() }).from(qrLogs).where(since).groupBy(sql`1`),
    db
      .select({ locale: qrLogs.locale, c: count() })
      .from(qrLogs)
      .where(since)
      .groupBy(qrLogs.locale)
      .orderBy(desc(count())),
    db
      .select({ page: qrLogs.page, c: count() })
      .from(qrLogs)
      .where(since)
      .groupBy(qrLogs.page)
      .orderBy(desc(count()))
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
  ]);

  // Fill empty days/hours with zero so the charts keep a fixed axis.
  const dayCounts = new Map(byDayRows.map((r) => [r.day, r.c]));
  const byDay = days.map((day) => ({ day, c: dayCounts.get(day) ?? 0 }));
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

  return { days: STATS_DAYS, total, byDay, byLocale, byPage, byTypeEvent, byHour, funnel };
}

export type Stats = Awaited<ReturnType<typeof getStats>>;
