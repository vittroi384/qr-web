"use server";

import { cookies, headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { writeAudit } from "@/lib/audit";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { deleteLogs } from "@/lib/logs";

async function requireAdmin() {
  const cookieStore = await cookies();
  if (!(await verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value))) {
    throw new Error("Unauthorized");
  }
}

async function requestMeta() {
  const h = await headers();
  const xff = h.get("x-forwarded-for");
  return {
    ip: xff ? xff.split(",")[0].trim() : h.get("x-real-ip") ?? "unknown",
    userAgent: h.get("user-agent"),
  };
}

export async function deleteLogsAction(formData: FormData) {
  await requireAdmin();
  const ids = formData
    .getAll("ids")
    .map((v) => Number.parseInt(String(v), 10))
    .filter((n) => Number.isInteger(n) && n > 0);
  if (ids.length === 0) return;
  const deleted = deleteLogs(ids);
  const meta = await requestMeta();
  writeAudit({ action: "logs_delete", newValue: `${deleted} rows: ${ids.join(",")}`, ...meta });
  revalidatePath("/admin/logs");
  revalidatePath("/admin");
}
