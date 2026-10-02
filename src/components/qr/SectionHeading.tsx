import type { ReactNode } from "react";

/** Numbered step heading ("01 종류") used by the generator and the batch tool. */
export function SectionHeading({
  step,
  title,
  description,
  action,
}: {
  step: number;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-3 flex items-start justify-between gap-3">
      <div className="min-w-0">
        <h2 className="flex items-baseline gap-2.5 text-[15px] font-semibold text-foreground">
          <span className="font-mono text-xs font-medium text-muted tabular-nums" aria-hidden="true">
            {String(step).padStart(2, "0")}
          </span>
          {title}
        </h2>
        {description ? <p className="mt-0.5 text-[13px] leading-snug text-muted">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}
