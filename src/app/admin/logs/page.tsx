import Link from "next/link";
import { EVENT_LABELS, EventBadge, TypeBadge, formatDate } from "@/components/admin/ui";
import { listLogs, type LogFilter } from "@/lib/logs";
import { LOG_EVENTS, QR_TYPES, QR_TYPE_LABELS } from "@/lib/qr/types";
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
        <h1 className="text-xl font-semibold">
          입력 기록 <span className="text-sm font-normal text-muted">총 {total.toLocaleString()}건</span>
        </h1>
        <a href={`/api/admin/logs/export?${query}`} className="btn text-xs" download>
          CSV 내보내기 (현재 필터)
        </a>
      </div>

      <form method="get" className="card grid gap-3 py-4 sm:grid-cols-2 lg:grid-cols-6">
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
          <span className="label">이벤트</span>
          <select name="event" className="input" defaultValue={filter.event ?? ""}>
            <option value="">전체</option>
            {LOG_EVENTS.map((e) => (
              <option key={e} value={e}>
                {EVENT_LABELS[e]}
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

      <form action={deleteLogsAction} className="card overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead className="bg-background text-left text-xs text-muted">
            <tr>
              <th className="px-3 py-2"></th>
              <th className="px-3 py-2">시간 (KST)</th>
              <th className="px-3 py-2">종류</th>
              <th className="px-3 py-2">이벤트</th>
              <th className="px-3 py-2">내용</th>
              <th className="px-3 py-2">IP</th>
              <th className="px-3 py-2">브라우저</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-border align-top">
                <td className="px-3 py-2">
                  <input type="checkbox" name="ids" value={r.id} aria-label={`기록 ${r.id} 선택`} />
                </td>
                <td className="whitespace-nowrap px-3 py-2 text-muted">
                  {formatDate(r.created_at)}
                  <div className="text-[10px]">#{r.id}</div>
                </td>
                <td className="px-3 py-2">
                  <TypeBadge type={r.qr_type} />
                </td>
                <td className="px-3 py-2">
                  <EventBadge event={r.event} />
                </td>
                <td className="max-w-lg px-3 py-2">
                  <details>
                    <summary className="cursor-pointer truncate">{r.encoded_preview || prettyJson(r.payload_json).slice(0, 100)}</summary>
                    <pre className="mt-2 max-h-64 overflow-auto whitespace-pre-wrap break-all rounded-lg border border-border bg-background p-2 text-xs">
                      {prettyJson(r.payload_json)}
                      {r.options_json ? `\n\n옵션: ${r.options_json}` : ""}
                      {r.referer ? `\nreferer: ${r.referer}` : ""}
                      {r.accept_language ? `\nlanguage: ${r.accept_language}` : ""}
                    </pre>
                  </details>
                </td>
                <td className="px-3 py-2 font-mono text-xs">{r.ip}</td>
                <td className="max-w-[200px] truncate px-3 py-2 text-xs text-muted" title={r.user_agent ?? ""}>
                  {r.user_agent}
                </td>
              </tr>
            ))}
            {rows.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-3 py-8 text-center text-muted">
                  조건에 맞는 기록이 없습니다.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-3 py-2 text-sm">
          <button type="submit" className="btn text-xs text-red-500 hover:border-red-400 hover:text-red-500" disabled={rows.length === 0}>
            선택 삭제
          </button>
          <div className="flex items-center gap-2 text-muted">
            {page > 1 ? (
              <Link href={pageHref(page - 1)} className="btn py-1 text-xs">
                ← 이전
              </Link>
            ) : null}
            <span>
              {page} / {pages}
            </span>
            {page < pages ? (
              <Link href={pageHref(page + 1)} className="btn py-1 text-xs">
                다음 →
              </Link>
            ) : null}
          </div>
        </div>
      </form>
    </div>
  );
}
