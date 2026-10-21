import Link from "next/link";
import { AdSlot, type AdSlotConfig } from "@/components/ads/AdSlot";
import { FaqList } from "@/components/FaqList";
import { adSlots } from "@/components/ads/adConfig";
import { I18nProvider } from "@/components/i18n/I18nProvider";
import { resolveAffiliate } from "@/components/affiliate";
import { QrGenerator } from "@/components/qr/QrGenerator";
import { DEFAULT_LOCALE, getDict, localePath, type Locale } from "@/lib/i18n";
import { jsonLd, plain } from "@/lib/jsonLd";
import { donateUrlFor } from "@/lib/donate";
import { getSettings } from "@/lib/settings";

export async function HomePage({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const s = await getSettings();
  const ads = adSlots(s);
  const sideVisible = (c: AdSlotConfig) => (c.enabled && c.client && c.slotId) || c.showPlaceholder;
  const faqItems = [
    ...t.home.faq,
    {
      q: t.home.faqPrivacy.q,
      a: (
        <>
          {t.home.faqPrivacy.before}
          <Link href={localePath(locale, "/privacy")} className="link">
            {t.home.faqPrivacy.link}
          </Link>
          {t.home.faqPrivacy.after}
        </>
      ),
    },
  ];

  // What the tool is and its FAQ, as schema.org data for search engines and AI assistants.
  const base = s.site_url.replace(/\/$/, "");
  const privacyAnswer = `${t.home.faqPrivacy.before}${t.home.faqPrivacy.link}${t.home.faqPrivacy.after}`;
  const structured = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: s.site_name,
      url: `${base}${localePath(locale, "/")}`,
      inLanguage: locale,
      description: locale === DEFAULT_LOCALE ? s.site_description : t.meta.description,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Any (web browser)",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      inLanguage: locale,
      mainEntity: [...t.home.faq.map((f) => ({ q: f.q, a: f.a })), { q: t.home.faqPrivacy.q, a: privacyAnswer }].map((f) => ({
        "@type": "Question",
        name: plain(f.q),
        acceptedAnswer: { "@type": "Answer", text: plain(f.a) },
      })),
    },
  ];

  return (
    <main className="mx-auto w-full max-w-[1400px] px-4 pt-4 pb-16 sm:px-6 sm:pt-5">
      {structured.map((data, i) => (
        // Static, server-built JSON (no user input); "<" is escaped regardless.
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(data) }} />
      ))}

      {/* 1. 상단 가로 광고 */}
      <AdSlot config={ads.top} name="top" shape="horizontal" compact className="mb-5" />

      <div className="flex gap-6 xl:gap-8">
        {/* 2. 왼쪽 세로 광고 (lg 이상) */}
        {sideVisible(ads.left) ? (
          <aside className="hidden w-40 shrink-0 lg:block">
            <div className="sticky top-20">
              <AdSlot config={ads.left} name="left" shape="vertical" />
            </div>
          </aside>
        ) : null}

        <div className="min-w-0 flex-1">
          <I18nProvider locale={locale}>
            <QrGenerator affiliate={resolveAffiliate(s, locale)} donateUrl={donateUrlFor(s, locale)} />
          </I18nProvider>

          {/*
            Everything below the generator. Ads start here — never beside the generator — so the
            download/copy buttons keep a wide margin from every ad (AdSense accidental-click policy).
          */}
          <div className="mt-12 flex gap-8 border-t border-border pt-12">
            <div className="min-w-0 flex-1">
              {/* 3. 본문 중간 광고 */}
              <AdSlot config={ads.incontent} name="in-content" shape="rectangle" />


              <section className="mt-16" aria-labelledby="faq-heading">
                <h2 id="faq-heading" className="section-title">
                  {t.home.faqTitle}
                </h2>
                <div className="mt-4">
                  <FaqList items={faqItems} />
                </div>
                <AdSlot config={ads.inarticle} name="in-article" shape="inarticle" className="mt-8" />
              </section>
            </div>

            {/* 4. 오른쪽 세로 광고 (xl 이상) — starts below the generator card */}
            {sideVisible(ads.right) ? (
              <aside className="hidden w-[300px] shrink-0 xl:block">
                <div className="sticky top-20">
                  <AdSlot config={ads.right} name="right" shape="vertical" />
                </div>
              </aside>
            ) : null}
          </div>
        </div>
      </div>

      {/* 5. 하단 가로 광고 */}
      <AdSlot config={ads.bottom} name="bottom" shape="horizontal" className="mt-16" />
    </main>
  );
}
