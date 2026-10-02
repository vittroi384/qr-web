"use client";

import { useId, useState, type DragEvent, type ReactNode } from "react";
import type { QrStyleOptions } from "@/lib/qr/types";
import { CheckIcon, ChevronDownIcon, ImageIcon, WarningIcon } from "../icons";
import { Segmented } from "./Segmented";

const MAX_LOGO_BYTES = 1024 * 1024;
/** Below this contrast ratio many phone cameras struggle to read the code. */
const MIN_CONTRAST = 4;

/** Code colours — each is ≥ 7:1 against white. */
const CODE_COLORS = [
  { name: "블랙", value: "#111111" },
  { name: "차콜", value: "#3f3f46" },
  { name: "네이비", value: "#1e3a8a" },
  { name: "블루", value: "#1d4ed8" },
  { name: "그린", value: "#166534" },
  { name: "틸", value: "#115e59" },
  { name: "버건디", value: "#881337" },
  { name: "퍼플", value: "#5b21b6" },
] as const;

const BACKGROUNDS = [
  { name: "흰색", value: "#ffffff" },
  { name: "연회색", value: "#f4f4f5" },
  { name: "아이보리", value: "#fdf9ef" },
  { name: "투명", value: "#ffffff00" },
] as const;

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

function colorWarning(dark: string, light: string): string | null {
  const ld = luminance(dark);
  const ll = luminance(light);
  if (ld === null || ll === null) return null;
  if (ld > ll) return "코드 색이 배경보다 밝으면 일부 스캐너에서 인식되지 않을 수 있습니다.";
  const ratio = (ll + 0.05) / (ld + 0.05);
  if (ratio < MIN_CONTRAST) return "대비가 낮아 스캔이 어려울 수 있습니다. 더 어두운 코드 색을 골라 주세요.";
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
  const [logoError, setLogoError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const fileId = useId();

  const onLogo = (file: File | undefined) => {
    setLogoError(null);
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setLogoError("이미지 파일만 사용할 수 있습니다.");
      return;
    }
    if (file.size > MAX_LOGO_BYTES) {
      setLogoError("로고 이미지는 1MB 이하만 가능합니다.");
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
  const warning = colorWarning(value.darkColor, value.lightColor);
  const hasLogo = Boolean(value.logoDataUrl);

  return (
    <details className="group">
      <summary className="-m-2 flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors select-none hover:bg-subtle">
        <span className="min-w-0 flex-1">
          <span className="block text-[15px] font-semibold text-foreground">꾸미기</span>
          <span className="mt-0.5 block text-[13px] text-muted">색상 · 배경 · 복원력 · 로고 (선택)</span>
        </span>
        {value.logoDataUrl || value.darkColor.toLowerCase() !== "#111111" || value.lightColor.toLowerCase() !== "#ffffff" ? (
          <span className="rounded-full bg-surface px-2 py-0.5 text-xs font-medium text-muted">변경됨</span>
        ) : null}
        <ChevronDownIcon className="size-4 shrink-0 text-muted transition-transform group-open:rotate-180" />
      </summary>
    <div className="mt-6 grid gap-6 sm:grid-cols-2">
      <Group label="코드 색상" className="sm:col-span-2">
        <div className="flex flex-wrap items-center gap-2.5">
          {CODE_COLORS.map((c) => {
            const active = value.darkColor.toLowerCase() === c.value;
            return (
              <button
                key={c.value}
                type="button"
                aria-pressed={active}
                aria-label={c.name}
                title={c.name}
                onClick={() => onChange({ ...value, darkColor: c.value })}
                className={`grid size-8 place-items-center rounded-full text-white ring-1 ring-black/10 transition ring-inset hover:scale-105 ${
                  active ? "outline-2 outline-offset-2 outline-foreground" : ""
                }`}
                style={{ backgroundColor: c.value }}
              >
                {active ? <CheckIcon className="size-4" /> : null}
              </button>
            );
          })}
          <span className="mx-0.5 h-6 w-px bg-border" aria-hidden="true" />
          <label
            title="직접 선택"
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
              aria-label="코드 색상 직접 선택"
              value={/^#[0-9a-f]{6}$/i.test(value.darkColor) ? value.darkColor : "#111111"}
              onChange={(e) => onChange({ ...value, darkColor: e.target.value })}
            />
            {presetColor ? null : <CheckIcon className="size-4 drop-shadow" />}
          </label>
          <span className="ml-1 font-mono text-xs text-muted uppercase">{value.darkColor}</span>
        </div>
      </Group>

      <Group label="배경" className="sm:col-span-2" hint={value.lightColor === "#ffffff00" ? "투명 배경은 내려받은 PNG · SVG 파일에 적용됩니다." : undefined}>
        <Segmented label="배경" options={BACKGROUNDS} selected={value.lightColor.toLowerCase()} onSelect={(lightColor) => onChange({ ...value, lightColor })} />
      </Group>

      {warning ? (
        <p role="status" className="-mt-2 flex items-start gap-2 rounded-lg border border-amber-200 bg-warning-soft px-3 py-2.5 text-xs leading-relaxed text-warning sm:col-span-2">
          <WarningIcon className="mt-px size-4 shrink-0" />
          {warning}
        </p>
      ) : null}

      <Group
        label="복원력"
        className="sm:col-span-2"
        hint={
          hasLogo
            ? "로고가 코드 일부를 가리므로 최대 복원력으로 고정됩니다."
            : "최대로 하면 일부가 가려지거나 훼손되어도 읽히지만, 코드가 더 촘촘해집니다."
        }
      >
        <Segmented
          options={[
            { name: "기본", value: "basic", sub: "권장" },
            { name: "최대", value: "max", sub: "로고 · 인쇄물" },
          ]}
          selected={value.errorCorrectionLevel === "H" ? "max" : "basic"}
          disabled={hasLogo}
          onSelect={(v) => onChange({ ...value, errorCorrectionLevel: v === "max" ? "H" : "M" })}
        />
      </Group>

      <Group label="중앙 로고" className="sm:col-span-2">
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
              <span className="block text-sm font-medium text-foreground">로고 적용됨</span>
              <span className="block text-xs text-muted">QR 코드 가운데에 표시됩니다.</span>
            </span>
            <label htmlFor={fileId} className="btn btn-sm cursor-pointer">
              변경
            </label>
            <button type="button" className="btn btn-sm btn-danger" onClick={() => onChange({ ...value, logoDataUrl: null })}>
              제거
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
                이미지를 끌어다 놓거나 <span className="font-medium text-accent">파일 선택</span>
              </span>
              <span className="mt-0.5 block text-xs text-muted">PNG · JPG · SVG · WEBP, 최대 1MB</span>
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
