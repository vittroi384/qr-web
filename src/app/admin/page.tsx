import Link from "next/link";
import { BarList, ColumnChart, KpiStrip } from "@/components/admin/charts";
import { num as n } from "@/components/admin/format";
import { ExcludedNote, PageTitle, Section, TimeAgo, TypeBadge, typeLabel } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/adminSession";
import { getDashboardStats, getStatsExclusion } from "@/lib/logs";
import { summarizeLog, visitorLanguage } from "@/lib/qr/summarize";
import { getSettings } from "@/lib/settings";
import { lastKstDays } from "@/lib/stats";
import { kstDayStart, kstToday } from "@/lib/time";
import { browserOf, groupVisitors } from "@/lib/visitors";

/** Visitor rows shown in the "최근 사용자" feed. */
const FEED_SIZE = 12;

export default async function AdminDashboard() {
  await requireAdmin();
  const settings = await getSettings();
  const exclusion = await getStatsExclusion();
  const stats = await getDashboardStats(Number.parseInt(settings.log_retention_days, 10) || 0, exclusion.where);

  const visitors = groupVisitors(stats.recent);
  const todayStart = kstDayStart(kstToday());
  const newToday = visitors.filter((v) => v.firstAt >= todayStart).length;
  const lastSave = visitors[0]?.lastAt;
  // Every one of the last 14 days, so quiet days show as gaps instead of disappearing.
  const dayRows = new Map(stats.byDay.map((d) => [d.day, d]));
  const byDay = lastKstDays(14).map((day) => ({ day, users: dayRows.get(day)?.users ?? 0, c: dayRows.get(day)?.c ?? 0 }));

  // One-line reminders for settings that look unfinished on a live site.
  const warnings: string[] = [];
  if (/^https?:\/\/localhost(?::\d+)?/i.test(settings.site_url)) {
    warnings.push("사이트 URL이 localhost입니다. sitemap·canonical·OG 링크가 실제 주소를 가리키도록 설정에서 바꾸세요.");
  }
  if (!settings.privacy_contact.trim()) {
    warnings.push("개인정보 문의 연락처가 비어 있어 개인정보처리방침에 문의 문장이 표시되지 않습니다. 설정에서 입력하세요.");
  }

  return (
    <div className="space-y-4 sm:space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-1">
        <PageTitle title="대시보드" note={lastSave ? <>마지막 저장 <TimeAgo value={lastSave} /></> : "아직 저장 없음"} />
        <ExcludedNote count={exclusion.count} />
      </div>

      {warnings.map((w) => (
        <p key={w} role="status" className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm text-amber-900">
          {w}{" "}
          <Link href="/admin/settings" className="link">
            설정으로
          </Link>
        </p>
      ))}

      {/* People first; saves are the supporting number. */}
      <KpiStrip
        items={[
          { primary: true, label: "오늘 사용자", value: n(stats.today.users), hint: `처음 온 사람 ${n(newToday)} · 저장 ${n(stats.today.saves)}건` },
          { primary: true, label: "최근 7일 사용자", value: n(stats.last7.users), hint: `저장 ${n(stats.last7.saves)}건` },
          { primary: true, label: "최근 30일 사용자", value: n(stats.last30.users), hint: `저장 ${n(stats.last30.saves)}건` },
          { label: "전체 기간", value: `${n(stats.all.users)}명`, hint: `저장 ${n(stats.all.saves)}건` },
        ]}
      />

      <div className="grid gap-4 sm:gap-5 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <Section title="최근 14일 사용자" aside="막대에 올리면 저장 수">
          <div className="px-4 pt-4 pb-3 sm:px-5">
            <ColumnChart
              unit="일별 사용자"
              height="h-40 lg:h-60"
              items={byDay.map((d, i) => ({
                key: d.day,
                value: d.users,
                // Every other date keeps 14 labels legible on a phone; today is always labelled.
                label: i % 2 === 1 ? d.day.slice(5) : undefined,
                highlight: i === byDay.length - 1,
                tip: `${d.day.slice(5)} · 사용자 ${n(d.users)}명 · 저장 ${n(d.c)}건`,
              }))}
            />
          </div>
        </Section>

        <Section title="많이 쓰는 기능" aside="최근 30일 · 사용자 수 순">
          <div className="px-4 pt-3 pb-4 sm:px-5">
            {stats.byType.length === 0 ? (
              <p className="py-6 text-center text-sm text-muted">아직 데이터가 없습니다.</p>
            ) : (
              <BarList
                items={stats.byType.slice(0, 8).map((t) => ({
                  key: t.qr_type,
                  label: typeLabel(t.qr_type),
                  value: t.users,
                  valueLabel: `${n(t.users)}명`,
                  sub: `${n(t.c)}건`,
                  href: `/admin/logs?type=${encodeURIComponent(t.qr_type)}`,
                }))}
              />
            )}
          </div>
        </Section>
      </div>

      <Section
        title="최근 사용자"
        hint="최근 30일 · 같은 IP는 한 사람으로 묶음"
        aside={
          <Link href="/admin/logs" className="link text-sm">
            전체 기록 보기
          </Link>
        }
      >
        {visitors.length === 0 ? (
          <p className="px-5 py-10 text-center text-sm text-muted">아직 기록이 없습니다. 메인 페이지에서 QR을 만들어 보세요.</p>
        ) : (
          // Hairline grid: one compact row per visitor, two columns on wide screens.
          <ul className="grid gap-px bg-border xl:grid-cols-2">
            {visitors.slice(0, FEED_SIZE).map((v) => {
              const s = summarizeLog(v.latest.qr_type, v.latest.payload_json);
              const isNew = v.firstAt >= todayStart;
              const device = browserOf(v.latest.user_agent);
              return (
                <li key={v.ip || "none"} className="relative flex min-w-0 flex-col gap-1 bg-card px-4 py-3 sm:flex-row sm:gap-3 sm:px-5">
                  {/* Phones: when · saves on one line above; wider screens: a narrow column on the left. */}
                  <div className="flex shrink-0 items-center gap-2 pr-10 text-xs sm:block sm:w-16 sm:pr-0">
                    <p className="font-medium text-foreground">
                      <TimeAgo value={v.lastAt} />
                    </p>
                    <p className="text-muted tabular-nums sm:mt-0.5">저장 {v.saves}회</p>
                    {isNew ? <p className="inline-block rounded bg-amber-soft px-1 py-px text-[11px] font-semibold text-amber sm:mt-1">오늘 처음</p> : null}
                  </div>
                  <div className="min-w-0 flex-1 sm:pr-8">
                    <p className="truncate text-sm font-medium" title={s.primary}>
                      {s.primary || "(내용 없음)"}
                      {s.secondary ? <span className="ml-1.5 text-xs font-normal text-muted">{s.secondary}</span> : null}
                    </p>
                    <div className="mt-1 flex flex-wrap items-center gap-1">
                      {v.types.map((t) => (
                        <span key={t.type} className="inline-flex items-center gap-0.5">
                          <TypeBadge type={t.type} />
                          {t.c > 1 ? <span className="text-[11px] text-muted tabular-nums">×{t.c}</span> : null}
                        </span>
                      ))}
                    </div>
                    <p className="mt-1 truncate text-xs text-muted" title={v.latest.user_agent ?? ""}>
                      {[visitorLanguage(v.latest.accept_language), device, v.latest.page].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                  {v.ip ? (
                    <Link href={`/admin/logs?q=${encodeURIComponent(v.ip)}`} className="link absolute top-3 right-4 text-xs whitespace-nowrap sm:right-5">
                      기록
                    </Link>
                  ) : null}
                </li>
              );
            })}
          </ul>
        )}
      </Section>
    </div>
  );
}
