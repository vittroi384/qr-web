import Link from "next/link";
import type { ReactNode } from "react";
import type { SourceGroup } from "@/lib/traffic";
import { num, pct } from "./format";

/**
 * Admin charts in plain HTML/CSS (no chart library), rendered on the server. Every mark carries a
 * hover label; numbers are always printed next to the marks, so colour is never the only cue.
 */

/**
 * Source groups in the order the share bar stacks them, each with one fixed colour used on every
 * admin page. Checked with the dataviz palette validator (adjacent pairs pass CVD ΔE ≥ 8).
 */
export const SOURCE_GROUP_ORDER: SourceGroup[] = ["ai", "search", "social", "other", "direct"];
export const SOURCE_GROUP_COLOR: Record<SourceGroup, string> = {
  ai: "#7c3aed",
  search: "#0284c7",
  social: "#e87ba4",
  other: "#eda100",
  direct: "#1baf7a",
};

export function Dot({ color, className = "size-2" }: { color: string; className?: string }) {
  return <span className={`inline-block shrink-0 rounded-full ${className}`} style={{ backgroundColor: color }} aria-hidden="true" />;
}

/** The smallest even "round" number ≥ v (2, 4, 6, 8, 10, 20, 40 …), so the half-way gridline is a whole number. */
function niceMax(v: number): number {
  const p = 10 ** Math.max(0, Math.floor(Math.log10(Math.max(1, v))));
  return [2, 4, 6, 8, 10].map((m) => m * p).find((m) => m >= v) ?? 10 * p;
}

/** Headline numbers in one compact strip (one card, cells split by hairlines). */
export function KpiStrip({ items }: { items: { label: string; value: ReactNode; hint?: ReactNode; primary?: boolean }[] }) {
  const cols = items.length === 5 ? "lg:grid-cols-5" : "lg:grid-cols-4";
  return (
    <dl className={`grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border ${cols}`}>
      {items.map((it, i) => (
        <div key={it.label} className={`min-w-0 bg-card px-4 py-2.5 sm:px-5 sm:py-3 ${items.length % 2 === 1 && i === items.length - 1 ? "max-lg:col-span-2" : ""}`}>
          <dt className={`truncate text-xs ${it.primary ? "font-semibold text-accent" : "text-muted"}`}>{it.label}</dt>
          <dd className="mt-0.5 text-xl font-semibold tracking-tight tabular-nums sm:text-2xl">{it.value}</dd>
          {it.hint ? <dd className="truncate text-xs text-muted">{it.hint}</dd> : null}
        </div>
      ))}
    </dl>
  );
}

/**
 * Vertical bars on a y-axis with three gridlines (0, half, top). Each bar shows its value on hover
 * (tooltip + title); `label` puts a tick under the bar, and the tallest bar is labelled directly.
 * `height` is a Tailwind height class, so the chart can be shorter on phones.
 */
export function ColumnChart({
  items,
  height,
  unit,
}: {
  items: { key: string; value: number; label?: string; tip: string; highlight?: boolean }[];
  height: string;
  unit: string;
}) {
  const top = niceMax(Math.max(0, ...items.map((i) => i.value)));
  const peak = items.reduce((best, i) => (i.value > best.value ? i : best), items[0]);
  return (
    <div className="flex gap-2">
      {/* y-axis labels: top, half, zero */}
      <div className={`relative w-7 shrink-0 text-right text-[10px] text-muted tabular-nums ${height}`} aria-hidden="true">
        <span className="absolute top-0 right-0 -translate-y-1/2">{num(top)}</span>
        <span className="absolute top-1/2 right-0 -translate-y-1/2">{num(top / 2)}</span>
        <span className="absolute top-full right-0 -translate-y-1/2">0</span>
      </div>
      <div className="min-w-0 flex-1">
        <div className={`relative ${height}`}>
          <div className="absolute inset-x-0 top-0 border-t border-dashed border-border" aria-hidden="true" />
          <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-border" aria-hidden="true" />
          <ul className="relative flex h-full items-end gap-[2px] border-b border-border-strong" aria-label={`${unit} 막대그래프`}>
            {items.map((it, idx) => {
              const h = it.value ? Math.max(2, (it.value / top) * 100) : 0;
              // Tooltip anchors to the side near the edges so it never leaves the card.
              const edge = idx < 3 ? "left-0" : idx > items.length - 4 ? "right-0" : "left-1/2 -translate-x-1/2";
              return (
                <li key={it.key} className="group relative flex h-full flex-1 items-end" title={it.tip}>
                  <span
                    className={`block w-full rounded-t-[3px] transition-colors ${it.highlight ? "bg-accent" : "bg-accent/55"} group-hover:bg-accent-hover`}
                    style={{ height: `${h}%` }}
                  />
                  {it === peak && it.value > 0 ? (
                    <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 text-[10px] font-semibold text-foreground tabular-nums" style={{ bottom: `calc(${h}% + 2px)` }}>
                      {num(it.value)}
                    </span>
                  ) : null}
                  <span
                    className={`pointer-events-none absolute z-10 rounded-md bg-foreground px-2 py-1 text-[11px] whitespace-nowrap text-white opacity-0 shadow-sm transition-opacity group-hover:opacity-100 ${edge}`}
                    style={{ bottom: `calc(${h}% + 6px)` }}
                    aria-hidden="true"
                  >
                    {it.tip}
                  </span>
                  <span className="sr-only">{it.tip}</span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="mt-1 flex gap-[2px] text-[10px] text-muted tabular-nums" aria-hidden="true">
          {items.map((it) => (
            <span key={it.key} className="relative flex-1 text-center">
              {it.label ? <span className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap">{it.label}</span> : null}
              &nbsp;
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/** One horizontal bar split into parts (2px gaps), with a labelled legend under it. */
export function ShareBar({ parts }: { parts: { key: string; label: string; value: number; color: string }[] }) {
  const total = parts.reduce((s, p) => s + p.value, 0);
  const shown = parts.filter((p) => p.value > 0);
  return (
    <div>
      <div className="flex h-3 gap-[2px] overflow-hidden rounded-full bg-surface" aria-hidden="true">
        {shown.map((p) => (
          <span key={p.key} className="h-full first:rounded-l-full last:rounded-r-full" style={{ width: `${(p.value / total) * 100}%`, backgroundColor: p.color }} title={`${p.label} ${num(p.value)} (${pct(p.value, total)})`} />
        ))}
      </div>
      <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-[13px]">
        {parts.map((p) => (
          <li key={p.key} className="flex items-center gap-1.5 whitespace-nowrap">
            <Dot color={p.color} />
            <span className="text-foreground">{p.label}</span>
            <span className="font-semibold tabular-nums">{num(p.value)}</span>
            <span className="text-xs text-muted tabular-nums">{pct(p.value, total)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Ranked list: label and value on one line, a thin bar under them (same on phones and desktops). */
export function BarList({
  items,
}: {
  items: { key: string; label: ReactNode; value: number; valueLabel: ReactNode; sub?: ReactNode; href?: string; color?: string }[];
}) {
  const max = Math.max(1, ...items.map((i) => i.value));
  return (
    <ul className="space-y-1">
      {items.map((it) => {
        const body = (
          <>
            <span className="flex items-baseline justify-between gap-3 text-[13px]">
              <span className="flex min-w-0 items-center gap-1.5">
                {it.color ? <Dot color={it.color} /> : null}
                <span className="truncate">{it.label}</span>
              </span>
              <span className="shrink-0 tabular-nums">
                <span className="font-semibold text-foreground">{it.valueLabel}</span>
                {it.sub ? <span className="text-xs text-muted"> · {it.sub}</span> : null}
              </span>
            </span>
            <span className="mt-1 block h-1.5 overflow-hidden rounded-full bg-surface" aria-hidden="true">
              <span className="block h-full rounded-full" style={{ width: `${Math.max(2, (it.value / max) * 100)}%`, backgroundColor: it.color ?? "color-mix(in srgb, var(--accent) 65%, transparent)" }} />
            </span>
          </>
        );
        return (
          <li key={it.key}>
            {it.href ? (
              <Link href={it.href} className="-mx-2 block rounded-md px-2 py-1.5 transition-colors hover:bg-subtle">
                {body}
              </Link>
            ) : (
              <div className="py-1.5">{body}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

/** Server-side tabs: plain links that set `?tab=`, the current one marked with aria-current. */
export function Tabs({ label, tabs, active }: { label: string; tabs: { key: string; label: string; href: string }[]; active: string }) {
  return (
    <nav aria-label={label} className="flex gap-1 border-b border-border">
      {tabs.map((t) => {
        const on = t.key === active;
        return (
          <Link
            key={t.key}
            href={t.href}
            aria-current={on ? "page" : undefined}
            scroll={false}
            className={`-mb-px border-b-2 px-3 py-2 text-sm whitespace-nowrap transition-colors sm:px-4 ${
              on ? "border-accent font-semibold text-accent" : "border-transparent text-muted hover:border-border-strong hover:text-foreground"
            }`}
          >
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}
