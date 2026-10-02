import { getSettings, isOn } from "@/lib/settings";
import type { AdSlotConfig } from "./AdSlot";

/** Server-only: resolves one AdSense slot from the runtime settings. */
export function adConfig(slotId: string): AdSlotConfig {
  const s = getSettings();
  return {
    client: s.adsense_client,
    slotId,
    enabled: isOn(s.ads_enabled),
    showPlaceholder: isOn(s.ad_placeholders) || process.env.NODE_ENV !== "production",
  };
}
