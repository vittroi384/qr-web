import { AdSlot, type AdSlotConfig } from "@/components/ads/AdSlot";
import { FaqList } from "@/components/FaqList";
import { BatchTool } from "@/components/batch/BatchTool";
import { I18nProvider } from "@/components/i18n/I18nProvider";
import { getDict, type Locale } from "@/lib/i18n";

export type BatchAds = { top: AdSlotConfig; left: AdSlotConfig; right: AdSlotConfig; incontent: AdSlotConfig; bottom: AdSlotConfig };

const sideVisible = (c: AdSlotConfig) => Boolean((c.enabled && c.client && c.slotId) || c.showPlaceholder);

/**
 * Two sticky sidebars (left lg+, right xl+) beside the tool, mirroring each other, plus the
 * in-content rectangle and FAQ below the tool, and a bottom banner under the FAQ (same as home).
 * Phones show the in-content and bottom units.
 */
export function BatchPage({ locale, ads }: { locale: Locale; ads: BatchAds }) {
  const t = getDict(locale).batch;
  const showRight = sideVisible(ads.right);
  return (
    <main className="mx-auto w-full max-w-[1400px] px-4 pt-4 pb-16 sm:px-6 sm:pt-5">
      {/* 상단 가로 광고 — same low-profile banner as the home page */}
      <AdSlot config={ads.top} name="상단" shape="horizontal" compact className="mb-5" />

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
            <header className="mt-2 mb-5">
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">{t.title}</h1>
              <p className="mt-1 text-sm text-muted">{t.tagline}</p>
            </header>

            <I18nProvider locale={locale}>
              <BatchTool />
            </I18nProvider>
          </div>

          {/* Below the tool: in-content rectangle, then the FAQ. Same width as the tool card. */}
          <div className="mx-auto mt-12 max-w-4xl border-t border-border pt-12">
            <AdSlot config={ads.incontent} name="본문 중간" shape="rectangle" />
            <section className="mt-12" aria-labelledby="batch-faq-heading">
              <h2 id="batch-faq-heading" className="section-title">
                {t.faqTitle}
              </h2>
              <div className="mt-4">
                <FaqList items={t.faq} />
              </div>
            </section>
            {/* 하단 가로 광고 — FAQ 아래 */}
            <AdSlot config={ads.bottom} name="하단" shape="horizontal" className="mt-16" />
          </div>
        </div>

        {/* 오른쪽 세로 광고 (xl 이상) — mirrors the left sidebar */}
        {showRight ? (
          <aside className="hidden w-[300px] shrink-0 xl:block">
            <div className="sticky top-20">
              <AdSlot config={ads.right} name="오른쪽" shape="vertical" />
            </div>
          </aside>
        ) : null}
      </div>
    </main>
  );
}
