import { AD_SLOT_NAMES, isOn, type AdSlotName, type Settings } from "@/lib/settings";
import type { AdSlotConfig } from "./AdSlot";

export type AdSlots = Record<AdSlotName, AdSlotConfig>;

/**
 * Server-only: resolves every AdSense position from already-loaded runtime settings. A position
 * switched off in the admin settings renders nothing at all — not even the layout placeholder —
 * so the owner can drop, say, the top banner without touching code.
 */
export function adSlots(s: Settings): AdSlots {
  const placeholders = isOn(s.ad_placeholders) || process.env.NODE_ENV !== "production";
  const slots = {} as AdSlots;
  for (const name of AD_SLOT_NAMES) {
    const shown = isOn(s[`ad_show_${name}`]);
    slots[name] = {
      client: s.adsense_client,
      slotId: s[`ad_slot_${name}`],
      enabled: shown && isOn(s.ads_enabled),
      showPlaceholder: shown && placeholders,
    };
  }
  return slots;
}
