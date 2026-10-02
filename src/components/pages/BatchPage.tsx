import { AdSlot, type AdSlotConfig } from "@/components/ads/AdSlot";
import { BatchTool } from "@/components/batch/BatchTool";
import { MAX_ROWS } from "@/components/batch/parse";
import { I18nProvider } from "@/components/i18n/I18nProvider";
import { getDict, type Locale } from "@/lib/i18n";

export function BatchPage({ locale, ad }: { locale: Locale; ad: AdSlotConfig }) {
  const t = getDict(locale).batch;
  return (
    <main className="mx-auto w-full max-w-4xl px-4 pt-6 pb-16 sm:px-6 sm:pt-8">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">{t.title}</h1>
        <p className="mt-1 text-sm text-muted">{t.tagline}</p>
      </header>

      {/* Three-step orientation: numbers only, no icons. */}
      <ol aria-label={t.stepsLabel} className="mt-5 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
        {t.steps.map((step, i) => (
          <li key={step.title} className="flex gap-3 bg-card px-4 py-3">
            <span className="pt-px font-mono text-xs font-medium text-muted tabular-nums" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-medium text-foreground">{step.title}</span>
              <span className="mt-0.5 block text-[13px] leading-snug text-muted">{step.body}</span>
            </span>
          </li>
        ))}
      </ol>
      <p className="mt-2 mb-5 text-xs text-muted">{t.limitNote(MAX_ROWS)}</p>

      <I18nProvider locale={locale}>
        <BatchTool />
      </I18nProvider>

      {/* Below the whole tool, never beside the download button (AdSense accidental-click policy). */}
      <AdSlot config={ad} name="본문 중간" shape="rectangle" className="mt-16" />
    </main>
  );
}
