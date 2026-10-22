import type { Metadata } from "next";
import { GuidesIndexPage } from "@/components/pages/GuidesIndexPage";
import { alternatesEnOnly } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "QR code guides: printing, scanning and design",
  description: "Practical guides to QR codes: the right print size, PNG vs SVG, why a code will not scan, logos, static vs dynamic, and setups for menus, cards and Wi-Fi.",
  alternates: alternatesEnOnly("/guides"),
  openGraph: { title: "QR code guides", description: "Practical guides to printing, scanning and designing QR codes.", url: "/guides", type: "website", locale: "en_US" },
};

export default function Page() {
  return <GuidesIndexPage />;
}
