import Link from "next/link";
import { AdSlot, type AdSlotConfig } from "@/components/ads/AdSlot";
import { FaqList } from "@/components/FaqList";
import { adSlots } from "@/components/ads/adConfig";
import { I18nProvider } from "@/components/i18n/I18nProvider";
import { resolveAffiliate } from "@/components/affiliate";
import { QrGenerator } from "@/components/qr/QrGenerator";
import { getDict, localePath, type Locale } from "@/lib/i18n";
import { getSettings } from "@/lib/settings";

/** FAQ entries shown before the in-article ad. */
const FAQ_BEFORE_AD = 3;

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

  return (
    <main className="mx-auto w-full max-w-[1400px] px-4 pt-4 pb-16 sm:px-6 sm:pt-5">
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
            <QrGenerator affiliate={resolveAffiliate(s, locale)} />
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
                {/* The in-article unit sits between the first questions and the rest, like a break in a long article. */}
                <div className="mt-4">
                  <FaqList items={faqItems.slice(0, FAQ_BEFORE_AD)} />
                </div>
                <AdSlot config={ads.inarticle} name="in-article" shape="inarticle" className="mt-8" />
                {faqItems.length > FAQ_BEFORE_AD ? (
                  <div className="mt-8">
                    <FaqList items={faqItems.slice(FAQ_BEFORE_AD)} defaultOpen={-1} />
                  </div>
                ) : null}
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
