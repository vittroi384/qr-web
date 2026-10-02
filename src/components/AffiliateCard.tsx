import { ArrowRightIcon, PrinterIcon } from "./icons";

/** Already-resolved affiliate slot (see `resolveAffiliate`). Safe to pass to client components. */
export type AffiliateInfo = { url: string; label: string; note: string; heading: string; sponsored: string };

/**
 * Small, clearly labelled partner card ("Sponsored"). Deliberately quiet so it never reads as an
 * ad unit or as one of the app's own buttons; callers keep it ≥ 32px from ads and save buttons.
 */
export function AffiliateCard({ info, className = "" }: { info: AffiliateInfo; className?: string }) {
  return (
    <aside className={`rounded-xl border border-border bg-subtle p-4 ${className}`} aria-label={info.sponsored}>
      <div className="flex items-start gap-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-card text-muted ring-1 ring-border" aria-hidden="true">
          <PrinterIcon className="size-4" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="rounded border border-border-strong px-1.5 py-px text-[10px] font-semibold tracking-wide text-muted uppercase">
              {info.sponsored}
            </span>
            <span className="text-sm font-medium text-foreground">{info.heading}</span>
          </p>
          <a
            href={info.url}
            target="_blank"
            rel="sponsored noopener"
            className="link mt-1.5 inline-flex items-center gap-1 text-sm font-medium"
          >
            {info.label}
            <ArrowRightIcon className="size-3.5" />
          </a>
          <p className="mt-1.5 text-xs leading-relaxed text-muted">{info.note}</p>
        </div>
      </div>
    </aside>
  );
}
