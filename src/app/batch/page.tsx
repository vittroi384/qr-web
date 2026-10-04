import type { Metadata } from "next";
import { adSlots } from "@/components/ads/adConfig";
import { BatchPage } from "@/components/pages/BatchPage";
import { alternatesFor, getDict } from "@/lib/i18n";
import { getSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: getDict("en").batch.metaTitle,
  description: getDict("en").batch.metaDescription,
  alternates: alternatesFor("en", "/batch"),
};

export default async function Page() {
  const s = await getSettings();
  return <BatchPage locale="en" ads={adSlots(s)} />;
}
