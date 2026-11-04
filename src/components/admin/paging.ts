import { num } from "./format";

/**
 * Long admin tables (logs, audit) grow by appending rows ("더 불러오기" / InfiniteScroll) instead of
 * paging: `?n=` is how many rows to render, PAGE_STEP more each time, at most MAX_ROWS.
 */
export const PAGE_STEP = 100;
export const MAX_ROWS = 2000;

/** The `n` query value, clamped to PAGE_STEP..MAX_ROWS. */
export function rowsWanted(param: string | string[] | undefined): number {
  const wanted = Number.parseInt(typeof param === "string" ? param : "", 10);
  return Math.min(MAX_ROWS, Math.max(PAGE_STEP, Number.isFinite(wanted) ? wanted : PAGE_STEP));
}

/** `n` for the next batch, or null when everything (or the cap) is already shown. */
export function nextRows(n: number, shown: number, total: number): number | null {
  return shown < total && n < MAX_ROWS ? Math.min(MAX_ROWS, n + PAGE_STEP) : null;
}

/** Footer line under the table: "1,234건 중 100건 표시{extra} · 아래로 내리면 자동으로 더 불러옵니다". */
export function shownLabel(total: number, shown: number, extra = ""): string {
  return `${num(total)}건 중 ${num(Math.min(shown, total))}건 표시${extra} · 아래로 내리면 자동으로 더 불러옵니다`;
}
