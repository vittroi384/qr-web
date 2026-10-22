import type { Metadata } from "next";
import { ContactPage } from "@/components/pages/ContactPage";
import { alternatesEnOnly } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch about the QR code generator: report a code that will not scan, suggest a feature, or ask about your data.",
  alternates: alternatesEnOnly("/contact"),
};

export default function Page() {
  return <ContactPage />;
}
