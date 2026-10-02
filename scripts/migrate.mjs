// Applies pending SQL migrations from ./drizzle to DATABASE_URL, then exits.
// Runs on every container start before the server (see Dockerfile) and needs only the runtime
// dependencies drizzle-orm + postgres, so it works inside the standalone image.
// Already-applied migrations are tracked in drizzle.__drizzle_migrations and skipped.
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import path from "node:path";
import { fileURLToPath } from "node:url";
import postgres from "postgres";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("[migrate] DATABASE_URL is not set");
  process.exit(1);
}

const migrationsFolder = process.env.MIGRATIONS_DIR ?? path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "drizzle");
const sql = postgres(url, { max: 1, onnotice: () => {} });

try {
  const started = Date.now();
  await migrate(drizzle(sql), { migrationsFolder });
  console.log(`[migrate] database is up to date (${Date.now() - started} ms)`);
} catch (err) {
  console.error("[migrate] failed:", err);
  process.exitCode = 1;
} finally {
  await sql.end({ timeout: 5 });
}
