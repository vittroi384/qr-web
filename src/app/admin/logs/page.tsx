import Link from "next/link";
import { InfiniteScroll } from "@/components/admin/InfiniteScroll";
import { DatePresets, TypeFilter } from "@/components/admin/LogFilters";
import { EVENT_LABELS, EventBadge, TypeBadge, formatDate } from "@/components/admin/ui";
import { DownloadIcon } from "@/components/icons";
import { listLogs, type LogFilter } from "@/lib/logs";
import { summarizeLog, topFacets, visitorLanguage } from "@/lib/qr/summarize";
import { isQrType } from "@/lib/qr/sanitize";
import { deleteLogsAction } from "./actions";

/** Rows are appended ("더 불러오기") instead of paged; the table scrolls inside its card. */
const PAGE_STEP = 100;
const MAX_ROWS = 2000;
/** The classification panel looks at this many newest matching rows. */
const FACET_SAMPLE = 2000;

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

/** Short browser name from the User-Agent, enough to tell phones from desktops at a glance. */
function browserOf(ua: string | null): string {
  if (!ua) return "";
  const mobile = /Mobile|Android|iPhone|iPad/i.test(ua);
  const name = /Edg\//.test(ua)
    ? "Edge"
    : /SamsungBrowser/.test(ua)
      ? "Samsung"
      : /Chrome\//.test(ua)
        ? "Chrome"
        : /Safari\//.test(ua)
          ? "Safari"
          : /Firefox\//.test(ua)
            ? "Firefox"
            : ua.split(/[\s/]/)[0] ?? "";
  return `${name}${mobile ? " · 모바일" : ""}`;
}

export default async function LogsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const sp = await searchParams;
  const typeParam = first(sp.type);
  const filter: LogFilter = {
    type: isQrType(typeParam) ? typeParam : undefined,
    event: first(sp.event) || undefined,
    q: first(sp.q) || undefined,
    from: first(sp.from) || undefined,
    to: first(sp.to) || undefined,
  };
  const wanted = Number.parseInt(first(sp.n) || "", 10);
  const n = Math.min(MAX_ROWS, Math.max(PAGE_STEP, Number.isFinite(wanted) ? wanted : PAGE_STEP));

  // One query serves both the visible rows (first n) and the classification sample (n ≤ FACET_SAMPLE).
  const { rows: sample, total } = await listLogs(filter, 1, FACET_SAMPLE);
  const rows = sample.slice(0, n);

  const query = new URLSearchParams();
  for (const [k, v] of Object.entries(filter)) if (v) query.set(k, v);
  const hasFilter = query.size > 0;
  const moreHref = `/admin/logs?${new URLSearchParams({ ...Object.fromEntries(query), n: String(Math.min(MAX_ROWS, n + PAGE_STEP)) })}`;
  const withQ = (q: string) => `/admin/logs?${new URLSearchParams({ ...Object.fromEntries(query), q })}`;

  // Auto-classification over the (filtered) sample: what people encode, from where, how they save.
  const summaries = sample.map((r) => ({ row: r, s: summarizeLog(r.qr_type, r.payload_json) }));
  const facets = [
    { title: "도메인", hint: "URL · 파일 · 이메일", items: topFacets(summaries, (x) => x.s.domain), link: withQ },
    { title: "플랫폼 · 방식", hint: "SNS · 결제 · 코인 · Wi-Fi 암호화", items: topFacets(summaries, (x) => x.s.platform) },
    { title: "방문자 언어", hint: "브라우저 Accept-Language", items: topFacets(summaries, (x) => visitorLanguage(x.row.accept_language)) },
    { title: "저장 방식", hint: "", items: topFacets(summaries, (x) => EVENT_LABELS[x.row.event] ?? x.row.event) },
  ];
  const sampleNote = sample.length >= FACET_SAMPLE ? `최근 ${FACET_SAMPLE.toLocaleString()}건 기준` : `${sample.length.toLocaleString()}건 기준`;

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

      {/* Filter toolbar: one row on desktop, wraps on phones. Changing the type or a preset submits at once. */}
      <form method="get" className="flex flex-wrap items-center gap-2 rounded-xl border border-border bg-card p-3">
        <TypeFilter value={isQrType(typeParam) ? typeParam : ""} />
        <DatePresets from={filter.from ?? ""} to={filter.to ?? ""} />
        <div className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-border-strong bg-card px-2 text-sm">
          <input name="from" type="date" aria-label="시작일" defaultValue={filter.from ?? ""} className="h-8 bg-transparent text-[13px] text-foreground outline-none" />
          <span className="text-muted">–</span>
          <input name="to" type="date" aria-label="종료일" defaultValue={filter.to ?? ""} className="h-8 bg-transparent text-[13px] text-foreground outline-none" />
        </div>
        <label className="relative min-w-[220px] flex-1">
          <span className="sr-only">검색 (내용 · IP)</span>
          <svg viewBox="0 0 24 24" className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            name="q"
            defaultValue={filter.q ?? ""}
            placeholder="내용 · 도메인 · IP 검색"
            className="h-10 w-full rounded-lg border border-border-strong bg-card pr-3 pl-9 text-sm text-foreground placeholder:text-zinc-400 outline-none focus:border-accent focus:ring-3 focus:ring-accent/15"
          />
        </label>
        <button type="submit" className="btn btn-primary h-10">
          검색
        </button>
        {hasFilter ? (
          <Link href="/admin/logs" className="btn btn-ghost h-10">
            초기화
          </Link>
        ) : null}
      </form>

      {/* Auto-classification of what matched the filter. */}
      {sample.length > 0 ? (
        <section aria-labelledby="facets-heading" className="rounded-xl border border-border bg-card p-4 sm:p-5">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 id="facets-heading" className="text-[15px] font-semibold">
              자동 분류
            </h2>
            <span className="text-xs text-muted">{sampleNote} · 도메인을 누르면 그 조건으로 검색</span>
          </div>
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {facets.map((f) => {
              const max = f.items[0]?.count ?? 1;
              return (
                <div key={f.title}>
                  <h3 className="text-[13px] font-medium text-foreground">
                    {f.title}
                    {f.hint ? <span className="ml-1.5 text-[11px] font-normal text-muted">{f.hint}</span> : null}
                  </h3>
                  {f.items.length === 0 ? (
                    <p className="mt-2 text-xs text-muted">해당 없음</p>
                  ) : (
                    <ul className="mt-2 space-y-1.5">
                      {f.items.map((it) => {
                        const bar = (
                          <>
                            <span className="flex items-center justify-between gap-2 text-[13px]">
                              <span className="truncate">{it.key}</span>
                              <span className="shrink-0 text-xs text-muted tabular-nums">{it.count.toLocaleString()}</span>
                            </span>
                            <span className="mt-1 block h-1.5 overflow-hidden rounded-full bg-surface">
                              <span className="block h-full rounded-full bg-accent/70" style={{ width: `${Math.max(4, Math.round((it.count / max) * 100))}%` }} />
                            </span>
                          </>
                        );
                        return (
                          <li key={it.key}>
                            {f.link ? (
                              <Link href={f.link(it.key)} className="block rounded-md px-1 py-0.5 -mx-1 transition-colors hover:bg-subtle">
                                {bar}
                              </Link>
                            ) : (
                              <div className="px-1 py-0.5 -mx-1">{bar}</div>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      ) : null}

      <form action={deleteLogsAction} className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="table-scroll [--table-offset:30rem]">
          <table className="table">
            <thead>
              <tr>
                <th className="w-10">
                  <span className="sr-only">선택</span>
                </th>
                <th>시간 (KST)</th>
                <th>종류</th>
                <th>내용</th>
                <th>저장 방식</th>
                <th>방문자</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const s = summarizeLog(r.qr_type, r.payload_json);
                return (
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
                    <td className="max-w-md">
                      <details className="group">
                        <summary className="cursor-pointer list-none rounded hover:text-accent">
                          <span className="block truncate font-medium text-foreground">{s.primary}</span>
                          {s.secondary ? <span className="mt-0.5 block truncate text-xs text-muted">{s.secondary}</span> : null}
                        </summary>
                        <pre className="mt-2 max-h-64 overflow-auto rounded-md border border-border bg-subtle p-3 font-mono text-xs leading-relaxed break-all whitespace-pre-wrap">
                          {prettyJson(r.payload_json)}
                          {r.options_json ? `\n\n옵션: ${r.options_json}` : ""}
                          {r.referer ? `\nreferer: ${r.referer}` : ""}
                          {r.accept_language ? `\nlanguage: ${r.accept_language}` : ""}
                          {r.user_agent ? `\nUA: ${r.user_agent}` : ""}
                        </pre>
                      </details>
                    </td>
                    <td>
                      <EventBadge event={r.event} />
                    </td>
                    <td className="whitespace-nowrap text-xs">
                      <div className="font-mono">{r.ip}</div>
                      <div className="mt-0.5 text-muted">
                        {visitorLanguage(r.accept_language)}
                        {r.page ? <span className="ml-1.5 font-mono text-[11px]">{r.page}</span> : null}
                      </div>
                      <div className="mt-0.5 text-muted" title={r.user_agent ?? ""}>
                        {browserOf(r.user_agent)}
                      </div>
                    </td>
                  </tr>
                );
              })}
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-muted">
                    조건에 맞는 기록이 없습니다.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
          {rows.length > 0 ? (
            <InfiniteScroll
              key={query.toString()}
              nextHref={rows.length < total && n < MAX_ROWS ? moreHref : null}
              loadedLabel={rows.length < total ? `최대 ${MAX_ROWS.toLocaleString()}건까지 표시 — 필터나 CSV 내보내기를 이용하세요` : "모두 불러왔습니다"}
            />
          ) : null}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border bg-subtle px-4 py-3 text-sm">
          <button type="submit" className="btn btn-sm btn-danger" disabled={rows.length === 0}>
            선택 삭제
          </button>
          <span className="text-muted tabular-nums">
            {total.toLocaleString()}건 중 {Math.min(rows.length, total).toLocaleString()}건 표시 · 아래로 내리면 자동으로 더 불러옵니다
          </span>
        </div>
      </form>
    </div>
  );
}
