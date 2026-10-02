import Link from "next/link";
import { EventBadge, PayloadSummary, StatCard, TypeBadge, formatDate } from "@/components/admin/ui";
import { getDashboardStats } from "@/lib/logs";
import { getSettings } from "@/lib/settings";
import { QR_TYPE_LABELS, type QrType } from "@/lib/qr/types";

export default async function AdminDashboard() {
  const stats = await getDashboardStats(Number.parseInt((await getSettings()).log_retention_days, 10) || 0);
  const maxDay = Math.max(1, ...stats.byDay.map((d) => d.c));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">대시보드</h1>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="오늘" value={stats.today.toLocaleString()} />
        <StatCard label="최근 7일" value={stats.last7.toLocaleString()} />
        <StatCard label="최근 30일" value={stats.last30.toLocaleString()} hint={`고유 IP ${stats.uniqueIps30.toLocaleString()}`} />
        <StatCard label="전체 기록" value={stats.total.toLocaleString()} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="card">
          <h2 className="text-[15px] font-semibold">최근 14일 추이</h2>
          <div className="mt-5 flex h-36 items-end gap-1.5">
            {stats.byDay.length === 0 ? <p className="text-sm text-muted">데이터 없음</p> : null}
            {stats.byDay.map((d) => (
              <div key={d.day} className="flex flex-1 flex-col items-center gap-1" title={`${d.day}: ${d.c}`}>
                <div className="w-full rounded-t-sm bg-accent/80 transition-colors hover:bg-accent" style={{ height: `${Math.max(4, (d.c / maxDay) * 100)}%` }} />
                <span className="text-[10px] text-muted tabular-nums">{d.day.slice(5)}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="card">
          <h2 className="text-[15px] font-semibold">종류별</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {stats.byType.length === 0 ? <li className="text-muted">데이터 없음</li> : null}
            {stats.byType.map((t) => (
              <li key={t.qr_type} className="flex items-center gap-3">
                <span className="w-24 shrink-0">{(QR_TYPE_LABELS as Record<string, string>)[t.qr_type as QrType] ?? t.qr_type}</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface">
                  <div className="h-full rounded-full bg-accent/80" style={{ width: `${(t.c / Math.max(1, stats.total)) * 100}%` }} />
                </div>
                <span className="w-12 text-right tabular-nums text-muted">{t.c}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between gap-3 px-5 py-4">
          <h2 className="text-[15px] font-semibold">최근 기록</h2>
          <Link href="/admin/logs" className="link text-sm">
            전체 보기
          </Link>
        </div>
        <div className="overflow-x-auto border-t border-border">
        <table className="table">
          <thead>
            <tr>
              <th>시간</th>
              <th>종류</th>
              <th>저장 방식</th>
              <th>내용</th>
              <th>IP</th>
            </tr>
          </thead>
          <tbody>
            {stats.recent.map((r) => (
              <tr key={r.id}>
                <td className="whitespace-nowrap text-muted tabular-nums">{formatDate(r.created_at)}</td>
                <td>
                  <TypeBadge type={r.qr_type} />
                </td>
                <td>
                  <EventBadge event={r.event} />
                </td>
                <td className="max-w-md truncate">
                  <PayloadSummary json={r.payload_json} />
                </td>
                <td className="font-mono text-xs">{r.ip}</td>
              </tr>
            ))}
            {stats.recent.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-10 text-center text-muted">
                  아직 기록이 없습니다. 메인 페이지에서 QR을 만들어 보세요.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
        </div>
      </section>
    </div>
  );
}
