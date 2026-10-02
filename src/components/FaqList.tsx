import type { ReactNode } from "react";
import { ChevronDownIcon } from "./icons";

export type FaqItem = { q: string; a: ReactNode };

/**
 * FAQ as a stack of native <details> rows inside one card: a "Q" badge, the question, a
 * chevron that flips when open, and the answer indented under the question. Works without JS.
 */
export function FaqList({ items, defaultOpen = 0 }: { items: FaqItem[]; defaultOpen?: number }) {
  return (
    <div className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card shadow-xs">
      {items.map((item, i) => (
        <details key={item.q} className="group" open={i === defaultOpen}>
          <summary className="flex cursor-pointer items-start gap-3 px-4 py-4 transition-colors select-none hover:bg-subtle sm:px-5 [&::-webkit-details-marker]:hidden">
            <span className="mt-px grid size-6 shrink-0 place-items-center rounded-md bg-accent-soft text-[11px] font-bold text-accent" aria-hidden="true">
              Q
            </span>
            <span className="min-w-0 flex-1 text-[15px] leading-6 font-medium text-foreground">{item.q}</span>
            <ChevronDownIcon className="mt-1 size-4 shrink-0 text-muted transition-transform group-open:rotate-180" />
          </summary>
          <div className="px-4 pb-5 pl-[52px] text-sm leading-relaxed text-muted sm:px-5 sm:pl-[56px]">{item.a}</div>
        </details>
      ))}
    </div>
  );
}
