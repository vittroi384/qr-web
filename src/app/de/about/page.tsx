import type { Metadata } from "next";
import { AboutPage } from "@/components/pages/AboutPage";
import { alternatesFor, getDict } from "@/lib/i18n";

export const metadata: Metadata = {
  title: getDict("de").about.metaTitle,
  description: getDict("de").about.lead,
  alternates: alternatesFor("de", "/about"),
};

export default function Page() {
  return <AboutPage locale="de" />;
}
