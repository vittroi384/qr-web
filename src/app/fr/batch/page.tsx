import type { Metadata } from "next";
import { adSlots } from "@/components/ads/adConfig";
import { BatchPage } from "@/components/pages/BatchPage";
import { alternatesFor, getDict } from "@/lib/i18n";
import { getSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: getDict("fr").batch.metaTitle,
  description: getDict("fr").batch.metaDescription,
  alternates: alternatesFor("fr", "/batch"),
};

export default async function Page() {
  const s = await getSettings();
  return <BatchPage locale="fr" ads={adSlots(s)} />;
}
