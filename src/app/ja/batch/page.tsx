import type { Metadata } from "next";
import { adConfig } from "@/components/ads/adConfig";
import { BatchPage } from "@/components/pages/BatchPage";
import { alternatesFor, getDict } from "@/lib/i18n";
import { getSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: getDict("ja").batch.metaTitle,
  description: getDict("ja").batch.metaDescription,
  alternates: alternatesFor("ja", "/batch"),
};

export default async function Page() {
  const s = await getSettings();
  const ads = {
    left: adConfig(s, s.ad_slot_left),
    right: adConfig(s, s.ad_slot_right),
    incontent: adConfig(s, s.ad_slot_incontent),
    bottom: adConfig(s, s.ad_slot_bottom),
  };
  return <BatchPage locale="ja" ads={ads} />;
}
