import type { Metadata } from "next";
import { HomePage } from "@/components/pages/HomePage";
import { alternatesFor } from "@/lib/i18n";

// Title and description come from the root layout, which localises them from the x-locale header.
export const metadata: Metadata = { alternates: alternatesFor("ja", "/") };

export default function Page() {
  return <HomePage locale="ja" />;
}
