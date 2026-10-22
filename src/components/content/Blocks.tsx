import type { Block } from "@/lib/content/types";
import { Rich } from "./Rich";

/** Renders editorial blocks with the landing pages' text styles (same sizes, spacing and bullets). */
export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-4 text-[15px] leading-7 text-foreground/90">
      {blocks.map((b, i) => {
        if ("h2" in b) {
          return (
            <h2 key={i} className="section-title pt-6 first:pt-0">
              {b.h2}
            </h2>
          );
        }
        if ("h3" in b) {
          return (
            <h3 key={i} className="pt-3 text-base font-semibold text-foreground first:pt-0">
              {b.h3}
            </h3>
          );
        }
        if ("p" in b) {
          return (
            <p key={i}>
              <Rich text={b.p} />
            </p>
          );
        }
        if ("ul" in b) {
          return (
            <ul key={i} className="space-y-3">
              {b.ul.map((item, j) => (
                <li key={j} className="flex gap-3">
                  <span className="mt-[11px] size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  <span className="min-w-0">
                    <Rich text={item} />
                  </span>
                </li>
              ))}
            </ul>
          );
        }
        return (
          <ol key={i} className="space-y-3">
            {b.ol.map((item, j) => (
              <li key={j} className="flex gap-3">
                <span
                  className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-accent-soft text-[11px] font-semibold text-accent tabular-nums"
                  aria-hidden="true"
                >
                  {j + 1}
                </span>
                <span className="min-w-0">
                  <Rich text={item} />
                </span>
              </li>
            ))}
          </ol>
        );
      })}
    </div>
  );
}
