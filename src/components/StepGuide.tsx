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
 * The `slim` variant (generator) instead shows three equal columns on phones — badge above a
 * short title, no body text — so the strip stays one compact block whatever the language's title
 * length (German or French titles are twice as long as Korean ones). The list semantics and the
 * screen-reader state words are the same in both layouts.
 */
export function StepGuide({ steps, label, doneLabel, currentLabel, completed = 0, live = false, slim = false, className = "" }: Props) {
  // Live guides also draw a gauge under the steps: one equal share per finished step (pick a
  // type → 1/3, add content → 2/3, save → full), so going back a step visibly empties it again.
  const gaugeSteps = Math.max(steps.length, 1);
  const progress = Math.min(Math.max(completed, 0), gaugeSteps) / gaugeSteps;
  return (
    <div className={`overflow-hidden rounded-xl bg-accent-soft ${className}`}>
    <ol
      aria-label={label}
      // From sm every step gets exactly a third of the width; the chevron sits in the gap between columns.
      className={`sm:grid sm:grid-cols-3 sm:gap-8 sm:px-5 ${
        slim ? "grid grid-cols-3 gap-1 px-2 py-2.5 sm:py-3.5" : "flex flex-col gap-4 px-4 py-4"
      }`}
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
            className={`relative flex min-w-0 ${
              slim ? "flex-col items-center gap-1 text-center sm:flex-row sm:items-start sm:gap-2.5 sm:text-left" : "items-start gap-2.5"
            }`}
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
              <span
                className={`flex items-center gap-1.5 font-medium text-foreground ${
                  slim ? "justify-center text-[12px] leading-tight whitespace-normal sm:justify-start sm:text-sm sm:whitespace-nowrap" : "text-sm whitespace-nowrap"
                }`}
              >
                <span className={`shrink-0 text-accent/80 [&_svg]:size-4 ${slim ? "hidden sm:inline-flex" : "inline-flex"}`}>{step.icon}</span>
                {step.title}
                {done ? <span className="sr-only">({doneLabel})</span> : current ? <span className="sr-only">({currentLabel})</span> : null}
              </span>
              {step.body ? <span className={`mt-0.5 text-[13px] leading-snug text-muted ${slim ? "hidden sm:block" : "block"}`}>{step.body}</span> : null}
            </span>
            {!last ? (
              <span aria-hidden="true" className="absolute top-1 -right-[26px] hidden text-accent/40 sm:block">
                <ChevronRightIcon className="size-5" />
              </span>
            ) : null}
          </li>
        );
      })}
    </ol>
    {live ? (
      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={gaugeSteps}
        aria-valuenow={Math.min(Math.max(completed, 0), gaugeSteps)}
        className="mx-2 mb-2 h-1.5 overflow-hidden rounded-full bg-accent/15 sm:mx-5 sm:mb-2.5"
      >
        <div className="h-full rounded-full bg-accent motion-safe:transition-[width] motion-safe:duration-500 motion-safe:ease-out" style={{ width: `${progress * 100}%` }} />
      </div>
    ) : null}
    </div>
  );
}
