import { AdSlot, type AdSlotConfig } from "@/components/ads/AdSlot";
import { BatchTool } from "@/components/batch/BatchTool";
import { I18nProvider } from "@/components/i18n/I18nProvider";
import { getDict, type Locale } from "@/lib/i18n";

export function BatchPage({ locale, ad }: { locale: Locale; ad: AdSlotConfig }) {
  const t = getDict(locale).batch;
  return (
    <main className="mx-auto w-full max-w-[1200px] px-4 pt-6 pb-16 sm:px-6 sm:pt-8">
      <header className="mb-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">{t.title}</h1>
        <p className="text-sm text-muted">{t.tagline}</p>
      </header>

      <I18nProvider locale={locale}>
        <BatchTool />
      </I18nProvider>

      {/* Below the whole tool, never beside the download button (AdSense accidental-click policy). */}
      <AdSlot config={ad} name="본문 중간" shape="rectangle" className="mt-16" />
    </main>
  );
}
