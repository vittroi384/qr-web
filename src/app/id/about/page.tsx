import type { Metadata } from "next";
import { AboutPage } from "@/components/pages/AboutPage";
import { alternatesFor, getDict } from "@/lib/i18n";

export const metadata: Metadata = {
  title: getDict("id").about.metaTitle,
  alternates: alternatesFor("id", "/about"),
};

export default function Page() {
  return <AboutPage locale="id" />;
}
