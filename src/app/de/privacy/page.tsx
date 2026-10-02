import type { Metadata } from "next";
import { PrivacyPage } from "@/components/pages/PrivacyPage";
import { alternatesFor, getDict } from "@/lib/i18n";

export const metadata: Metadata = {
  title: getDict("de").privacy.metaTitle,
  alternates: alternatesFor("de", "/privacy"),
};

export default function Page() {
  return <PrivacyPage locale="de" />;
}
