import type { ReactNode } from "react";
import { CheckIcon, ChevronRightIcon } from "./icons";

export type GuideStep = { title: string; body?: string; icon: ReactNode };

type Props = {
  steps: readonly GuideStep[];
  label: string;
  /** Screen-reader words for the step states. */
  doneLabel: string;
  currentLabel: string;
  /** How many steps are finished. Only meaningful with `live`. */
  completed?: number;
  /** Highlight progress (batch tool). Static guides leave every step neutral. */
  live?: boolean;
  /** Tighter padding for a guide that sits above a form (generator). */
  slim?: boolean;
  className?: string;
};

/**
 * Numbered "how it works" strip on a soft sky band. Badges are joined by a thin line and a
 * chevron on wide screens; on phones the steps stack with a vertical line instead.
 *
 * The `slim` variant (generator) instead packs the three titles into one row on phones — badge,
 * title and a chevron, no body text — so the form is reached with far less scrolling. The list
 * semantics and the screen-reader state words are the same in both layouts.
 */
export function StepGuide({ steps, label, doneLabel, currentLabel, completed = 0, live = false, slim = false, className = "" }: Props) {
  return (
    <ol
      aria-label={label}
      className={`flex rounded-xl bg-accent-soft sm:flex-row sm:items-start sm:gap-3 sm:px-5 ${
        slim ? "flex-row flex-wrap items-center gap-x-2 gap-y-1.5 px-3 py-2 sm:py-3.5" : "flex-col gap-4 px-4 py-4"
      } ${className}`}
    >
      {steps.map((step, i) => {
        const last = i === steps.length - 1;
        const done = live && i < completed;
        const current = live && i === completed;
        const badge = done || current ? "bg-accent text-accent-foreground" : "bg-card text-accent ring-1 ring-accent/25 ring-inset";
        return (
          <li
            key={step.title}
            aria-current={current ? "step" : undefined}
            className={`relative flex min-w-0 ${slim ? "items-center gap-2 sm:items-start sm:gap-2.5" : "items-start gap-2.5"} ${last ? "" : slim ? "sm:flex-1" : "flex-1"}`}
          >
            {!last && !slim ? (
              <span aria-hidden="true" className="absolute top-9 -bottom-3 left-[13.5px] w-px bg-accent/25 sm:hidden" />
            ) : null}
            <span
              className={`grid shrink-0 place-items-center rounded-full font-semibold tabular-nums transition-colors ${badge} ${
                slim ? "size-6 text-[11px] sm:size-7 sm:text-xs" : "size-7 text-xs"
              } ${current ? "shadow-[0_0_0_4px_rgb(2_132_199/0.14)]" : ""}`}
            >
              {done ? <CheckIcon className="size-3.5" /> : i + 1}
            </span>
            <span className={`min-w-0 ${slim ? "sm:pt-0.5" : "pt-0.5"}`}>
              <span className={`flex items-center gap-1.5 font-medium whitespace-nowrap text-foreground ${slim ? "text-[13px] sm:text-sm" : "text-sm"}`}>
                <span className={`shrink-0 text-accent/80 [&_svg]:size-4 ${slim ? "hidden sm:inline-flex" : "inline-flex"}`}>{step.icon}</span>
                {step.title}
                {done ? <span className="sr-only">({doneLabel})</span> : current ? <span className="sr-only">({currentLabel})</span> : null}
              </span>
              {step.body ? <span className={`mt-0.5 text-[13px] leading-snug text-muted ${slim ? "hidden sm:block" : "block"}`}>{step.body}</span> : null}
            </span>
            {!last ? (
              <span aria-hidden="true" className={`items-center text-accent/45 sm:mt-3.5 sm:flex sm:min-w-3 sm:flex-1 ${slim ? "flex" : "hidden"}`}>
                <span className="hidden h-px flex-1 bg-accent/25 sm:block" />
                <ChevronRightIcon className="size-3.5 shrink-0 sm:-ml-1" />
              </span>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
