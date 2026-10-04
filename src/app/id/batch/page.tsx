import type { Metadata } from "next";
import { adSlots } from "@/components/ads/adConfig";
import { BatchPage } from "@/components/pages/BatchPage";
import { alternatesFor, getDict } from "@/lib/i18n";
import { getSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: getDict("id").batch.metaTitle,
  description: getDict("id").batch.metaDescription,
  alternates: alternatesFor("id", "/batch"),
};

export default async function Page() {
  const s = await getSettings();
  return <BatchPage locale="id" ads={adSlots(s)} />;
}
