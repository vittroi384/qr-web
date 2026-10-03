/**
 * Runs once per server start (Next.js instrumentation hook). Schedules the daily retention
 * cleanup on the Node.js runtime only; skipped when no database is configured (`next build`
 * and DB-less local runs) so startup never fails because of it.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs" || !process.env.DATABASE_URL) return;
  const { startRetentionSchedule } = await import("./lib/retention");
  startRetentionSchedule();
}
