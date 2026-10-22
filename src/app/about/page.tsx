import type { Metadata } from "next";
import { AboutPage } from "@/components/pages/AboutPage";
import { alternatesFor, getDict } from "@/lib/i18n";

export const metadata: Metadata = {
  title: getDict("en").about.metaTitle,
  description: getDict("en").about.lead,
  alternates: alternatesFor("en", "/about"),
};

export default function Page() {
  return <AboutPage locale="en" />;
}
