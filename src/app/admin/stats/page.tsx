import type { ReactNode } from "react";
import Link from "next/link";
import { EVENT_LABELS, ExcludedNote, PageTitle, StatCard } from "@/components/admin/ui";
import { LOCALE_NAMES, isLocale } from "@/lib/i18n/locales";
import { QR_TYPE_LABELS, type QrType } from "@/lib/qr/types";
import { requireAdmin } from "@/lib/adminSession";
import { getStatsExclusion } from "@/lib/logs";
import { getStats } from "@/lib/stats";
import { SOURCE_GROUP_LABELS, crawlerLabel, isAiCrawler, sourceGroup, sourceLabel, type SourceGroup } from "@/lib/traffic";

/** Save methods shown as matrix columns ("generate" is never logged). */
const SAVE_EVENTS = ["download_png", "download_svg", "copy", "print", "batch"] as const;
const UNKNOWN = "(알 수 없음)";

const typeLabel = (t: string) => (QR_TYPE_LABELS as Record<string, string>)[t as QrType] ?? t;
const localeLabel = (l: string | null) => (l && isLocale(l) ? `${l} · ${LOCALE_NAMES[l].full}` : (l ?? UNKNOWN));
const n = (v: number) => v.toLocaleString();
const pct = (part: number, whole: number) => (whole > 0 ? `${((part / whole) * 100).toFixed(1)}%` : "–");
const perUser = (saves: number, users: number) => (users > 0 ? (saves / users).toFixed(1) : "–");

/** `hint` says in one line what the section answers, so the page reads without a manual. */
function Section({ title, hint, children }: { title: string; hint?: string; children: ReactNode }) {
  return (
    <section className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="px-5 py-4">
        <h2 className="text-[15px] font-semibold">{title}</h2>
        {hint ? <p className="mt-0.5 text-xs text-muted">{hint}</p> : null}
      </div>
      <div className="border-t border-border">{children}</div>
    </section>
  );
}

function Empty() {
  return <p className="px-5 py-10 text-center text-sm text-muted">아직 데이터가 없습니다.</p>;
}

/** Inline bar behind a number, relative to the column's largest value. */
function Meter({ value, max }: { value: number; max: number }) {
  return (
    <span className="ml-auto block h-1.5 w-16 overflow-hidden rounded-full bg-surface" aria-hidden="true">
      <span className="block h-full rounded-full bg-accent/70" style={{ width: `${Math.max(4, (value / Math.max(1, max)) * 100)}%` }} />
    </span>
  );
}

/** Vertical CSS bars (no chart library); each bar carries a hover title. */
function Bars({ items, height }: { items: { key: string; c: number; title: string }[]; height: string }) {
  const max = Math.max(1, ...items.map((i) => i.c));
  return (
    <div className={`flex items-end gap-0.5 sm:gap-1 ${height}`}>
      {items.map((i) => (
        <div key={i.key} className="flex h-full flex-1 items-end" title={i.title}>
          <div
            className={`w-full rounded-t-sm transition-colors ${i.c ? "bg-accent/80 hover:bg-accent" : "bg-surface"}`}
            style={{ height: i.c ? `${Math.max(3, (i.c / max) * 100)}%` : "2px" }}
          />
        </div>
      ))}
    </div>
  );
}

/** Users · saves table shared by the type, language and page sections. */
function UsersTable({ head, rows }: { head: string; rows: { key: string; label: ReactNode; users: number; saves: number; muted?: boolean; mono?: boolean }[] }) {
  const max = Math.max(1, ...rows.map((r) => r.users));
  return (
    <div className="table-scroll [--table-offset:20rem]">
      <table className="table">
        <thead>
          <tr>
            <th>{head}</th>
            <th className="text-right">사용자</th>
            <th className="text-right">저장</th>
            <th className="text-right">1인당</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.key}>
              <td className={`max-w-xs truncate ${r.muted ? "text-muted" : ""} ${r.mono ? "font-mono text-xs" : "whitespace-nowrap"}`}>{r.label}</td>
              <td className="text-right tabular-nums">
                <span className="flex items-center justify-end gap-2">
                  <Meter value={r.users} max={max} />
                  <span className="w-8 font-semibold">{n(r.users)}</span>
                </span>
              </td>
              <td className="text-right tabular-nums">{n(r.saves)}</td>
              <td className="text-right text-muted tabular-nums">{perUser(r.saves, r.users)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

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
  const matrixRows = [...matrix.entries()]
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
            <div className="table-scroll border-t border-border [--table-offset:20rem]">
              <table className="table">
                <thead>
                  <tr>
                    <th>출처</th>
                    <th>분류</th>
                    <th className="text-right">방문</th>
                    <th className="text-right">저장한 사람</th>
                    <th className="text-right">저장</th>
                    <th className="text-right">저장한 사람/방문</th>
                  </tr>
                </thead>
                <tbody>
                  {s.sources.map((r) => (
                    <tr key={r.source}>
                      <td className="max-w-xs truncate whitespace-nowrap">{sourceLabel(r.source)}</td>
                      <td className="whitespace-nowrap text-muted">{SOURCE_GROUP_LABELS[sourceGroup(r.source)]}</td>
                      <td className="text-right tabular-nums">
                        <span className="flex items-center justify-end gap-2">
                          <Meter value={r.visits} max={maxVisits} />
                          <span className="w-10 font-semibold">{n(r.visits)}</span>
                        </span>
                      </td>
                      <td className="text-right tabular-nums">{n(r.users)}</td>
                      <td className="text-right tabular-nums">{n(r.saves)}</td>
                      <td className="text-right text-muted tabular-nums">{pct(r.users, r.visits)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
          <div className="table-scroll [--table-offset:20rem]">
            <table className="table">
              <thead>
                <tr>
                  <th>종류</th>
                  {SAVE_EVENTS.map((e) => (
                    <th key={e} className="text-right">
                      {EVENT_LABELS[e] ?? e}
                    </th>
                  ))}
                  <th className="text-right">합계</th>
                </tr>
              </thead>
              <tbody>
                {matrixRows.map((r) => (
                  <tr key={r.qrType}>
                    <td className="whitespace-nowrap">{typeLabel(r.qrType)}</td>
                    {SAVE_EVENTS.map((e) => (
                      <td key={e} className={`text-right tabular-nums ${r.cells[e] ? "" : "text-muted"}`}>
                        {r.cells[e] ? n(r.cells[e]) : "–"}
                      </td>
                    ))}
                    <td className="text-right font-medium tabular-nums">{n(r.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
          <div className="table-scroll [--table-offset:20rem]">
            <table className="table">
              <thead>
                <tr>
                  <th>종류</th>
                  <th className="text-right">선택</th>
                  <th className="text-right">미리보기</th>
                  <th className="text-right">미리보기/선택</th>
                  <th className="text-right">저장</th>
                  <th className="text-right">저장/미리보기</th>
                </tr>
              </thead>
              <tbody>
                {s.funnel.map((r) => (
                  <tr key={r.qrType}>
                    <td className="whitespace-nowrap">{typeLabel(r.qrType)}</td>
                    <td className="text-right tabular-nums">{n(r.select)}</td>
                    <td className="text-right tabular-nums">{n(r.preview)}</td>
                    <td className="text-right text-muted tabular-nums">{pct(r.preview, r.select)}</td>
                    <td className="text-right tabular-nums">{n(r.save)}</td>
                    <td className="text-right text-muted tabular-nums">{pct(r.save, r.preview)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
          <div className="table-scroll [--table-offset:20rem]">
            <table className="table">
              <thead>
                <tr>
                  <th>크롤러</th>
                  <th>분류</th>
                  <th className="text-right">페이지 요청</th>
                </tr>
              </thead>
              <tbody>
                {s.crawlers.map((r) => (
                  <tr key={r.crawler}>
                    <td className="whitespace-nowrap">{crawlerLabel(r.crawler)}</td>
                    <td className={`whitespace-nowrap ${isAiCrawler(r.crawler) ? "text-accent" : "text-muted"}`}>{isAiCrawler(r.crawler) ? "AI" : "검색"}</td>
                    <td className="text-right font-medium tabular-nums">{n(r.c)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Section>
    </div>
  );
}
