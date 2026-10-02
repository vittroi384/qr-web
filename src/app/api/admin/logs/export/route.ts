import { type NextRequest } from "next/server";
import { cookies } from "next/headers";
import { GATE_COOKIE, gateSatisfied, ipAllowedForAdmin } from "@/lib/adminAccess";
import { writeAudit } from "@/lib/audit";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { getRequestMeta } from "@/lib/ip";
import { iterateLogsForExport, type LogFilter } from "@/lib/logs";
import { toKstIso, toUtcIso } from "@/lib/time";

export const runtime = "nodejs";

const COLUMNS = [
  "id",
  "created_at_utc",
  "created_at_kst",
  "qr_type",
  "event",
  "payload_json",
  "encoded_preview",
  "options_json",
  "ip",
  "user_agent",
  "referer",
  "accept_language",
] as const;

/**
 * CSV cell: quote when needed, and neutralise spreadsheet formula injection.
 * Values starting with = + - @ or tab/CR are prefixed with a single quote so
 * Excel/Sheets treat them as text (visitor-controlled columns reach the sheet).
 */
function csvCell(value: unknown): string {
  if (value === null || value === undefined) return "";
  let s = String(value);
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return /[",\r\n\t]/.test(s) || s.startsWith("'") ? `"${s.replace(/"/g, '""')}"` : s;
}

export async function GET(req: NextRequest) {
  // Same visibility rules as the admin pages: allowlisted IP + gate, then a bound session.
  const meta = getRequestMeta(req);
  if (!ipAllowedForAdmin(meta.ip)) return new Response(null, { status: 404 });
  if (!(await gateSatisfied(req.cookies.get(GATE_COOKIE)?.value))) return new Response(null, { status: 404 });
  const cookieStore = await cookies();
  if (!(await verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value, req.headers.get("user-agent")))) {
    return new Response("Unauthorized", { status: 401 });
  }

  const sp = req.nextUrl.searchParams;
  const filter: LogFilter = {
    type: sp.get("type") ?? undefined,
    event: sp.get("event") ?? undefined,
    q: sp.get("q") ?? undefined,
    from: sp.get("from") ?? undefined,
    to: sp.get("to") ?? undefined,
  };

  await writeAudit({ action: "logs_export", newValue: JSON.stringify(filter), ip: meta.ip, userAgent: meta.userAgent });

  const encoder = new TextEncoder();
  const rows = iterateLogsForExport(filter);
  // Pull-based: the next 1000-row batch is fetched only when the client has consumed the last.
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      // BOM so Excel opens UTF-8 Korean text correctly.
      controller.enqueue(encoder.encode("﻿" + COLUMNS.join(",") + "\r\n"));
    },
    async pull(controller) {
      const { value: row, done } = await rows.next();
      if (done) {
        controller.close();
        return;
      }
      const cells = [
        row.id,
        toUtcIso(row.created_at),
        toKstIso(row.created_at),
        row.qr_type,
        row.event,
        row.payload_json,
        row.encoded_preview,
        row.options_json,
        row.ip,
        row.user_agent,
        row.referer,
        row.accept_language,
      ];
      controller.enqueue(encoder.encode(cells.map(csvCell).join(",") + "\r\n"));
    },
    async cancel() {
      await rows.return(undefined);
    },
  });

  const filename = `qr-logs-${new Date().toISOString().slice(0, 10)}.csv`;
  return new Response(stream, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
