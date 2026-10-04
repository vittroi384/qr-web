"use client";

import { CheckIcon } from "../icons";
import { useI18n } from "../i18n/I18nProvider";
import { CODE_COLORS, FRAME_COLORS } from "./presets";

const swatchClass =
  "grid aspect-square w-full max-w-11 place-items-center justify-self-center rounded-full text-white ring-1 ring-black/10 transition ring-inset hover:scale-105 aria-pressed:outline-2 aria-pressed:outline-offset-2 aria-pressed:outline-foreground";

/** Preset colours as round toggle buttons (the batch tool's compact row). */
export function ColorSwatches({ value, onChange }: { value: string; onChange: (hex: string) => void }) {
  const { t } = useI18n();
  const current = value.toLowerCase();
  return (
    <>
      {CODE_COLORS.map((c) => {
        const active = current === c.value;
        const name = t.style.colors[c.id];
        return (
          <button key={c.value} type="button" aria-pressed={active} aria-label={name} title={name} onClick={() => onChange(c.value)} className={`size-11 ${swatchClass}`} style={{ backgroundColor: c.value }}>
            {active ? <CheckIcon className="size-5" /> : null}
          </button>
        );
      })}
    </>
  );
}

/**
 * A full colour row that always fills its grid evenly: presets, a rainbow swatch that opens the
 * native picker, and (frame palette) a leading "same as the code" swatch. Ten cells for the code
 * palette and fourteen for the frame palette, so phones get two equal rows and wider columns one.
 */
export function ColorRow({
  palette,
  value,
  onChange,
  codeColor,
  sameAsCode,
}: {
  palette: "code" | "frame";
  value: string;
  onChange: (hex: string) => void;
  /** The code colour: the picker's fallback, and what "same as code" shows (frame palette). */
  codeColor: string;
  /** Frame palette only: label for the leading swatch that selects "" (follow the code colour). */
  sameAsCode?: string;
}) {
  const { t } = useI18n();
  const current = value.toLowerCase();
  const presets =
    palette === "frame"
      ? FRAME_COLORS.map((c) => ({ value: c.value, name: t.style.frameColors[c.id] }))
      : CODE_COLORS.map((c) => ({ value: c.value, name: t.style.colors[c.id] }));
  const isPreset = (palette === "frame" && value === "") || presets.some((c) => c.value === current);
  const cols = palette === "frame" ? "grid-cols-7 @sm:grid-cols-14" : "grid-cols-5 @sm:grid-cols-10";
  const pickerLabel = palette === "frame" ? t.style.customFrameColorLabel : t.style.customColorLabel;
  return (
    <div className={`grid gap-2 ${cols}`}>
      {sameAsCode ? (
        <button
          type="button"
          aria-pressed={value === ""}
          aria-label={sameAsCode}
          title={sameAsCode}
          onClick={() => onChange("")}
          className={`${swatchClass} border-2 border-dashed border-white/70`}
          style={{ backgroundColor: codeColor }}
        >
          {value === "" ? (
            <CheckIcon className="size-5" />
          ) : (
            <svg viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M8 12a3 3 0 0 0 4 0l3-3a3 3 0 0 0-4-4l-1 1M12 8a3 3 0 0 0-4 0l-3 3a3 3 0 0 0 4 4l1-1" />
            </svg>
          )}
        </button>
      ) : null}
      {presets.map((c) => {
        const active = current === c.value;
        return (
          <button key={c.value} type="button" aria-pressed={active} aria-label={c.name} title={c.name} onClick={() => onChange(c.value)} className={swatchClass} style={{ backgroundColor: c.value }}>
            {active ? <CheckIcon className="size-5" /> : null}
          </button>
        );
      })}
      <label
        title={t.style.customColor}
        className={`relative grid aspect-square w-full max-w-11 cursor-pointer place-items-center justify-self-center rounded-full text-white ring-1 ring-black/10 transition ring-inset hover:scale-105 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent ${
          isPreset ? "" : "outline-2 outline-offset-2 outline-foreground"
        }`}
        style={{ background: isPreset ? "conic-gradient(from 180deg, #ef4444, #f59e0b, #22c55e, #06b6d4, #3b82f6, #a855f7, #ef4444)" : value }}
      >
        <input type="color" className="sr-only" aria-label={pickerLabel} value={/^#[0-9a-f]{6}$/i.test(value) ? value : codeColor} onChange={(e) => onChange(e.target.value)} />
        {isPreset ? null : <CheckIcon className="size-5 drop-shadow" />}
      </label>
    </div>
  );
}
