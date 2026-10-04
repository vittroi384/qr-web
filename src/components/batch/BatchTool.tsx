"use client";

import { useEffect, useId, useMemo, useRef, useState, type ClipboardEvent, type KeyboardEvent } from "react";
import { maskWifiPasswords } from "@/lib/qr/sanitize";
import { DEFAULT_STYLE, type QrStyleOptions } from "@/lib/qr/types";
import { StepGuide } from "../StepGuide";
import { ArchiveIcon, CheckIcon, ChevronDownIcon, ClipboardIcon, DownloadIcon, EyeIcon, PlusIcon, QrMarkIcon, TrashIcon, WarningIcon } from "../icons";
import { useI18n } from "../i18n/I18nProvider";
import { ColorRow } from "../qr/ColorSwatches";
import { CODE_COLORS, OUTPUT_SIZES, TRANSPARENT } from "../qr/presets";
import { drawQrToCanvas, triggerDownload } from "../qr/render";
import { Segmented } from "../qr/Segmented";
import { sendLog } from "../qr/useQrLogger";
import {
  MAX_ROWS,
  buildCsv,
  checkRow,
  fileName,
  isMultiCellPaste,
  rowsFromPaste,
  type RowCheck,
  type RowInput,
  type RowKind,
} from "./parse";
import { createZip, type ZipEntry } from "./zip";

const INITIAL_ROWS = 3;
const PREVIEW_DEBOUNCE_MS = 400;
/** Row thumbnails are 44px on screen, drawn at 2× for HiDPI screens. */
const THUMB_PX = 88;
const MARGIN = 4;
const WHITE = "#ffffff";

type Row = RowInput & { id: string };
type Look = { darkColor: string; lightColor: string };

function blankRows(): Row[] {
  // Fixed ids so server and client render the same markup.
  return Array.from({ length: INITIAL_ROWS }, (_, i) => ({ id: `r${i}`, name: "", content: "" }));
}

const isBlank = (r: RowInput) => !r.name.trim() && !r.content.trim();

function useDebounced<T>(value: T, ms: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), ms);
    return () => clearTimeout(id);
  }, [value, ms]);
  return debounced;
}

function styleFor(size: number, look: Look): QrStyleOptions {
  // Batch output never carries a frame (DEFAULT_STYLE has none).
  return { ...DEFAULT_STYLE, size, margin: MARGIN, errorCorrectionLevel: "M", ...look };
}

/** Small live preview next to each row. Rendering only — nothing is logged. */
function Thumb({ check, look, label }: { check: RowCheck; look: Look; label: string }) {
  const encoded = check.state === "ok" ? check.encoded : "";
  const debounced = useDebounced(encoded, PREVIEW_DEBOUNCE_MS);
  const ref = useRef<HTMLCanvasElement>(null);
  // The canvas unmounts while a row is blank or invalid; redraw whenever it comes back.
  const visible = Boolean(encoded);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || !debounced || !visible) return;
    drawQrToCanvas(canvas, debounced, styleFor(THUMB_PX, look)).catch(() => {
      // Too-long content is already flagged on the row itself.
    });
  }, [debounced, look, visible]);

  const box = "grid size-12 shrink-0 place-items-center overflow-hidden rounded-lg border";
  if (check.state === "invalid") {
    return (
      <span className={`${box} border-danger/30 bg-card text-danger`} aria-hidden="true">
        <WarningIcon className="size-4" />
      </span>
    );
  }
  if (!encoded) {
    return (
      <span className={`${box} border-dashed border-border bg-subtle text-muted/50`} aria-hidden="true">
        <QrMarkIcon className="size-4" />
      </span>
    );
  }
  return (
    <span className={`${box} border-border bg-white`}>
      <canvas ref={ref} role="img" aria-label={label} className="block size-full" />
    </span>
  );
}

export function BatchTool() {
  const { t } = useI18n();
  const b = t.batch;
  const baseId = useId();
  const pasteId = `${baseId}-paste`;
  const nextId = useRef(INITIAL_ROWS);
  const pendingFocus = useRef<string | null>(null);

  const [rows, setRows] = useState<Row[]>(blankRows);
  const [pasteOpen, setPasteOpen] = useState(false);
  const [pasteText, setPasteText] = useState("");
  const [notice, setNotice] = useState<string | null>(null);
  const [size, setSize] = useState<number>(512);
  const [darkColor, setDarkColor] = useState<string>(CODE_COLORS[0].value);
  const [lightColor, setLightColor] = useState<string>(WHITE);
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);
  const [result, setResult] = useState<{ ok: boolean; count: number } | null>(null);

  // Move focus after React has rendered the row it points at.
  useEffect(() => {
    if (!pendingFocus.current) return;
    document.getElementById(pendingFocus.current)?.focus();
    pendingFocus.current = null;
  });

  const look = useMemo(() => ({ darkColor, lightColor }), [darkColor, lightColor]);
  const checks = useMemo(() => rows.map(checkRow), [rows]);
  const validCount = checks.filter((c) => c.state === "ok").length;
  const skippedCount = checks.filter((c) => c.state === "invalid").length;
  const filledCount = rows.filter((r) => !isBlank(r)).length;
  const running = progress !== null;

  const fieldId = (row: Row, field: "name" | "content") => `${baseId}-${row.id}-${field}`;
  const makeRow = (r?: RowInput): Row => ({ id: `r${nextId.current++}`, name: r?.name ?? "", content: r?.content ?? "" });

  const commit = (next: Row[]) => {
    setRows(next.length ? next.slice(0, MAX_ROWS) : [makeRow()]);
    setNotice(next.length > MAX_ROWS ? b.truncated(MAX_ROWS) : null);
    setResult(null);
  };

  const update = (id: string, patch: Partial<RowInput>) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
    setResult(null);
  };

  /** Pasted rows replace the row they were pasted into (if empty) and any empty rows after it. */
  const insertAt = (index: number, pasted: RowInput[]) => {
    const current = rows[index];
    const added = pasted.map((r) => makeRow(r));
    const next = [
      ...rows.slice(0, index),
      ...(current && !isBlank(current) ? [current] : []),
      ...added,
      ...rows.slice(index + 1).filter((r) => !isBlank(r)),
    ];
    const kept = new Set(next.slice(0, MAX_ROWS));
    const last = [...added].reverse().find((r) => kept.has(r));
    if (last) pendingFocus.current = fieldId(last, "content");
    commit(next);
  };

  const onPaste = (index: number) => (e: ClipboardEvent<HTMLInputElement>) => {
    const text = e.clipboardData.getData("text/plain");
    if (!isMultiCellPaste(text)) return;
    const pasted = rowsFromPaste(text);
    if (!pasted.length) return;
    e.preventDefault();
    insertAt(index, pasted);
  };

  const applyPaste = () => {
    const pasted = rowsFromPaste(pasteText);
    if (!pasted.length) return;
    commit([...rows.filter((r) => !isBlank(r)), ...pasted.map((r) => makeRow(r))]);
    setPasteText("");
    setPasteOpen(false);
  };

  const addRow = () => {
    if (rows.length >= MAX_ROWS) return;
    const row = makeRow();
    pendingFocus.current = fieldId(row, "content");
    setRows([...rows, row]);
  };

  const removeRow = (index: number) => {
    const next = rows.filter((_, i) => i !== index);
    const target = next[Math.min(index, next.length - 1)];
    if (target) pendingFocus.current = fieldId(target, "content");
    commit(next);
  };

  const clearAll = () => {
    const fresh = Array.from({ length: INITIAL_ROWS }, () => makeRow());
    pendingFocus.current = fieldId(fresh[0], "content");
    commit(fresh);
  };

  /** Enter moves down the list like a spreadsheet; a new row appears at the end. */
  const onKeyDown = (index: number, field: "name" | "content") => (e: KeyboardEvent<HTMLInputElement>) => {
    // Never steal Enter from an IME that is still composing (Korean, Japanese, …).
    if (e.key !== "Enter" || e.nativeEvent.isComposing) return;
    e.preventDefault();
    if (field === "name") {
      document.getElementById(fieldId(rows[index], "content"))?.focus();
      return;
    }
    const below = rows[index + 1];
    if (below) document.getElementById(fieldId(below, "content"))?.focus();
    else addRow();
  };

  const run = async () => {
    if (running || validCount === 0) return;
    const items = rows.flatMap((row, i) => {
      const c = checks[i];
      return c.state === "ok" ? [{ name: row.name.trim(), encoded: c.encoded, kind: c.kind }] : [];
    });
    const style = styleFor(size, look);
    setResult(null);
    setProgress({ done: 0, total: items.length });
    try {
      const entries: ZipEntry[] = [];
      const csvRows: string[][] = [];
      const kinds = new Set<RowKind>();
      const canvas = document.createElement("canvas");
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        try {
          await drawQrToCanvas(canvas, item.encoded, style);
          const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
          if (blob) {
            const name = fileName(entries.length, item.name);
            entries.push({ name, data: new Uint8Array(await blob.arrayBuffer()) });
            csvRows.push([name, item.name, item.encoded]);
            kinds.add(item.kind);
          }
        } catch {
          // A row that still does not fit in a QR code is skipped rather than failing the batch.
        }
        setProgress({ done: i + 1, total: items.length });
      }
      if (entries.length === 0) throw new Error("empty");
      entries.push({ name: "index.csv", data: buildCsv(b.csvHeader, csvRows) });

      const url = URL.createObjectURL(createZip(entries));
      triggerDownload(url, "qr-codes.zip");
      setTimeout(() => URL.revokeObjectURL(url), 5000);

      const count = csvRows.length;
      const mode = kinds.size > 1 ? "mixed" : kinds.has("text") ? "text" : "url";
      // A pasted WIFI: string is plain text here, so mask its password before anything is sent.
      const sample = maskWifiPasswords(
        csvRows
          .slice(0, 3)
          .map((r) => r[2])
          .join(" | "),
      ).slice(0, 200);
      sendLog({
        type: mode === "text" ? "text" : "url",
        event: "batch",
        payload: { count, mode, sample },
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

  const reason = (c: RowCheck) =>
    c.state !== "invalid" ? "" : c.error === "scheme" ? b.errScheme : c.error === "tooLong" ? b.errTooLong : b.errEmpty;

  const sizeOptions = OUTPUT_SIZES.filter((v) => v <= 1024).map((v) => ({
    name: v === 256 ? t.preview.sizes.small : v === 512 ? t.preview.sizes.medium : t.preview.sizes.large,
    value: v,
    sub: `${v}px`,
  }));
  const colorName = t.style.colors[CODE_COLORS.find((c) => c.value === darkColor)?.id ?? "black"];
  const backgroundName = lightColor === TRANSPARENT ? b.backgrounds.transparent : b.backgrounds.white;
  const advancedChanged = size !== 512 || darkColor !== CODE_COLORS[0].value || lightColor !== WHITE;

  // Guide follows the real state: a valid row finishes step 1, a saved ZIP finishes all three.
  const completedSteps = result?.ok ? 3 : validCount > 0 ? 1 : 0;
  const stepIcons = [<ClipboardIcon key="paste" />, <EyeIcon key="check" />, <DownloadIcon key="save" />];

  return (
    <>
      <StepGuide
        live
        completed={completedSteps}
        label={b.stepsLabel}
        doneLabel={t.steps.done}
        currentLabel={t.steps.current}
        steps={b.steps.map((step, i) => ({ ...step, icon: stepIcons[i] }))}
        className="mb-4"
      />

      {/* minmax(0,1fr): a card may never widen the column (nowrap text inside would otherwise set the min width). */}
      <div className="grid grid-cols-[minmax(0,1fr)] gap-4">
        {/* 목록 */}
        <div className="rounded-xl border border-border bg-card p-4 shadow-panel sm:px-6 sm:py-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
            <h2 className="text-[15px] font-semibold text-foreground">{b.listTitle}</h2>
            <span className="rounded-full bg-surface px-2.5 py-0.5 font-mono text-xs text-muted tabular-nums" title={b.limitNote(MAX_ROWS)}>
              {b.count(filledCount, MAX_ROWS)}
            </span>
          </div>

          {/* Paste zone: a dashed invitation that opens into the textarea. */}
          {pasteOpen ? (
            <div id={pasteId} className="mb-5 rounded-xl border border-accent/40 bg-accent-soft/40 p-3 sm:p-4">
              <label htmlFor={`${pasteId}-text`} className="label">
                {b.pasteLabel}
              </label>
              <textarea
                id={`${pasteId}-text`}
                className="input min-h-32 font-mono text-[13px] sm:text-[13px]"
                spellCheck={false}
                autoCapitalize="none"
                autoCorrect="off"
                wrap="off"
                placeholder={b.pastePlaceholder}
                value={pasteText}
                onChange={(e) => setPasteText(e.target.value)}
              />
              <p className="hint">{b.pasteHint}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button type="button" className="btn btn-primary" onClick={applyPaste} disabled={!pasteText.trim()}>
                  {b.pasteApply}
                </button>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => {
                    setPasteOpen(false);
                    setPasteText("");
                  }}
                >
                  {b.pasteCancel}
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              aria-expanded={false}
              aria-controls={pasteId}
              onClick={() => {
                pendingFocus.current = `${pasteId}-text`;
                setPasteOpen(true);
              }}
              className="mb-5 flex w-full items-center gap-3 rounded-xl border border-dashed border-border-strong bg-card p-3 text-left transition-colors hover:border-accent hover:bg-accent-soft/40 sm:p-4"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                <ClipboardIcon className="size-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-foreground">{b.pasteOpen}</span>
                <span className="mt-0.5 block truncate text-xs leading-relaxed text-muted">{b.pasteShort}</span>
              </span>
            </button>
          )}

          {/* Column titles (wide screens). Phones rely on the placeholders. */}
          <div className="hidden items-start gap-3 px-1.5 pb-1 text-xs font-semibold text-muted sm:flex" aria-hidden="true">
            <span className="w-6 shrink-0" />
            <span className="grid min-w-0 flex-1 grid-cols-[minmax(0,12rem)_minmax(0,1fr)] gap-2">
              <span className="px-3.5">{b.colName}</span>
              <span className="px-3.5">{b.colContent}</span>
            </span>
            <span className="w-[108px] shrink-0" />
          </div>

          <ol className="space-y-2 sm:space-y-1">
            {rows.map((row, index) => {
              const check = checks[index];
              const invalid = check.state === "invalid";
              const errorId = `${baseId}-${row.id}-error`;
              const n = index + 1;
              return (
                <li
                  key={row.id}
                  className={`flex items-start gap-2 rounded-lg border p-2 transition-colors sm:gap-3 sm:p-1.5 ${
                    invalid ? "border-danger/50 bg-danger-soft" : "border-border bg-subtle/50 sm:border-transparent sm:bg-transparent sm:hover:bg-subtle/60"
                  }`}
                >
                  <span className="hidden w-6 shrink-0 justify-center pt-3 sm:flex" aria-hidden="true">
                    <span className="grid size-6 place-items-center rounded-full bg-surface font-mono text-[11px] font-semibold text-muted tabular-nums">{n}</span>
                  </span>
                  <div className="grid min-w-0 flex-1 gap-2 sm:grid-cols-[minmax(0,12rem)_minmax(0,1fr)]">
                    <input
                      id={fieldId(row, "name")}
                      className="input"
                      aria-label={b.rowName(n)}
                      placeholder={index === 0 && filledCount === 0 ? `${b.exampleLabel} ${b.exampleName}` : b.colName}
                      maxLength={80}
                      value={row.name}
                      onChange={(e) => update(row.id, { name: e.target.value })}
                      onKeyDown={onKeyDown(index, "name")}
                      onPaste={onPaste(index)}
                    />
                    <div className="relative min-w-0">
                      <input
                        id={fieldId(row, "content")}
                        className={`input pr-16 ${invalid ? "border-danger/60" : ""}`}
                        aria-label={b.rowContent(n)}
                        aria-invalid={invalid || undefined}
                        aria-describedby={invalid ? errorId : undefined}
                        placeholder={index === 0 && filledCount === 0 ? b.exampleUrl : b.contentPlaceholder}
                        autoCapitalize="none"
                        autoCorrect="off"
                        spellCheck={false}
                        value={row.content}
                        onChange={(e) => update(row.id, { content: e.target.value })}
                        onKeyDown={onKeyDown(index, "content")}
                        onPaste={onPaste(index)}
                      />
                      {check.state === "ok" ? (
                        <span
                          className={`pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 rounded-full px-2 py-0.5 text-[11px] leading-none font-semibold ${
                            check.kind === "url" ? "bg-accent-soft text-accent" : "bg-surface text-muted"
                          }`}
                        >
                          {check.kind === "url" ? b.kindUrl : b.kindText}
                        </span>
                      ) : null}
                    </div>
                    {invalid ? (
                      <p id={errorId} className="text-xs font-medium text-danger sm:col-start-2">
                        {reason(check)}
                      </p>
                    ) : null}
                  </div>
                  <div className="flex shrink-0 flex-col items-center gap-1 sm:flex-row sm:gap-2">
                    <Thumb check={check} look={look} label={b.rowPreview(n)} />
                    <button
                      type="button"
                      className="btn btn-ghost size-12 px-0"
                      aria-label={b.rowDelete(n)}
                      title={b.rowDelete(n)}
                      onClick={() => removeRow(index)}
                      disabled={rows.length === 1 && isBlank(row)}
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </li>
              );
            })}
          </ol>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <button type="button" className="btn btn-ghost -ml-2" onClick={addRow} disabled={rows.length >= MAX_ROWS}>
              <PlusIcon />
              {b.addRow}
            </button>
            <p className="text-xs text-muted">{b.tableHint}</p>
          </div>
          {notice ? (
            <p role="status" className="mt-1 text-xs font-medium text-warning">
              {notice}
            </p>
          ) : null}
        </div>

        {/* 설정 — defaults are fine for almost everyone, so it opens on demand (same look as the generator). */}
        <details className="group rounded-xl border border-border bg-card shadow-panel">
          <summary className="flex min-h-14 cursor-pointer items-center gap-3 rounded-xl px-4 py-3 transition-colors select-none hover:bg-subtle sm:px-6">
            <span className="min-w-0 flex-1">
              <span className="block text-[15px] font-semibold text-foreground">{b.advanced}</span>
              <span className="mt-0.5 block text-[13px] text-muted">
                {size}px · {colorName} · {backgroundName}
              </span>
            </span>
            {advancedChanged ? <span className="rounded-full bg-surface px-2 py-0.5 text-xs font-medium text-muted">{t.style.changed}</span> : null}
            <ChevronDownIcon className="size-4 shrink-0 text-muted transition-transform group-open:rotate-180" />
          </summary>
          <div className="@container grid gap-6 border-t border-border px-4 pt-5 pb-5 sm:px-6 sm:pb-6">
            <div role="group" aria-label={b.size}>
              <p className="label">{b.size}</p>
              <Segmented label={b.size} options={sizeOptions} selected={size} onSelect={setSize} />
            </div>
            <div role="group" aria-label={b.color}>
              <p className="label">{b.color}</p>
              <ColorRow palette="code" value={darkColor} codeColor={CODE_COLORS[0].value} onChange={setDarkColor} />
            </div>
            <div role="group" aria-label={b.background}>
              <p className="label">{b.background}</p>
              <Segmented
                label={b.background}
                options={[
                  { name: b.backgrounds.white, value: WHITE },
                  { name: b.backgrounds.transparent, value: TRANSPARENT },
                ]}
                selected={lightColor}
                onSelect={setLightColor}
              />
            </div>
          </div>
        </details>

        {/* 내려받기 */}
        <div className="rounded-xl border border-border bg-subtle p-4 shadow-panel sm:px-6 sm:py-6">
          <button type="button" className="btn btn-primary w-full" onClick={run} disabled={running || validCount === 0}>
            <ArchiveIcon />
            {progress ? b.working(progress.done, progress.total) : b.download(validCount)}
          </button>
          {progress ? (
            <div
              className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-accent/15"
              role="progressbar"
              aria-label={b.download(progress.total)}
              aria-valuemin={0}
              aria-valuemax={progress.total}
              aria-valuenow={progress.done}
            >
              <div className="h-full rounded-full bg-accent transition-[width]" style={{ width: `${(progress.done / Math.max(progress.total, 1)) * 100}%` }} />
            </div>
          ) : null}

          <div aria-live="polite">
            {result?.ok ? (
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                <p className="flex items-center gap-1.5 text-sm font-semibold text-success">
                  <CheckIcon className="size-4" />
                  {b.done(result.count)}
                </p>
                <div className="flex gap-2">
                  <button type="button" className="btn" onClick={run}>
                    {b.again}
                  </button>
                  <button type="button" className="btn btn-ghost" onClick={clearAll}>
                    {b.clear}
                  </button>
                </div>
              </div>
            ) : result ? (
              <p className="mt-3 text-sm font-medium text-danger">{b.failed}</p>
            ) : null}
          </div>

          {!result?.ok ? (
            <p className="mt-2.5 text-xs leading-relaxed text-muted">{validCount > 0 ? b.downloadNote(validCount) : b.downloadIdle}</p>
          ) : null}
          {skippedCount > 0 ? (
            <p className="mt-1.5 flex items-start gap-1.5 text-xs leading-relaxed font-medium text-danger">
              <WarningIcon className="mt-px size-3.5 shrink-0" />
              {b.skipped(skippedCount)}
            </p>
          ) : null}
        </div>
      </div>
    </>
  );
}
