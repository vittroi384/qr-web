import type { Metadata } from "next";
import { AboutPage } from "@/components/pages/AboutPage";
import { alternatesFor, getDict } from "@/lib/i18n";

export const metadata: Metadata = {
  title: getDict("ko").about.metaTitle,
  description: getDict("ko").about.lead,
  alternates: alternatesFor("ko", "/about"),
};

export default function Page() {
  return <AboutPage locale="ko" />;
}
