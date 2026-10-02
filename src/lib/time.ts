/**
 * SQLite stores `datetime('now')` → "YYYY-MM-DD HH:MM:SS" in UTC with no zone marker.
 * The owner reads everything in Korea Standard Time, so filters and "today" must be
 * computed on KST day boundaries and converted back to UTC strings for comparison.
 */
export const DISPLAY_TZ = "Asia/Seoul";
const KST_OFFSET_MIN = 9 * 60;

/** "YYYY-MM-DD HH:MM:SS" (UTC, SQLite style) from a Date. */
export function toSqliteUtc(d: Date): string {
  return d.toISOString().slice(0, 19).replace("T", " ");
}

/** Parse SQLite UTC text into a Date. */
export function fromSqliteUtc(utc: string): Date | null {
  const d = new Date(utc.replace(" ", "T") + "Z");
  return Number.isNaN(d.getTime()) ? null : d;
}

/** True for a real calendar date in "YYYY-MM-DD" form (rejects 2026-13-45). */
export function isValidDay(day: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day)) return false;
  const d = new Date(`${day}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === day;
}

/** Start of the given KST calendar day ("YYYY-MM-DD") as a SQLite UTC string. */
export function kstDayStartUtc(day: string): string {
  return toSqliteUtc(new Date(`${day}T00:00:00+09:00`));
}

/** Exclusive end (next day 00:00 KST) of the given KST calendar day as SQLite UTC string. */
export function kstDayEndUtcExclusive(day: string): string {
  const start = new Date(`${day}T00:00:00+09:00`);
  start.setUTCDate(start.getUTCDate() + 1);
  return toSqliteUtc(start);
}

/** Today's KST date as "YYYY-MM-DD". */
export function kstToday(now = new Date()): string {
  const shifted = new Date(now.getTime() + KST_OFFSET_MIN * 60_000);
  return shifted.toISOString().slice(0, 10);
}

/** Human-readable KST timestamp with explicit zone label, e.g. "2026. 10. 2. 11:39:33 KST". */
export function formatKst(utc: string): string {
  const d = fromSqliteUtc(utc);
  if (!d) return utc;
  return `${d.toLocaleString("ko-KR", { timeZone: DISPLAY_TZ, hour12: false })} KST`;
}

/** ISO 8601 with explicit offset for exports, e.g. "2026-10-02T20:39:33+09:00". */
export function toKstIso(utc: string): string {
  const d = fromSqliteUtc(utc);
  if (!d) return utc;
  const shifted = new Date(d.getTime() + KST_OFFSET_MIN * 60_000);
  return shifted.toISOString().slice(0, 19) + "+09:00";
}
