"use client";

import { QR_TYPES, QR_TYPE_LABELS, type QrType } from "@/lib/qr/types";
import { TypeIcon } from "../icons";

export function TypeTabs({ value, onChange }: { value: QrType; onChange: (t: QrType) => void }) {
  return (
    <div role="group" aria-label="QR 종류" className="grid grid-cols-3 gap-2">
      {QR_TYPES.map((t) => {
        const active = t === value;
        return (
          <button
            key={t}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(t)}
            className={`flex min-h-11 flex-col items-center justify-center gap-1 rounded-lg border px-2 py-2 text-[13px] leading-tight font-medium transition-colors sm:flex-row sm:justify-start sm:gap-2.5 sm:px-3 sm:text-sm ${
              active
                ? "border-foreground bg-card text-foreground shadow-[0_0_0_1px_var(--foreground)]"
                : "border-border bg-card text-muted hover:border-border-strong hover:bg-subtle hover:text-foreground"
            }`}
          >
            <TypeIcon type={t} className={`size-[18px] shrink-0 ${active ? "text-accent" : ""}`} />
            <span className="text-center sm:text-left">{QR_TYPE_LABELS[t]}</span>
          </button>
        );
      })}
    </div>
  );
}
