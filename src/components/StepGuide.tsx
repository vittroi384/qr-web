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
  /** One line, titles only (generator). Otherwise titles + descriptions (batch). */
  compact?: boolean;
  className?: string;
};

/**
 * Numbered "how it works" strip on a soft sky band. Badges are joined by a thin line and a
 * chevron on wide screens; the full variant stacks on phones with a vertical line instead.
 */
export function StepGuide({ steps, label, doneLabel, currentLabel, completed = 0, live = false, compact = false, className = "" }: Props) {
  return (
    <ol
      aria-label={label}
      className={`flex rounded-xl bg-accent-soft ${
        compact ? "items-center gap-2 px-3 py-2.5 sm:px-4" : "flex-col gap-4 px-4 py-4 sm:flex-row sm:items-start sm:gap-3 sm:px-5"
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
            className={`relative flex min-w-0 gap-2.5 ${compact ? "items-center" : "items-start"} ${last ? "" : "flex-1"}`}
          >
            {!compact && !last ? <span aria-hidden="true" className="absolute top-9 -bottom-3 left-[13.5px] w-px bg-accent/25 sm:hidden" /> : null}
            <span
              className={`grid size-7 shrink-0 place-items-center rounded-full text-xs font-semibold tabular-nums transition-colors ${badge} ${
                current ? "shadow-[0_0_0_4px_rgb(2_132_199/0.14)]" : ""
              }`}
            >
              {done ? <CheckIcon className="size-3.5" /> : i + 1}
            </span>
            <span className={`min-w-0 ${compact ? "" : "pt-0.5"}`}>
              <span className={`flex items-center gap-1.5 font-medium whitespace-nowrap text-foreground ${compact ? "text-[13px]" : "text-sm"}`}>
                <span className={`shrink-0 text-accent/80 [&_svg]:size-4 ${compact ? "hidden sm:inline-flex" : "inline-flex"}`}>{step.icon}</span>
                {step.title}
                {done ? <span className="sr-only">({doneLabel})</span> : current ? <span className="sr-only">({currentLabel})</span> : null}
              </span>
              {!compact && step.body ? <span className="mt-0.5 block text-[13px] leading-snug text-muted">{step.body}</span> : null}
            </span>
            {!last ? (
              <span
                aria-hidden="true"
                className={`min-w-3 flex-1 items-center text-accent/45 ${compact ? "flex" : "mt-3.5 hidden sm:flex"}`}
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
