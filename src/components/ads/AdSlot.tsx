"use client";

import { useEffect, useRef } from "react";

export type AdSlotConfig = {
  client: string;
  slotId: string;
  enabled: boolean;
  showPlaceholder: boolean;
};

type Props = {
  config: AdSlotConfig;
  name: string;
  /** Visual hint for the placeholder + AdSense data-ad-format. */
  shape: "horizontal" | "vertical" | "rectangle";
  className?: string;
};

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

const SHAPE_CLASS: Record<Props["shape"], string> = {
  horizontal: "min-h-[90px] w-full",
  vertical: "min-h-[600px] w-full",
  rectangle: "min-h-[250px] w-full",
};

/**
 * One AdSense unit. Renders the real <ins> when a client + slot ID are configured and ads are
 * enabled; otherwise a dashed placeholder (only if placeholders are turned on) so the layout
 * can be checked before approval. Never renders popups or overlays.
 */
export function AdSlot({ config, name, shape, className = "" }: Props) {
  const insRef = useRef<HTMLModElement>(null);
  const live = config.enabled && Boolean(config.client) && Boolean(config.slotId);

  useEffect(() => {
    if (!live || !insRef.current) return;
    // Guard against double push on fast refresh / re-mount.
    if (insRef.current.getAttribute("data-adsbygoogle-status")) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Ad blocker or script not loaded yet; nothing to do.
    }
  }, [live]);

  if (live) {
    return (
      <div className={`${SHAPE_CLASS[shape]} ${className}`} data-ad-slot-name={name}>
        <ins
          ref={insRef}
          className="adsbygoogle block"
          style={{ display: "block" }}
          data-ad-client={config.client}
          data-ad-slot={config.slotId}
          data-ad-format={shape === "vertical" ? "auto" : shape === "horizontal" ? "horizontal" : "rectangle"}
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  if (!config.showPlaceholder) return null;

  return (
    <div
      className={`${SHAPE_CLASS[shape]} ${className} grid place-items-center rounded-xl border-2 border-dashed border-ad-placeholder text-xs text-muted`}
      data-ad-slot-name={name}
      aria-hidden="true"
    >
      광고 자리 · {name}
    </div>
  );
}
