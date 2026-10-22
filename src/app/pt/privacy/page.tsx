import type { Metadata } from "next";
import { PrivacyPage } from "@/components/pages/PrivacyPage";
import { alternatesFor, getDict } from "@/lib/i18n";
import { getSettings } from "@/lib/settings";

export async function generateMetadata(): Promise<Metadata> {
  const t = getDict("pt").privacy;
  return {
    title: t.metaTitle,
    // Unique per page: the policy's own opening line (already translated), not the site-wide description.
    description: t.s1Intro((await getSettings()).site_name),
    alternates: alternatesFor("pt", "/privacy"),
  };
}

export default function Page() {
  return <PrivacyPage locale="pt" />;
}
