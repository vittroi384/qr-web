import { InfiniteScroll } from "@/components/admin/InfiniteScroll";
import { formatDate } from "@/components/admin/ui";
import { listAudit } from "@/lib/audit";
import { SETTING_LABELS, type SettingKey } from "@/lib/settings";

/** Rows are appended ("더 불러오기") instead of paged; the table scrolls inside its card. */
const PAGE_STEP = 100;
const MAX_ROWS = 2000;

const ACTION_LABELS: Record<string, string> = {
  login: "로그인",
  login_failed: "로그인 실패",
  logout: "로그아웃",
  settings_update: "설정 변경",
  logs_export: "기록 CSV 내보내기",
  logs_delete: "기록 삭제",
};

export default async function AuditPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const wanted = Number.parseInt(typeof sp.n === "string" ? sp.n : "", 10);
  const n = Math.min(MAX_ROWS, Math.max(PAGE_STEP, Number.isFinite(wanted) ? wanted : PAGE_STEP));
  const { rows, total } = await listAudit(1, n);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold tracking-tight">
        감사 로그 <span className="ml-1 text-sm font-normal tracking-normal text-muted tabular-nums">관리자 활동 {total.toLocaleString()}건</span>
      </h1>
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="table-scroll">
          <table className="table">
            <thead>
              <tr>
                <th>시간 (KST)</th>
                <th>활동</th>
                <th>항목</th>
                <th>이전 값</th>
                <th>새 값</th>
                <th>IP</th>
              </tr>
            </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="align-top">
                <td className="whitespace-nowrap text-muted tabular-nums">{formatDate(r.createdAt)}</td>
                <td className="whitespace-nowrap">
                  <span className={r.action === "login_failed" ? "font-medium text-danger" : ""}>{ACTION_LABELS[r.action] ?? r.action}</span>
                </td>
                <td className="text-xs">{r.key ? SETTING_LABELS[r.key as SettingKey] ?? r.key : ""}</td>
                <td className="max-w-xs text-xs break-all text-muted">{r.oldValue}</td>
                <td className="max-w-xs text-xs break-all">{r.newValue}</td>
                <td className="font-mono text-xs">{r.ip}</td>
              </tr>
            ))}
            {rows.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-muted">
                  기록이 없습니다.
                </td>
              </tr>
            ) : null}
          </tbody>
          </table>
          {rows.length > 0 ? (
            <InfiniteScroll
              nextHref={rows.length < total && n < MAX_ROWS ? `/admin/audit?n=${Math.min(MAX_ROWS, n + PAGE_STEP)}` : null}
              loadedLabel={rows.length < total ? `최대 ${MAX_ROWS.toLocaleString()}건까지 표시` : "모두 불러왔습니다"}
            />
          ) : null}
        </div>
        <div className="flex items-center justify-end gap-3 border-t border-border bg-subtle px-4 py-3 text-sm text-muted">
          <span className="tabular-nums">
            {total.toLocaleString()}건 중 {Math.min(rows.length, total).toLocaleString()}건 표시 · 아래로 내리면 자동으로 더 불러옵니다
          </span>
        </div>
      </div>
    </div>
  );
}
