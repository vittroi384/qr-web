import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { errorFields, logEvent } from "@/lib/log";

export const runtime = "nodejs";

/**
 * Liveness + readiness probe for uptime monitors and the compose healthcheck.
 * 200 {"ok":true,"db":"up"} when a trivial query succeeds, 503 otherwise. No caching, no details.
 */
export async function GET() {
  const started = Date.now();
  try {
    await db.execute(sql`select 1`);
    return NextResponse.json(
      { ok: true, db: "up", latencyMs: Date.now() - started },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (err) {
    logEvent("error", "health.db_down", errorFields(err));
    return NextResponse.json({ ok: false, db: "down" }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
}
