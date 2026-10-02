import type { Metadata } from "next";
import { PrivacyPage } from "@/components/pages/PrivacyPage";
import { alternatesFor, getDict } from "@/lib/i18n";

export const metadata: Metadata = {
  title: getDict("hi").privacy.metaTitle,
  alternates: alternatesFor("hi", "/privacy"),
};

export default function Page() {
  return <PrivacyPage locale="hi" />;
}
