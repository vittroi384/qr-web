import { type NextRequest } from "next/server";
import { cookies } from "next/headers";
import { writeAudit } from "@/lib/audit";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { getRequestMeta } from "@/lib/ip";
import { iterateLogsForExport, type LogFilter } from "@/lib/logs";

export const runtime = "nodejs";

const COLUMNS = [
  "id",
  "created_at",
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

function csvCell(value: unknown): string {
  if (value === null || value === undefined) return "";
  const s = String(value);
  return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export async function GET(req: NextRequest) {
  const cookieStore = await cookies();
  if (!(await verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value))) {
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

  const meta = getRequestMeta(req);
  writeAudit({ action: "logs_export", newValue: JSON.stringify(filter), ip: meta.ip, userAgent: meta.userAgent });

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      // BOM so Excel opens UTF-8 Korean text correctly.
      controller.enqueue(encoder.encode("﻿" + COLUMNS.join(",") + "\r\n"));
      for (const row of iterateLogsForExport(filter)) {
        const line = COLUMNS.map((c) => csvCell(row[c])).join(",") + "\r\n";
        controller.enqueue(encoder.encode(line));
      }
      controller.close();
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
