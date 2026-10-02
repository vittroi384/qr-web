export const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS qr_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  qr_type TEXT NOT NULL,
  event TEXT NOT NULL,
  payload_json TEXT NOT NULL,
  encoded_preview TEXT,
  options_json TEXT,
  ip TEXT,
  user_agent TEXT,
  referer TEXT,
  accept_language TEXT
);
CREATE INDEX IF NOT EXISTS idx_qr_logs_created ON qr_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_qr_logs_type ON qr_logs(qr_type);

CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS admin_audit (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  action TEXT NOT NULL,
  key TEXT,
  old_value TEXT,
  new_value TEXT,
  ip TEXT,
  user_agent TEXT
);
CREATE INDEX IF NOT EXISTS idx_admin_audit_created ON admin_audit(created_at);
`;
