import { isOn, type Settings } from "@/lib/settings";
import type { AdSlotConfig } from "./AdSlot";

/** Server-only: resolves one AdSense slot from already-loaded runtime settings. */
export function adConfig(s: Settings, slotId: string): AdSlotConfig {
  return {
    client: s.adsense_client,
    slotId,
    enabled: isOn(s.ads_enabled),
    showPlaceholder: isOn(s.ad_placeholders) || process.env.NODE_ENV !== "production",
  };
}
