"use client";

import { useEffect, useId, useRef, useState } from "react";
import { QR_TYPES, QR_TYPE_LABELS, type QrType } from "@/lib/qr/types";
import { ChevronDownIcon } from "@/components/icons";
import { TypeIcon } from "@/components/icons";

/**
 * Type filter as a popover menu (every QR type + 전체) instead of a native <select>. Holds the value
 * in a hidden input so the surrounding GET form stays plain; picking an item submits at once.
 */
export function TypeFilter({ value }: { value: QrType | "" }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const hidden = useRef<HTMLInputElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const pick = (next: QrType | "") => {
    setOpen(false);
    if (!hidden.current) return;
    hidden.current.value = next;
    hidden.current.form?.requestSubmit();
  };

  const label = value ? QR_TYPE_LABELS[value] : "모든 종류";
  return (
    <div ref={root} className="relative">
      <input ref={hidden} type="hidden" name="type" defaultValue={value} />
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex h-10 items-center gap-2 rounded-lg border px-3 text-sm transition-colors ${
          value ? "border-accent/40 bg-accent-soft font-medium text-accent" : "border-border-strong bg-card text-foreground hover:bg-subtle"
        }`}
      >
        {value ? <TypeIcon type={value} className="size-4 shrink-0" /> : null}
        <span className="whitespace-nowrap">{label}</span>
        <ChevronDownIcon className={`size-4 shrink-0 text-muted transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div
          id={menuId}
          role="menu"
          aria-label="종류 필터"
          className="absolute left-0 top-[calc(100%+6px)] z-30 w-[min(26rem,calc(100vw-2rem))] rounded-xl border border-border bg-card p-1.5 shadow-[0_12px_32px_-8px_rgba(2,132,199,0.25),0_2px_8px_rgba(15,34,55,0.08)]"
        >
          <ul className="grid grid-cols-2 gap-x-1 gap-y-0.5 sm:grid-cols-3">
            {(["", ...QR_TYPES] as const).map((t) => {
              const active = t === value;
              return (
                <li key={t || "all"} className={t === "" ? "col-span-2 sm:col-span-3" : ""}>
                  <button
                    type="button"
                    role="menuitemradio"
                    aria-checked={active}
                    onClick={() => pick(t)}
                    className={`flex min-h-9 w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-[13px] leading-tight transition-colors ${
                      active ? "bg-accent-soft font-medium text-accent" : "text-foreground hover:bg-surface"
                    } ${t === "" ? "border-b border-border mb-1 rounded-b-none pb-2" : ""}`}
                  >
                    {t ? <TypeIcon type={t} className={`size-4 shrink-0 ${active ? "" : "text-muted"}`} /> : null}
                    <span className="truncate">{t ? QR_TYPE_LABELS[t] : "모든 종류"}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

const PRESETS: { label: string; days: number }[] = [
  { label: "오늘", days: 0 },
  { label: "7일", days: 6 },
  { label: "30일", days: 29 },
];

/** KST calendar date as yyyy-mm-dd (the filter is interpreted in KST on the server). */
function kstDate(offsetDays: number): string {
  const d = new Date(Date.now() + 9 * 3600_000 - offsetDays * 86_400_000);
  return d.toISOString().slice(0, 10);
}

/** Quick ranges that fill the two date inputs of the enclosing form and submit. */
export function DatePresets({ from, to }: { from: string; to: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const apply = (days: number) => {
    const form = ref.current?.closest("form");
    if (!form) return;
    const f = form.elements.namedItem("from") as HTMLInputElement | null;
    const t = form.elements.namedItem("to") as HTMLInputElement | null;
    if (!f || !t) return;
    f.value = kstDate(days);
    t.value = kstDate(0);
    form.requestSubmit();
  };
  const activeDays = PRESETS.find((p) => from === kstDate(p.days) && to === kstDate(0))?.days;
  return (
    <div ref={ref} className="inline-flex h-10 items-center rounded-lg border border-border-strong bg-card p-0.5">
      {PRESETS.map((p) => (
        <button
          key={p.days}
          type="button"
          onClick={() => apply(p.days)}
          aria-pressed={activeDays === p.days}
          className={`h-full rounded-md px-3 text-[13px] transition-colors ${
            activeDays === p.days ? "bg-accent-soft font-medium text-accent" : "text-muted hover:bg-subtle hover:text-foreground"
          }`}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
}
