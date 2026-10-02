import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

export type Db = PostgresJsDatabase<typeof schema>;

// One pool per process. Next.js re-evaluates modules on HMR in dev, so keep the client on
// globalThis instead of opening a new pool on every edit.
const globalForDb = globalThis as unknown as { __qrDb?: { db: Db; sql: postgres.Sql } };

function getClient(): { db: Db; sql: postgres.Sql } {
  if (!globalForDb.__qrDb) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL is not set");
    // postgres.js opens connections on the first query, so creating the client is cheap.
    const sql = postgres(url, { max: 10, idle_timeout: 30, connect_timeout: 10 });
    globalForDb.__qrDb = { db: drizzle(sql, { schema }), sql };
  }
  return globalForDb.__qrDb;
}

/**
 * The shared Drizzle instance. It is a lazy proxy: importing this module never reads
 * DATABASE_URL or touches the network — `next build` runs without a database, and the pool is
 * created on the first query at request time (every page is force-dynamic).
 */
export const db: Db = new Proxy({} as Db, {
  get(_target, prop) {
    const real = getClient().db;
    const value = Reflect.get(real, prop, real);
    return typeof value === "function" ? value.bind(real) : value;
  },
});

/** Closes the pool (CLI scripts and tests; the server keeps it for its lifetime). */
export async function closeDb(): Promise<void> {
  const client = globalForDb.__qrDb;
  globalForDb.__qrDb = undefined;
  await client?.sql.end({ timeout: 5 });
}

export { schema };
