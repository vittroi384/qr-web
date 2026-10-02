"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/**
 * Sits at the bottom of a `.table-scroll` container. When it scrolls into view the page is
 * re-rendered with a larger `n` (server-side, so the rows stay server components); React keeps
 * the scroll container's DOM node, so the scroll position survives. `nextHref` null = all loaded.
 */
export function InfiniteScroll({ nextHref, loadedLabel }: { nextHref: string | null; loadedLabel: string }) {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  // The href we asked the server for. Once new rows arrive, nextHref moves on and this no longer
  // matches, which both clears the spinner and allows the next request — no effect needed.
  const [requestedHref, setRequestedHref] = useState<string | null>(null);
  const loading = requestedHref !== null && requestedHref === nextHref;

  useEffect(() => {
    const el = ref.current;
    if (!el || !nextHref || loading) return;
    const root = el.closest<HTMLElement>(".table-scroll");
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        setRequestedHref(nextHref);
        router.replace(nextHref, { scroll: false });
      },
      { root, rootMargin: "0px 0px 200px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [nextHref, loading, router]);

  return (
    <div ref={ref} className="flex items-center justify-center gap-2 py-3 text-xs text-muted" aria-live="polite">
      {nextHref ? (
        loading ? (
          <>
            <span className="size-3.5 animate-spin rounded-full border-2 border-border-strong border-t-accent" aria-hidden="true" />
            불러오는 중…
          </>
        ) : (
          <a href={nextHref} className="link">
            더 불러오기
          </a>
        )
      ) : (
        loadedLabel
      )}
    </div>
  );
}
