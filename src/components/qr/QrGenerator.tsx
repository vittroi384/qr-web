"use client";

import { useMemo, useState, type ReactNode } from "react";
import { encodePayload } from "@/lib/qr/encoders";
import {
  DEFAULT_PAYLOADS,
  DEFAULT_STYLE,
  QR_TYPE_DESCRIPTIONS,
  QR_TYPE_LABELS,
  type QrPayloadMap,
  type QrStyleOptions,
  type QrType,
} from "@/lib/qr/types";
import { ResetIcon } from "../icons";
import { PayloadForm } from "./PayloadForm";
import { QrPreview } from "./QrPreview";
import { StyleOptions } from "./StyleOptions";
import { TypeTabs } from "./TypeTabs";
import { useQrLogger } from "./useQrLogger";

function SectionHeading({
  step,
  title,
  description,
  action,
}: {
  step: number;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-3 flex items-start justify-between gap-3">
      <div className="min-w-0">
        <h2 className="flex items-baseline gap-2.5 text-[15px] font-semibold text-foreground">
          <span className="font-mono text-xs font-medium text-muted tabular-nums" aria-hidden="true">
            {String(step).padStart(2, "0")}
          </span>
          {title}
        </h2>
        {description ? <p className="mt-0.5 text-[13px] leading-snug text-muted">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function QrGenerator() {
  const [type, setType] = useState<QrType>("url");
  const [payloads, setPayloads] = useState<QrPayloadMap>(DEFAULT_PAYLOADS);
  const [style, setStyle] = useState<QrStyleOptions>(DEFAULT_STYLE);

  const payload = payloads[type];
  const encoded = useMemo(() => encodePayload(type, payload), [type, payload]);
  // Logs only on download/copy — typing and previewing never reach the server.
  const logAction = useQrLogger({ type, payload, options: style, encoded });

  const setPayload = (next: QrPayloadMap[QrType]) => setPayloads((prev) => ({ ...prev, [type]: next }));
  const reset = () => setPayloads((prev) => ({ ...prev, [type]: DEFAULT_PAYLOADS[type] }));

  return (
    <section aria-labelledby="generator-heading">
      <header className="mb-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <h1 id="generator-heading" className="text-2xl font-semibold tracking-tight text-foreground">
          QR 코드 만들기
        </h1>
        <p className="text-sm text-muted">회원가입 없이 무료 · 만료되지 않는 QR</p>
      </header>

      <div className="grid rounded-xl border border-border bg-card shadow-panel lg:grid-cols-[minmax(0,1fr)_minmax(300px,340px)] lg:grid-rows-[auto_1fr]">
        {/* 01 종류 · 02 내용 */}
        <div className="min-w-0 lg:col-start-1 lg:row-start-1">
          <div className="p-4 sm:px-6 sm:py-5">
            <SectionHeading step={1} title="종류" />
            <TypeTabs value={type} onChange={setType} />
          </div>

          <div className="border-t border-border p-4 sm:px-6 sm:py-5">
            <SectionHeading
              step={2}
              title={QR_TYPE_LABELS[type]}
              description={QR_TYPE_DESCRIPTIONS[type]}
              action={
                <button type="button" className="btn btn-ghost btn-sm -mt-1 -mr-1.5 shrink-0" onClick={reset}>
                  <ResetIcon />
                  초기화
                </button>
              }
            />
            <PayloadForm key={type} type={type} value={payload} onChange={setPayload} />
          </div>
        </div>

        {/* 미리보기 · 저장 — desktop: sticky right column. Mobile: right after the form. */}
        <div className="min-w-0 border-t border-border bg-subtle p-4 sm:px-6 sm:py-5 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:rounded-r-xl lg:border-t-0 lg:border-l">
          <div className="lg:sticky lg:top-20">
            <QrPreview encoded={encoded} style={style} onStyleChange={setStyle} fileBase={`qr-${type}`} onAction={logAction} />
          </div>
        </div>

        {/* 꾸미기 — secondary, collapsed by default */}
        <div className="min-w-0 border-t border-border p-4 sm:px-6 sm:py-5 lg:col-start-1 lg:row-start-2">
          <StyleOptions value={style} onChange={setStyle} />
        </div>
      </div>
    </section>
  );
}
