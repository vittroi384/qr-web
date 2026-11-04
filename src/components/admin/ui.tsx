import Link from "next/link";
import type { ReactNode } from "react";
import { visitorLanguage } from "@/lib/qr/summarize";
import { TypeIcon } from "@/components/icons";
import { QR_TYPE_LABELS, type QrType } from "@/lib/qr/types";
import { isQrType } from "@/lib/qr/sanitize";
import { formatKst, timeAgo } from "@/lib/time";
import { browserOf } from "@/lib/visitors";

/** Card with a titled header; `hint` says in one line what the section answers, `aside` sits at the header's right. */
export function Section({ title, hint, aside, children }: { title: string; hint?: string; aside?: ReactNode; children: ReactNode }) {
  return (
    <section className="flex min-w-0 flex-col overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex items-start justify-between gap-3 px-4 py-3 sm:px-5">
        <div className="min-w-0">
          <h2 className="text-[15px] font-semibold">{title}</h2>
          {hint ? <p className="mt-0.5 text-xs leading-relaxed text-muted">{hint}</p> : null}
        </div>
        {aside ? <div className="shrink-0 text-xs text-muted">{aside}</div> : null}
      </div>
      <div className="border-t border-border">{children}</div>
    </section>
  );
}

export function Empty() {
  return <p className="px-5 py-10 text-center text-sm text-muted">아직 데이터가 없습니다.</p>;
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
    <dl className="grid min-w-0 grid-cols-[auto_minmax(0,1fr)] gap-x-2 gap-y-0.5 text-xs">
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

/** Korean label of a QR type; unknown values (old rows) show as stored. */
export const typeLabel = (type: string) => (QR_TYPE_LABELS as Record<string, string>)[type as QrType] ?? type;

export function TypeBadge({ type }: { type: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-surface px-1.5 py-0.5 text-xs font-medium whitespace-nowrap text-foreground">
      {isQrType(type) ? <TypeIcon type={type} className="size-3.5 shrink-0 text-accent" /> : null}
      {typeLabel(type)}
    </span>
  );
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
