"use client";

import { CheckIcon } from "../icons";
import { useI18n } from "../i18n/I18nProvider";
import { CODE_COLORS } from "./presets";

/** The eight preset code colours as round toggle buttons. */
export function ColorSwatches({ value, onChange }: { value: string; onChange: (hex: string) => void }) {
  const { t } = useI18n();
  const current = value.toLowerCase();
  return (
    <>
      {CODE_COLORS.map((c) => {
        const active = current === c.value;
        const name = t.style.colors[c.id];
        return (
          <button
            key={c.value}
            type="button"
            aria-pressed={active}
            aria-label={name}
            title={name}
            onClick={() => onChange(c.value)}
            className={`grid size-8 place-items-center rounded-full text-white ring-1 ring-black/10 transition ring-inset hover:scale-105 ${
              active ? "outline-2 outline-offset-2 outline-foreground" : ""
            }`}
            style={{ backgroundColor: c.value }}
          >
            {active ? <CheckIcon className="size-4" /> : null}
          </button>
        );
      })}
    </>
  );
}
