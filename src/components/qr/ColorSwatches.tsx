"use client";

import { CheckIcon } from "../icons";
import { useI18n } from "../i18n/I18nProvider";
import { CODE_COLORS, FRAME_COLORS } from "./presets";

/**
 * Preset colours as round toggle buttons: the eight code colours by default, or the varied
 * frame palette with `palette="frame"`.
 */
export function ColorSwatches({ value, onChange, palette = "code" }: { value: string; onChange: (hex: string) => void; palette?: "code" | "frame" }) {
  const { t } = useI18n();
  const current = value.toLowerCase();
  const swatches: readonly { value: string; name: string }[] =
    palette === "frame"
      ? FRAME_COLORS.map((c) => ({ value: c.value, name: t.style.frameColors[c.id] }))
      : CODE_COLORS.map((c) => ({ value: c.value, name: t.style.colors[c.id] }));
  return (
    <>
      {swatches.map((c) => {
        const active = current === c.value;
        return (
          <button
            key={c.value}
            type="button"
            aria-pressed={active}
            aria-label={c.name}
            title={c.name}
            onClick={() => onChange(c.value)}
            className={`grid size-11 place-items-center rounded-full text-white ring-1 ring-black/10 transition ring-inset hover:scale-105 ${
              active ? "outline-2 outline-offset-2 outline-foreground" : ""
            }`}
            style={{ backgroundColor: c.value }}
          >
            {active ? <CheckIcon className="size-5" /> : null}
          </button>
        );
      })}
    </>
  );
}
