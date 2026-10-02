import type { Metadata } from "next";
import { PrivacyPage } from "@/components/pages/PrivacyPage";
import { alternatesFor, getDict } from "@/lib/i18n";

export const metadata: Metadata = {
  title: getDict("pt").privacy.metaTitle,
  alternates: alternatesFor("pt", "/privacy"),
};

export default function Page() {
  return <PrivacyPage locale="pt" />;
}
