import type { Metadata } from "next";
import { AboutPage } from "@/components/pages/AboutPage";
import { alternatesFor, getDict } from "@/lib/i18n";

export const metadata: Metadata = {
  title: getDict("ja").about.metaTitle,
  alternates: alternatesFor("ja", "/about"),
};

export default function Page() {
  return <AboutPage locale="ja" />;
}
