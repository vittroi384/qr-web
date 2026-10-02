import Link from "next/link";
import { formatDate } from "@/components/admin/ui";
import { getDb, type AdminAuditRow } from "@/lib/db";
import { SETTING_LABELS, type SettingKey } from "@/lib/settings";

const PAGE_SIZE = 50;

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
  const page = Math.max(1, Number.parseInt(typeof sp.page === "string" ? sp.page : "1", 10) || 1);
  const db = getDb();
  const total = (db.prepare("SELECT COUNT(*) AS c FROM admin_audit").get() as { c: number }).c;
  const rows = db
    .prepare("SELECT * FROM admin_audit ORDER BY id DESC LIMIT ? OFFSET ?")
    .all(PAGE_SIZE, (page - 1) * PAGE_SIZE) as AdminAuditRow[];
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">
        감사 로그 <span className="text-sm font-normal text-muted">관리자 활동 {total.toLocaleString()}건</span>
      </h1>
      <div className="card overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead className="bg-background text-left text-xs text-muted">
            <tr>
              <th className="px-3 py-2">시간 (KST)</th>
              <th className="px-3 py-2">활동</th>
              <th className="px-3 py-2">항목</th>
              <th className="px-3 py-2">이전 값</th>
              <th className="px-3 py-2">새 값</th>
              <th className="px-3 py-2">IP</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-border align-top">
                <td className="whitespace-nowrap px-3 py-2 text-muted">{formatDate(r.created_at)}</td>
                <td className="whitespace-nowrap px-3 py-2">
                  <span className={r.action === "login_failed" ? "text-red-500" : ""}>{ACTION_LABELS[r.action] ?? r.action}</span>
                </td>
                <td className="px-3 py-2 text-xs">{r.key ? SETTING_LABELS[r.key as SettingKey] ?? r.key : ""}</td>
                <td className="max-w-xs break-all px-3 py-2 text-xs text-muted">{r.old_value}</td>
                <td className="max-w-xs break-all px-3 py-2 text-xs">{r.new_value}</td>
                <td className="px-3 py-2 font-mono text-xs">{r.ip}</td>
              </tr>
            ))}
            {rows.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-3 py-8 text-center text-muted">
                  기록이 없습니다.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
        <div className="flex items-center justify-end gap-2 border-t border-border px-3 py-2 text-sm text-muted">
          {page > 1 ? (
            <Link href={`/admin/audit?page=${page - 1}`} className="btn py-1 text-xs">
              ← 이전
            </Link>
          ) : null}
          <span>
            {page} / {pages}
          </span>
          {page < pages ? (
            <Link href={`/admin/audit?page=${page + 1}`} className="btn py-1 text-xs">
              다음 →
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
