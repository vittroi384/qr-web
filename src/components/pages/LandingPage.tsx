import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { AdSlot, type AdSlotConfig } from "@/components/ads/AdSlot";
import { adConfig } from "@/components/ads/adConfig";
import { FaqList } from "@/components/FaqList";
import { I18nProvider } from "@/components/i18n/I18nProvider";
import { ArrowRightIcon, TypeIcon } from "@/components/icons";
import { QrGenerator } from "@/components/qr/QrGenerator";
import { alternatesFor, getDict, getLanding, localePath, slugToType, typeToSlug, type Locale } from "@/lib/i18n";
import { QR_TYPES, type QrType } from "@/lib/qr/types";
import { getSettings } from "@/lib/settings";

/** Copy may mark formats with backticks (`WIFI:T:WPA;…`); render those as inline code. */
function rich(text: string): ReactNode {
  const parts = text.split(/`([^`]+)`/);
  if (parts.length === 1) return text;
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <code key={i} className="rounded bg-surface px-1 py-px font-mono text-[0.9em] break-all text-foreground">
        {part}
      </code>
    ) : (
      part
    ),
  );
}

const plain = (text: string) => text.replace(/`([^`]+)`/g, "$1");

/** JSON for a <script type="application/ld+json">: "<" is escaped so no string can close the tag. */
function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function landingType(slug: string): QrType {
  const type = slugToType(slug);
  if (!type) notFound();
  return type;
}

export function landingMetadata(locale: Locale, slug: string): Metadata {
  const type = slugToType(slug);
  if (!type) return {};
  const c = getLanding(locale)[type];
  const path = `/${typeToSlug(type)}`;
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: alternatesFor(locale, path),
    openGraph: {
      title: c.metaTitle,
      description: c.metaDescription,
      url: localePath(locale, path),
      type: "website",
      locale: getDict(locale).meta.ogLocale,
    },
  };
}

/**
 * One landing page per QR type (/wifi-qr-code, /ko/wifi-qr-code, …): the generator with that type
 * preselected, then type-specific long-form copy, FAQ (also as FAQPage JSON-LD) and links to the
 * other generators. Ads use the home page's five-slot layout and the same distance rules.
 */
export function LandingPage({ locale, type }: { locale: Locale; type: QrType }) {
  const t = getDict(locale);
  const c = getLanding(locale)[type];
  const s = getSettings();
  const ads = {
    top: adConfig(s.ad_slot_top),
    left: adConfig(s.ad_slot_left),
    right: adConfig(s.ad_slot_right),
    bottom: adConfig(s.ad_slot_bottom),
    incontent: adConfig(s.ad_slot_incontent),
  };
  const sideVisible = (cfg: AdSlotConfig) => (cfg.enabled && cfg.client && cfg.slotId) || cfg.showPlaceholder;

  const base = s.site_url.replace(/\/$/, "");
  const pageUrl = `${base}${localePath(locale, `/${typeToSlug(type)}`)}`;
  const structured = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: c.title,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Any (web browser)",
      url: pageUrl,
      inLanguage: locale,
      description: c.metaDescription,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      inLanguage: locale,
      mainEntity: c.faq.map((f) => ({
        "@type": "Question",
        name: plain(f.q),
        acceptedAnswer: { "@type": "Answer", text: plain(f.a) },
      })),
    },
  ];

  const others = QR_TYPES.filter((x) => x !== type);

  return (
    <main className="mx-auto w-full max-w-[1400px] px-4 pt-4 pb-16 sm:px-6 sm:pt-5">
      {structured.map((data, i) => (
        // Static, server-built JSON (no user input); "<" is escaped regardless.
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(data) }} />
      ))}

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
            <QrGenerator initialType={type} heading={{ title: c.title, subtitle: c.subtitle }} />
          </I18nProvider>

          {/* Ads start below the generator — never beside it (same rule as the home page). */}
          <div className="mt-12 flex gap-8 border-t border-border pt-12">
            <div className="min-w-0 flex-1">
              {/* 3. 본문 중간 광고 */}
              <AdSlot config={ads.incontent} name="본문 중간" shape="rectangle" />

              <article className="mt-16 max-w-3xl">
                <section aria-labelledby="how-heading">
                  <h2 id="how-heading" className="section-title">
                    {c.sections.howTitle}
                  </h2>
                  <div className="mt-4 space-y-4 text-[15px] leading-7 text-foreground/90">
                    {c.sections.how.map((p, i) => (
                      <p key={i}>{rich(p)}</p>
                    ))}
                  </div>
                </section>

                <section className="mt-12" aria-labelledby="uses-heading">
                  <h2 id="uses-heading" className="section-title">
                    {c.sections.usesTitle}
                  </h2>
                  <ul className="mt-4 space-y-3 text-[15px] leading-7 text-foreground/90">
                    {c.sections.uses.map((u, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="mt-[11px] size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                        <span className="min-w-0">{rich(u)}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="mt-12" aria-labelledby="tips-heading">
                  <h2 id="tips-heading" className="section-title">
                    {c.sections.tipsTitle}
                  </h2>
                  <ol className="mt-4 space-y-3 text-[15px] leading-7 text-foreground/90">
                    {c.sections.tips.map((tip, i) => (
                      <li key={i} className="flex gap-3">
                        <span
                          className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-accent-soft text-[11px] font-semibold text-accent tabular-nums"
                          aria-hidden="true"
                        >
                          {i + 1}
                        </span>
                        <span className="min-w-0">{rich(tip)}</span>
                      </li>
                    ))}
                  </ol>
                </section>
              </article>

              <section className="mt-16" aria-labelledby="faq-heading">
                <h2 id="faq-heading" className="section-title">
                  {t.landing.faqTitle}
                </h2>
                <div className="mt-4">
                  <FaqList items={c.faq.map((f) => ({ q: plain(f.q), a: rich(f.a) }))} />
                </div>
              </section>

              <section className="mt-16" aria-labelledby="others-heading">
                <h2 id="others-heading" className="section-title">
                  {t.landing.otherTitle}
                </h2>
                <p className="mt-2 text-sm text-muted">{t.landing.otherDesc}</p>
                <ul className="mt-5 grid gap-2 sm:grid-cols-2 2xl:grid-cols-3">
                  {others.map((x) => (
                    <li key={x}>
                      <Link
                        href={localePath(locale, `/${typeToSlug(x)}`)}
                        className="group flex min-h-14 items-center gap-3 rounded-lg border border-border bg-card px-4 py-2.5 transition-colors hover:border-border-strong hover:bg-subtle"
                      >
                        <TypeIcon type={x} className="size-5 shrink-0 text-muted group-hover:text-accent" />
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-medium text-foreground">{t.types.labels[x]}</span>
                          <span className="block text-xs text-muted">{t.types.hints[x]}</span>
                        </span>
                        <ArrowRightIcon className="size-4 shrink-0 text-muted opacity-0 transition-opacity group-hover:opacity-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
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
