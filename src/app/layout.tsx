import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import { AdSenseScript } from "@/components/ads/AdSenseScript";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getDict, isLocale, type Locale } from "@/lib/i18n";
import { DEFAULT_SETTINGS, getSettings, isOn } from "@/lib/settings";

// Settings live in SQLite and can change at runtime, so never bake pages at build time.
export const dynamic = "force-dynamic";

/** The proxy tags every request with its UI locale ("/en/..." → en). Admin and fallbacks are ko. */
async function requestLocale(): Promise<Locale> {
  const value = (await headers()).get("x-locale");
  return isLocale(value) ? value : "ko";
}

export async function generateMetadata(): Promise<Metadata> {
  const s = getSettings();
  const locale = await requestLocale();
  const t = getDict(locale).meta;
  // The site description is admin-edited Korean copy; English pages use the dictionary.
  const description = locale === "ko" ? s.site_description : t.description;
  let base: URL | undefined;
  try {
    base = new URL(s.site_url);
  } catch {
    base = undefined;
  }
  return {
    metadataBase: base,
    title: {
      default: t.defaultTitle(s.site_name),
      template: `%s | ${s.site_name}`,
    },
    description,
    openGraph: {
      title: s.site_name,
      description,
      type: "website",
      locale: t.ogLocale,
      siteName: s.site_name,
    },
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const s = getSettings();
  const locale = await requestLocale();
  // The footer notice is admin-edited Korean copy. Translate it only while it is the stock text.
  const notice =
    locale !== "ko" && s.footer_notice === DEFAULT_SETTINGS.footer_notice ? getDict(locale).footer.defaultNotice : s.footer_notice;
  const adsenseClient = isOn(s.ads_enabled) ? s.adsense_client : "";
  return (
    <html lang={locale} className="h-full antialiased">
      <head>{adsenseClient ? <AdSenseScript client={adsenseClient} /> : null}</head>
      <body className="flex min-h-full flex-col">
        <SiteHeader siteName={s.site_name} locale={locale} />
        <div className="flex-1">{children}</div>
        <SiteFooter siteName={s.site_name} notice={notice} locale={locale} />
      </body>
    </html>
  );
}
