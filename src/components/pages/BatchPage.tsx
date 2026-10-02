import { AdSlot, type AdSlotConfig } from "@/components/ads/AdSlot";
import { BatchTool } from "@/components/batch/BatchTool";
import { I18nProvider } from "@/components/i18n/I18nProvider";
import { getDict, type Locale } from "@/lib/i18n";

export type BatchAds = { left: AdSlotConfig; right: AdSlotConfig; incontent: AdSlotConfig };

const sideVisible = (c: AdSlotConfig) => Boolean((c.enabled && c.client && c.slotId) || c.showPlaceholder);

export function BatchPage({ locale, ads }: { locale: Locale; ads: BatchAds }) {
  const t = getDict(locale).batch;
  return (
    <main className="mx-auto w-full max-w-[1400px] px-4 pt-6 pb-16 sm:px-6 sm:pt-8">
      <div className="mx-auto max-w-4xl">
        <header className="mb-5">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">{t.title}</h1>
          <p className="mt-1 text-sm text-muted">{t.tagline}</p>
        </header>

        <I18nProvider locale={locale}>
          <BatchTool />
        </I18nProvider>
      </div>

      {/*
        Every ad starts below the tool — none sits beside it — and the band begins 128px under the
        download button (mt-20 + pt-12), as on the home page (AdSense accidental-click policy).
        Side slots are vertical units shown from lg (left) and xl (right); phones see only the middle.
      */}
      <div className="mt-20 flex gap-6 border-t border-border pt-12 xl:gap-8">
        {sideVisible(ads.left) ? (
          <aside className="hidden w-40 shrink-0 lg:block">
            <AdSlot config={ads.left} name="왼쪽" shape="vertical" />
          </aside>
        ) : null}
        <div className="min-w-0 flex-1">
          <AdSlot config={ads.incontent} name="본문 중간" shape="rectangle" />
        </div>
        {sideVisible(ads.right) ? (
          <aside className="hidden w-[300px] shrink-0 xl:block">
            <AdSlot config={ads.right} name="오른쪽" shape="vertical" />
          </aside>
        ) : null}
      </div>
    </main>
  );
}
