import type { Metadata } from "next";
import { HomePage } from "@/components/pages/HomePage";
import { alternatesFor } from "@/lib/i18n";

// Title and description come from the root layout (they depend on the admin settings).
export const metadata: Metadata = { alternates: alternatesFor("ko", "/") };

export default function Page() {
  return <HomePage locale="ko" />;
}
