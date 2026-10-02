"use server";

import { cookies, headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { writeAudit } from "@/lib/audit";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { getRequestMetaFromHeaders } from "@/lib/ip";
import { BOOLEAN_SETTINGS, SETTING_KEYS, type Settings, updateSettings } from "@/lib/settings";

const AD_SLOT_KEYS = ["ad_slot_top", "ad_slot_left", "ad_slot_right", "ad_slot_bottom", "ad_slot_incontent"] as const;

export async function saveSettingsAction(formData: FormData) {
  const cookieStore = await cookies();
  if (!(await verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value, (await headers()).get("user-agent")))) {
    throw new Error("Unauthorized");
  }

  const patch: Partial<Settings> = {};
  for (const key of SETTING_KEYS) {
    if (BOOLEAN_SETTINGS.includes(key)) {
      patch[key] = formData.get(key) === "on" ? "1" : "0";
    } else {
      const v = formData.get(key);
      if (typeof v === "string") patch[key] = v.trim();
    }
  }

  if (patch.site_url) {
    try {
      const u = new URL(patch.site_url);
      if (u.protocol !== "http:" && u.protocol !== "https:") throw new Error("scheme");
      patch.site_url = u.origin;
    } catch {
      redirect("/admin/settings?error=site_url");
    }
  }
  if (patch.adsense_client && !/^ca-pub-\d{10,20}$/.test(patch.adsense_client)) {
    redirect("/admin/settings?error=adsense_client");
  }
  for (const key of AD_SLOT_KEYS) {
    const v = patch[key];
    if (v && !/^\d{5,20}$/.test(v)) redirect("/admin/settings?error=ad_slot");
  }
  if (patch.log_retention_days !== undefined) {
    if (!/^\d{1,5}$/.test(patch.log_retention_days)) redirect("/admin/settings?error=log_retention_days");
    patch.log_retention_days = String(Number.parseInt(patch.log_retention_days, 10));
  }
  for (const key of ["site_name", "site_description", "footer_notice"] as const) {
    if (patch[key] !== undefined) patch[key] = patch[key]!.slice(0, 500);
  }

  const changes = updateSettings(patch);

  const meta = getRequestMetaFromHeaders(await headers());
  for (const [key, oldValue, newValue] of changes) {
    writeAudit({ action: "settings_update", key, oldValue, newValue, ip: meta.ip, userAgent: meta.userAgent });
  }

  revalidatePath("/", "layout");
  redirect(`/admin/settings?saved=${changes.length}`);
}
