"use client";

import { useState } from "react";
import type { ErrorCorrectionLevel, QrStyleOptions } from "@/lib/qr/types";

const MAX_LOGO_BYTES = 1024 * 1024;

export function StyleOptions({ value, onChange }: { value: QrStyleOptions; onChange: (v: QrStyleOptions) => void }) {
  const [logoError, setLogoError] = useState<string | null>(null);

  const onLogo = (file: File | undefined) => {
    setLogoError(null);
    if (!file) return;
    if (file.size > MAX_LOGO_BYTES) {
      setLogoError("로고 이미지는 1MB 이하만 가능합니다.");
      return;
    }
    const reader = new FileReader();
    // A center logo hides modules, so force the strongest error correction.
    reader.onload = () => onChange({ ...value, logoDataUrl: String(reader.result), errorCorrectionLevel: "H" });
    reader.readAsDataURL(file);
  };

  return (
    <details className="group rounded-xl border border-border">
      <summary className="cursor-pointer select-none px-4 py-3 text-sm font-medium">
        디자인 옵션 <span className="text-muted">(크기 · 색상 · 로고)</span>
      </summary>
      <div className="grid gap-4 border-t border-border p-4 sm:grid-cols-2">
        <label className="block">
          <span className="label">크기: {value.size}px</span>
          <input
            type="range"
            min={128}
            max={1024}
            step={32}
            value={value.size}
            onChange={(e) => onChange({ ...value, size: Number(e.target.value) })}
            className="w-full"
          />
        </label>
        <label className="block">
          <span className="label">여백: {value.margin}</span>
          <input type="range" min={0} max={8} value={value.margin} onChange={(e) => onChange({ ...value, margin: Number(e.target.value) })} className="w-full" />
        </label>
        <label className="flex items-center justify-between gap-3">
          <span className="label mb-0">전경색</span>
          <input type="color" value={value.darkColor} onChange={(e) => onChange({ ...value, darkColor: e.target.value })} />
        </label>
        <label className="flex items-center justify-between gap-3">
          <span className="label mb-0">배경색</span>
          <input type="color" value={value.lightColor} onChange={(e) => onChange({ ...value, lightColor: e.target.value })} />
        </label>
        <label className="block">
          <span className="label">오류 정정 레벨</span>
          <select
            className="input"
            value={value.errorCorrectionLevel}
            disabled={Boolean(value.logoDataUrl)}
            onChange={(e) => onChange({ ...value, errorCorrectionLevel: e.target.value as ErrorCorrectionLevel })}
          >
            <option value="L">L (7%) — 가장 단순</option>
            <option value="M">M (15%) — 권장</option>
            <option value="Q">Q (25%)</option>
            <option value="H">H (30%) — 로고 삽입 시</option>
          </select>
        </label>
        <div className="block">
          <span className="label">중앙 로고 (선택)</span>
          <div className="flex items-center gap-2">
            <input type="file" accept="image/png,image/jpeg,image/svg+xml,image/webp" className="text-xs" onChange={(e) => onLogo(e.target.files?.[0])} />
            {value.logoDataUrl ? (
              <button type="button" className="btn py-1 text-xs" onClick={() => onChange({ ...value, logoDataUrl: null })}>
                제거
              </button>
            ) : null}
          </div>
          {logoError ? <p className="mt-1 text-xs text-red-500">{logoError}</p> : null}
        </div>
      </div>
    </details>
  );
}
