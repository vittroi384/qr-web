"use client";

import { useMemo, useState } from "react";
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
import { PayloadForm } from "./PayloadForm";
import { QrPreview } from "./QrPreview";
import { StyleOptions } from "./StyleOptions";
import { TypeTabs } from "./TypeTabs";
import { useQrLogger } from "./useQrLogger";

export function QrGenerator() {
  const [type, setType] = useState<QrType>("url");
  const [payloads, setPayloads] = useState<QrPayloadMap>(DEFAULT_PAYLOADS);
  const [style, setStyle] = useState<QrStyleOptions>(DEFAULT_STYLE);

  const payload = payloads[type];
  const encoded = useMemo(() => encodePayload(type, payload), [type, payload]);
  const logAction = useQrLogger({ type, payload, options: style, encoded });

  const setPayload = (next: QrPayloadMap[QrType]) => setPayloads((prev) => ({ ...prev, [type]: next }));
  const reset = () => setPayloads((prev) => ({ ...prev, [type]: DEFAULT_PAYLOADS[type] }));

  return (
    <section className="card" aria-labelledby="generator-heading">
      <h1 id="generator-heading" className="text-2xl font-bold tracking-tight">
        무엇이든 QR 코드로 만들기
      </h1>
      <p className="mt-1 text-sm text-muted">종류를 고르고 내용을 입력하면 QR 코드가 즉시 만들어집니다. 가입 없이 무료.</p>

      <div className="mt-5">
        <TypeTabs value={type} onChange={setType} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="flex flex-col gap-4">
          <div className="flex items-baseline justify-between">
            <h2 className="font-semibold">{QR_TYPE_LABELS[type]}</h2>
            <button type="button" className="text-xs text-muted hover:text-foreground" onClick={reset}>
              입력 초기화
            </button>
          </div>
          <p className="-mt-3 text-xs text-muted">{QR_TYPE_DESCRIPTIONS[type]}</p>
          <PayloadForm key={type} type={type} value={payload} onChange={setPayload} />
          <StyleOptions value={style} onChange={setStyle} />
        </div>
        <div>
          <QrPreview encoded={encoded} style={style} fileBase={`qr-${type}`} onAction={logAction} />
        </div>
      </div>
    </section>
  );
}
