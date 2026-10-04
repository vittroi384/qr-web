"use client";

import { useState } from "react";
import { QR_TYPES, type QrType } from "@/lib/qr/types";
import { ChevronDownIcon, TypeIcon } from "../icons";
import { useI18n } from "../i18n/I18nProvider";

/** Tiles shown before "More types" is pressed, on every width. The order is QR_TYPES (most-used first). */
const VISIBLE = 8;

/**
 * Type toggles. Columns follow the width of the column the grid sits in (container query),
 * not the viewport — at lg the side ad and preview column make it much narrower than the screen.
 * Seventeen tiles are a wall, so only the first eight show until "More types" is pressed; the
 * collapse is CSS-only (hidden tiles stay in the markup) so the server render matches everywhere.
 *
 * Pressing the selected tile again clears the selection (`onChange(null)`), which sends the step
 * guide back to step 1.
 */
export function TypeTabs({ value, onChange }: { value: QrType | null; onChange: (t: QrType | null) => void }) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  // A selection from the extra group stays visible as a ninth tile when the grid is collapsed,
  // so the list can always be folded back and the chosen type is never hidden.
  const selectedInExtra = value !== null && QR_TYPES.indexOf(value) >= VISIBLE;
  const hiddenCount = QR_TYPES.length - VISIBLE - (selectedInExtra ? 1 : 0);
  return (
    <div className="@container">
      <div role="group" aria-label={t.generator.typeGroupLabel} className="grid auto-rows-fr grid-cols-2 gap-2 @sm:grid-cols-3 @2xl:grid-cols-4">
        {QR_TYPES.map((type, i) => {
          const active = type === value;
          const collapsed = !open && i >= VISIBLE && !active;
          return (
            <button
              key={type}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(active ? null : type)}
              className={`${collapsed ? "hidden" : "flex"} min-h-16 min-w-0 items-center gap-3 rounded-lg border px-3.5 py-2.5 text-left transition-colors ${
                active
                  ? "border-accent bg-accent text-white shadow-[0_2px_10px_rgb(2_132_199/0.35)]"
                  : "border-border bg-card text-muted hover:border-border-strong hover:bg-subtle hover:text-foreground"
              }`}
            >
              <TypeIcon type={type} className={`size-5 shrink-0 ${active ? "text-white" : ""}`} />
              <span className="min-w-0">
                <span className="block text-sm leading-tight font-semibold">{t.types.labels[type]}</span>
                <span className={`mt-0.5 block text-xs leading-tight ${active ? "text-white/90" : "text-muted/90"}`}>{t.types.hints[type]}</span>
              </span>
            </button>
          );
        })}
      </div>
      <button type="button" aria-expanded={open} onClick={() => setOpen(!open)} className="btn btn-ghost btn-sm mt-2 -ml-1">
        <ChevronDownIcon className={`transition-transform ${open ? "rotate-180" : ""}`} />
        {open ? t.generator.typeLess : t.generator.typeMore(hiddenCount)}
      </button>
    </div>
  );
}
