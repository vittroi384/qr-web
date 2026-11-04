import type { ReactNode } from "react";
import Link from "next/link";
import { BarList, ColumnChart, Dot, KpiStrip, SOURCE_GROUP_COLOR, SOURCE_GROUP_ORDER, ShareBar, Tabs } from "@/components/admin/charts";
import { DataTable, MeterNum } from "@/components/admin/DataTable";
import { num as n, pct, perUser } from "@/components/admin/format";
import { EVENT_LABELS, Empty, ExcludedNote, PageTitle, Section, typeLabel } from "@/components/admin/ui";
import { LOCALE_NAMES, isLocale } from "@/lib/i18n/locales";
import { requireAdmin } from "@/lib/adminSession";
import { getStatsExclusion } from "@/lib/logs";
import { getStats, type FunnelRow, type SourceRow } from "@/lib/stats";
import { SOURCE_GROUP_LABELS, crawlerLabel, isAiCrawler, sourceGroup, sourceLabel } from "@/lib/traffic";

/** Save methods shown as matrix columns ("generate" is never logged). */
const SAVE_EVENTS = ["download_png", "download_svg", "copy", "print", "batch"] as const;
const UNKNOWN = "(알 수 없음)";

const localeLabel = (l: string | null) => (l && isLocale(l) ? `${l} · ${LOCALE_NAMES[l].full}` : (l ?? UNKNOWN));

type UsersRow = { key: string; label: ReactNode; users: number; saves: number; muted?: boolean; mono?: boolean };

/** Users · saves table shared by the type, language and page sections. */
function UsersTable({ head, rows }: { head: string; rows: UsersRow[] }) {
  const max = Math.max(1, ...rows.map((r) => r.users));
  return (
    <DataTable
      rows={rows}
      rowKey={(r) => r.key}
      columns={[
        {
          head,
          cell: (r) => r.label,
          className: (r) => `max-w-[9rem] truncate sm:max-w-xs ${r.muted ? "text-muted" : ""} ${r.mono ? "font-mono text-xs" : "whitespace-nowrap"}`,
        },
        { head: "사용자", num: true, cell: (r) => <MeterNum value={r.users} max={max} /> },
        { head: "저장", num: true, cell: (r) => n(r.saves) },
        { head: "1인당", num: true, mHide: true, className: "text-muted", cell: (r) => perUser(r.saves, r.users) },
      ]}
    />
  );
}

/** The page is split into tabs (`?tab=`) so each part fits about one screen; the KPI strip stays above all of them. */
const TABS = [
  { key: "overview", label: "개요" },
  { key: "traffic", label: "유입" },
  { key: "usage", label: "사용" },
  { key: "funnel", label: "퍼널" },
] as const;
type TabKey = (typeof TABS)[number]["key"];

type MatrixRow = { qrType: string; cells: Record<string, number>; total: number };

export default async function StatsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  await requireAdmin();
  const tabParam = (await searchParams).tab;
  const tab: TabKey = TABS.find((t) => t.key === tabParam)?.key ?? "overview";
  const exclusion = await getStatsExclusion();
  const s = await getStats(exclusion.where);
  const activeDays = s.byDay.filter((d) => d.c > 0).length;

  // qr_type × event matrix, rows sorted by their total.
  const matrix = new Map<string, Record<string, number>>();
  for (const r of s.byTypeEvent) {
    const row = matrix.get(r.qrType) ?? {};
    row[r.event] = (row[r.event] ?? 0) + r.c;
    matrix.set(r.qrType, row);
  }
  const matrixRows: MatrixRow[] = [...matrix.entries()]
    .map(([qrType, cells]) => ({ qrType, cells, total: Object.values(cells).reduce((a, b) => a + b, 0) }))
    .sort((a, b) => b.total - a.total);

  // Visits per source group (AI, search, …), in the fixed order and colours every admin page uses.
  const groupParts = SOURCE_GROUP_ORDER.map((g) => ({
    key: g,
    label: SOURCE_GROUP_LABELS[g],
    color: SOURCE_GROUP_COLOR[g],
    value: s.sources.filter((r) => sourceGroup(r.source) === g).reduce((sum, r) => sum + r.visits, 0),
  }));
  const maxVisits = Math.max(1, ...s.sources.map((r) => r.visits));

  const funnelTotals = s.funnel.reduce(
    (acc, r) => ({ select: acc.select + r.select, preview: acc.preview + r.preview, save: acc.save + r.save }),
    { select: 0, preview: 0, save: 0 },
  );
  const aiCrawls = s.crawlers.filter((r) => isAiCrawler(r.crawler)).reduce((sum, r) => sum + r.c, 0);
  const searchCrawls = s.crawlers.reduce((sum, r) => sum + r.c, 0) - aiCrawls;
  const funnelSteps = [
    { label: "선택", value: funnelTotals.select, rate: "" },
    { label: "미리보기", value: funnelTotals.preview, rate: pct(funnelTotals.preview, funnelTotals.select) },
    { label: "저장", value: funnelTotals.save, rate: pct(funnelTotals.save, funnelTotals.preview) },
  ];

  return (
    <div className="space-y-4 sm:space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-1">
        <PageTitle title="통계" note={`최근 ${s.days}일 · KST 기준`} />
        <ExcludedNote count={exclusion.count} />
      </div>

      <KpiStrip
        items={[
          { primary: true, label: "실사용자", value: n(s.users), hint: "저장한 IP 수" },
          { label: "저장", value: n(s.total), hint: `1인당 ${perUser(s.total, s.users)}건` },
          { label: "사용자가 있었던 날", value: `${n(activeDays)}일`, hint: `${s.days}일 중` },
          { label: "저장이 있었던 언어", value: n(s.byLocale.filter((r) => r.locale).length), hint: "언어판 수" },
          { label: "미리보기 → 저장", value: pct(funnelTotals.save, funnelTotals.preview), hint: `저장 ${n(funnelTotals.save)} / 미리보기 ${n(funnelTotals.preview)}` },
        ]}
      />

      <Tabs label="통계 보기" active={tab} tabs={TABS.map((t) => ({ key: t.key, label: t.label, href: t.key === "overview" ? "/admin/stats" : `/admin/stats?tab=${t.key}` }))} />

      {tab === "overview" ? (
        <>
          <Section title="일별 사용자" hint="그날 저장한 사람 수. 막대에 올리면 저장 건수도 보입니다.">
            {s.total === 0 ? (
              <Empty />
            ) : (
              <div className="px-4 pt-4 pb-3 sm:px-5">
                <ColumnChart
                  unit="일별 사용자"
                  height="h-40 lg:h-44"
                  items={s.byDay.map((d, i) => ({
                    key: d.day,
                    value: d.users,
                    // A date every 5 days, counted back from today so today is always labelled.
                    label: (s.byDay.length - 1 - i) % 5 === 0 ? d.day.slice(5) : undefined,
                    highlight: i === s.byDay.length - 1,
                    tip: `${d.day.slice(5)} · 사용자 ${n(d.users)}명 · 저장 ${n(d.c)}건`,
                  }))}
                />
              </div>
            )}
          </Section>

          <div className="grid gap-4 sm:gap-5 lg:grid-cols-2">
            <Section title="시간대 분포" hint="KST 0–23시 저장 건수. 해외 사용자가 많으면 한국 새벽에 몰립니다.">
              {s.total === 0 ? (
                <Empty />
              ) : (
                <div className="px-4 pt-4 pb-3 sm:px-5">
                  <ColumnChart
                    unit="시간대별 저장"
                    height="h-32 lg:h-52"
                    items={s.byHour.map((h) => ({ key: String(h.hour), value: h.c, label: h.hour % 3 === 0 ? `${h.hour}시` : undefined, tip: `${h.hour}시 · 저장 ${n(h.c)}건` }))}
                  />
                </div>
              )}
            </Section>

            <Section
              title="유입 한눈에"
              hint="방문이 어느 분류에서 왔는지와 상위 출처 5곳"
              aside={
                <Link href="/admin/stats?tab=traffic" className="link text-sm">
                  자세히
                </Link>
              }
            >
              {s.sources.length === 0 ? (
                <Empty />
              ) : (
                <div className="space-y-4 p-4 sm:px-5">
                  <ShareBar parts={groupParts} />
                  <BarList
                    items={s.sources.slice(0, 5).map((r) => ({
                      key: r.source,
                      label: sourceLabel(r.source),
                      color: SOURCE_GROUP_COLOR[sourceGroup(r.source)],
                      value: r.visits,
                      valueLabel: `방문 ${n(r.visits)}`,
                      sub: `저장 ${n(r.users)}명`,
                    }))}
                  />
                </div>
              )}
            </Section>
          </div>
        </>
      ) : null}

      {tab === "traffic" ? (
        <>
          <Section title="유입 출처" hint="방문자가 어디서 왔는지(브라우저 세션의 첫 페이지 기준). utm_source 꼬리표가 있으면 그것을, 없으면 이전 페이지 주소를 봅니다.">
            {s.sources.length === 0 ? (
              <Empty />
            ) : (
              <>
                <div className="p-4 sm:px-5">
                  <ShareBar parts={groupParts} />
                </div>
                <DataTable<SourceRow>
                  box="border-t border-border max-h-none"
                  rows={s.sources}
                  rowKey={(r) => r.source}
                  columns={[
                    {
                      head: "출처",
                      className: "max-w-[10rem] whitespace-nowrap sm:max-w-xs",
                      cell: (r) => (
                        <span className="flex min-w-0 items-center gap-2" title={SOURCE_GROUP_LABELS[sourceGroup(r.source)]}>
                          <Dot color={SOURCE_GROUP_COLOR[sourceGroup(r.source)]} />
                          <span className="truncate">{sourceLabel(r.source)}</span>
                        </span>
                      ),
                    },
                    { head: "분류", mHide: true, className: "whitespace-nowrap text-muted", cell: (r) => SOURCE_GROUP_LABELS[sourceGroup(r.source)] },
                    { head: "방문", num: true, cell: (r) => <MeterNum value={r.visits} max={maxVisits} width="w-10" /> },
                    { head: "저장한 사람", num: true, cell: (r) => n(r.users) },
                    { head: "저장", num: true, mHide: true, cell: (r) => n(r.saves) },
                    { head: "저장한 사람/방문", num: true, className: "text-muted", cell: (r) => pct(r.users, r.visits) },
                  ]}
                />
              </>
            )}
            <p className="border-t border-border px-4 py-3 text-xs leading-relaxed text-muted sm:px-5">
              방문은 브라우저 세션당 1회, IP 없이 숫자만 셉니다(그래서 내 IP 제외가 방문에는 적용되지 않습니다). 저장한 사람·저장은 입력 기록 기준입니다. 이 집계는 기능을 배포한 날부터 시작되었습니다. 앱 안 브라우저나 메신저에서 연 링크는 이전 페이지 주소가
              없어 &lsquo;직접&rsquo;으로 잡힙니다.
            </p>
          </Section>

          <div className={`grid items-start gap-4 sm:gap-5 ${s.legacySources.length > 0 ? "lg:grid-cols-2" : ""}`}>
            <Section title="크롤러 방문 (AI·검색)" hint="AI와 검색 엔진의 수집 봇이 페이지를 몇 번 가져갔는지. AI 답변에 인용되려면 먼저 이 봇들이 읽어 가야 합니다.">
              {s.crawlers.length === 0 ? (
                <Empty />
              ) : (
                <>
                  <div className="p-4 sm:px-5">
                    <ShareBar
                      parts={[
                        { key: "ai", label: "AI 봇", value: aiCrawls, color: SOURCE_GROUP_COLOR.ai },
                        { key: "search", label: "검색 봇", value: searchCrawls, color: SOURCE_GROUP_COLOR.search },
                      ]}
                    />
                  </div>
                  <DataTable
                    box="border-t border-border max-h-none"
                    rows={s.crawlers}
                    rowKey={(r) => r.crawler}
                    columns={[
                      {
                        head: "크롤러",
                        className: "max-w-[13rem] sm:max-w-none",
                        cell: (r) => (
                          <span className="flex min-w-0 items-center gap-2">
                            <Dot color={isAiCrawler(r.crawler) ? SOURCE_GROUP_COLOR.ai : SOURCE_GROUP_COLOR.search} />
                            <span className="truncate">{crawlerLabel(r.crawler)}</span>
                          </span>
                        ),
                      },
                      { head: "분류", className: "whitespace-nowrap text-muted", cell: (r) => (isAiCrawler(r.crawler) ? "AI" : "검색") },
                      { head: "페이지 요청", num: true, className: "font-medium", cell: (r) => n(r.c) },
                    ]}
                  />
                </>
              )}
            </Section>

            {s.legacySources.length > 0 ? (
              <Section title="예전 저장 기록의 utm_source" hint="출처 집계를 배포하기 전에 저장된 기록 중, 페이지 주소에 utm_source 꼬리표가 남아 있던 것만 (ChatGPT 링크에 붙음). 실제보다 적게 잡힙니다.">
                <UsersTable
                  head="utm_source"
                  rows={s.legacySources.map((r) => ({ key: r.source, label: `${sourceLabel(r.source)} · ${SOURCE_GROUP_LABELS[sourceGroup(r.source)]}`, users: r.users, saves: r.saves }))}
                />
              </Section>
            ) : null}
          </div>
        </>
      ) : null}

      {tab === "usage" ? (
        <div className="grid items-start gap-4 sm:gap-5 xl:grid-cols-2">
          <Section title="종류별 사용자" hint="어떤 기능을 몇 명이 썼는지. 1인당이 높으면 한 사람이 여러 번 뽑은 것입니다.">
            {s.usersByType.length === 0 ? (
              <Empty />
            ) : (
              <UsersTable
                head="종류"
                rows={s.usersByType.map((r) => ({
                  key: r.qrType,
                  label: (
                    <Link href={`/admin/logs?type=${encodeURIComponent(r.qrType)}`} className="hover:text-accent hover:underline">
                      {typeLabel(r.qrType)}
                    </Link>
                  ),
                  users: r.users,
                  saves: r.saves,
                }))}
              />
            )}
          </Section>

          <Section title="종류 × 저장 방식" hint="PNG·SVG·복사·인쇄 중 무엇으로 가져갔는지 (저장 건수)">
            {matrixRows.length === 0 ? (
              <Empty />
            ) : (
              <DataTable<MatrixRow>
                rows={matrixRows}
                rowKey={(r) => r.qrType}
                columns={[
                  { head: "종류", className: "max-w-[7rem] truncate sm:max-w-[10rem]", cell: (r) => <span title={typeLabel(r.qrType)}>{typeLabel(r.qrType)}</span> },
                  ...SAVE_EVENTS.map((e) => ({
                    head: EVENT_LABELS[e] ?? e,
                    num: true,
                    className: (r: MatrixRow) => (r.cells[e] ? "" : "text-muted"),
                    cell: (r: MatrixRow) => (r.cells[e] ? n(r.cells[e]) : "–"),
                  })),
                  { head: "합계", num: true, className: "font-medium", cell: (r) => n(r.total) },
                ]}
              />
            )}
          </Section>

          <Section title="언어별 사용자" hint="저장한 페이지의 언어판(/pt, /de …). 방문자 브라우저 언어는 입력 기록에 있습니다.">
            {s.byLocale.length === 0 ? (
              <Empty />
            ) : (
              <UsersTable head="언어판" rows={s.byLocale.map((r) => ({ key: r.locale ?? "", label: localeLabel(r.locale), users: r.users, saves: r.c, muted: !r.locale }))} />
            )}
          </Section>

          <Section title="페이지별 사용자" hint="어느 랜딩 페이지에서 저장했는지 = 어떤 검색어로 왔는지의 힌트. 상위 15">
            {s.byPage.length === 0 ? (
              <Empty />
            ) : (
              <UsersTable
                head="페이지 (언어 접두 제외)"
                rows={s.byPage.map((r) => ({ key: r.page ?? "", label: r.page ?? UNKNOWN, users: r.users, saves: r.c, muted: !r.page, mono: true }))}
              />
            )}
          </Section>
        </div>
      ) : null}

      {tab === "funnel" ? (
        <Section title="퍼널 (선택 → 미리보기 → 저장)" hint="종류를 고른 사람 중 몇 %가 미리보기까지, 또 저장까지 갔는지. 어디서 많이 이탈하는지 봅니다.">
          {s.funnel.length === 0 ? (
            <Empty />
          ) : (
            <>
              <ol className="grid gap-3 p-4 sm:grid-cols-3 sm:px-5">
                {funnelSteps.map((step, i) => (
                  <li key={step.label} className="rounded-lg border border-border bg-subtle px-4 py-3">
                    <p className="flex items-baseline justify-between gap-2 text-xs text-muted">
                      <span>
                        {i + 1}. {step.label}
                      </span>
                      {step.rate ? <span className="font-semibold text-accent tabular-nums">앞 단계의 {step.rate}</span> : null}
                    </p>
                    <p className="mt-0.5 text-xl font-semibold tabular-nums">{n(step.value)}</p>
                    <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-surface" aria-hidden="true">
                      <span className="block h-full rounded-full bg-accent/70" style={{ width: `${Math.min(100, Math.max(2, (step.value / Math.max(1, funnelTotals.select)) * 100))}%` }} />
                    </span>
                  </li>
                ))}
              </ol>
              <DataTable<FunnelRow>
                box="border-t border-border [--table-offset:26rem]"
                rows={s.funnel}
                rowKey={(r) => r.qrType}
                columns={[
                  { head: "종류", className: "max-w-[7rem] truncate sm:max-w-none sm:whitespace-nowrap", cell: (r) => typeLabel(r.qrType) },
                  { head: "선택", num: true, cell: (r) => n(r.select) },
                  { head: "미리보기", num: true, cell: (r) => n(r.preview) },
                  { head: "미리보기/선택", num: true, mHide: true, className: "text-muted", cell: (r) => pct(r.preview, r.select) },
                  { head: "저장", num: true, cell: (r) => n(r.save) },
                  { head: "저장/미리보기", num: true, className: "text-muted", cell: (r) => pct(r.save, r.preview) },
                ]}
              />
            </>
          )}
          <p className="border-t border-border px-4 py-3 text-xs leading-relaxed text-muted sm:px-5">
            선택은 방문자가 실제로 종류를 고른 때(타일 클릭·입력 시작·종류별 랜딩 진입)만, 미리보기는 QR이 처음 그려진 때만 세며 둘 다 브라우저 세션당 종류별 1회입니다. 저장은 모든 저장 건수(일괄 생성 포함)라 100%를 넘을 수 있습니다. 퍼널 집계는 이
            기능을 배포한 날부터 시작되었으며, IP·브라우저 등 개인 정보는 저장하지 않습니다. 그래서 내 IP 제외가 퍼널에는 적용되지 않습니다.
          </p>
        </Section>
      ) : null}
    </div>
  );
}
