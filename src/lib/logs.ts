import { and, count, countDistinct, desc, eq, gte, ilike, inArray, lt, or, sql, type SQL } from "drizzle-orm";
import { db } from "./db";
import { adminAudit, qrLogs, type QrLog } from "./db/schema";
import type { LogEvent, QrType } from "./qr/types";
import { DISPLAY_TZ, isValidDay, kstDayEndExclusive, kstDayStart, kstToday } from "./time";

export type LogFilter = {
  type?: string;
  event?: string;
  q?: string;
  from?: string; // YYYY-MM-DD (KST calendar day)
  to?: string; // YYYY-MM-DD (KST calendar day, inclusive)
};

/**
 * A log row as the admin UI and CSV export see it: column names as in the table, jsonb columns
 * serialised back to JSON text (PayloadSummary, the detail view and CSV cells work on strings).
 */
export type QrLogRow = {
  id: number;
  created_at: Date;
  qr_type: string;
  event: string;
  payload_json: string;
  encoded_preview: string | null;
  options_json: string | null;
  ip: string | null;
  user_agent: string | null;
  referer: string | null;
  accept_language: string | null;
};

function toRow(r: QrLog): QrLogRow {
  return {
    id: r.id,
    created_at: r.createdAt,
    qr_type: r.qrType,
    event: r.event,
    payload_json: JSON.stringify(r.payloadJson),
    encoded_preview: r.encodedPreview,
    options_json: r.optionsJson == null ? null : JSON.stringify(r.optionsJson),
    ip: r.ip,
    user_agent: r.userAgent,
    referer: r.referer,
    accept_language: r.acceptLanguage,
  };
}

/** Escape LIKE wildcards so a search for "50%" matches literally. */
function likePattern(q: string): string {
  return `%${q.replace(/[\\%_]/g, (c) => `\\${c}`)}%`;
}

function buildWhere(filter: LogFilter): SQL | undefined {
  const clauses: SQL[] = [];
  if (filter.type) clauses.push(eq(qrLogs.qrType, filter.type));
  if (filter.event) clauses.push(eq(qrLogs.event, filter.event));
  if (filter.q) {
    const like = likePattern(filter.q);
    clauses.push(
      or(ilike(sql`${qrLogs.payloadJson}::text`, like), ilike(qrLogs.encodedPreview, like), ilike(qrLogs.ip, like))!,
    );
  }
  // Dates are entered as KST calendar days; compare against the matching instants.
  if (filter.from && isValidDay(filter.from)) clauses.push(gte(qrLogs.createdAt, kstDayStart(filter.from)));
  if (filter.to && isValidDay(filter.to)) clauses.push(lt(qrLogs.createdAt, kstDayEndExclusive(filter.to)));
  return clauses.length ? and(...clauses) : undefined;
}

export async function insertLog(entry: {
  qrType: QrType;
  event: LogEvent;
  payload: Record<string, unknown>;
  encodedPreview: string | null;
  options: Record<string, unknown>;
  ip: string | null;
  userAgent: string | null;
  referer: string | null;
  acceptLanguage: string | null;
}): Promise<void> {
  await db.insert(qrLogs).values({
    qrType: entry.qrType,
    event: entry.event,
    payloadJson: entry.payload,
    encodedPreview: entry.encodedPreview,
    optionsJson: entry.options,
    ip: entry.ip,
    userAgent: entry.userAgent,
    referer: entry.referer,
    acceptLanguage: entry.acceptLanguage,
  });
}

const olderThanDays = (column: typeof qrLogs.createdAt | typeof adminAudit.createdAt, days: number) =>
  lt(column, sql`now() - make_interval(days => ${Math.floor(days)})`);

export async function pruneOldLogs(retentionDays: number): Promise<void> {
  if (retentionDays <= 0) return;
  await db.delete(qrLogs).where(olderThanDays(qrLogs.createdAt, retentionDays));
}

export async function pruneOldAudit(retentionDays: number): Promise<void> {
  if (retentionDays <= 0) return;
  await db.delete(adminAudit).where(olderThanDays(adminAudit.createdAt, retentionDays));
}

export async function listLogs(filter: LogFilter, page: number, pageSize: number): Promise<{ rows: QrLogRow[]; total: number }> {
  const where = buildWhere(filter);
  const [[{ c: total }], rows] = await Promise.all([
    db.select({ c: count() }).from(qrLogs).where(where),
    db
      .select()
      .from(qrLogs)
      .where(where)
      .orderBy(desc(qrLogs.id))
      .limit(pageSize)
      .offset((page - 1) * pageSize),
  ]);
  return { rows: rows.map(toRow), total };
}

const EXPORT_BATCH = 1000;

/**
 * Yields every matching row, newest first, fetching 1000 at a time with keyset pagination
 * (id < last id) so memory stays bounded however large the export is.
 */
export async function* iterateLogsForExport(filter: LogFilter): AsyncGenerator<QrLogRow> {
  const where = buildWhere(filter);
  let beforeId: number | null = null;
  for (;;) {
    const batch: QrLog[] = await db
      .select()
      .from(qrLogs)
      .where(beforeId === null ? where : and(where, lt(qrLogs.id, beforeId)))
      .orderBy(desc(qrLogs.id))
      .limit(EXPORT_BATCH);
    for (const r of batch) yield toRow(r);
    if (batch.length < EXPORT_BATCH) return;
    beforeId = batch[batch.length - 1].id;
  }
}

export async function deleteLogs(ids: number[]): Promise<number> {
  if (ids.length === 0) return 0;
  const deleted = await db.delete(qrLogs).where(inArray(qrLogs.id, ids)).returning({ id: qrLogs.id });
  return deleted.length;
}

export const AUDIT_RETENTION_DAYS = 365;

export async function getDashboardStats(logRetentionDays = 0) {
  // Retention cleanup also runs here so it happens even when logging is off or traffic is idle.
  await Promise.all([pruneOldLogs(logRetentionDays), pruneOldAudit(AUDIT_RETENTION_DAYS)]);

  const since = (days: number) => gte(qrLogs.createdAt, sql`now() - make_interval(days => ${days})`);
  const countWhere = async (where?: SQL) => (await db.select({ c: count() }).from(qrLogs).where(where))[0].c;
  // Group by KST calendar day so the chart matches what the owner sees.
  const kstDay = sql<string>`to_char(date_trunc('day', ${qrLogs.createdAt} AT TIME ZONE ${DISPLAY_TZ}), 'YYYY-MM-DD')`;

  const [total, today, last7, last30, uniqueIps30, byType, byEvent, byDay, recent] = await Promise.all([
    countWhere(),
    countWhere(gte(qrLogs.createdAt, kstDayStart(kstToday()))),
    countWhere(since(7)),
    countWhere(since(30)),
    db
      .select({ c: countDistinct(qrLogs.ip) })
      .from(qrLogs)
      .where(since(30))
      .then((r) => r[0].c),
    db
      .select({ qr_type: qrLogs.qrType, c: count() })
      .from(qrLogs)
      .groupBy(qrLogs.qrType)
      .orderBy(desc(count())),
    db
      .select({ event: qrLogs.event, c: count() })
      .from(qrLogs)
      .groupBy(qrLogs.event)
      .orderBy(desc(count())),
    db
      .select({ day: kstDay, c: count() })
      .from(qrLogs)
      .where(since(14))
      .groupBy(sql`1`)
      .orderBy(sql`1`),
    db.select().from(qrLogs).orderBy(desc(qrLogs.id)).limit(20),
  ]);

  return { total, today, last7, last30, uniqueIps30, byType, byEvent, byDay, recent: recent.map(toRow) };
}
