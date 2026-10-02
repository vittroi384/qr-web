"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { QrStyleOptions } from "@/lib/qr/types";
import { ArchiveIcon, WarningIcon } from "../icons";
import { useI18n } from "../i18n/I18nProvider";
import { ColorSwatches } from "../qr/ColorSwatches";
import { CODE_COLORS, OUTPUT_SIZES, TRANSPARENT } from "../qr/presets";
import { drawQrToCanvas, triggerDownload } from "../qr/render";
import { SectionHeading } from "../qr/SectionHeading";
import { Segmented } from "../qr/Segmented";
import { sendLog } from "../qr/useQrLogger";
import { MAX_LINES, buildCsv, fileName, parseBatch, type BatchItem, type BatchMode } from "./parse";
import { createZip, type ZipEntry } from "./zip";

const PREVIEW_COUNT = 12;
const PREVIEW_DEBOUNCE_MS = 400;
/** Thumbnails are drawn at 2× their 96px display size so they stay crisp on HiDPI screens. */
const THUMB_PX = 192;
const MARGIN = 4;

type Look = { darkColor: string; lightColor: string };

function useDebounced<T>(value: T, ms: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), ms);
    return () => clearTimeout(id);
  }, [value, ms]);
  return debounced;
}

function styleFor(size: number, look: Look): QrStyleOptions {
  return { size, margin: MARGIN, errorCorrectionLevel: "M", logoDataUrl: null, ...look };
}

/** Rendering only — thumbnails never log anything. */
function Thumb({ item, look }: { item: BatchItem; look: Look }) {
  const { t } = useI18n();
  const ref = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || item.error) return;
    let cancelled = false;
    drawQrToCanvas(canvas, item.encoded, styleFor(THUMB_PX, look))
      .then(() => !cancelled && setFailed(false))
      .catch(() => !cancelled && setFailed(true));
    return () => {
      cancelled = true;
    };
  }, [item.encoded, item.error, look]);

  const reason = item.error === "scheme" ? t.batch.invalidReason : item.error === "empty" ? t.batch.emptyContent : t.batch.tooLong;
  const broken = Boolean(item.error) || failed;
  const caption = item.label || item.content;

  return (
    <li className="min-w-0">
      <div
        className={`relative grid aspect-square w-full place-items-center overflow-hidden rounded-md border ${
          broken ? "border-dashed border-border-strong bg-subtle" : "border-border bg-white"
        }`}
      >
        {broken ? (
          <span className="px-2 text-center text-[11px] leading-snug font-medium text-danger">
            {t.batch.invalid}
            <span className="block font-normal text-muted">{item.error ? reason : t.batch.tooLong}</span>
          </span>
        ) : (
          <canvas ref={ref} role="img" aria-label={caption} className="block size-full" />
        )}
      </div>
      <p className="mt-1.5 truncate text-[11px] leading-tight text-muted" title={caption}>
        <span className="font-mono tabular-nums">{String(item.line).padStart(2, "0")}</span> {caption}
      </p>
    </li>
  );
}

export function BatchTool() {
  const { t } = useI18n();
  const b = t.batch;
  const inputId = useId();
  const hintId = useId();
  const statusId = useId();

  const [text, setText] = useState("");
  const [mode, setMode] = useState<BatchMode>("url");
  const [size, setSize] = useState<number>(512);
  const [darkColor, setDarkColor] = useState<string>(CODE_COLORS[0].value);
  const [lightColor, setLightColor] = useState<string>("#ffffff");
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);
  const [result, setResult] = useState<{ ok: boolean; count: number } | null>(null);

  // Counting is cheap and immediate; the thumbnails follow on a debounce.
  const parsed = useMemo(() => parseBatch(text, mode), [text, mode]);
  const look = useMemo(() => ({ darkColor, lightColor }), [darkColor, lightColor]);
  // Memoised so the debounced value only changes when the input does (a fresh object every
  // render would restart the timer forever).
  const previewSource = useMemo(() => ({ text, mode, look }), [text, mode, look]);
  const previewInput = useDebounced(previewSource, PREVIEW_DEBOUNCE_MS);
  const previewParse = useMemo(() => parseBatch(previewInput.text, previewInput.mode), [previewInput.text, previewInput.mode]);
  const previewItems = previewParse.items.slice(0, PREVIEW_COUNT);
  const previewTotal = previewParse.total;

  const over = parsed.total > MAX_LINES;
  const invalid = parsed.total - parsed.valid;
  const running = progress !== null;
  const canRun = !running && !over && parsed.valid > 0;

  const error = over ? b.errOver(MAX_LINES) : parsed.total > 0 && parsed.valid === 0 ? b.errNoValid : null;

  const run = async () => {
    if (!canRun) return;
    const items = parsed.items.filter((it) => !it.error);
    const runMode = mode;
    const style = styleFor(size, look);
    setResult(null);
    setProgress({ done: 0, total: items.length });
    try {
      const entries: ZipEntry[] = [];
      const rows: string[][] = [];
      const canvas = document.createElement("canvas");
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        try {
          await drawQrToCanvas(canvas, item.encoded, style);
          const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
          if (blob) {
            const name = fileName(entries.length, item);
            entries.push({ name, data: new Uint8Array(await blob.arrayBuffer()) });
            rows.push([name, item.label, item.encoded]);
          }
        } catch {
          // A line that does not fit in a QR code is skipped rather than failing the batch.
        }
        setProgress({ done: i + 1, total: items.length });
      }
      if (entries.length === 0) throw new Error("empty");
      entries.push({ name: "index.csv", data: buildCsv(b.csvHeader, rows) });

      const url = URL.createObjectURL(createZip(entries));
      triggerDownload(url, "qr-batch.zip");
      setTimeout(() => URL.revokeObjectURL(url), 5000);

      const count = rows.length;
      const sample = rows
        .slice(0, 3)
        .map((r) => r[2])
        .join(" | ")
        .slice(0, 200);
      sendLog({
        type: runMode,
        event: "batch",
        payload: { count, mode: runMode, sample },
        options: { size: style.size, darkColor: style.darkColor, lightColor: style.lightColor },
        encoded: sample,
      });
      setResult({ ok: true, count });
    } catch {
      setResult({ ok: false, count: 0 });
    } finally {
      setProgress(null);
    }
  };

  const sizeOptions = OUTPUT_SIZES.map((v) => ({
    name: v === 256 ? t.preview.sizes.small : v === 512 ? t.preview.sizes.medium : t.preview.sizes.large,
    value: v,
    sub: `${v}px`,
  }));

  return (
    <div className="grid rounded-xl border border-border bg-card shadow-panel lg:grid-cols-[minmax(0,1fr)_minmax(320px,400px)]">
      <div className="min-w-0">
        {/* 01 목록 */}
        <div className="p-4 sm:px-6 sm:py-5">
          <SectionHeading step={1} title={b.inputTitle} />
          <label htmlFor={inputId} className="label">
            {b.inputLabel}
          </label>
          <textarea
            id={inputId}
            className="input min-h-56 font-mono text-[13px] sm:text-[13px]"
            spellCheck={false}
            autoCapitalize="none"
            autoCorrect="off"
            wrap="off"
            placeholder={b.placeholder}
            aria-describedby={`${hintId} ${statusId}`}
            aria-invalid={error ? true : undefined}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setResult(null);
            }}
          />
          <div id={statusId} className="mt-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-xs">
            <span className={`font-mono tabular-nums ${over ? "font-medium text-danger" : "text-muted"}`}>
              {b.count(parsed.total, MAX_LINES)}
            </span>
            {invalid > 0 && !over ? <span className="text-warning">{b.invalidCount(invalid)}</span> : null}
          </div>
          {error ? (
            <p role="alert" className="mt-2 flex items-start gap-1.5 text-xs leading-relaxed font-medium text-danger">
              <WarningIcon className="mt-px size-3.5 shrink-0" />
              {error}
            </p>
          ) : parsed.total === 0 ? (
            <p className="mt-2 text-xs text-muted">{b.errEmpty}</p>
          ) : null}
          <p id={hintId} className="hint">
            {b.inputHint}
          </p>

          <label className="mt-4 flex min-h-11 cursor-pointer items-start gap-2.5 rounded-lg border border-border-strong bg-card px-3 py-3 text-sm text-foreground shadow-xs transition-colors hover:border-zinc-400 hover:bg-subtle">
            <input type="checkbox" className="mt-0.5" checked={mode === "text"} onChange={(e) => setMode(e.target.checked ? "text" : "url")} />
            <span className="min-w-0">
              <span className="block font-medium">{b.asText}</span>
              <span className="mt-0.5 block text-xs leading-relaxed text-muted">{b.asTextHint}</span>
            </span>
          </label>
        </div>

        {/* 02 옵션 + 저장 */}
        <div className="border-t border-border p-4 sm:px-6 sm:py-5">
          <SectionHeading step={2} title={b.optionsTitle} />
          <div className="grid gap-5">
            <div role="group" aria-label={b.size}>
              <p className="label">{b.size}</p>
              <Segmented label={b.size} options={sizeOptions} selected={size} onSelect={setSize} />
            </div>
            <div role="group" aria-label={b.color}>
              <p className="label">{b.color}</p>
              <div className="flex flex-wrap items-center gap-2.5">
                <ColorSwatches value={darkColor} onChange={setDarkColor} />
              </div>
            </div>
            <div role="group" aria-label={b.background}>
              <p className="label">{b.background}</p>
              <Segmented
                label={b.background}
                options={[
                  { name: b.backgrounds.white, value: "#ffffff" },
                  { name: b.backgrounds.transparent, value: TRANSPARENT },
                ]}
                selected={lightColor}
                onSelect={setLightColor}
              />
            </div>
          </div>

          <div className="mt-6 border-t border-border pt-5">
            <button type="button" className="btn btn-primary w-full sm:w-auto sm:min-w-56" onClick={run} disabled={!canRun}>
              <ArchiveIcon />
              {progress ? b.working(progress.done, progress.total) : b.download}
            </button>
            {progress ? (
              <div
                className="mt-3 h-1 w-full overflow-hidden rounded-full bg-surface sm:max-w-56"
                role="progressbar"
                aria-label={b.download}
                aria-valuemin={0}
                aria-valuemax={progress.total}
                aria-valuenow={progress.done}
              >
                <div className="h-full rounded-full bg-accent transition-[width]" style={{ width: `${(progress.done / Math.max(progress.total, 1)) * 100}%` }} />
              </div>
            ) : null}
            <p className="mt-2 text-xs leading-relaxed text-muted" aria-live="polite">
              {result ? (
                result.ok ? (
                  <span className="font-medium text-success">{b.done(result.count)}</span>
                ) : (
                  <span className="font-medium text-danger">{b.failed}</span>
                )
              ) : running ? null : (
                b.zipNote
              )}
            </p>
          </div>
        </div>
      </div>

      {/* 미리보기 */}
      <div className="min-w-0 border-t border-border bg-subtle p-4 sm:px-6 sm:py-5 lg:rounded-r-xl lg:border-t-0 lg:border-l">
        <div className="lg:sticky lg:top-20">
          <div className="mb-3 flex items-baseline justify-between gap-3">
            <h2 className="text-[15px] font-semibold text-foreground">{b.previewTitle}</h2>
            {previewItems.length > 0 ? <span className="text-xs text-muted">{b.previewDesc(previewItems.length)}</span> : null}
          </div>
          {previewItems.length > 0 ? (
            <>
              <ul className="grid grid-cols-[repeat(auto-fill,minmax(96px,1fr))] gap-3">
                {previewItems.map((item) => (
                  <Thumb key={`${item.line}:${item.encoded}`} item={item} look={previewInput.look} />
                ))}
              </ul>
              {previewTotal > PREVIEW_COUNT ? (
                <p className="mt-3 text-xs text-muted tabular-nums">{b.more(previewTotal - PREVIEW_COUNT)}</p>
              ) : null}
            </>
          ) : (
            <div className="grid min-h-48 place-items-center rounded-lg border border-dashed border-border-strong px-6 text-center">
              <p className="text-[13px] leading-relaxed text-muted">{b.previewEmpty}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
