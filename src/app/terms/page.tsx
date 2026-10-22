import type { Metadata } from "next";
import { TermsPage } from "@/components/pages/TermsPage";
import { alternatesEnOnly } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms for using this free QR code generator: a static, no-account service provided as is, with the codes you make belonging to you.",
  alternates: alternatesEnOnly("/terms"),
};

export default function Page() {
  return <TermsPage />;
}
