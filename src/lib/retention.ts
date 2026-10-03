import { errorFields, logEvent } from "./log";
import { AUDIT_RETENTION_DAYS, pruneOldAudit, pruneOldLogs } from "./logs";
import { getSettings } from "./settings";

const DAY_MS = 24 * 60 * 60 * 1000;

/** Deletes visitor logs past the configured retention and audit rows past the fixed one. */
export async function runRetentionCleanup(): Promise<void> {
  const retention = Number.parseInt((await getSettings()).log_retention_days, 10) || 0;
  await Promise.all([pruneOldLogs(retention), pruneOldAudit(AUDIT_RETENTION_DAYS)]);
}

const globalForRetention = globalThis as unknown as { __qrRetentionTimer?: ReturnType<typeof setInterval> };

/**
 * Runs the cleanup once now and then every 24 hours for the life of the server process
 * (instrumentation.ts calls this at startup). Idempotent: dev HMR re-evaluates modules, so the
 * timer handle lives on globalThis. Errors are logged, never thrown — a cleanup must not take the
 * server down, and the dashboard still prunes on every visit as a fallback.
 */
export function startRetentionSchedule(): void {
  if (globalForRetention.__qrRetentionTimer) return;
  const tick = () => {
    runRetentionCleanup().catch((err) => logEvent("error", "retention.cleanup_failed", errorFields(err)));
  };
  tick();
  const timer = setInterval(tick, DAY_MS);
  timer.unref?.(); // never keep a shutting-down process alive
  globalForRetention.__qrRetentionTimer = timer;
}
