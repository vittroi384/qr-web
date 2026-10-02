import type { Metadata } from "next";
import "./globals.css";
import { AdSenseScript } from "@/components/ads/AdSenseScript";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getSettings, isOn } from "@/lib/settings";

// Settings live in SQLite and can change at runtime, so never bake pages at build time.
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const s = getSettings();
  let base: URL | undefined;
  try {
    base = new URL(s.site_url);
  } catch {
    base = undefined;
  }
  return {
    metadataBase: base,
    title: {
      default: `${s.site_name} — 무엇이든 QR 코드로`,
      template: `%s | ${s.site_name}`,
    },
    description: s.site_description,
    openGraph: {
      title: s.site_name,
      description: s.site_description,
      type: "website",
      locale: "ko_KR",
      siteName: s.site_name,
    },
    robots: { index: true, follow: true },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const s = getSettings();
  const adsenseClient = isOn(s.ads_enabled) ? s.adsense_client : "";
  return (
    <html lang="ko" className="h-full antialiased">
      <head>{adsenseClient ? <AdSenseScript client={adsenseClient} /> : null}</head>
      <body className="flex min-h-full flex-col">
        <SiteHeader siteName={s.site_name} />
        <div className="flex-1">{children}</div>
        <SiteFooter siteName={s.site_name} notice={s.footer_notice} />
      </body>
    </html>
  );
}
