import Link from "next/link";
import { AdSlot } from "@/components/ads/AdSlot";
import { adSlots } from "@/components/ads/adConfig";
import { ChevronRightIcon } from "@/components/icons";
import { GUIDES } from "@/lib/content/guides";
import { getSettings } from "@/lib/settings";
import { formatDate } from "./GuidePostPage";

/** /guides: every article with its description and date. */
export async function GuidesIndexPage() {
  const s = await getSettings();
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <header>
        <h1 className="text-[28px] leading-tight font-semibold tracking-tight sm:text-[34px]">QR code guides</h1>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">
          Practical articles on printing, scanning and designing QR codes: how big to make them, which file to hand to the printer, why a code
          fails to scan, and how to set them up for menus, business cards and Wi-Fi.
        </p>
      </header>

      <ul className="mt-10 divide-y divide-border overflow-hidden rounded-xl border border-border bg-card shadow-xs">
        {GUIDES.map((g) => (
          <li key={g.slug}>
            <Link href={`/guides/${g.slug}`} className="flex items-start justify-between gap-4 px-4 py-5 transition-colors hover:bg-subtle sm:px-5">
              <span className="min-w-0">
                <span className="block text-[15px] leading-6 font-semibold text-foreground">{g.title}</span>
                <span className="mt-1 block text-sm leading-relaxed text-muted">{g.description}</span>
                <time dateTime={g.published} className="mt-2 block text-xs text-muted">
                  {formatDate(g.published)}
                </time>
              </span>
              <ChevronRightIcon className="mt-1 size-4 shrink-0 text-muted" />
            </Link>
          </li>
        ))}
      </ul>

      {/* 하단 가로 광고 — after all the text, same unit as the other pages */}
      <AdSlot config={adSlots(s).bottom} name="bottom" shape="horizontal" className="mt-16" />
    </main>
  );
}
