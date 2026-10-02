import Database from "better-sqlite3";
import fs from "node:fs";
import { SCHEMA_SQL } from "./schema";
import path from "node:path";

// Single shared connection per process. Next.js may re-evaluate modules in dev,
// so stash the instance on globalThis to avoid leaking file handles on HMR.
const globalForDb = globalThis as unknown as { __qrDb?: Database.Database };

function resolveDbPath(): string {
  const configured = process.env.DATABASE_PATH;
  if (configured) return path.resolve(configured);
  return path.resolve(process.cwd(), "data", "qr.db");
}

function openDb(): Database.Database {
  const dbPath = resolveDbPath();
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });
  const db = new Database(dbPath);
  db.pragma("journal_mode = WAL");
  db.pragma("busy_timeout = 5000");
  db.pragma("foreign_keys = ON");
  db.exec(SCHEMA_SQL);
  return db;
}

export function getDb(): Database.Database {
  if (!globalForDb.__qrDb) {
    globalForDb.__qrDb = openDb();
  }
  return globalForDb.__qrDb;
}

export type QrLogRow = {
  id: number;
  created_at: string;
  qr_type: string;
  event: string;
  payload_json: string;
  encoded_preview: string | null;
  options_json: string | null;
  ip: string | null;
  user_agent: string | null;
  referer: string | null;
  accept_language: string | null;
};

export type AdminAuditRow = {
  id: number;
  created_at: string;
  action: string;
  key: string | null;
  old_value: string | null;
  new_value: string | null;
  ip: string | null;
  user_agent: string | null;
};
