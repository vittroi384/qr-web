import Link from "next/link";
import { Meter } from "./DataTable";
import { num } from "./format";

export type Facet = {
  title: string;
  hint: string;
  items: { key: string; count: number }[];
  /** When set, each item links to this href (e.g. a search for that domain). */
  link?: (key: string) => string;
};

/** The logs page's collapsible "자동 분류": top values per facet as small bars. */
export function FacetPanel({ facets, note, open }: { facets: Facet[]; note: string; open: boolean }) {
  return (
    <details className="group rounded-xl border border-border bg-card" open={open}>
      <summary className="flex cursor-pointer flex-wrap items-baseline justify-between gap-2 px-4 py-3 sm:px-5">
        <span className="text-[15px] font-semibold">
          자동 분류 <span className="ml-1 text-xs font-normal text-muted">{note} · 도메인을 누르면 그 조건으로 검색</span>
        </span>
        <span className="text-xs text-accent group-open:hidden">펼치기</span>
        <span className="hidden text-xs text-muted group-open:inline">접기</span>
      </summary>
      <div className="grid gap-5 border-t border-border p-4 sm:grid-cols-2 sm:p-5 lg:grid-cols-4">
        {facets.map((f) => {
          const max = f.items[0]?.count ?? 1;
          return (
            <div key={f.title}>
              <h3 className="text-[13px] font-medium text-foreground">
                {f.title}
                {f.hint ? <span className="ml-1.5 text-[11px] font-normal text-muted">{f.hint}</span> : null}
              </h3>
              {f.items.length === 0 ? (
                <p className="mt-2 text-xs text-muted">해당 없음</p>
              ) : (
                <ul className="mt-2 space-y-1.5">
                  {f.items.map((it) => {
                    const bar = (
                      <>
                        <span className="flex items-center justify-between gap-2 text-[13px]">
                          <span className="truncate">{it.key}</span>
                          <span className="shrink-0 text-xs text-muted tabular-nums">{num(it.count)}</span>
                        </span>
                        <Meter value={it.count} max={max} className="mt-1 block h-1.5" />
                      </>
                    );
                    return (
                      <li key={it.key}>
                        {f.link ? (
                          <Link href={f.link(it.key)} className="-mx-1 block rounded-md px-1 py-0.5 transition-colors hover:bg-subtle">
                            {bar}
                          </Link>
                        ) : (
                          <div className="-mx-1 px-1 py-0.5">{bar}</div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </details>
  );
}
