import { DataTable } from "@/components/admin/DataTable";
import { InfiniteScroll } from "@/components/admin/InfiniteScroll";
import { num } from "@/components/admin/format";
import { MAX_ROWS, nextRows, rowsWanted, shownLabel } from "@/components/admin/paging";
import { PageTitle, formatDate } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/adminSession";
import { listAudit, type AuditRow } from "@/lib/audit";
import { SETTING_LABELS, type SettingKey } from "@/lib/settings";

const ACTION_LABELS: Record<string, string> = {
  login: "로그인",
  login_failed: "로그인 실패",
  logout: "로그아웃",
  settings_update: "설정 변경",
  logs_export: "기록 CSV 내보내기",
  logs_delete: "기록 삭제",
};

export default async function AuditPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  await requireAdmin();
  const n = rowsWanted((await searchParams).n);
  const { rows, total } = await listAudit(1, n);
  const next = nextRows(n, rows.length, total);

  return (
    <div className="space-y-4">
      <PageTitle title="감사 로그" note={<span className="tabular-nums">관리자 활동 {num(total)}건</span>} />
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        {/* Tablets: min width so the text columns are not squeezed to one letter. Phones: one labelled card per row. */}
        <DataTable<AuditRow>
          box=""
          tableClassName="table-stack sm:min-w-[52rem]"
          rows={rows}
          rowKey={(r) => r.id}
          rowClassName="align-top"
          empty="기록이 없습니다."
          columns={[
            { head: "시간 (KST)", className: "whitespace-nowrap text-muted tabular-nums", cell: (r) => formatDate(r.createdAt) },
            {
              head: "활동",
              className: "whitespace-nowrap",
              cell: (r) => <span className={r.action === "login_failed" ? "font-medium text-danger" : ""}>{ACTION_LABELS[r.action] ?? r.action}</span>,
            },
            { head: "항목", label: "항목", className: "text-xs", cell: (r) => (r.key ? (SETTING_LABELS[r.key as SettingKey] ?? r.key) : "") },
            { head: "이전 값", label: "이전 값", className: "max-w-xs text-xs break-all text-muted", cell: (r) => r.oldValue },
            { head: "새 값", label: "새 값", className: "max-w-xs text-xs break-all", cell: (r) => r.newValue },
            { head: "IP", label: "IP", className: "font-mono text-xs", cell: (r) => r.ip },
          ]}
        >
          {rows.length > 0 ? (
            <InfiniteScroll nextHref={next ? `/admin/audit?n=${next}` : null} loadedLabel={rows.length < total ? `최대 ${num(MAX_ROWS)}건까지 표시` : "모두 불러왔습니다"} />
          ) : null}
        </DataTable>
        <div className="flex items-center justify-end gap-3 border-t border-border bg-subtle px-4 py-3 text-sm text-muted">
          <span className="tabular-nums">{shownLabel(total, rows.length)}</span>
        </div>
      </div>
    </div>
  );
}
