import Link from "next/link";
import { EventBadge, TypeBadge, formatDate } from "@/components/admin/ui";
import { DownloadIcon } from "@/components/icons";
import { listLogs, type LogFilter } from "@/lib/logs";
import { QR_TYPES, QR_TYPE_LABELS } from "@/lib/qr/types";
import { deleteLogsAction } from "./actions";

const PAGE_SIZE = 50;

type SearchParams = Record<string, string | string[] | undefined>;

function first(v: string | string[] | undefined): string {
  return Array.isArray(v) ? v[0] ?? "" : v ?? "";
}

function prettyJson(json: string | null): string {
  if (!json) return "";
  try {
    return JSON.stringify(JSON.parse(json), null, 2);
  } catch {
    return json;
  }
}

export default async function LogsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const sp = await searchParams;
  const filter: LogFilter = {
    type: first(sp.type) || undefined,
    event: first(sp.event) || undefined,
    q: first(sp.q) || undefined,
    from: first(sp.from) || undefined,
    to: first(sp.to) || undefined,
  };
  const page = Math.max(1, Number.parseInt(first(sp.page) || "1", 10) || 1);
  const { rows, total } = listLogs(filter, page, PAGE_SIZE);
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const query = new URLSearchParams();
  for (const [k, v] of Object.entries(filter)) if (v) query.set(k, v);
  const pageHref = (p: number) => `/admin/logs?${new URLSearchParams({ ...Object.fromEntries(query), page: String(p) })}`;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold tracking-tight">
          입력 기록 <span className="ml-1 text-sm font-normal tracking-normal text-muted tabular-nums">총 {total.toLocaleString()}건</span>
        </h1>
        <a href={`/api/admin/logs/export?${query}`} className="btn btn-sm" download>
          <DownloadIcon />
          CSV 내보내기 (현재 필터)
        </a>
      </div>

      <form method="get" className="grid gap-4 rounded-xl border border-border bg-card p-4 sm:grid-cols-2 sm:p-5 lg:grid-cols-5">
        <label className="block">
          <span className="label">종류</span>
          <select name="type" className="input" defaultValue={filter.type ?? ""}>
            <option value="">전체</option>
            {QR_TYPES.map((t) => (
              <option key={t} value={t}>
                {QR_TYPE_LABELS[t]}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="label">시작일</span>
          <input name="from" type="date" className="input" defaultValue={filter.from ?? ""} />
        </label>
        <label className="block">
          <span className="label">종료일</span>
          <input name="to" type="date" className="input" defaultValue={filter.to ?? ""} />
        </label>
        <label className="block lg:col-span-2">
          <span className="label">검색 (내용 · IP)</span>
          <div className="flex gap-2">
            <input name="q" className="input" defaultValue={filter.q ?? ""} placeholder="예: example.com, 203.0.113." />
            <button type="submit" className="btn btn-primary shrink-0">
              검색
            </button>
            <Link href="/admin/logs" className="btn shrink-0">
              초기화
            </Link>
          </div>
        </label>
      </form>

      <form action={deleteLogsAction} className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th className="w-10">
                <span className="sr-only">선택</span>
              </th>
              <th>시간 (KST)</th>
              <th>종류</th>
              <th>저장 방식</th>
              <th>내용</th>
              <th>IP</th>
              <th>브라우저</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="align-top">
                <td>
                  <input type="checkbox" name="ids" value={r.id} aria-label={`기록 ${r.id} 선택`} className="mt-0.5" />
                </td>
                <td className="whitespace-nowrap text-muted tabular-nums">
                  {formatDate(r.created_at)}
                  <div className="mt-0.5 font-mono text-[11px]">#{r.id}</div>
                </td>
                <td>
                  <TypeBadge type={r.qr_type} />
                </td>
                <td>
                  <EventBadge event={r.event} />
                </td>
                <td className="max-w-lg">
                  <details>
                    <summary className="cursor-pointer truncate rounded hover:text-accent">{r.encoded_preview || prettyJson(r.payload_json).slice(0, 100)}</summary>
                    <pre className="mt-2 max-h-64 overflow-auto rounded-md border border-border bg-subtle p-3 font-mono text-xs leading-relaxed break-all whitespace-pre-wrap">
                      {prettyJson(r.payload_json)}
                      {r.options_json ? `\n\n옵션: ${r.options_json}` : ""}
                      {r.referer ? `\nreferer: ${r.referer}` : ""}
                      {r.accept_language ? `\nlanguage: ${r.accept_language}` : ""}
                    </pre>
                  </details>
                </td>
                <td className="font-mono text-xs">{r.ip}</td>
                <td className="max-w-[200px] truncate text-xs text-muted" title={r.user_agent ?? ""}>
                  {r.user_agent}
                </td>
              </tr>
            ))}
            {rows.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-muted">
                  조건에 맞는 기록이 없습니다.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border bg-subtle px-4 py-3 text-sm">
          <button type="submit" className="btn btn-sm btn-danger" disabled={rows.length === 0}>
            선택 삭제
          </button>
          <div className="flex items-center gap-2 text-muted">
            {page > 1 ? (
              <Link href={pageHref(page - 1)} className="btn btn-sm">
                이전
              </Link>
            ) : null}
            <span className="px-1 tabular-nums">
              {page} / {pages}
            </span>
            {page < pages ? (
              <Link href={pageHref(page + 1)} className="btn btn-sm">
                다음
              </Link>
            ) : null}
          </div>
        </div>
      </form>
    </div>
  );
}
