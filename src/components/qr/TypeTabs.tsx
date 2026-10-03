"use client";

import { useState } from "react";
import { QR_TYPES, type QrType } from "@/lib/qr/types";
import { ChevronDownIcon, TypeIcon } from "../icons";
import { useI18n } from "../i18n/I18nProvider";

/**
 * On a phone-width column only the first six tiles show until "More types" is pressed. The order
 * is QR_TYPES itself (most-used first).
 */
const PHONE_VISIBLE = 6;

/**
 * Type toggles. Columns follow the width of the column the grid sits in (container query),
 * not the viewport — at lg the side ad and preview column make it much narrower than the screen.
 * The collapse is CSS-only (hidden below @sm), so wide layouts always show every tile and the
 * server-rendered markup matches on every device.
 */
export function TypeTabs({ value, onChange }: { value: QrType; onChange: (t: QrType) => void }) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  // A selection from the extra group stays visible as a seventh tile when the grid is collapsed,
  // so the list can always be folded back and the chosen type is never hidden.
  const selectedInExtra = QR_TYPES.indexOf(value) >= PHONE_VISIBLE;
  const hiddenCount = QR_TYPES.length - PHONE_VISIBLE - (selectedInExtra ? 1 : 0);
  return (
    <div className="@container">
      <div role="group" aria-label={t.generator.typeGroupLabel} className="grid auto-rows-fr grid-cols-2 gap-2 @sm:grid-cols-3 @2xl:grid-cols-5">
        {QR_TYPES.map((type, i) => {
          const active = type === value;
          const collapsed = !open && i >= PHONE_VISIBLE && !active;
          return (
            <button
              key={type}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(type)}
              className={`${collapsed ? "hidden @sm:flex" : "flex"} min-h-14 min-w-0 items-center gap-2.5 rounded-lg border px-3 py-2 text-left transition-colors ${
                active
                  ? "border-accent bg-accent text-white shadow-[0_2px_10px_rgb(2_132_199/0.35)]"
                  : "border-border bg-card text-muted hover:border-border-strong hover:bg-subtle hover:text-foreground"
              }`}
            >
              <TypeIcon type={type} className={`size-[18px] shrink-0 ${active ? "text-white" : ""}`} />
              <span className="min-w-0">
                <span className="block text-[13px] leading-tight font-medium">{t.types.labels[type]}</span>
                <span className={`mt-0.5 block text-[11px] leading-tight ${active ? "text-white/90" : "text-muted/90"}`}>{t.types.hints[type]}</span>
              </span>
            </button>
          );
        })}
      </div>
      <button type="button" aria-expanded={open} onClick={() => setOpen(!open)} className="btn btn-ghost btn-sm mt-2 -ml-1 @sm:hidden">
        <ChevronDownIcon className={`transition-transform ${open ? "rotate-180" : ""}`} />
        {open ? t.generator.typeLess : t.generator.typeMore(hiddenCount)}
      </button>
    </div>
  );
}
