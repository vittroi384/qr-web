import type { Key, ReactNode } from "react";
import { num } from "./format";

export type Column<R> = {
  head: ReactNode;
  cell: (row: R) => ReactNode;
  /** Number column: right-aligned, tabular figures. */
  num?: boolean;
  /** Secondary column, dropped on phones (.m-hide). */
  mHide?: boolean;
  /** Label shown before the value when `.table-stack` turns rows into cards on phones. */
  label?: string;
  headClassName?: string;
  className?: string | ((row: R) => string);
};

const cx = (...parts: (string | false | undefined)[]) => parts.filter(Boolean).join(" ");

/**
 * Only the attributes a cell actually has: an undefined prop is still written into the RSC payload
 * ("$undefined") for every cell, which added ~5–10% to the long tables.
 */
function cellProps<R>(c: Column<R>, row: R): { className?: string; "data-label"?: string } {
  const className = cx(c.mHide && "m-hide", c.num && "text-right tabular-nums", typeof c.className === "function" ? c.className(row) : c.className);
  return { ...(className && { className }), ...(c.label && { "data-label": c.label }) };
}

/**
 * The admin table: `.table` inside a `.table-scroll` box (header row pinned, scrolls inside its
 * card). `box` adds classes to the box (default sets the offset the stats cards use), `children`
 * renders below the table inside the box (InfiniteScroll), `empty` is the row shown without data.
 */
export function DataTable<R>({
  columns,
  rows,
  rowKey,
  rowClassName,
  tableClassName = "",
  box = "[--table-offset:20rem]",
  empty,
  children,
}: {
  columns: Column<R>[];
  rows: readonly R[];
  rowKey: (row: R) => Key;
  rowClassName?: string;
  tableClassName?: string;
  box?: string;
  empty?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className={cx("table-scroll", box)}>
      <table className={cx("table", tableClassName)}>
        <thead>
          <tr>
            {columns.map((c, i) => (
              <th key={i} className={cx(c.mHide && "m-hide", c.num && "text-right", c.headClassName) || undefined}>
                {c.head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={rowKey(r)} {...(rowClassName && { className: rowClassName })}>
              {columns.map((c, i) => (
                <td key={i} {...cellProps(c, r)}>
                  {c.cell(r)}
                </td>
              ))}
            </tr>
          ))}
          {rows.length === 0 && empty ? (
            <tr>
              <td colSpan={columns.length} className="py-12 text-center text-muted">
                {empty}
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
      {children}
    </div>
  );
}

/** Horizontal bar relative to the largest value; `className` sizes and places the track. */
export function Meter({ value, max, className }: { value: number; max: number; className: string }) {
  return (
    <span className={cx("overflow-hidden rounded-full bg-surface", className)} aria-hidden="true">
      <span className="block h-full rounded-full bg-accent/70" style={{ width: `${Math.max(4, (value / Math.max(1, max)) * 100)}%` }} />
    </span>
  );
}

/** A number with a small meter in front of it (the meter is hidden on phones). */
export function MeterNum({ value, max, width = "w-8" }: { value: number; max: number; width?: "w-8" | "w-10" }) {
  return (
    <span className="flex items-center justify-end gap-2">
      <Meter value={value} max={max} className="ml-auto hidden h-1.5 w-16 sm:block" />
      <span className={`${width} font-semibold`}>{num(value)}</span>
    </span>
  );
}
