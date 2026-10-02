import { index, jsonb, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

/** Every QR a visitor saved (PNG/SVG/copy/print/batch). Secrets are masked before insert. */
export const qrLogs = pgTable(
  "qr_logs",
  {
    id: serial("id").primaryKey(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    qrType: text("qr_type").notNull(),
    event: text("event").notNull(),
    payloadJson: jsonb("payload_json").$type<Record<string, unknown>>().notNull(),
    encodedPreview: text("encoded_preview"),
    optionsJson: jsonb("options_json").$type<Record<string, unknown>>(),
    ip: text("ip"),
    userAgent: text("user_agent"),
    referer: text("referer"),
    acceptLanguage: text("accept_language"),
  },
  (t) => [index("idx_qr_logs_created").on(t.createdAt), index("idx_qr_logs_type").on(t.qrType)],
);

/** Runtime-editable site settings (admin UI). Unset keys fall back to DEFAULT_SETTINGS. */
export const settings = pgTable("settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

/** Admin activity trail: logins, setting changes (old → new), exports, deletions. */
export const adminAudit = pgTable(
  "admin_audit",
  {
    id: serial("id").primaryKey(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    action: text("action").notNull(),
    key: text("key"),
    oldValue: text("old_value"),
    newValue: text("new_value"),
    ip: text("ip"),
    userAgent: text("user_agent"),
  },
  (t) => [index("idx_admin_audit_created").on(t.createdAt)],
);

export type QrLog = typeof qrLogs.$inferSelect;
export type NewQrLog = typeof qrLogs.$inferInsert;
export type AdminAudit = typeof adminAudit.$inferSelect;
