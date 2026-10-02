import type { ReactNode } from "react";
import { QR_TYPE_LABELS, type QrType } from "@/lib/qr/types";
import { formatKst } from "@/lib/time";

export function StatCard({ label, value, hint }: { label: string; value: ReactNode; hint?: string }) {
  return (
    <div className="rounded-xl border border-border bg-card px-5 py-4">
      <p className="text-[13px] text-muted">{label}</p>
      <p className="mt-1.5 text-2xl font-semibold tracking-tight tabular-nums">{value}</p>
      {hint ? <p className="mt-1 text-xs text-muted">{hint}</p> : null}
    </div>
  );
}

export function TypeBadge({ type }: { type: string }) {
  const label = (QR_TYPE_LABELS as Record<string, string>)[type as QrType] ?? type;
  return <span className="inline-block rounded-md bg-surface px-1.5 py-0.5 text-xs font-medium whitespace-nowrap text-foreground">{label}</span>;
}

export const EVENT_LABELS: Record<string, string> = {
  generate: "생성",
  download_png: "PNG 저장",
  download_svg: "SVG 저장",
  copy: "복사",
  print: "인쇄",
  batch: "일괄 생성",
};

const EVENT_DOT: Record<string, string> = {
  generate: "bg-zinc-400",
  download_png: "bg-accent",
  download_svg: "bg-accent",
  copy: "bg-success",
  print: "bg-success",
  batch: "bg-accent",
};

export function EventBadge({ event }: { event: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs whitespace-nowrap text-foreground">
      <span className={`size-1.5 rounded-full ${EVENT_DOT[event] ?? "bg-zinc-300"}`} aria-hidden="true" />
      {EVENT_LABELS[event] ?? event}
    </span>
  );
}

/** SQLite stores UTC; show it in KST with an explicit zone label. */
export function formatDate(utc: string): string {
  return formatKst(utc);
}

export function PayloadSummary({ json, max = 80 }: { json: string; max?: number }) {
  let text = json;
  try {
    const obj = JSON.parse(json) as Record<string, unknown>;
    text = Object.entries(obj)
      .filter(([, v]) => v !== "" && v !== false && v !== null)
      .map(([k, v]) => `${k}: ${String(v)}`)
      .join(" · ");
  } catch {
    // keep raw
  }
  return <span title={text}>{text.length > max ? `${text.slice(0, max)}…` : text}</span>;
}
