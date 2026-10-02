import { getDb } from "./db";

export type AuditAction =
  | "login"
  | "login_failed"
  | "logout"
  | "settings_update"
  | "logs_export"
  | "logs_delete";

export function writeAudit(entry: {
  action: AuditAction;
  key?: string | null;
  oldValue?: string | null;
  newValue?: string | null;
  ip?: string | null;
  userAgent?: string | null;
}) {
  getDb()
    .prepare(
      "INSERT INTO admin_audit (action, key, old_value, new_value, ip, user_agent) VALUES (?, ?, ?, ?, ?, ?)",
    )
    .run(entry.action, entry.key ?? null, entry.oldValue ?? null, entry.newValue ?? null, entry.ip ?? null, entry.userAgent ?? null);
}
