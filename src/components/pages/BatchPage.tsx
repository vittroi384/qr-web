import { AdSlot, type AdSlotConfig } from "@/components/ads/AdSlot";
import { FaqList } from "@/components/FaqList";
import { BatchTool } from "@/components/batch/BatchTool";
import { I18nProvider } from "@/components/i18n/I18nProvider";
import { getDict, type Locale } from "@/lib/i18n";

export type BatchAds = { left: AdSlotConfig; right: AdSlotConfig; incontent: AdSlotConfig };

const sideVisible = (c: AdSlotConfig) => Boolean((c.enabled && c.client && c.slotId) || c.showPlaceholder);

/**
 * Same ad structure as the home page: a sticky left sidebar beside the tool (lg+), and below the
 * tool a top-aligned row of the in-content rectangle plus the right vertical unit (xl+). The
 * download button sits at the card's lower right, so the left unit is never near it; the row
 * below starts 96px under the card. Phones show only the in-content unit.
 */
export function BatchPage({ locale, ads }: { locale: Locale; ads: BatchAds }) {
  const t = getDict(locale).batch;
  const showRight = sideVisible(ads.right);
  return (
    <main className="mx-auto w-full max-w-[1400px] px-4 pt-6 pb-16 sm:px-6 sm:pt-8">
      <div className="flex gap-6 xl:gap-8">
        {/* 왼쪽 세로 광고 (lg 이상) */}
        {sideVisible(ads.left) ? (
          <aside className="hidden w-40 shrink-0 lg:block">
            <div className="sticky top-20">
              <AdSlot config={ads.left} name="왼쪽" shape="vertical" />
            </div>
          </aside>
        ) : null}

        <div className="min-w-0 flex-1">
          <div className="mx-auto max-w-4xl">
            <header className="mb-5">
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">{t.title}</h1>
              <p className="mt-1 text-sm text-muted">{t.tagline}</p>
            </header>

            <I18nProvider locale={locale}>
              <BatchTool />
            </I18nProvider>
          </div>

          {/* Lower band: in-content rectangle + FAQ on the left, right vertical unit (xl+) beside them —
              the FAQ gives the column real height so the vertical unit never stands alone. */}
          <div
            className={`mt-12 grid items-start gap-8 border-t border-border pt-12 ${
              showRight ? "xl:grid-cols-[minmax(0,1fr)_300px]" : ""
            }`}
          >
            <div className="min-w-0">
              <AdSlot config={ads.incontent} name="본문 중간" shape="rectangle" />
              <section className="mt-12" aria-labelledby="batch-faq-heading">
                <h2 id="batch-faq-heading" className="section-title">
                  {t.faqTitle}
                </h2>
                <div className="mt-4">
                  <FaqList items={t.faq} />
                </div>
              </section>
            </div>
            {showRight ? (
              <aside className="hidden xl:block">
                <div className="sticky top-20">
                  <AdSlot config={ads.right} name="오른쪽" shape="vertical" />
                </div>
              </aside>
            ) : null}
          </div>
        </div>
      </div>
    </main>
  );
}
