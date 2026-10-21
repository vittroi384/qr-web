import Link from "next/link";
import { ExcludedNote, PageTitle, StatCard, TimeAgo, TypeBadge, VisitorInfo } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/adminSession";
import { getDashboardStats, getStatsExclusion } from "@/lib/logs";
import { summarizeLog } from "@/lib/qr/summarize";
import { QR_TYPE_LABELS, type QrType } from "@/lib/qr/types";
import { getSettings } from "@/lib/settings";
import { lastKstDays } from "@/lib/stats";
import { kstDayStart, kstToday } from "@/lib/time";
import { groupVisitors } from "@/lib/visitors";

/** Visitor cards shown in the "최근 사용자" feed. */
const FEED_SIZE = 12;

const n = (v: number) => v.toLocaleString();

export default async function AdminDashboard() {
  await requireAdmin();
  const settings = await getSettings();
  const exclusion = await getStatsExclusion();
  const stats = await getDashboardStats(Number.parseInt(settings.log_retention_days, 10) || 0, exclusion.where);
  const maxTypeUsers = Math.max(1, ...stats.byType.map((t) => t.users));

  const visitors = groupVisitors(stats.recent);
  const todayStart = kstDayStart(kstToday());
  const newToday = visitors.filter((v) => v.firstAt >= todayStart).length;
  const lastSave = visitors[0]?.lastAt;
  // Every one of the last 14 days, so quiet days show as gaps instead of disappearing.
  const dayRows = new Map(stats.byDay.map((d) => [d.day, d]));
  const byDay = lastKstDays(14).map((day) => ({ day, users: dayRows.get(day)?.users ?? 0, c: dayRows.get(day)?.c ?? 0 }));
  const maxDay = Math.max(1, ...byDay.map((d) => d.users));

  // One-line reminders for settings that look unfinished on a live site.
  const warnings: string[] = [];
  if (/^https?:\/\/localhost(?::\d+)?/i.test(settings.site_url)) {
    warnings.push("사이트 URL이 localhost입니다. sitemap·canonical·OG 링크가 실제 주소를 가리키도록 설정에서 바꾸세요.");
  }
  if (!settings.privacy_contact.trim()) {
    warnings.push("개인정보 문의 연락처가 비어 있어 개인정보처리방침에 문의 문장이 표시되지 않습니다. 설정에서 입력하세요.");
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-1">
        <PageTitle title="대시보드" note={lastSave ? <>마지막 저장 <TimeAgo value={lastSave} /></> : "아직 저장 없음"} />
        <ExcludedNote count={exclusion.count} />
      </div>

      {warnings.map((w) => (
        <p key={w} role="status" className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          {w}{" "}
          <Link href="/admin/settings" className="link">
            설정으로
          </Link>
        </p>
      ))}

      {/* People first; saves are the supporting number. */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard primary label="오늘 사용자" value={n(stats.today.users)} hint={`처음 온 사람 ${n(newToday)} · 저장 ${n(stats.today.saves)}건`} />
        <StatCard primary label="최근 7일 사용자" value={n(stats.last7.users)} hint={`저장 ${n(stats.last7.saves)}건`} />
        <StatCard primary label="최근 30일 사용자" value={n(stats.last30.users)} hint={`저장 ${n(stats.last30.saves)}건`} />
        <StatCard label="전체 기간" value={`${n(stats.all.users)}명`} hint={`저장 ${n(stats.all.saves)}건`} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="card">
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="text-[15px] font-semibold">최근 14일 사용자</h2>
            <span className="text-xs text-muted">막대 위에 올리면 저장 수</span>
          </div>
          <div className="mt-5 flex h-44 items-end gap-1">
            {byDay.map((d, i) => (
              <div key={d.day} className="flex flex-1 flex-col items-center gap-1" title={`${d.day}: 사용자 ${d.users}명 · 저장 ${d.c}건`}>
                <span className={`text-[10px] font-medium tabular-nums ${d.users ? "text-foreground" : "text-transparent"}`}>{d.users}</span>
                {/* Pixel height: a % here would resolve against the auto-height column and collapse. */}
                <div
                  className={`w-full rounded-t-sm transition-colors ${d.users ? "bg-accent/80 hover:bg-accent" : "bg-surface"}`}
                  style={{ height: d.users ? `${Math.max(4, Math.round((d.users / maxDay) * 120))}px` : "2px" }}
                />
                {/* Every other label keeps 14 dates legible on a phone. */}
                <span className={`text-[10px] text-muted tabular-nums ${i % 2 === 1 ? "max-sm:invisible" : ""}`}>{d.day.slice(5)}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="card">
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="text-[15px] font-semibold">많이 쓰는 기능</h2>
            <span className="text-xs text-muted">최근 30일 · 사용자 수 순</span>
          </div>
          <ul className="mt-5 space-y-3 text-sm">
            {stats.byType.length === 0 ? <li className="text-muted">데이터 없음</li> : null}
            {stats.byType.slice(0, 8).map((t) => (
              <li key={t.qr_type}>
                <Link href={`/admin/logs?type=${encodeURIComponent(t.qr_type)}`} className="-mx-2 flex items-center gap-3 rounded-md px-2 py-0.5 transition-colors hover:bg-subtle">
                  <span className="w-32 shrink-0 truncate">{(QR_TYPE_LABELS as Record<string, string>)[t.qr_type as QrType] ?? t.qr_type}</span>
                  <span className="h-2 flex-1 overflow-hidden rounded-full bg-surface">
                    <span className="block h-full rounded-full bg-accent/80" style={{ width: `${Math.max(4, (t.users / maxTypeUsers) * 100)}%` }} />
                  </span>
                  <span className="w-24 shrink-0 text-right text-xs tabular-nums">
                    <span className="font-semibold text-foreground">{n(t.users)}명</span>
                    <span className="text-muted"> · {n(t.c)}건</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section aria-labelledby="feed-heading">
        <div className="mb-3 flex flex-wrap items-baseline justify-between gap-3">
          <h2 id="feed-heading" className="text-[15px] font-semibold">
            최근 사용자 <span className="ml-1 text-xs font-normal text-muted">최근 30일 · 같은 IP는 한 사람으로 묶음</span>
          </h2>
          <Link href="/admin/logs" className="link text-sm">
            전체 기록 보기
          </Link>
        </div>
        {visitors.length === 0 ? (
          <p className="card text-center text-sm text-muted">아직 기록이 없습니다. 메인 페이지에서 QR을 만들어 보세요.</p>
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {visitors.slice(0, FEED_SIZE).map((v) => {
              const s = summarizeLog(v.latest.qr_type, v.latest.payload_json);
              const isNew = v.firstAt >= todayStart;
              return (
                <li key={v.ip || "none"} className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4">
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="flex items-center gap-1.5">
                      {isNew ? <span className="rounded bg-amber-soft px-1.5 py-0.5 font-semibold text-amber">오늘 처음</span> : null}
                      <span className="font-semibold text-foreground tabular-nums">저장 {v.saves}회</span>
                    </span>
                    <span className="text-muted">
                      <TimeAgo value={v.lastAt} />
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium" title={s.primary}>
                      {s.primary || "(내용 없음)"}
                    </p>
                    {s.secondary ? (
                      <p className="mt-0.5 truncate text-xs text-muted" title={s.secondary}>
                        {s.secondary}
                      </p>
                    ) : null}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {v.types.map((t) => (
                      <span key={t.type} className="inline-flex items-center gap-1">
                        <TypeBadge type={t.type} />
                        {t.c > 1 ? <span className="text-[11px] text-muted tabular-nums">×{t.c}</span> : null}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto flex items-end justify-between gap-3 border-t border-border pt-3">
                    <VisitorInfo acceptLanguage={v.latest.accept_language} page={v.latest.page} userAgent={v.latest.user_agent} />
                    {v.ip ? (
                      <Link href={`/admin/logs?q=${encodeURIComponent(v.ip)}`} className="link shrink-0 text-xs whitespace-nowrap">
                        기록 보기
                      </Link>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
