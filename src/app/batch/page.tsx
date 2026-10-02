import type { Metadata } from "next";
import { adConfig } from "@/components/ads/adConfig";
import { BatchPage } from "@/components/pages/BatchPage";
import { alternatesFor, getDict } from "@/lib/i18n";
import { getSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: getDict("ko").batch.metaTitle,
  description: getDict("ko").batch.metaDescription,
  alternates: alternatesFor("ko", "/batch"),
};

export default function Page() {
  const s = getSettings();
  return <BatchPage locale="ko" ad={adConfig(s.ad_slot_incontent)} />;
}
