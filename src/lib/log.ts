/**
 * Structured JSON logging to stdout (picked up by `docker compose logs` / journald).
 * One line per event: {"ts","level","event",...fields}. Never log request bodies or secrets.
 */
type Level = "info" | "warn" | "error";

export function logEvent(level: Level, event: string, fields: Record<string, unknown> = {}) {
  const line = JSON.stringify({ ts: new Date().toISOString(), level, event, ...fields });
  if (level === "error") console.error(line);
  else if (level === "warn") console.warn(line);
  else console.log(line);
}

/** Serialise an unknown thrown value without leaking stack frames into the structured line. */
export function errorFields(err: unknown): Record<string, unknown> {
  if (err instanceof Error) return { error: err.name, message: err.message };
  return { error: String(err) };
}
