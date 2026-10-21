import Link from "next/link";
import type { ReactNode } from "react";
import { visitorLanguage } from "@/lib/qr/summarize";
import { QR_TYPE_LABELS, type QrType } from "@/lib/qr/types";
import { formatKst, timeAgo } from "@/lib/time";
import { browserOf } from "@/lib/visitors";

/** `primary` makes the number the page leads with (people) stand out from the supporting ones. */
export function StatCard({ label, value, hint, primary }: { label: string; value: ReactNode; hint?: string; primary?: boolean }) {
  return (
    <div className={`rounded-xl border px-5 py-4 ${primary ? "border-accent/30 bg-accent-soft" : "border-border bg-card"}`}>
      <p className={`text-[13px] ${primary ? "font-semibold text-accent" : "text-muted"}`}>{label}</p>
      <p className={`mt-1.5 font-semibold tracking-tight tabular-nums ${primary ? "text-3xl" : "text-2xl"}`}>{value}</p>
      {hint ? <p className="mt-1 text-xs text-muted">{hint}</p> : null}
    </div>
  );
}

/** Page heading with an optional muted note after it. */
export function PageTitle({ title, note }: { title: string; note?: ReactNode }) {
  return (
    <h1 className="text-2xl font-semibold tracking-tight">
      {title}
      {note ? <span className="ml-2 text-sm font-normal tracking-normal text-muted">{note}</span> : null}
    </h1>
  );
}

/** Says that the owner's own IPs are left out of the numbers on this page. */
export function ExcludedNote({ count }: { count: number }) {
  if (count === 0) {
    return (
      <p className="text-xs text-muted">
        내 테스트 기록도 숫자에 포함돼 있습니다.{" "}
        <Link href="/admin/settings#stats" className="link">
          내 IP 빼기
        </Link>
      </p>
    );
  }
  return (
    <p className="text-xs text-muted">
      내 IP {count}개는 숫자에서 뺐습니다.{" "}
      <Link href="/admin/settings#stats" className="link">
        바꾸기
      </Link>
    </p>
  );
}

/** "3시간 전" with the exact KST time on hover and for screen readers. */
export function TimeAgo({ value }: { value: Date | string }) {
  const exact = formatKst(value);
  return (
    <time dateTime={new Date(value).toISOString()} title={exact} className="whitespace-nowrap tabular-nums">
      {timeAgo(value)}
    </time>
  );
}

/** Who saved it: browser language (≈ where they are), the page they used, and the device. */
export function VisitorInfo({ acceptLanguage, page, userAgent }: { acceptLanguage: string | null; page: string | null; userAgent: string | null }) {
  const device = browserOf(userAgent);
  return (
    <dl className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-0.5 text-xs">
      <dt className="text-muted">언어</dt>
      <dd className="truncate text-foreground">{visitorLanguage(acceptLanguage)}</dd>
      {page ? (
        <>
          <dt className="text-muted">페이지</dt>
          <dd className="truncate font-mono text-[11px] text-foreground">{page}</dd>
        </>
      ) : null}
      {device ? (
        <>
          <dt className="text-muted">기기</dt>
          <dd className="truncate text-foreground" title={userAgent ?? ""}>
            {device}
          </dd>
        </>
      ) : null}
    </dl>
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

/** Stored as timestamptz; show it in KST with an explicit zone label. */
export function formatDate(value: Date | string): string {
  return formatKst(value);
}
