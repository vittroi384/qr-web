"use client";

import { QR_TYPES, QR_TYPE_LABELS, type QrType } from "@/lib/qr/types";

const ICONS: Record<QrType, string> = {
  url: "🔗",
  text: "📝",
  wifi: "📶",
  vcard: "👤",
  email: "✉️",
  sms: "💬",
  phone: "📞",
  geo: "📍",
  event: "📅",
};

export function TypeTabs({ value, onChange }: { value: QrType; onChange: (t: QrType) => void }) {
  return (
    <div role="tablist" aria-label="QR 종류" className="flex flex-wrap gap-2">
      {QR_TYPES.map((t) => {
        const active = t === value;
        return (
          <button
            key={t}
            role="tab"
            type="button"
            aria-selected={active}
            onClick={() => onChange(t)}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition ${
              active
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border bg-card text-foreground hover:border-accent/60"
            }`}
          >
            <span aria-hidden="true">{ICONS[t]}</span>
            {QR_TYPE_LABELS[t]}
          </button>
        );
      })}
    </div>
  );
}
