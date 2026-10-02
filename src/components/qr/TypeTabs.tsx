"use client";

import { QR_TYPES, type QrType } from "@/lib/qr/types";
import { TypeIcon } from "../icons";
import { useI18n } from "../i18n/I18nProvider";

/**
 * Ten type toggles. Columns follow the width of the column the grid sits in (container query),
 * not the viewport — at lg the side ad and preview column make it much narrower than the screen.
 */
export function TypeTabs({ value, onChange }: { value: QrType; onChange: (t: QrType) => void }) {
  const { t } = useI18n();
  return (
    <div className="@container">
      <div role="group" aria-label={t.generator.typeGroupLabel} className="grid grid-cols-2 gap-2 @sm:grid-cols-3 @2xl:grid-cols-5">
        {QR_TYPES.map((type) => {
          const active = type === value;
          return (
            <button
              key={type}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(type)}
              className={`flex min-h-11 min-w-0 items-center gap-2 rounded-lg border px-3 py-2 text-left text-[13px] leading-tight font-medium transition-colors ${
                active
                  ? "border-foreground bg-card text-foreground shadow-[0_0_0_1px_var(--foreground)]"
                  : "border-border bg-card text-muted hover:border-border-strong hover:bg-subtle hover:text-foreground"
              }`}
            >
              <TypeIcon type={type} className={`size-[18px] shrink-0 ${active ? "text-accent" : ""}`} />
              <span className="min-w-0">{t.types.labels[type]}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
