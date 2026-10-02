"use client";

import { useId, useState, type DragEvent, type ReactNode } from "react";
import type { QrStyleOptions } from "@/lib/qr/types";
import type { Dict } from "@/lib/i18n";
import { CheckIcon, ChevronDownIcon, ImageIcon, WarningIcon } from "../icons";
import { useI18n } from "../i18n/I18nProvider";
import { ColorSwatches } from "./ColorSwatches";
import { BACKGROUNDS, CODE_COLORS, TRANSPARENT } from "./presets";
import { Segmented } from "./Segmented";

const MAX_LOGO_BYTES = 1024 * 1024;
/** Below this contrast ratio many phone cameras struggle to read the code. */
const MIN_CONTRAST = 4;

/** #rgb / #rrggbb / #rrggbbaa → WCAG relative luminance. Fully transparent is treated as white. */
function luminance(hex: string): number | null {
  let h = hex.trim().replace(/^#/, "");
  if (h.length === 3) h = h.replace(/./g, (c) => c + c);
  if (h.length === 8) {
    if (h.slice(6) === "00") return 1;
    h = h.slice(0, 6);
  }
  if (!/^[0-9a-f]{6}$/i.test(h)) return null;
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = Number.parseInt(h.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function colorWarning(dark: string, light: string, t: Dict["style"]): string | null {
  const ld = luminance(dark);
  const ll = luminance(light);
  if (ld === null || ll === null) return null;
  if (ld > ll) return t.warnInverted;
  const ratio = (ll + 0.05) / (ld + 0.05);
  if (ratio < MIN_CONTRAST) return t.warnContrast;
  return null;
}

function Group({ label, hint, children, className = "" }: { label: string; hint?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <div role="group" aria-label={label} className={`min-w-0 ${className}`}>
      <p className="label">{label}</p>
      {children}
      {hint ? <p className="hint">{hint}</p> : null}
    </div>
  );
}

export function StyleOptions({ value, onChange }: { value: QrStyleOptions; onChange: (v: QrStyleOptions) => void }) {
  const t = useI18n().t.style;
  const [logoError, setLogoError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const fileId = useId();

  const onLogo = (file: File | undefined) => {
    setLogoError(null);
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setLogoError(t.logoTypeError);
      return;
    }
    if (file.size > MAX_LOGO_BYTES) {
      setLogoError(t.logoSizeError);
      return;
    }
    const reader = new FileReader();
    // A center logo hides modules, so force the strongest error correction.
    reader.onload = () => onChange({ ...value, logoDataUrl: String(reader.result), errorCorrectionLevel: "H" });
    reader.readAsDataURL(file);
  };

  const onDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setDragging(false);
    onLogo(e.dataTransfer.files?.[0]);
  };
  const dragProps = {
    onDragOver: (e: DragEvent<HTMLElement>) => {
      e.preventDefault();
      setDragging(true);
    },
    onDragLeave: () => setDragging(false),
    onDrop,
  };

  const presetColor = CODE_COLORS.some((c) => c.value === value.darkColor.toLowerCase());
  const warning = colorWarning(value.darkColor, value.lightColor, t);
  const hasLogo = Boolean(value.logoDataUrl);

  return (
    <details className="group">
      <summary className="-m-2 flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors select-none hover:bg-subtle">
        <span className="min-w-0 flex-1">
          <span className="block text-[15px] font-semibold text-foreground">{t.title}</span>
          <span className="mt-0.5 block text-[13px] text-muted">{t.summary}</span>
        </span>
        {value.logoDataUrl || value.darkColor.toLowerCase() !== "#111111" || value.lightColor.toLowerCase() !== "#ffffff" ? (
          <span className="rounded-full bg-surface px-2 py-0.5 text-xs font-medium text-muted">{t.changed}</span>
        ) : null}
        <ChevronDownIcon className="size-4 shrink-0 text-muted transition-transform group-open:rotate-180" />
      </summary>
    <div className="mt-6 grid gap-6 sm:grid-cols-2">
      <Group label={t.codeColor} className="sm:col-span-2">
        <div className="flex flex-wrap items-center gap-2.5">
          <ColorSwatches value={value.darkColor} onChange={(darkColor) => onChange({ ...value, darkColor })} />
          <span className="mx-0.5 h-6 w-px bg-border" aria-hidden="true" />
          <label
            title={t.customColor}
            className={`relative grid size-8 cursor-pointer place-items-center rounded-full text-white ring-1 ring-black/10 transition ring-inset hover:scale-105 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent ${
              presetColor ? "" : "outline-2 outline-offset-2 outline-foreground"
            }`}
            style={{
              background: presetColor
                ? "conic-gradient(from 180deg, #ef4444, #f59e0b, #22c55e, #06b6d4, #3b82f6, #a855f7, #ef4444)"
                : value.darkColor,
            }}
          >
            <input
              type="color"
              className="sr-only"
              aria-label={t.customColorLabel}
              value={/^#[0-9a-f]{6}$/i.test(value.darkColor) ? value.darkColor : "#111111"}
              onChange={(e) => onChange({ ...value, darkColor: e.target.value })}
            />
            {presetColor ? null : <CheckIcon className="size-4 drop-shadow" />}
          </label>
          <span className="ml-1 font-mono text-xs text-muted uppercase">{value.darkColor}</span>
        </div>
      </Group>

      <Group label={t.background} className="sm:col-span-2" hint={value.lightColor === TRANSPARENT ? t.transparentHint : undefined}>
        <Segmented label={t.background} options={BACKGROUNDS.map((b) => ({ name: t.backgrounds[b.id], value: b.value }))} selected={value.lightColor.toLowerCase()} onSelect={(lightColor) => onChange({ ...value, lightColor })} />
      </Group>

      {warning ? (
        <p role="status" className="-mt-2 flex items-start gap-2 rounded-lg border border-amber-200 bg-warning-soft px-3 py-2.5 text-xs leading-relaxed text-warning sm:col-span-2">
          <WarningIcon className="mt-px size-4 shrink-0" />
          {warning}
        </p>
      ) : null}

      <Group
        label={t.ecc}
        className="sm:col-span-2"
        hint={
          hasLogo
            ? t.eccHintLogo
            : t.eccHint
        }
      >
        <Segmented
          options={[
            { name: t.eccBasic, value: "basic", sub: t.eccBasicSub },
            { name: t.eccMax, value: "max", sub: t.eccMaxSub },
          ]}
          selected={value.errorCorrectionLevel === "H" ? "max" : "basic"}
          disabled={hasLogo}
          onSelect={(v) => onChange({ ...value, errorCorrectionLevel: v === "max" ? "H" : "M" })}
        />
      </Group>

      <Group label={t.logo} className="sm:col-span-2">
        <input
          id={fileId}
          type="file"
          className="peer sr-only"
          accept="image/png,image/jpeg,image/svg+xml,image/webp"
          onChange={(e) => {
            onLogo(e.target.files?.[0]);
            e.target.value = "";
          }}
        />
        {value.logoDataUrl ? (
          <div
            {...dragProps}
            className={`flex items-center gap-3 rounded-lg border p-3 transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent ${dragging ? "border-accent bg-accent-soft" : "border-border-strong bg-card"}`}
          >
            <span
              className="size-12 shrink-0 rounded-md border border-border bg-white bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${value.logoDataUrl})` }}
              aria-hidden="true"
            />
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-medium text-foreground">{t.logoApplied}</span>
              <span className="block text-xs text-muted">{t.logoAppliedSub}</span>
            </span>
            <label htmlFor={fileId} className="btn btn-sm cursor-pointer">
              {t.change}
            </label>
            <button type="button" className="btn btn-sm btn-danger" onClick={() => onChange({ ...value, logoDataUrl: null })}>
              {t.remove}
            </button>
          </div>
        ) : (
          <label
            htmlFor={fileId}
            {...dragProps}
            className={`flex cursor-pointer items-center gap-3 rounded-lg border border-dashed p-3 transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent ${
              dragging ? "border-accent bg-accent-soft" : "border-border-strong bg-card hover:border-zinc-400 hover:bg-subtle"
            }`}
          >
            <span className="grid size-12 shrink-0 place-items-center rounded-md bg-surface text-muted">
              <ImageIcon className="size-5" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm text-foreground">
                {t.dropPrefix}
                <span className="font-medium text-accent">{t.choose}</span>
              </span>
              <span className="mt-0.5 block text-xs text-muted">{t.logoFormats}</span>
            </span>
          </label>
        )}
        {logoError ? (
          <p role="alert" className="mt-2 text-xs font-medium text-danger">
            {logoError}
          </p>
        ) : null}
      </Group>
    </div>
    </details>
  );
}
