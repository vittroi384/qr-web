import type { Metadata } from "next";
import { LandingPage, landingMetadata, landingType } from "@/components/pages/LandingPage";

type Props = { params: Promise<{ slug: string }> };

// One page per QR type ("/wifi-qr-code"). Unknown slugs 404; static routes (about, batch, …) win.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return landingMetadata("en", (await params).slug);
}

export default async function Page({ params }: Props) {
  return <LandingPage locale="en" type={landingType((await params).slug)} />;
}
