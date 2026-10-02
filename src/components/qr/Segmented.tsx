"use client";

export type SegmentedOption<T extends string | number> = { name: string; value: T; sub?: string };

/** Neutral segmented control. Selection uses `aria-pressed` so it reads as a set of toggle buttons. */
export function Segmented<T extends string | number>({
  options,
  selected,
  onSelect,
  disabled,
  label,
}: {
  options: readonly SegmentedOption<T>[];
  selected: T | null;
  onSelect: (v: T) => void;
  disabled?: boolean;
  label?: string;
}) {
  return (
    <div className="segmented" role="group" aria-label={label}>
      {options.map((o) => (
        <button
          key={String(o.value)}
          type="button"
          className="segmented-item"
          aria-pressed={selected === o.value}
          disabled={disabled}
          onClick={() => onSelect(o.value)}
        >
          {o.name}
          {o.sub ? <span className="font-mono text-[11px] font-normal text-muted tabular-nums">{o.sub}</span> : null}
        </button>
      ))}
    </div>
  );
}
