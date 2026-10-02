import type { Metadata } from "next";
import { AboutPage } from "@/components/pages/AboutPage";
import { alternatesFor, getDict } from "@/lib/i18n";

export const metadata: Metadata = {
  title: getDict("pt").about.metaTitle,
  alternates: alternatesFor("pt", "/about"),
};

export default function Page() {
  return <AboutPage locale="pt" />;
}
