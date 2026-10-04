import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { AdSlot, type AdSlotConfig } from "@/components/ads/AdSlot";
import { adSlots } from "@/components/ads/adConfig";
import { AffiliateCard } from "@/components/AffiliateCard";
import { BatchTool } from "@/components/batch/BatchTool";
import { resolveAffiliate } from "@/components/affiliate";
import { FaqList } from "@/components/FaqList";
import { I18nProvider } from "@/components/i18n/I18nProvider";
import { QrGenerator } from "@/components/qr/QrGenerator";
import { alternatesFor, getDict, localePath, resolveLanding, type LandingTarget, type Locale } from "@/lib/i18n";
import type { QrType } from "@/lib/qr/types";
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

/** Types where a printed sign is the usual outcome, so the print partner slot is relevant. */
const PRINT_TYPES: readonly QrType[] = ["url", "social", "whatsapp", "text", "wifi", "vcard", "email", "phone", "geo", "event", "payment"];

/** Type or use-case landing for this slug, or the 404 page. */
export function landingTarget(locale: Locale, slug: string): LandingTarget {
  const target = resolveLanding(locale, slug);
  if (!target) notFound();
  return target;
}

export function landingMetadata(locale: Locale, slug: string): Metadata {
  const target = resolveLanding(locale, slug);
  if (!target) return {};
  const c = target.copy;
  const path = `/${target.slug}`;
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
export async function LandingPage({ locale, target }: { locale: Locale; target: LandingTarget }) {
  const t = getDict(locale);
  const { type, copy: c } = target;
  const s = await getSettings();
  const affiliate = resolveAffiliate(s, locale);
  const ads = adSlots(s);
  const sideVisible = (cfg: AdSlotConfig) => (cfg.enabled && cfg.client && cfg.slotId) || cfg.showPlaceholder;

  const base = s.site_url.replace(/\/$/, "");
  const pageUrl = `${base}${localePath(locale, `/${target.slug}`)}`;
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
          {target.kind === "useCase" && target.id === "bulk" ? (
            // The bulk landing is about many codes at once, so the batch tool takes the generator's place.
            <section aria-labelledby="generator-heading">
              <header className="mb-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <h1 id="generator-heading" className="text-2xl font-semibold tracking-tight text-foreground">
                  {c.title}
                </h1>
                <p className="text-sm text-muted">{c.subtitle}</p>
              </header>
              <I18nProvider locale={locale}>
                <BatchTool />
              </I18nProvider>
            </section>
          ) : (
            <I18nProvider locale={locale}>
              <QrGenerator
                initialType={type}
                initialPayload={target.initialPayload}
                initialUi={target.initialUi}
                heading={{ title: c.title, subtitle: c.subtitle }}
                affiliate={affiliate}
              />
            </I18nProvider>
          )}

          {/* Ads start below the generator — never beside it (same rule as the home page). */}
          <div className="mt-12 flex gap-8 border-t border-border pt-12">
            <div className="min-w-0 flex-1">
              {/* 3. 본문 중간 광고 */}
              <AdSlot config={ads.incontent} name="in-content" shape="rectangle" />

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

                {/* 6. 글 사이 광고 — after the first section, inside the text column */}
                <AdSlot config={ads.inarticle} name="in-article" shape="inarticle" className="mt-12" />

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

                {/* Print partner: after the tips, far from the ad slots and the generator's buttons. */}
                {affiliate && PRINT_TYPES.includes(type) ? <AffiliateCard info={affiliate} className="mt-10" /> : null}
              </article>

              <section className="mt-16" aria-labelledby="faq-heading">
                <h2 id="faq-heading" className="section-title">
                  {t.landing.faqTitle}
                </h2>
                <div className="mt-4">
                  <FaqList items={c.faq.map((f) => ({ q: plain(f.q), a: rich(f.a) }))} />
                </div>
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
