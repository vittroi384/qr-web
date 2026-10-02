"use server";

import { cookies, headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { GATE_COOKIE, gateSatisfied, ipAllowedForAdmin } from "@/lib/adminAccess";
import { writeAudit } from "@/lib/audit";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { getRequestMetaFromHeaders } from "@/lib/ip";
import { deleteLogs } from "@/lib/logs";

export async function deleteLogsAction(formData: FormData) {
  const cookieStore = await cookies();
  const h = await headers();
  // Same three layers as the pages: allowlisted IP, signed gate cookie, bound session.
  if (!ipAllowedForAdmin(getRequestMetaFromHeaders(h).ip) || !(await gateSatisfied(cookieStore.get(GATE_COOKIE)?.value))) {
    throw new Error("Not found");
  }
  if (!(await verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value, h.get("user-agent")))) {
    throw new Error("Unauthorized");
  }
  const ids = formData
    .getAll("ids")
    .map((v) => Number.parseInt(String(v), 10))
    .filter((n) => Number.isInteger(n) && n > 0 && n <= 2_147_483_647) // int4 range
    .slice(0, 2000); // safety cap: the list shows at most 2000 rows, so this never limits a real selection
  if (ids.length === 0) return;
  const deleted = await deleteLogs(ids);
  const meta = getRequestMetaFromHeaders(await headers());
  await writeAudit({ action: "logs_delete", newValue: `${deleted} rows: ${ids.join(",")}`, ip: meta.ip, userAgent: meta.userAgent });
  revalidatePath("/admin/logs");
  revalidatePath("/admin");
}
