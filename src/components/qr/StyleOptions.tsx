"use client";

import { useId, useState, type DragEvent, type KeyboardEvent, type ReactNode } from "react";
import { FRAME_TEXT_MAX } from "@/lib/qr/frame";
import { FRAME_PRESETS, FRAME_SHAPES, type FramePreset, type QrStyleOptions } from "@/lib/qr/types";
import type { Dict } from "@/lib/i18n";
import { CheckIcon, ChevronDownIcon, ImageIcon, WarningIcon } from "../icons";
import { useI18n } from "../i18n/I18nProvider";
import { ColorSwatches } from "./ColorSwatches";
import { BACKGROUNDS, CODE_COLORS, TRANSPARENT } from "./presets";
import { Segmented } from "./Segmented";

const MAX_LOGO_BYTES = 1024 * 1024;
/** Below this contrast ratio many phone cameras struggle to read the code. */
const MIN_CONTRAST = 4;

/** Caption presets: every frame preset except "none" (that is the shape picker's job now). */
const CAPTION_PRESETS = FRAME_PRESETS.filter((p): p is Exclude<FramePreset, "none"> => p !== "none");
/** Shape picker entries: off, then the drawn shapes. */
const SHAPE_CHOICES = ["none", ...FRAME_SHAPES] as const;
type ShapeChoice = (typeof SHAPE_CHOICES)[number];

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

/**
 * Miniature of each frame shape (28×28): the code is the inner square, the frame colour is
 * `currentColor`, so the icon follows the chip's text colour.
 */
function ShapeIcon({ shape }: { shape: ShapeChoice }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.75, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 28 28" className="size-7 shrink-0" aria-hidden="true">
      {shape === "none" ? (
        <rect x="6" y="6" width="16" height="16" rx="1" {...common} strokeDasharray="2.5 2" />
      ) : shape === "label" ? (
        <>
          <rect x="4" y="3" width="20" height="22" rx="3" {...common} />
          <rect x="4" y="18" width="20" height="7" rx="2" fill="currentColor" />
        </>
      ) : shape === "top" ? (
        <>
          <rect x="4" y="3" width="20" height="22" rx="3" {...common} />
          <rect x="4" y="3" width="20" height="7" rx="2" fill="currentColor" />
        </>
      ) : shape === "bubble" ? (
        <>
          <rect x="4" y="2" width="20" height="20" rx="3" {...common} />
          <rect x="4" y="15" width="20" height="7" rx="2" fill="currentColor" />
          <path d="M11 22h6l-3 4z" fill="currentColor" />
        </>
      ) : shape === "rounded" ? (
        <>
          <rect x="3" y="2" width="22" height="24" rx="8" {...common} strokeWidth={2.5} />
          <rect x="6" y="18" width="16" height="5" rx="2" fill="currentColor" />
        </>
      ) : shape === "ribbon" ? (
        <>
          <rect x="6" y="2" width="16" height="20" rx="3" {...common} />
          <path d="M2 16h24l-2 3.5 2 3.5H2l2-3.5z" fill="currentColor" />
        </>
      ) : shape === "floating" ? (
        <>
          <rect x="5" y="2" width="18" height="17" rx="3" {...common} />
          <rect x="4" y="21" width="20" height="5" rx="2.5" fill="currentColor" />
        </>
      ) : shape === "corners" ? (
        <>
          <path d="M4 10V4h6M18 4h6v6M24 18v6h-6M10 24H4v-6" {...common} strokeWidth={2.25} strokeLinecap="round" />
          <rect x="9" y="25" width="10" height="2" rx="1" fill="currentColor" />
        </>
      ) : (
        <>
          <rect x="5" y="3" width="18" height="18" rx="2" {...common} strokeWidth={1.25} />
          <rect x="9" y="24" width="10" height="2" rx="1" fill="currentColor" />
        </>
      )}
    </svg>
  );
}

/**
 * Radio group of chips (wrapping, 44px tall). Only the checked chip is in the tab order; arrow keys
 * move the selection like native radios.
 */
function Chips<T extends string>({
  items,
  value,
  onSelect,
  label,
  names,
  icon,
}: {
  items: readonly T[];
  value: T;
  onSelect: (v: T) => void;
  label: string;
  names: Record<T, string>;
  icon?: (v: T) => ReactNode;
}) {
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = items[(items.indexOf(value) + step + items.length) % items.length];
    onSelect(next);
    e.currentTarget.querySelector<HTMLButtonElement>(`[data-chip="${next}"]`)?.focus();
  };
  return (
    <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-1.5" onKeyDown={onKeyDown}>
      {items.map((id) => {
        const checked = id === value;
        return (
          <button
            key={id}
            type="button"
            role="radio"
            aria-checked={checked}
            tabIndex={checked ? 0 : -1}
            data-chip={id}
            onClick={() => onSelect(id)}
            className={`inline-flex min-h-11 items-center gap-2 rounded-lg border border-border-strong bg-card text-[13px] font-medium text-muted shadow-xs transition-colors hover:border-zinc-400 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent aria-checked:border-foreground aria-checked:text-foreground aria-checked:ring-1 aria-checked:ring-foreground aria-checked:ring-inset ${
              icon ? "pr-3.5 pl-2" : "px-3.5"
            }`}
          >
            {icon ? icon(id) : null}
            {names[id]}
          </button>
        );
      })}
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
  const hasFrame = value.frame !== "none";
  const colorsEdited = value.darkColor.toLowerCase() !== "#111111" || value.lightColor.toLowerCase() !== "#ffffff";
  const edited = hasLogo || hasFrame || colorsEdited;

  /** Turning a shape on starts with the "Scan me" caption; "none" switches the frame off (shape remembered). */
  const selectShape = (shape: ShapeChoice) => {
    if (shape === "none") onChange({ ...value, frame: "none", frameText: "" });
    else if (hasFrame) onChange({ ...value, frameShape: shape });
    else onChange({ ...value, frame: "scan", frameShape: shape, frameText: t.frameTexts.scan });
  };
  /** A preset fills the caption with this language's text; editing the text afterwards makes it "custom". */
  const selectCaption = (frame: Exclude<FramePreset, "none">) => {
    if (frame === "custom") onChange({ ...value, frame });
    else onChange({ ...value, frame, frameText: t.frameTexts[frame] });
  };
  const shapeNames: Record<ShapeChoice, string> = { none: t.frameNone, ...t.frameShapes };

  return (
    <div>
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <h2 className="text-[15px] font-semibold text-foreground">{t.title}</h2>
          <p className="mt-0.5 text-[13px] text-muted">{t.summary}</p>
        </div>
        {edited ? <span className="rounded-full bg-surface px-2 py-0.5 text-xs font-medium text-muted">{t.changed}</span> : null}
      </div>
      <div className="mt-5 grid gap-6">
        <Group label={t.frameShape} hint={hasFrame ? undefined : t.frameHint}>
          <Chips items={SHAPE_CHOICES} value={hasFrame ? value.frameShape : "none"} onSelect={selectShape} label={t.frameShape} names={shapeNames} icon={(s) => <ShapeIcon shape={s} />} />
          {hasFrame ? (
            <div className="mt-4 grid gap-4">
              <Group label={t.frameText} hint={t.frameTextHint}>
                <Chips items={CAPTION_PRESETS} value={value.frame as Exclude<FramePreset, "none">} onSelect={selectCaption} label={t.frameText} names={t.framePresets} />
                <input
                  className="input mt-2.5"
                  aria-label={t.frameText}
                  value={value.frameText}
                  maxLength={FRAME_TEXT_MAX}
                  placeholder={t.frameTexts.scan}
                  onChange={(e) => onChange({ ...value, frame: "custom", frameText: e.target.value })}
                />
              </Group>
              <Group label={t.frameColor}>
                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    type="button"
                    aria-pressed={value.frameColor === ""}
                    onClick={() => onChange({ ...value, frameColor: "" })}
                    className="btn aria-pressed:outline-2 aria-pressed:outline-offset-2 aria-pressed:outline-foreground"
                  >
                    {t.frameSameAsCode}
                  </button>
                  <span className="mx-0.5 h-6 w-px bg-border" aria-hidden="true" />
                  <ColorSwatches value={value.frameColor} onChange={(frameColor) => onChange({ ...value, frameColor })} />
                </div>
              </Group>
            </div>
          ) : null}
        </Group>

        <Group label={t.logo}>
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

        {/* Colour, background and error correction are rarely needed: the one dropdown keeps them out of the way. */}
        <details className="group min-w-0 rounded-lg border border-border bg-subtle/60">
          <summary className="flex min-h-12 cursor-pointer items-center gap-3 rounded-lg px-3.5 py-2 transition-colors select-none hover:bg-subtle">
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold text-foreground">{t.moreOptions}</span>
              <span className="mt-0.5 block text-xs text-muted">{t.moreOptionsSummary}</span>
            </span>
            {colorsEdited ? <span className="rounded-full bg-card px-2 py-0.5 text-xs font-medium text-muted">{t.changed}</span> : null}
            <ChevronDownIcon className="size-4 shrink-0 text-muted transition-transform group-open:rotate-180" />
          </summary>
          <div className="grid gap-6 px-3.5 pt-2 pb-4">
            <Group label={t.codeColor}>
              <div className="flex flex-wrap items-center gap-2.5">
                <ColorSwatches value={value.darkColor} onChange={(darkColor) => onChange({ ...value, darkColor })} />
                <span className="mx-0.5 h-6 w-px bg-border" aria-hidden="true" />
                <label
                  title={t.customColor}
                  className={`relative grid size-11 cursor-pointer place-items-center rounded-full text-white ring-1 ring-black/10 transition ring-inset hover:scale-105 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent ${
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
                  {presetColor ? null : <CheckIcon className="size-5 drop-shadow" />}
                </label>
                <span className="ml-1 font-mono text-xs text-muted uppercase">{value.darkColor}</span>
              </div>
            </Group>

            <Group label={t.background} hint={value.lightColor === TRANSPARENT ? t.transparentHint : undefined}>
              <Segmented label={t.background} options={BACKGROUNDS.map((b) => ({ name: t.backgrounds[b.id], value: b.value }))} selected={value.lightColor.toLowerCase()} onSelect={(lightColor) => onChange({ ...value, lightColor })} />
            </Group>

            {warning ? (
              <p role="status" className="-mt-2 flex items-start gap-2 rounded-lg border border-amber-200 bg-warning-soft px-3 py-2.5 text-xs leading-relaxed text-warning">
                <WarningIcon className="mt-px size-4 shrink-0" />
                {warning}
              </p>
            ) : null}

            <Group label={t.ecc} hint={hasLogo ? t.eccHintLogo : t.eccHint}>
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
          </div>
        </details>
      </div>
    </div>
  );
}
