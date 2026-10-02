import type { Metadata } from "next";
import { LandingPage, landingMetadata, landingTarget } from "@/components/pages/LandingPage";

type Props = { params: Promise<{ slug: string }> };

// One page per QR type ("/wifi-qr-code") or use case ("/wedding-qr-code"). Unknown slugs 404; static routes (about, batch, …) win.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return landingMetadata("hi", (await params).slug);
}

export default async function Page({ params }: Props) {
  return <LandingPage locale="hi" target={landingTarget("hi", (await params).slug)} />;
}
