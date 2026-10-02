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
 */
export function StepGuide({ steps, label, doneLabel, currentLabel, completed = 0, live = false, slim = false, className = "" }: Props) {
  return (
    <ol
      aria-label={label}
      className={`flex flex-col rounded-xl bg-accent-soft sm:flex-row sm:items-start sm:gap-3 sm:px-5 ${
        slim ? "gap-3 px-4 py-3 sm:py-3.5" : "gap-4 px-4 py-4"
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
            className={`relative flex min-w-0 items-start gap-2.5 ${last ? "" : "flex-1"}`}
          >
            {!last ? (
              <span
                aria-hidden="true"
                className={`absolute top-9 left-[13.5px] w-px bg-accent/25 sm:hidden ${slim ? "-bottom-2" : "-bottom-3"}`}
              />
            ) : null}
            <span
              className={`grid size-7 shrink-0 place-items-center rounded-full text-xs font-semibold tabular-nums transition-colors ${badge} ${
                current ? "shadow-[0_0_0_4px_rgb(2_132_199/0.14)]" : ""
              }`}
            >
              {done ? <CheckIcon className="size-3.5" /> : i + 1}
            </span>
            <span className="min-w-0 pt-0.5">
              <span className="flex items-center gap-1.5 text-sm font-medium whitespace-nowrap text-foreground">
                <span className="inline-flex shrink-0 text-accent/80 [&_svg]:size-4">{step.icon}</span>
                {step.title}
                {done ? <span className="sr-only">({doneLabel})</span> : current ? <span className="sr-only">({currentLabel})</span> : null}
              </span>
              {step.body ? <span className="mt-0.5 block text-[13px] leading-snug text-muted">{step.body}</span> : null}
            </span>
            {!last ? (
              <span
                aria-hidden="true"
                className="mt-3.5 hidden min-w-3 flex-1 items-center text-accent/45 sm:flex"
              >
                <span className="h-px flex-1 bg-accent/25" />
                <ChevronRightIcon className="-ml-1 size-3.5 shrink-0" />
              </span>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
