import Link from "next/link";
import { AdSlot, type AdSlotConfig } from "@/components/ads/AdSlot";
import { FaqList } from "@/components/FaqList";
import { adConfig } from "@/components/ads/adConfig";
import { I18nProvider } from "@/components/i18n/I18nProvider";
import { ArrowRightIcon, TypeIcon } from "@/components/icons";
import { QrGenerator } from "@/components/qr/QrGenerator";
import { getDict, localePath, typeToSlug, type Locale } from "@/lib/i18n";
import { QR_TYPES } from "@/lib/qr/types";
import { getSettings } from "@/lib/settings";

export async function HomePage({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const s = await getSettings();
  const ads = {
    top: adConfig(s, s.ad_slot_top),
    left: adConfig(s, s.ad_slot_left),
    right: adConfig(s, s.ad_slot_right),
    bottom: adConfig(s, s.ad_slot_bottom),
    incontent: adConfig(s, s.ad_slot_incontent),
  };
  const sideVisible = (c: AdSlotConfig) => (c.enabled && c.client && c.slotId) || c.showPlaceholder;

  return (
    <main className="mx-auto w-full max-w-[1400px] px-4 pt-4 pb-16 sm:px-6 sm:pt-5">
      {/* 1. 상단 가로 광고 */}
      <AdSlot config={ads.top} name="상단" shape="horizontal" compact className="mb-5" />

      <div className="flex gap-6 xl:gap-8">
        {/* 2. 왼쪽 세로 광고 (lg 이상) */}
        {sideVisible(ads.left) ? (
          <aside className="hidden w-40 shrink-0 lg:block">
            <div className="sticky top-20">
              <AdSlot config={ads.left} name="왼쪽" shape="vertical" />
            </div>
          </aside>
        ) : null}

        <div className="min-w-0 flex-1">
          <I18nProvider locale={locale}>
            <QrGenerator />
          </I18nProvider>

          {/*
            Everything below the generator. Ads start here — never beside the generator — so the
            download/copy buttons keep a wide margin from every ad (AdSense accidental-click policy).
          */}
          <div className="mt-12 flex gap-8 border-t border-border pt-12">
            <div className="min-w-0 flex-1">
              {/* 3. 본문 중간 광고 */}
              <AdSlot config={ads.incontent} name="본문 중간" shape="rectangle" />

              <section className="mt-16" aria-labelledby="types-heading">
                <div className="max-w-2xl">
                  <h2 id="types-heading" className="section-title">
                    {t.home.typesTitle}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{t.home.typesDesc}</p>
                </div>
                <ul className="mt-6 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2">
                  {/* Each tile opens that type's landing page (generator preselected + guide). */}
                  {QR_TYPES.map((type) => (
                    <li key={type} className="flex bg-card md:last:odd:col-span-2">
                      <Link
                        href={localePath(locale, `/${typeToSlug(type)}`)}
                        className="group flex w-full gap-3 p-5 transition-colors hover:bg-subtle focus-visible:-outline-offset-2"
                      >
                        <TypeIcon type={type} className="mt-0.5 size-5 shrink-0 text-muted transition-colors group-hover:text-accent" />
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-medium text-foreground">{t.types.labels[type]}</span>
                          <span className="mt-1 block text-[13px] leading-relaxed text-muted">{t.types.descriptions[type]}</span>
                        </span>
                        <ArrowRightIcon className="mt-0.5 size-4 shrink-0 text-muted opacity-0 transition-opacity group-hover:opacity-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="mt-16" aria-labelledby="faq-heading">
                <h2 id="faq-heading" className="section-title">
                  {t.home.faqTitle}
                </h2>
                <div className="mt-4">
                <FaqList
                  items={[
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
                  ]}
                />
                </div>
              </section>
            </div>

            {/* 4. 오른쪽 세로 광고 (xl 이상) — starts below the generator card */}
            {sideVisible(ads.right) ? (
              <aside className="hidden w-[300px] shrink-0 xl:block">
                <div className="sticky top-20">
                  <AdSlot config={ads.right} name="오른쪽" shape="vertical" />
                </div>
              </aside>
            ) : null}
          </div>
        </div>
      </div>

      {/* 5. 하단 가로 광고 */}
      <AdSlot config={ads.bottom} name="하단" shape="horizontal" className="mt-16" />
    </main>
  );
}
