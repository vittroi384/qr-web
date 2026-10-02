import type { Metadata } from "next";
import { PrivacyPage } from "@/components/pages/PrivacyPage";
import { alternatesFor, getDict } from "@/lib/i18n";

export const metadata: Metadata = {
  title: getDict("ko").privacy.metaTitle,
  alternates: alternatesFor("ko", "/privacy"),
};

export default function Page() {
  return <PrivacyPage locale="ko" />;
}
