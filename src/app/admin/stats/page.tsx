import type { ReactNode } from "react";
import Link from "next/link";
import { DataTable, MeterNum } from "@/components/admin/DataTable";
import { num as n, pct, perUser } from "@/components/admin/format";
import { Bars, EVENT_LABELS, Empty, ExcludedNote, PageTitle, Section, StatCard, typeLabel } from "@/components/admin/ui";
import { LOCALE_NAMES, isLocale } from "@/lib/i18n/locales";
import { requireAdmin } from "@/lib/adminSession";
import { getStatsExclusion } from "@/lib/logs";
import { getStats, type FunnelRow, type SourceRow } from "@/lib/stats";
import { SOURCE_GROUP_LABELS, crawlerLabel, isAiCrawler, sourceGroup, sourceLabel, type SourceGroup } from "@/lib/traffic";

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

type MatrixRow = { qrType: string; cells: Record<string, number>; total: number };

export default async function StatsPage() {
  await requireAdmin();
  const exclusion = await getStatsExclusion();
  const s = await getStats(exclusion.where);
  const maxDay = Math.max(0, ...s.byDay.map((d) => d.users));
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

  // Visits per source group (AI, search, …) for the summary line above the sources table.
  const GROUPS: SourceGroup[] = ["ai", "search", "social", "direct", "other"];
  const groupVisits = GROUPS.map((g) => ({ g, visits: s.sources.filter((r) => sourceGroup(r.source) === g).reduce((sum, r) => sum + r.visits, 0) }));
  const totalVisits = groupVisits.reduce((sum, g) => sum + g.visits, 0);
  const maxVisits = Math.max(1, ...s.sources.map((r) => r.visits));

  const funnelTotals = s.funnel.reduce(
    (acc, r) => ({ select: acc.select + r.select, preview: acc.preview + r.preview, save: acc.save + r.save }),
    { select: 0, preview: 0, save: 0 },
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-1">
        <PageTitle title="통계" note={`최근 ${s.days}일 · KST 기준`} />
        <ExcludedNote count={exclusion.count} />
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        <StatCard primary label="실사용자" value={n(s.users)} hint="저장한 IP 수" />
        <StatCard label="저장" value={n(s.total)} hint={`1인당 ${perUser(s.total, s.users)}건`} />
        <StatCard label="사용자가 있었던 날" value={`${n(activeDays)}일`} hint={`${s.days}일 중`} />
        <StatCard label="저장이 있었던 언어" value={n(s.byLocale.filter((r) => r.locale).length)} />
        <StatCard
          label="미리보기 → 저장"
          value={pct(funnelTotals.save, funnelTotals.preview)}
          hint={`저장 ${n(funnelTotals.save)} / 미리보기 ${n(funnelTotals.preview)}`}
        />
      </div>

      <Section title="일별 사용자" hint="그날 저장한 사람 수. 막대에 올리면 저장 건수도 보입니다.">
        {s.total === 0 ? (
          <Empty />
        ) : (
          <div className="px-5 pt-5 pb-4">
            <Bars height="h-40" items={s.byDay.map((d) => ({ key: d.day, c: d.users, title: `${d.day}: 사용자 ${n(d.users)}명 · 저장 ${n(d.c)}건` }))} />
            <div className="mt-1.5 flex justify-between text-[10px] text-muted tabular-nums">
              <span>{s.byDay[0].day.slice(5)}</span>
              <span>최대 {n(maxDay)}명/일</span>
              <span>{s.byDay[s.byDay.length - 1].day.slice(5)}</span>
            </div>
          </div>
        )}
      </Section>

      <Section title="유입 출처" hint="방문자가 어디서 왔는지(브라우저 세션의 첫 페이지 기준). utm_source 꼬리표가 있으면 그것을, 없으면 이전 페이지 주소를 봅니다.">
        {s.sources.length === 0 ? (
          <Empty />
        ) : (
          <>
            <div className="flex flex-wrap gap-x-5 gap-y-1 px-5 py-3 text-sm">
              {groupVisits.map(({ g, visits }) => (
                <span key={g} className={g === "ai" ? "font-semibold text-accent" : "text-muted"}>
                  {SOURCE_GROUP_LABELS[g]} {n(visits)} <span className="text-xs">({pct(visits, totalVisits)})</span>
                </span>
              ))}
            </div>
            <DataTable<SourceRow>
              box="border-t border-border [--table-offset:20rem]"
              rows={s.sources}
              rowKey={(r) => r.source}
              columns={[
                { head: "출처", className: "max-w-[9rem] truncate whitespace-nowrap sm:max-w-xs", cell: (r) => sourceLabel(r.source) },
                { head: "분류", mHide: true, className: "whitespace-nowrap text-muted", cell: (r) => SOURCE_GROUP_LABELS[sourceGroup(r.source)] },
                { head: "방문", num: true, cell: (r) => <MeterNum value={r.visits} max={maxVisits} width="w-10" /> },
                { head: "저장한 사람", num: true, cell: (r) => n(r.users) },
                { head: "저장", num: true, mHide: true, cell: (r) => n(r.saves) },
                { head: "저장한 사람/방문", num: true, className: "text-muted", cell: (r) => pct(r.users, r.visits) },
              ]}
            />
          </>
        )}
        <p className="border-t border-border px-5 py-3 text-xs text-muted">
          방문은 브라우저 세션당 1회, IP 없이 숫자만 셉니다(그래서 내 IP 제외가 방문에는 적용되지 않습니다). 저장한 사람·저장은 입력 기록 기준입니다. 이 집계는 기능을 배포한 날부터 시작되었습니다. 앱 안 브라우저나 메신저에서 연 링크는 이전 페이지 주소가 없어
          &lsquo;직접&rsquo;으로 잡힙니다.
        </p>
      </Section>

      {s.legacySources.length > 0 ? (
        <Section title="예전 저장 기록의 utm_source" hint="출처 집계를 배포하기 전에 저장된 기록 중, 페이지 주소에 utm_source 꼬리표가 남아 있던 것만 (ChatGPT 링크에 붙음). 실제보다 적게 잡힙니다.">
          <UsersTable
            head="utm_source"
            rows={s.legacySources.map((r) => ({ key: r.source, label: `${sourceLabel(r.source)} · ${SOURCE_GROUP_LABELS[sourceGroup(r.source)]}`, users: r.users, saves: r.saves }))}
          />
        </Section>
      ) : null}

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

      <div className="grid gap-6 lg:grid-cols-2">
        <Section title="언어별 사용자" hint="저장한 페이지의 언어판(/pt, /de …). 방문자 브라우저 언어는 입력 기록에 있습니다.">
          {s.byLocale.length === 0 ? (
            <Empty />
          ) : (
            <UsersTable
              head="언어판"
              rows={s.byLocale.map((r) => ({ key: r.locale ?? "", label: localeLabel(r.locale), users: r.users, saves: r.c, muted: !r.locale }))}
            />
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

      <Section title="종류 × 저장 방식" hint="PNG·SVG·복사·인쇄 중 무엇으로 가져갔는지 (저장 건수)">
        {matrixRows.length === 0 ? (
          <Empty />
        ) : (
          <DataTable<MatrixRow>
            rows={matrixRows}
            rowKey={(r) => r.qrType}
            columns={[
              { head: "종류", className: "max-w-[7rem] sm:max-w-none sm:whitespace-nowrap", cell: (r) => typeLabel(r.qrType) },
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

      <Section title="시간대 분포" hint="KST 0–23시 저장 건수. 해외 사용자가 많으면 한국 새벽에 몰립니다.">
        {s.total === 0 ? (
          <Empty />
        ) : (
          <div className="px-5 pt-5 pb-4">
            <Bars height="h-24" items={s.byHour.map((h) => ({ key: String(h.hour), c: h.c, title: `${h.hour}시: ${n(h.c)}건` }))} />
            <div className="mt-1.5 flex gap-0.5 text-[10px] text-muted tabular-nums sm:gap-1">
              {s.byHour.map((h) => (
                <span key={h.hour} className="flex-1 text-center">
                  {h.hour % 3 === 0 ? h.hour : ""}
                </span>
              ))}
            </div>
          </div>
        )}
      </Section>

      <Section title="퍼널 (선택 → 미리보기 → 저장)" hint="종류를 고른 사람 중 몇 %가 미리보기까지, 또 저장까지 갔는지. 어디서 많이 이탈하는지 봅니다.">
        {s.funnel.length === 0 ? (
          <Empty />
        ) : (
          <DataTable<FunnelRow>
            rows={s.funnel}
            rowKey={(r) => r.qrType}
            columns={[
              { head: "종류", className: "whitespace-nowrap", cell: (r) => typeLabel(r.qrType) },
              { head: "선택", num: true, cell: (r) => n(r.select) },
              { head: "미리보기", num: true, cell: (r) => n(r.preview) },
              { head: "미리보기/선택", num: true, mHide: true, className: "text-muted", cell: (r) => pct(r.preview, r.select) },
              { head: "저장", num: true, cell: (r) => n(r.save) },
              { head: "저장/미리보기", num: true, className: "text-muted", cell: (r) => pct(r.save, r.preview) },
            ]}
          />
        )}
        <p className="border-t border-border px-5 py-3 text-xs text-muted">
          선택은 방문자가 실제로 종류를 고른 때(타일 클릭·입력 시작·종류별 랜딩 진입)만, 미리보기는 QR이 처음 그려진 때만 세며 둘 다 브라우저 세션당 종류별 1회입니다. 저장은 모든 저장 건수(일괄 생성 포함)라 100%를 넘을 수 있습니다. 퍼널 집계는
          이 기능을 배포한 날부터 시작되었으며, IP·브라우저 등 개인 정보는 저장하지 않습니다. 그래서 내 IP 제외가 퍼널에는 적용되지 않습니다.
        </p>
      </Section>

      <Section title="크롤러 방문 (AI·검색)" hint="AI와 검색 엔진의 수집 봇이 페이지를 몇 번 가져갔는지. AI 답변에 인용되려면 먼저 이 봇들이 읽어 가야 합니다.">
        {s.crawlers.length === 0 ? (
          <Empty />
        ) : (
          <DataTable
            rows={s.crawlers}
            rowKey={(r) => r.crawler}
            columns={[
              { head: "크롤러", className: "whitespace-nowrap", cell: (r) => crawlerLabel(r.crawler) },
              { head: "분류", className: (r) => `whitespace-nowrap ${isAiCrawler(r.crawler) ? "text-accent" : "text-muted"}`, cell: (r) => (isAiCrawler(r.crawler) ? "AI" : "검색") },
              { head: "페이지 요청", num: true, className: "font-medium", cell: (r) => n(r.c) },
            ]}
          />
        )}
      </Section>
    </div>
  );
}
