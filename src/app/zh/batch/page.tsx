import type { Metadata } from "next";
import { adSlots } from "@/components/ads/adConfig";
import { BatchPage } from "@/components/pages/BatchPage";
import { alternatesFor, getDict } from "@/lib/i18n";
import { getSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: getDict("zh").batch.metaTitle,
  description: getDict("zh").batch.metaDescription,
  alternates: alternatesFor("zh", "/batch"),
};

export default async function Page() {
  const s = await getSettings();
  return <BatchPage locale="zh" ads={adSlots(s)} />;
}
