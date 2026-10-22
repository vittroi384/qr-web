import type { TypeGuide as Guide } from "@/lib/content/types";
import { Blocks } from "./content/Blocks";
import { ChevronDownIcon } from "./icons";

/**
 * Long-form guide under a type landing's FAQ, collapsed by default. A native <details>, so the
 * whole text is in the server-rendered HTML (crawlers read it) and opening needs no JS.
 */
export function TypeGuide({ guide }: { guide: Guide }) {
  return (
    <section className="mt-16" aria-labelledby="guide-heading">
      <details className="group overflow-hidden rounded-xl border border-border bg-card shadow-xs">
        <summary className="flex cursor-pointer items-center justify-between gap-3 px-4 py-4 transition-colors select-none hover:bg-subtle sm:px-5 [&::-webkit-details-marker]:hidden">
          <h2 id="guide-heading" className="section-title">
            {guide.title}
          </h2>
          <ChevronDownIcon className="size-4 shrink-0 text-muted transition-transform group-open:rotate-180" />
        </summary>
        <div className="border-t border-border px-4 py-5 sm:px-5">
          <Blocks blocks={guide.blocks} />
        </div>
      </details>
    </section>
  );
}
