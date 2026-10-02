import { getDb, type QrLogRow } from "./db";
import type { LogEvent, QrType } from "./qr/types";

export type LogFilter = {
  type?: string;
  event?: string;
  q?: string;
  from?: string; // YYYY-MM-DD
  to?: string; // YYYY-MM-DD (inclusive)
};

function buildWhere(filter: LogFilter): { where: string; params: unknown[] } {
  const clauses: string[] = [];
  const params: unknown[] = [];
  if (filter.type) {
    clauses.push("qr_type = ?");
    params.push(filter.type);
  }
  if (filter.event) {
    clauses.push("event = ?");
    params.push(filter.event);
  }
  if (filter.q) {
    clauses.push("(payload_json LIKE ? OR encoded_preview LIKE ? OR ip LIKE ?)");
    const like = `%${filter.q}%`;
    params.push(like, like, like);
  }
  if (filter.from && /^\d{4}-\d{2}-\d{2}$/.test(filter.from)) {
    clauses.push("created_at >= ?");
    params.push(`${filter.from} 00:00:00`);
  }
  if (filter.to && /^\d{4}-\d{2}-\d{2}$/.test(filter.to)) {
    clauses.push("created_at <= ?");
    params.push(`${filter.to} 23:59:59`);
  }
  return { where: clauses.length ? `WHERE ${clauses.join(" AND ")}` : "", params };
}

export function insertLog(entry: {
  qrType: QrType;
  event: LogEvent;
  payload: Record<string, unknown>;
  encodedPreview: string | null;
  options: Record<string, unknown>;
  ip: string | null;
  userAgent: string | null;
  referer: string | null;
  acceptLanguage: string | null;
}) {
  getDb()
    .prepare(
      `INSERT INTO qr_logs (qr_type, event, payload_json, encoded_preview, options_json, ip, user_agent, referer, accept_language)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .run(
      entry.qrType,
      entry.event,
      JSON.stringify(entry.payload),
      entry.encodedPreview,
      JSON.stringify(entry.options),
      entry.ip,
      entry.userAgent,
      entry.referer,
      entry.acceptLanguage,
    );
}

export function pruneOldLogs(retentionDays: number) {
  if (retentionDays <= 0) return;
  getDb()
    .prepare("DELETE FROM qr_logs WHERE created_at < datetime('now', ?)")
    .run(`-${Math.floor(retentionDays)} days`);
}

export function listLogs(filter: LogFilter, page: number, pageSize: number): { rows: QrLogRow[]; total: number } {
  const db = getDb();
  const { where, params } = buildWhere(filter);
  const total = (db.prepare(`SELECT COUNT(*) AS c FROM qr_logs ${where}`).get(...params) as { c: number }).c;
  const rows = db
    .prepare(`SELECT * FROM qr_logs ${where} ORDER BY id DESC LIMIT ? OFFSET ?`)
    .all(...params, pageSize, (page - 1) * pageSize) as QrLogRow[];
  return { rows, total };
}

export function iterateLogsForExport(filter: LogFilter): IterableIterator<QrLogRow> {
  const { where, params } = buildWhere(filter);
  return getDb().prepare(`SELECT * FROM qr_logs ${where} ORDER BY id DESC`).iterate(...params) as IterableIterator<QrLogRow>;
}

export function deleteLogs(ids: number[]): number {
  if (ids.length === 0) return 0;
  const placeholders = ids.map(() => "?").join(",");
  const result = getDb().prepare(`DELETE FROM qr_logs WHERE id IN (${placeholders})`).run(...ids);
  return result.changes;
}

export function getDashboardStats() {
  const db = getDb();
  const count = (sql: string) => (db.prepare(sql).get() as { c: number }).c;
  return {
    total: count("SELECT COUNT(*) AS c FROM qr_logs"),
    today: count("SELECT COUNT(*) AS c FROM qr_logs WHERE created_at >= date('now')"),
    last7: count("SELECT COUNT(*) AS c FROM qr_logs WHERE created_at >= datetime('now', '-7 days')"),
    last30: count("SELECT COUNT(*) AS c FROM qr_logs WHERE created_at >= datetime('now', '-30 days')"),
    uniqueIps30: count(
      "SELECT COUNT(DISTINCT ip) AS c FROM qr_logs WHERE created_at >= datetime('now', '-30 days')",
    ),
    byType: db
      .prepare("SELECT qr_type, COUNT(*) AS c FROM qr_logs GROUP BY qr_type ORDER BY c DESC")
      .all() as { qr_type: string; c: number }[],
    byEvent: db
      .prepare("SELECT event, COUNT(*) AS c FROM qr_logs GROUP BY event ORDER BY c DESC")
      .all() as { event: string; c: number }[],
    byDay: db
      .prepare(
        "SELECT date(created_at) AS day, COUNT(*) AS c FROM qr_logs WHERE created_at >= datetime('now', '-14 days') GROUP BY day ORDER BY day",
      )
      .all() as { day: string; c: number }[],
    recent: db.prepare("SELECT * FROM qr_logs ORDER BY id DESC LIMIT 20").all() as QrLogRow[],
  };
}
