import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import { AdSenseScript } from "@/components/ads/AdSenseScript";
import { UmamiScript } from "@/components/analytics/UmamiScript";
import { ClientErrorReporter } from "@/components/ClientErrorReporter";
import { AdminFooter } from "@/components/admin/AdminFooter";
import { ADMIN_MARKER_HEADER, adminMarker } from "@/lib/adminAccess";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { DEFAULT_LOCALE, getDict, isLocale, type Locale } from "@/lib/i18n";
import { donateUrlFor } from "@/lib/donate";
import { DEFAULT_SETTINGS, getSettings, isOn } from "@/lib/settings";

// Settings live in PostgreSQL and can change at runtime, so never bake pages at build time.
export const dynamic = "force-dynamic";

/**
 * The proxy tags every public request with its UI locale ("/ko/..." → ko, everything else → en).
 * /admin is not tagged and stays Korean.
 */
async function requestLocale(): Promise<Locale> {
  const value = (await headers()).get("x-locale");
  return isLocale(value) ? value : "ko";
}

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSettings();
  const locale = await requestLocale();
  const t = getDict(locale).meta;
  // The site description is admin-edited copy in the primary language (English); other
  // locales use the dictionary.
  const description = locale === DEFAULT_LOCALE ? s.site_description : t.description;
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
  const s = await getSettings();
  const locale = await requestLocale();
  // Set by the proxy for /admin/* only; the value is a per-secret marker so it cannot be spoofed.
  const isAdmin = (await headers()).get(ADMIN_MARKER_HEADER) === adminMarker();
  // The footer notice is admin-edited copy. Translate it only while it is the stock text.
  const notice = s.footer_notice === DEFAULT_SETTINGS.footer_notice ? getDict(locale).footer.defaultNotice : s.footer_notice;
  const adsenseClient = isOn(s.ads_enabled) ? s.adsense_client : "";
  // Umami (cookieless) needs both values; either one empty injects nothing.
  const analytics = s.analytics_script_url && s.analytics_website_id ? s : null;
  // CSP nonce minted by the proxy; Next.js tags its own scripts, the two <Script> tags take it as a prop.
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  return (
    <html lang={locale} className="h-full antialiased">
      <head>
        {/* Pretendard Variable (dynamic subset): the first family in --font-sans, so weights 500–700 render the same on every OS. */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" crossOrigin="anonymous" />
        {adsenseClient ? <AdSenseScript client={adsenseClient} nonce={nonce} /> : null}
        {analytics ? <UmamiScript src={analytics.analytics_script_url} websiteId={analytics.analytics_website_id} nonce={nonce} /> : null}
      </head>
      <body className="flex min-h-full flex-col">
        <ClientErrorReporter />
        <SiteHeader siteName={s.site_name} locale={locale} />
        <div className="flex-1">{children}</div>
        {isAdmin ? <AdminFooter siteName={s.site_name} /> : <SiteFooter siteName={s.site_name} notice={notice} locale={locale} donateUrl={donateUrlFor(s, locale)} />}
      </body>
    </html>
  );
}
