"use server";

import { cookies, headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { writeAudit } from "@/lib/audit";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { BOOLEAN_SETTINGS, SETTING_KEYS, type Settings, updateSettings } from "@/lib/settings";

export async function saveSettingsAction(formData: FormData) {
  const cookieStore = await cookies();
  if (!(await verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value))) {
    throw new Error("Unauthorized");
  }

  const patch: Partial<Settings> = {};
  for (const key of SETTING_KEYS) {
    if (BOOLEAN_SETTINGS.includes(key)) {
      patch[key] = formData.get(key) === "on" ? "1" : "0";
    } else {
      const v = formData.get(key);
      if (typeof v === "string") patch[key] = v;
    }
  }

  if (patch.site_url) {
    try {
      const u = new URL(patch.site_url);
      patch.site_url = u.origin;
    } catch {
      redirect("/admin/settings?error=site_url");
    }
  }
  if (patch.adsense_client && !/^ca-pub-\d{10,20}$/.test(patch.adsense_client)) {
    redirect("/admin/settings?error=adsense_client");
  }
  if (patch.log_retention_days !== undefined) {
    const n = Number.parseInt(patch.log_retention_days, 10);
    patch.log_retention_days = Number.isFinite(n) && n >= 0 ? String(n) : "0";
  }

  const changes = updateSettings(patch);

  const h = await headers();
  const xff = h.get("x-forwarded-for");
  const ip = xff ? xff.split(",")[0].trim() : h.get("x-real-ip") ?? "unknown";
  const userAgent = h.get("user-agent");
  for (const [key, oldValue, newValue] of changes) {
    writeAudit({ action: "settings_update", key, oldValue, newValue, ip, userAgent });
  }

  revalidatePath("/", "layout");
  redirect(`/admin/settings?saved=${changes.length}`);
}
