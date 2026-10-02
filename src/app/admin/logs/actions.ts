"use server";

import { cookies, headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { writeAudit } from "@/lib/audit";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { getRequestMetaFromHeaders } from "@/lib/ip";
import { deleteLogs } from "@/lib/logs";

export async function deleteLogsAction(formData: FormData) {
  const cookieStore = await cookies();
  if (!(await verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value, (await headers()).get("user-agent")))) {
    throw new Error("Unauthorized");
  }
  const ids = formData
    .getAll("ids")
    .map((v) => Number.parseInt(String(v), 10))
    .filter((n) => Number.isInteger(n) && n > 0);
  if (ids.length === 0) return;
  const deleted = deleteLogs(ids);
  const meta = getRequestMetaFromHeaders(await headers());
  writeAudit({ action: "logs_delete", newValue: `${deleted} rows: ${ids.join(",")}`, ip: meta.ip, userAgent: meta.userAgent });
  revalidatePath("/admin/logs");
  revalidatePath("/admin");
}
