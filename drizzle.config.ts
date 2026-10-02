import { existsSync } from "node:fs";
import { defineConfig } from "drizzle-kit";

// drizzle-kit does not read .env by itself; Next.js does for the app. Load it for the CLI too
// (variables already set in the shell win).
if (!process.env.DATABASE_URL && existsSync(".env")) process.loadEnvFile(".env");

// `npm run db:generate` diffs src/lib/db/schema.ts against drizzle/ and writes a new SQL migration.
// `npm run db:migrate` applies pending migrations to DATABASE_URL. The production image runs
// scripts/migrate.mjs on container start instead, since drizzle-kit is a dev dependency.
export default defineConfig({
  dialect: "postgresql",
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle",
  dbCredentials: { url: process.env.DATABASE_URL ?? "" },
  strict: true,
  verbose: true,
});
