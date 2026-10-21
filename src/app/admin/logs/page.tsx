import Link from "next/link";
import { InfiniteScroll } from "@/components/admin/InfiniteScroll";
import { DatePresets, TypeFilter } from "@/components/admin/LogFilters";
import { EVENT_LABELS, EventBadge, PageTitle, TimeAgo, TypeBadge, VisitorInfo, formatDate } from "@/components/admin/ui";
import { DownloadIcon } from "@/components/icons";
import { requireAdmin } from "@/lib/adminSession";
import { getStatsExclusion, listLogs, type LogFilter } from "@/lib/logs";
import { summarizeLog, topFacets, visitorLanguage } from "@/lib/qr/summarize";
import { isQrType } from "@/lib/qr/sanitize";
import { collapseRuns, groupVisitors } from "@/lib/visitors";
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

/** "5분 동안" for a run that spans time; nothing when it all happened within a minute. */
function spanLabel(newest: Date, oldest: Date): string {
  const min = Math.round((newest.getTime() - oldest.getTime()) / 60_000);
  if (min < 1) return "";
  if (min < 60) return `${min}분 동안`;
  const h = Math.round(min / 60);
  return h < 48 ? `${h}시간 동안` : `${Math.round(h / 24)}일 동안`;
}

export default async function LogsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  await requireAdmin();
  const sp = await searchParams;
  const typeParam = first(sp.type);
  const filter: LogFilter = {
    type: isQrType(typeParam) ? typeParam : undefined,
    event: first(sp.event) || undefined,
    q: first(sp.q) || undefined,
    from: first(sp.from) || undefined,
    to: first(sp.to) || undefined,
  };
  // View switches (not part of the filter, so the CSV export ignores them).
  const raw = first(sp.raw) === "1";
  const showExcluded = first(sp.all) === "1";
  const wanted = Number.parseInt(first(sp.n) || "", 10);
  const n = Math.min(MAX_ROWS, Math.max(PAGE_STEP, Number.isFinite(wanted) ? wanted : PAGE_STEP));

  const exclusion = await getStatsExclusion();
  const hiding = !showExcluded && exclusion.count > 0;

  // One query serves both the visible rows (first n) and the classification sample (n ≤ FACET_SAMPLE).
  const { rows: sample, total } = await listLogs(filter, 1, FACET_SAMPLE, hiding ? exclusion.where : undefined);
  const rows = sample.slice(0, n);
  const runs = raw ? rows.map((r) => ({ rows: [r], events: [{ event: r.event, c: 1 }] })) : collapseRuns(rows);
  const people = groupVisitors(sample).length;

  const query = new URLSearchParams();
  for (const [k, v] of Object.entries(filter)) if (v) query.set(k, v);
  const hasFilter = query.size > 0;
  const view = new URLSearchParams(query);
  if (raw) view.set("raw", "1");
  if (showExcluded) view.set("all", "1");
  const href = (patch: Record<string, string | null>) => {
    const p = new URLSearchParams(view);
    for (const [k, v] of Object.entries(patch)) {
      if (v === null) p.delete(k);
      else p.set(k, v);
    }
    return `/admin/logs${p.size ? `?${p}` : ""}`;
  };
  const moreHref = href({ n: String(Math.min(MAX_ROWS, n + PAGE_STEP)) });
  const withQ = (q: string) => href({ q });

  // Auto-classification over the (filtered) sample: what people encode, from where, how they save.
  const summaries = sample.map((r) => ({ row: r, s: summarizeLog(r.qr_type, r.payload_json) }));
  const facets = [
    { title: "도메인", hint: "URL · 파일 · 이메일", items: topFacets(summaries, (x) => x.s.domain), link: withQ },
    { title: "플랫폼 · 방식", hint: "SNS · 결제 · 코인 · Wi-Fi 암호화", items: topFacets(summaries, (x) => x.s.platform) },
    { title: "방문자 언어", hint: "브라우저 설정", items: topFacets(summaries, (x) => visitorLanguage(x.row.accept_language)) },
    { title: "저장 방식", hint: "", items: topFacets(summaries, (x) => EVENT_LABELS[x.row.event] ?? x.row.event) },
  ];
  const sampleNote = sample.length >= FACET_SAMPLE ? `최근 ${FACET_SAMPLE.toLocaleString()}건 기준` : `${sample.length.toLocaleString()}건 기준`;

  const toggle = (on: boolean, label: string, to: string) => (
    <Link
      href={to}
      aria-pressed={on}
      className={`inline-flex h-8 items-center gap-1.5 rounded-full border px-3 text-xs transition-colors ${
        on ? "border-accent/40 bg-accent-soft font-semibold text-accent" : "border-border-strong bg-card text-muted hover:bg-subtle hover:text-foreground"
      }`}
    >
      <span className={`size-1.5 rounded-full ${on ? "bg-accent" : "bg-zinc-300"}`} aria-hidden="true" />
      {label}
    </Link>
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <PageTitle title="입력 기록" note={<span className="tabular-nums">저장 {total.toLocaleString()}건 · 사용자 {people.toLocaleString()}명{sample.length < total ? ` (최근 ${sample.length.toLocaleString()}건 기준)` : ""}</span>} />
        <a href={`/api/admin/logs/export?${query}`} className="btn btn-sm" download>
          <DownloadIcon />
          CSV 내보내기 (현재 필터)
        </a>
      </div>

      {/* Filter toolbar: one row on desktop, wraps on phones. Changing the type or a preset submits at once. */}
      <form method="get" className="flex flex-wrap items-center gap-2 rounded-xl border border-border bg-card p-3">
        {raw ? <input type="hidden" name="raw" value="1" /> : null}
        {showExcluded ? <input type="hidden" name="all" value="1" /> : null}
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
        <button type="submit" className="btn btn-primary h-10 min-h-0">
          검색
        </button>
        {hasFilter ? (
          <Link href={href({ type: null, event: null, q: null, from: null, to: null, n: null })} className="btn btn-ghost h-10 min-h-0">
            초기화
          </Link>
        ) : null}
      </form>

      <div className="flex flex-wrap items-center gap-2">
        {toggle(!raw, "같은 저장 묶어 보기", href({ raw: raw ? null : "1", n: null }))}
        {exclusion.count > 0
          ? toggle(showExcluded, `제외 IP 포함 (${exclusion.count}개)`, href({ all: showExcluded ? null : "1", n: null }))
          : (
            <Link href="/admin/settings#stats" className="text-xs text-muted underline decoration-border-strong underline-offset-2 hover:text-foreground">
              내 테스트 IP를 목록에서 빼려면 설정에 추가
            </Link>
          )}
      </div>

      {/* Auto-classification of what matched the filter. */}
      {sample.length > 0 ? (
        <details className="group rounded-xl border border-border bg-card" open={hasFilter}>
          <summary className="flex cursor-pointer flex-wrap items-baseline justify-between gap-2 px-4 py-3 sm:px-5">
            <span className="text-[15px] font-semibold">
              자동 분류 <span className="ml-1 text-xs font-normal text-muted">{sampleNote} · 도메인을 누르면 그 조건으로 검색</span>
            </span>
            <span className="text-xs text-accent group-open:hidden">펼치기</span>
            <span className="hidden text-xs text-muted group-open:inline">접기</span>
          </summary>
          <div className="grid gap-5 border-t border-border p-4 sm:grid-cols-2 sm:p-5 lg:grid-cols-4">
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
        </details>
      ) : null}

      <form action={deleteLogsAction} className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="table-scroll [--table-offset:26rem]">
          <table className="table">
            <thead>
              <tr>
                <th className="w-10">
                  <span className="sr-only">선택</span>
                </th>
                <th>언제</th>
                <th>무엇을</th>
                <th>어떻게 저장</th>
                <th>누가</th>
              </tr>
            </thead>
            <tbody>
              {runs.map(({ rows: rs, events }) => {
                const r = rs[0];
                const oldest = rs[rs.length - 1];
                const s = summarizeLog(r.qr_type, r.payload_json);
                const span = spanLabel(new Date(r.created_at), new Date(oldest.created_at));
                return (
                  <tr key={r.id} className="align-top">
                    <td>
                      <input
                        type="checkbox"
                        name="ids"
                        value={rs.map((x) => x.id).join(",")}
                        aria-label={rs.length > 1 ? `기록 ${rs.length}건 선택` : `기록 ${r.id} 선택`}
                        className="mt-0.5"
                      />
                    </td>
                    <td className="whitespace-nowrap">
                      <div className="text-sm font-medium text-foreground">
                        <TimeAgo value={r.created_at} />
                      </div>
                      <div className="mt-0.5 text-[11px] text-muted tabular-nums">{formatDate(r.created_at).replace(" KST", "")}</div>
                      <div className="mt-0.5 font-mono text-[11px] text-muted">#{rs.length > 1 ? `${oldest.id}–${r.id}` : r.id}</div>
                    </td>
                    <td className="max-w-md">
                      <div className="mb-1.5 flex items-center gap-1.5">
                        <TypeBadge type={r.qr_type} />
                        {rs.length > 1 ? (
                          <span className="rounded-md bg-amber-soft px-1.5 py-0.5 text-xs font-semibold text-amber tabular-nums" title="같은 사람이 같은 QR을 연달아 저장한 횟수">
                            ×{rs.length}
                          </span>
                        ) : null}
                        {span ? <span className="text-[11px] text-muted">{span}</span> : null}
                      </div>
                      <details className="group">
                        <summary className="cursor-pointer list-none rounded hover:text-accent">
                          <span className="block truncate font-medium text-foreground">{s.primary}</span>
                          {s.secondary ? <span className="mt-0.5 block truncate text-xs text-muted">{s.secondary}</span> : null}
                          <span className="mt-0.5 block text-[11px] text-accent group-open:hidden">자세히</span>
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
                      <ul className="space-y-1">
                        {events.map((e) => (
                          <li key={e.event} className="flex items-center gap-1.5">
                            <EventBadge event={e.event} />
                            {e.c > 1 || rs.length > 1 ? <span className="text-[11px] text-muted tabular-nums">{e.c}</span> : null}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="min-w-48">
                      <VisitorInfo acceptLanguage={r.accept_language} page={r.page} userAgent={r.user_agent} />
                      {r.ip ? (
                        <Link href={withQ(r.ip)} className="mt-1 block font-mono text-[11px] text-muted hover:text-accent" title="이 IP의 기록만 보기">
                          {r.ip}
                        </Link>
                      ) : null}
                    </td>
                  </tr>
                );
              })}
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-muted">
                    조건에 맞는 기록이 없습니다.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
          {rows.length > 0 ? (
            <InfiniteScroll
              key={view.toString()}
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
            {total.toLocaleString()}건 중 {Math.min(rows.length, total).toLocaleString()}건 표시
            {runs.length < rows.length ? ` (${runs.length.toLocaleString()}줄로 묶음)` : ""} · 아래로 내리면 자동으로 더 불러옵니다
          </span>
        </div>
      </form>
    </div>
  );
}
