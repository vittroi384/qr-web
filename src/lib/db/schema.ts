import { date, index, integer, jsonb, pgTable, primaryKey, serial, text, timestamp } from "drizzle-orm/pg-core";

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
    /** UI locale of the page the save happened on (from a same-origin Referer), e.g. "en", "ko". */
    locale: text("locale"),
    /** Unprefixed path of that page, e.g. "/", "/wifi-qr-code", "/batch". */
    page: text("page"),
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

/**
 * Anonymous funnel counters: one row per KST day × locale × QR type × step ("select", "preview",
 * "save"), incremented in place. No IP, user agent or content — only the count.
 */
export const funnelDaily = pgTable(
  "funnel_daily",
  {
    day: date("day", { mode: "string" }).notNull(),
    locale: text("locale").notNull(),
    qrType: text("qr_type").notNull(),
    step: text("step").notNull(),
    count: integer("count").notNull().default(0),
  },
  (t) => [primaryKey({ columns: [t.day, t.locale, t.qrType, t.step] })],
);

export type QrLog = typeof qrLogs.$inferSelect;
export type NewQrLog = typeof qrLogs.$inferInsert;
export type AdminAudit = typeof adminAudit.$inferSelect;
