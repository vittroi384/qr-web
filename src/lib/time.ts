/**
 * Timestamps are stored as PostgreSQL `timestamptz` (absolute instants) and come back as Date.
 * The owner reads everything in Korea Standard Time, so date filters and "today" are computed
 * on KST day boundaries and compared as instants.
 */
export const DISPLAY_TZ = "Asia/Seoul";
const KST_OFFSET_MIN = 9 * 60;

/** True for a real calendar date in "YYYY-MM-DD" form (rejects 2026-13-45). */
export function isValidDay(day: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day)) return false;
  const d = new Date(`${day}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === day;
}

/** Start (00:00 KST) of the given KST calendar day ("YYYY-MM-DD"). */
export function kstDayStart(day: string): Date {
  return new Date(`${day}T00:00:00+09:00`);
}

/** Exclusive end (next day 00:00 KST) of the given KST calendar day. */
export function kstDayEndExclusive(day: string): Date {
  const end = kstDayStart(day);
  end.setUTCDate(end.getUTCDate() + 1);
  return end;
}

/** Today's KST date as "YYYY-MM-DD". */
export function kstToday(now = new Date()): string {
  const shifted = new Date(now.getTime() + KST_OFFSET_MIN * 60_000);
  return shifted.toISOString().slice(0, 10);
}

function toDate(value: Date | string): Date | null {
  const d = value instanceof Date ? value : new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

/** KST wall-clock "YYYY-MM-DDTHH:MM:SS" (KST has no DST, so a fixed offset is exact). */
function kstWallClock(d: Date): string {
  return new Date(d.getTime() + KST_OFFSET_MIN * 60_000).toISOString().slice(0, 19);
}

/** Human-readable KST timestamp with explicit zone label, e.g. "2026-10-02 20:39:33 KST". */
export function formatKst(value: Date | string): string {
  const d = toDate(value);
  if (!d) return String(value);
  return `${kstWallClock(d).replace("T", " ")} KST`;
}

/** UTC ISO 8601 without milliseconds for exports, e.g. "2026-10-02T11:39:33Z". */
export function toUtcIso(value: Date | string): string {
  const d = toDate(value);
  if (!d) return String(value);
  return d.toISOString().slice(0, 19) + "Z";
}

/** ISO 8601 with explicit KST offset for exports, e.g. "2026-10-02T20:39:33+09:00". */
export function toKstIso(value: Date | string): string {
  const d = toDate(value);
  if (!d) return String(value);
  return `${kstWallClock(d)}+09:00`;
}
