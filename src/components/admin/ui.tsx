import type { ReactNode } from "react";
import { QR_TYPE_LABELS, type QrType } from "@/lib/qr/types";

export function StatCard({ label, value, hint }: { label: string; value: ReactNode; hint?: string }) {
  return (
    <div className="card py-4">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 text-2xl font-semibold tabular-nums">{value}</p>
      {hint ? <p className="mt-1 text-xs text-muted">{hint}</p> : null}
    </div>
  );
}

export function TypeBadge({ type }: { type: string }) {
  const label = (QR_TYPE_LABELS as Record<string, string>)[type as QrType] ?? type;
  return <span className="inline-block rounded-md border border-border bg-background px-1.5 py-0.5 text-xs">{label}</span>;
}

export const EVENT_LABELS: Record<string, string> = {
  generate: "생성",
  download_png: "PNG 저장",
  download_svg: "SVG 저장",
  copy: "복사",
};

export function EventBadge({ event }: { event: string }) {
  return <span className="text-xs text-muted">{EVENT_LABELS[event] ?? event}</span>;
}

/** SQLite stores UTC; show the owner's local (server) zone with an explicit label. */
export function formatDate(utc: string): string {
  const d = new Date(utc.replace(" ", "T") + "Z");
  if (Number.isNaN(d.getTime())) return utc;
  return d.toLocaleString("ko-KR", { timeZone: "Asia/Seoul", hour12: false });
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
