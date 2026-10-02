import { count, desc } from "drizzle-orm";
import { db } from "./db";
import { adminAudit, type AdminAudit } from "./db/schema";

export type AuditAction =
  | "login"
  | "login_failed"
  | "logout"
  | "settings_update"
  | "logs_export"
  | "logs_delete";

export type AuditRow = AdminAudit;

export async function writeAudit(entry: {
  action: AuditAction;
  key?: string | null;
  oldValue?: string | null;
  newValue?: string | null;
  ip?: string | null;
  userAgent?: string | null;
}): Promise<void> {
  await db.insert(adminAudit).values({
    action: entry.action,
    key: entry.key ?? null,
    oldValue: entry.oldValue ?? null,
    newValue: entry.newValue ?? null,
    ip: entry.ip ?? null,
    userAgent: entry.userAgent ?? null,
  });
}

/** One page of the audit trail, newest first. */
export async function listAudit(page: number, pageSize: number): Promise<{ rows: AuditRow[]; total: number }> {
  const [[{ c: total }], rows] = await Promise.all([
    db.select({ c: count() }).from(adminAudit),
    db
      .select()
      .from(adminAudit)
      .orderBy(desc(adminAudit.id))
      .limit(pageSize)
      .offset((page - 1) * pageSize),
  ]);
  return { rows, total };
}
