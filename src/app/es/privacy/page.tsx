import type { Metadata } from "next";
import { PrivacyPage } from "@/components/pages/PrivacyPage";
import { alternatesFor, getDict } from "@/lib/i18n";

export const metadata: Metadata = {
  title: getDict("es").privacy.metaTitle,
  alternates: alternatesFor("es", "/privacy"),
};

export default function Page() {
  return <PrivacyPage locale="es" />;
}
