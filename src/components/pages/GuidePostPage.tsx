import Link from "next/link";
import { AdSlot } from "@/components/ads/AdSlot";
import { adSlots } from "@/components/ads/adConfig";
import { Blocks } from "@/components/content/Blocks";
import { Rich } from "@/components/content/Rich";
import { ChevronRightIcon } from "@/components/icons";
import { GUIDES } from "@/lib/content/guides";
import type { GuidePost } from "@/lib/content/types";
import { jsonLd } from "@/lib/jsonLd";
import { getSettings } from "@/lib/settings";

/** "2026-10-22" → "October 22, 2026" (UTC, so the date never shifts with the server's zone). */
export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}

/** One /guides/<slug> article: the About/Privacy page frame, Article + Breadcrumb JSON-LD, three more guides at the end. */
export async function GuidePostPage({ post }: { post: GuidePost }) {
  const s = await getSettings();
  const base = s.site_url.replace(/\/$/, "");
  const url = `${base}/guides/${post.slug}`;
  const more = GUIDES.filter((g) => g.slug !== post.slug).slice(0, 3);
  const structured = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.description,
      datePublished: post.published,
      dateModified: post.published,
      inLanguage: "en",
      mainEntityOfPage: url,
      author: { "@type": "Organization", name: s.site_name, url: `${base}/` },
      publisher: { "@type": "Organization", name: s.site_name, url: `${base}/` },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Guides", item: `${base}/guides` },
        { "@type": "ListItem", position: 2, name: post.title, item: url },
      ],
    },
  ];

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      {structured.map((data, i) => (
        // Static, server-built JSON (no user input); "<" is escaped regardless.
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(data) }} />
      ))}

      <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-[13px] text-muted">
        <Link href="/guides" className="transition-colors hover:text-foreground">
          Guides
        </Link>
        <ChevronRightIcon className="size-3.5" />
        <span className="truncate text-foreground">{post.title}</span>
      </nav>

      <header className="mt-4">
        <h1 className="text-[28px] leading-tight font-semibold tracking-tight sm:text-[34px]">{post.title}</h1>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">
          <Rich text={post.intro} />
        </p>
        <p className="mt-3 text-sm text-muted">
          <time dateTime={post.published}>{formatDate(post.published)}</time>
        </p>
      </header>

      <article className="mt-10 border-t border-border pt-8">
        <Blocks blocks={post.blocks} />
      </article>

      <section className="mt-14 border-t border-border pt-8" aria-labelledby="more-heading">
        <h2 id="more-heading" className="section-title">
          More guides
        </h2>
        <ul className="mt-4 divide-y divide-border overflow-hidden rounded-xl border border-border bg-card shadow-xs">
          {more.map((g) => (
            <li key={g.slug}>
              <Link href={`/guides/${g.slug}`} className="flex items-center justify-between gap-3 px-4 py-3.5 transition-colors hover:bg-subtle sm:px-5">
                <span className="min-w-0 text-[15px] leading-6 font-medium text-foreground">{g.title}</span>
                <ChevronRightIcon className="size-4 shrink-0 text-muted" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* 하단 가로 광고 — after all the text, same unit as the other pages */}
      <AdSlot config={adSlots(s).bottom} name="bottom" shape="horizontal" className="mt-16" />
    </main>
  );
}
