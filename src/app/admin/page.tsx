import Link from "next/link";
import { EVENT_LABELS, EventBadge, PayloadSummary, StatCard, TypeBadge, formatDate } from "@/components/admin/ui";
import { getDashboardStats } from "@/lib/logs";
import { QR_TYPE_LABELS, type QrType } from "@/lib/qr/types";

export default function AdminDashboard() {
  const stats = getDashboardStats();
  const maxDay = Math.max(1, ...stats.byDay.map((d) => d.c));

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">대시보드</h1>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard label="오늘" value={stats.today.toLocaleString()} />
        <StatCard label="최근 7일" value={stats.last7.toLocaleString()} />
        <StatCard label="최근 30일" value={stats.last30.toLocaleString()} hint={`고유 IP ${stats.uniqueIps30.toLocaleString()}`} />
        <StatCard label="전체 기록" value={stats.total.toLocaleString()} />
        <StatCard
          label="이벤트"
          value={
            <span className="text-sm font-normal">
              {stats.byEvent.map((e) => `${EVENT_LABELS[e.event] ?? e.event} ${e.c}`).join(" · ") || "-"}
            </span>
          }
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="card">
          <h2 className="font-semibold">최근 14일 추이</h2>
          <div className="mt-4 flex h-32 items-end gap-1">
            {stats.byDay.length === 0 ? <p className="text-sm text-muted">데이터 없음</p> : null}
            {stats.byDay.map((d) => (
              <div key={d.day} className="flex flex-1 flex-col items-center gap-1" title={`${d.day}: ${d.c}`}>
                <div className="w-full rounded-t bg-accent/70" style={{ height: `${Math.max(4, (d.c / maxDay) * 100)}%` }} />
                <span className="text-[10px] text-muted">{d.day.slice(5)}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="card">
          <h2 className="font-semibold">종류별</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {stats.byType.length === 0 ? <li className="text-muted">데이터 없음</li> : null}
            {stats.byType.map((t) => (
              <li key={t.qr_type} className="flex items-center gap-3">
                <span className="w-24 shrink-0">{(QR_TYPE_LABELS as Record<string, string>)[t.qr_type as QrType] ?? t.qr_type}</span>
                <div className="h-2 flex-1 overflow-hidden rounded bg-background">
                  <div className="h-full bg-accent/70" style={{ width: `${(t.c / Math.max(1, stats.total)) * 100}%` }} />
                </div>
                <span className="w-12 text-right tabular-nums text-muted">{t.c}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="card overflow-x-auto">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">최근 기록</h2>
          <Link href="/admin/logs" className="text-sm text-accent hover:underline">
            전체 보기 →
          </Link>
        </div>
        <table className="mt-3 w-full text-sm">
          <thead className="text-left text-xs text-muted">
            <tr>
              <th className="py-1.5 pr-3">시간</th>
              <th className="py-1.5 pr-3">종류</th>
              <th className="py-1.5 pr-3">이벤트</th>
              <th className="py-1.5 pr-3">내용</th>
              <th className="py-1.5">IP</th>
            </tr>
          </thead>
          <tbody>
            {stats.recent.map((r) => (
              <tr key={r.id} className="border-t border-border">
                <td className="whitespace-nowrap py-1.5 pr-3 text-muted">{formatDate(r.created_at)}</td>
                <td className="py-1.5 pr-3">
                  <TypeBadge type={r.qr_type} />
                </td>
                <td className="py-1.5 pr-3">
                  <EventBadge event={r.event} />
                </td>
                <td className="max-w-md truncate py-1.5 pr-3">
                  <PayloadSummary json={r.payload_json} />
                </td>
                <td className="py-1.5 font-mono text-xs">{r.ip}</td>
              </tr>
            ))}
            {stats.recent.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-6 text-center text-muted">
                  아직 기록이 없습니다. 메인 페이지에서 QR을 만들어 보세요.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </section>
    </div>
  );
}
