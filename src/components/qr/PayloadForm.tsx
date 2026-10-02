"use client";

import { useId, type ReactNode } from "react";
import {
  CRYPTO_COINS,
  PAYMENT_PROVIDERS,
  SOCIAL_PLATFORMS,
  encodeCrypto,
  encodePayment,
  encodeSocial,
  encodeUrl,
  encodeWhatsApp,
} from "@/lib/qr/encoders";
import type { QrPayloadMap, QrType } from "@/lib/qr/types";
import { LocateIcon, WarningIcon } from "../icons";
import { useI18n } from "../i18n/I18nProvider";

type FormProps<T extends QrType> = {
  value: QrPayloadMap[T];
  onChange: (next: QrPayloadMap[T]) => void;
};

function Field({
  label,
  children,
  hint,
  required,
  optional,
}: {
  label: string;
  children: ReactNode;
  hint?: ReactNode;
  required?: boolean;
  optional?: boolean;
}) {
  const { t } = useI18n();
  return (
    <label className="block min-w-0">
      <span className="label flex items-center gap-1.5">
        {label}
        {required ? (
          <span className="rounded bg-surface px-1.5 py-px text-[11px] leading-4 font-medium text-muted">{t.forms.required}</span>
        ) : null}
        {optional ? <span className="text-xs font-normal text-muted">{t.forms.optional}</span> : null}
      </span>
      {children}
      {hint ? <span className="hint">{hint}</span> : null}
    </label>
  );
}

function UrlForm({ value, onChange }: FormProps<"url">) {
  const t = useI18n().t.forms.url;
  return (
    <Field label={t.label} hint={t.hint} required>
      <input
        className="input"
        type="url"
        inputMode="url"
        placeholder={t.placeholder}
        value={value.url}
        onChange={(e) => onChange({ url: e.target.value })}
      />
    </Field>
  );
}

function SocialForm({ value, onChange }: FormProps<"social">) {
  const t = useI18n().t.forms.social;
  const resultId = useId();
  const platform = SOCIAL_PLATFORMS.find((p) => p.id === value.platform) ?? SOCIAL_PLATFORMS[0];
  const url = encodeSocial(value);
  return (
    <div className="grid gap-4 sm:grid-cols-[minmax(0,220px)_minmax(0,1fr)]">
      <Field label={t.platform}>
        <select className="input" value={platform.id} onChange={(e) => onChange({ ...value, platform: e.target.value })}>
          {SOCIAL_PLATFORMS.map((p) => (
            <option key={p.id} value={p.id}>
              {t.platformNames[p.id] ?? p.label}
            </option>
          ))}
        </select>
      </Field>
      <Field
        label={t.handle}
        required
        hint={
          <>
            {t.hint}
            {url ? (
              <span id={resultId} className="mt-1.5 flex min-w-0 items-baseline gap-2">
                <span className="shrink-0">{t.result}</span>
                <span className="min-w-0 font-mono text-[12px] break-all text-foreground">{url}</span>
              </span>
            ) : null}
          </>
        }
      >
        <input
          className="input"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          placeholder={t.platformPlaceholders[platform.id] ?? platform.placeholder}
          aria-describedby={url ? resultId : undefined}
          value={value.handle}
          onChange={(e) => onChange({ ...value, handle: e.target.value })}
        />
      </Field>
    </div>
  );
}

/** "Opens  https://…" under a field, so people see exactly what the code will do. */
function ResultLine({ id, label, url }: { id?: string; label: string; url: string }) {
  return (
    <span id={id} className="mt-1.5 flex min-w-0 items-baseline gap-2">
      <span className="shrink-0">{label}</span>
      <span className="min-w-0 font-mono text-[12px] break-all text-foreground">{url}</span>
    </span>
  );
}

function WhatsAppForm({ value, onChange }: FormProps<"whatsapp">) {
  const t = useI18n().t.forms.whatsapp;
  const resultId = useId();
  const url = encodeWhatsApp(value);
  return (
    <div className="grid gap-4">
      <Field
        label={t.phone}
        required
        hint={
          <>
            {t.phoneHint}
            {url ? <ResultLine id={resultId} label={t.result} url={url} /> : null}
          </>
        }
      >
        <input
          className="input"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder={t.phonePlaceholder}
          aria-describedby={url ? resultId : undefined}
          value={value.phone}
          onChange={(e) => onChange({ ...value, phone: e.target.value })}
        />
      </Field>
      <Field label={t.message} optional>
        <textarea
          className="input min-h-24"
          maxLength={500}
          placeholder={t.messagePlaceholder}
          value={value.message}
          onChange={(e) => onChange({ ...value, message: e.target.value })}
        />
      </Field>
    </div>
  );
}

const MONEY = /^\d+(\.\d{1,2})?$/;

function PaymentForm({ value, onChange }: FormProps<"payment">) {
  const t = useI18n().t.forms.payment;
  const resultId = useId();
  const provider = PAYMENT_PROVIDERS.find((p) => p.id === value.provider) ?? PAYMENT_PROVIDERS[0];
  const url = encodePayment(value);
  const amountBad = Boolean(provider.amountTemplate) && value.amount.trim() !== "" && !MONEY.test(value.amount.trim());
  const set = <K extends keyof QrPayloadMap["payment"]>(k: K, v: QrPayloadMap["payment"][K]) => onChange({ ...value, [k]: v });
  return (
    <div className="grid gap-4 sm:grid-cols-[minmax(0,220px)_minmax(0,1fr)]">
      <Field label={t.provider}>
        <select className="input" value={provider.id} onChange={(e) => set("provider", e.target.value)}>
          {PAYMENT_PROVIDERS.map((p) => (
            <option key={p.id} value={p.id}>
              {p.label}
            </option>
          ))}
        </select>
      </Field>
      <Field
        label={t.handle}
        required
        hint={
          <>
            {t.handleHint}
            {url ? <ResultLine id={resultId} label={t.result} url={url} /> : null}
          </>
        }
      >
        <input
          className="input"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          placeholder={provider.placeholder}
          aria-describedby={url ? resultId : undefined}
          value={value.handle}
          onChange={(e) => set("handle", e.target.value)}
        />
      </Field>
      {/* Only PayPal, Venmo and Cash App accept an amount in the link. */}
      {provider.amountTemplate ? (
        <Field label={t.amount} optional hint={amountBad ? <span className="font-medium text-danger">{t.amountInvalid}</span> : t.amountHint}>
          <input
            className={`input ${amountBad ? "border-danger/60" : ""}`}
            inputMode="decimal"
            placeholder={t.amountPlaceholder}
            aria-invalid={amountBad || undefined}
            value={value.amount}
            onChange={(e) => set("amount", e.target.value)}
          />
        </Field>
      ) : null}
    </div>
  );
}

const AMOUNT = /^\d+(\.\d{1,8})?$/;

function CryptoForm({ value, onChange }: FormProps<"crypto">) {
  const t = useI18n().t.forms.crypto;
  const coin = CRYPTO_COINS.find((c) => c.id === value.coin) ?? CRYPTO_COINS[0];
  const encoded = encodeCrypto(value);
  const addressBad = value.address.trim() !== "" && !encoded;
  const amountBad = coin.supportsAmount && value.amount.trim() !== "" && !AMOUNT.test(value.amount.trim());
  const set = <K extends keyof QrPayloadMap["crypto"]>(k: K, v: QrPayloadMap["crypto"][K]) => onChange({ ...value, [k]: v });
  return (
    <div className="grid gap-4 sm:grid-cols-[minmax(0,220px)_minmax(0,1fr)]">
      <Field label={t.coin}>
        <select className="input" value={coin.id} onChange={(e) => set("coin", e.target.value)}>
          {CRYPTO_COINS.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
      </Field>
      <Field
        label={t.address}
        required
        hint={addressBad ? <span className="font-medium text-danger">{t.addressInvalid}</span> : undefined}
      >
        <input
          className={`input font-mono ${addressBad ? "border-danger/60" : ""}`}
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          placeholder={coin.placeholder}
          aria-invalid={addressBad || undefined}
          value={value.address}
          onChange={(e) => set("address", e.target.value)}
        />
      </Field>
      {/* No payee label: the code carries only the address and amount. */}
      {coin.supportsAmount ? (
        <Field
          label={`${t.amount} (${coin.label.replace(/^.*\((.+)\)$/, "$1")})`}
          optional
          hint={amountBad ? <span className="font-medium text-danger">{t.amountInvalid}</span> : t.amountHint}
        >
          <input
            className={`input ${amountBad ? "border-danger/60" : ""}`}
            inputMode="decimal"
            placeholder={t.amountPlaceholder}
            aria-invalid={amountBad || undefined}
            value={value.amount}
            onChange={(e) => set("amount", e.target.value)}
          />
        </Field>
      ) : null}
      <p className="flex items-start gap-2 rounded-lg border border-amber-200 bg-warning-soft px-3 py-2.5 text-xs leading-relaxed text-warning sm:col-span-2">
        <WarningIcon className="mt-px size-4 shrink-0" />
        {t.warning}
      </p>
    </div>
  );
}

function FileForm({ value, onChange }: FormProps<"file">) {
  const t = useI18n().t.forms.file;
  const resultId = useId();
  const url = encodeUrl(value.url);
  return (
    <div className="grid gap-4">
      <p className="rounded-lg border border-border bg-subtle px-3 py-2.5 text-[13px] leading-relaxed text-muted">{t.guide}</p>
      <Field label={t.label} required hint={url ? <ResultLine id={resultId} label={t.result} url={url} /> : undefined}>
        <input
          className="input"
          type="url"
          inputMode="url"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          placeholder={t.placeholder}
          aria-describedby={url ? resultId : undefined}
          value={value.url}
          onChange={(e) => onChange({ url: e.target.value })}
        />
      </Field>
    </div>
  );
}

function TextForm({ value, onChange }: FormProps<"text">) {
  const t = useI18n().t.forms.text;
  return (
    <Field label={t.label} hint={t.count(value.text.length)} required>
      <textarea
        className="input min-h-28"
        placeholder={t.placeholder}
        value={value.text}
        maxLength={2000}
        onChange={(e) => onChange({ text: e.target.value })}
      />
    </Field>
  );
}

function WifiForm({ value, onChange }: FormProps<"wifi">) {
  const t = useI18n().t.forms.wifi;
  const set = <K extends keyof QrPayloadMap["wifi"]>(k: K, v: QrPayloadMap["wifi"][K]) => onChange({ ...value, [k]: v });
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Field label={t.ssid} required>
        <input className="input" placeholder={t.ssidPlaceholder} value={value.ssid} onChange={(e) => set("ssid", e.target.value)} />
      </Field>
      <Field label={t.encryption}>
        <select className="input" value={value.encryption} onChange={(e) => set("encryption", e.target.value as QrPayloadMap["wifi"]["encryption"])}>
          <option value="WPA">{t.encWpa}</option>
          <option value="WEP">{t.encWep}</option>
          <option value="nopass">{t.encNone}</option>
        </select>
      </Field>
      {value.encryption !== "nopass" ? (
        <Field label={t.password}>
          <input className="input" type="text" autoComplete="off" placeholder={t.passwordPlaceholder} value={value.password} onChange={(e) => set("password", e.target.value)} />
        </Field>
      ) : null}
      <label className="flex min-h-11 cursor-pointer items-center gap-2.5 rounded-lg border border-border-strong bg-card px-3 text-sm text-foreground shadow-xs transition-colors hover:border-zinc-400 hover:bg-subtle self-end">
        <input type="checkbox" checked={value.hidden} onChange={(e) => set("hidden", e.target.checked)} />
        {t.hidden}
      </label>
    </div>
  );
}

function VCardForm({ value, onChange }: FormProps<"vcard">) {
  const set = (k: keyof QrPayloadMap["vcard"]) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    onChange({ ...value, [k]: e.target.value });
  const t = useI18n().t.forms.vcard;
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <p className="-mt-1 text-xs leading-relaxed text-muted sm:col-span-2">{t.requiredHint}</p>
      <Field label={t.lastName}>
        <input className="input" placeholder={t.ph.lastName} value={value.lastName} onChange={set("lastName")} />
      </Field>
      <Field label={t.firstName}>
        <input className="input" placeholder={t.ph.firstName} value={value.firstName} onChange={set("firstName")} />
      </Field>
      <Field label={t.org}>
        <input className="input" placeholder={t.ph.org} value={value.org} onChange={set("org")} />
      </Field>
      <Field label={t.title}>
        <input className="input" placeholder={t.ph.title} value={value.title} onChange={set("title")} />
      </Field>
      <Field label={t.mobile}>
        <input className="input" type="tel" placeholder={t.ph.mobile} value={value.mobile} onChange={set("mobile")} />
      </Field>
      <Field label={t.phone}>
        <input className="input" type="tel" placeholder={t.ph.phone} value={value.phone} onChange={set("phone")} />
      </Field>
      <Field label={t.email}>
        <input className="input" type="email" placeholder={t.ph.email} value={value.email} onChange={set("email")} />
      </Field>
      <Field label={t.website}>
        <input className="input" type="url" placeholder={t.ph.website} value={value.website} onChange={set("website")} />
      </Field>
      <div className="sm:col-span-2">
        <Field label={t.address}>
          <input className="input" placeholder={t.ph.address} value={value.address} onChange={set("address")} />
        </Field>
      </div>
      <div className="sm:col-span-2">
        <Field label={t.note}>
          <textarea className="input min-h-16" placeholder={t.ph.note} value={value.note} onChange={set("note")} />
        </Field>
      </div>
    </div>
  );
}

function EmailForm({ value, onChange }: FormProps<"email">) {
  const t = useI18n().t.forms.email;
  return (
    <div className="grid gap-4">
      <Field label={t.to} required>
        <input className="input" type="email" placeholder={t.toPlaceholder} value={value.to} onChange={(e) => onChange({ ...value, to: e.target.value })} />
      </Field>
      <Field label={t.subject}>
        <input className="input" placeholder={t.subjectPlaceholder} value={value.subject} onChange={(e) => onChange({ ...value, subject: e.target.value })} />
      </Field>
      <Field label={t.body}>
        <textarea className="input min-h-24" placeholder={t.bodyPlaceholder} value={value.body} onChange={(e) => onChange({ ...value, body: e.target.value })} />
      </Field>
    </div>
  );
}

function SmsForm({ value, onChange }: FormProps<"sms">) {
  const t = useI18n().t.forms.sms;
  return (
    <div className="grid gap-4">
      <Field label={t.phone} required>
        <input className="input" type="tel" placeholder={t.phonePlaceholder} value={value.phone} onChange={(e) => onChange({ ...value, phone: e.target.value })} />
      </Field>
      <Field label={t.message}>
        <textarea className="input min-h-24" placeholder={t.messagePlaceholder} value={value.message} onChange={(e) => onChange({ ...value, message: e.target.value })} />
      </Field>
    </div>
  );
}

function PhoneForm({ value, onChange }: FormProps<"phone">) {
  const t = useI18n().t.forms.phone;
  return (
    <Field label={t.label} hint={t.hint} required>
      <input className="input" type="tel" placeholder={t.placeholder} value={value.phone} onChange={(e) => onChange({ phone: e.target.value })} />
    </Field>
  );
}

function GeoForm({ value, onChange }: FormProps<"geo">) {
  const t = useI18n().t.forms.geo;
  const locate = () => {
    navigator.geolocation?.getCurrentPosition((pos) =>
      onChange({ lat: pos.coords.latitude.toFixed(6), lng: pos.coords.longitude.toFixed(6) }),
    );
  };
  return (
    <div className="grid gap-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
      <Field label={t.lat} required>
        <input className="input" inputMode="decimal" placeholder="37.5665" value={value.lat} onChange={(e) => onChange({ ...value, lat: e.target.value })} />
      </Field>
      <Field label={t.lng} required>
        <input className="input" inputMode="decimal" placeholder="126.9780" value={value.lng} onChange={(e) => onChange({ ...value, lng: e.target.value })} />
      </Field>
      <button type="button" className="btn" onClick={locate}>
        <LocateIcon />
        {t.locate}
      </button>
    </div>
  );
}

function EventForm({ value, onChange }: FormProps<"event">) {
  const set = <K extends keyof QrPayloadMap["event"]>(k: K, v: QrPayloadMap["event"][K]) => onChange({ ...value, [k]: v });
  const inputType = value.allDay ? "date" : "datetime-local";
  const t = useI18n().t.forms.event;
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <Field label={t.title} required>
          <input className="input" placeholder={t.titlePlaceholder} value={value.title} onChange={(e) => set("title", e.target.value)} />
        </Field>
      </div>
      <Field label={t.start} required>
        <input className="input" type={inputType} value={value.start} onChange={(e) => set("start", e.target.value)} />
      </Field>
      <Field label={t.end}>
        <input className="input" type={inputType} value={value.end} onChange={(e) => set("end", e.target.value)} />
      </Field>
      <label className="flex min-h-11 cursor-pointer items-center gap-2.5 rounded-lg border border-border-strong bg-card px-3 text-sm text-foreground shadow-xs transition-colors hover:border-zinc-400 hover:bg-subtle sm:col-span-2">
        <input type="checkbox" checked={value.allDay} onChange={(e) => onChange({ ...value, allDay: e.target.checked, start: "", end: "" })} />
        {t.allDay}
      </label>
      <Field label={t.location}>
        <input className="input" placeholder={t.locationPlaceholder} value={value.location} onChange={(e) => set("location", e.target.value)} />
      </Field>
      <Field label={t.description}>
        <input className="input" placeholder={t.descriptionPlaceholder} value={value.description} onChange={(e) => set("description", e.target.value)} />
      </Field>
    </div>
  );
}

export function PayloadForm<T extends QrType>({ type, value, onChange }: { type: T } & FormProps<T>) {
  switch (type) {
    case "url":
      return <UrlForm value={value as QrPayloadMap["url"]} onChange={onChange as FormProps<"url">["onChange"]} />;
    case "social":
      return <SocialForm value={value as QrPayloadMap["social"]} onChange={onChange as FormProps<"social">["onChange"]} />;
    case "whatsapp":
      return <WhatsAppForm value={value as QrPayloadMap["whatsapp"]} onChange={onChange as FormProps<"whatsapp">["onChange"]} />;
    case "payment":
      return <PaymentForm value={value as QrPayloadMap["payment"]} onChange={onChange as FormProps<"payment">["onChange"]} />;
    case "crypto":
      return <CryptoForm value={value as QrPayloadMap["crypto"]} onChange={onChange as FormProps<"crypto">["onChange"]} />;
    case "file":
      return <FileForm value={value as QrPayloadMap["file"]} onChange={onChange as FormProps<"file">["onChange"]} />;
    case "text":
      return <TextForm value={value as QrPayloadMap["text"]} onChange={onChange as FormProps<"text">["onChange"]} />;
    case "wifi":
      return <WifiForm value={value as QrPayloadMap["wifi"]} onChange={onChange as FormProps<"wifi">["onChange"]} />;
    case "vcard":
      return <VCardForm value={value as QrPayloadMap["vcard"]} onChange={onChange as FormProps<"vcard">["onChange"]} />;
    case "email":
      return <EmailForm value={value as QrPayloadMap["email"]} onChange={onChange as FormProps<"email">["onChange"]} />;
    case "sms":
      return <SmsForm value={value as QrPayloadMap["sms"]} onChange={onChange as FormProps<"sms">["onChange"]} />;
    case "phone":
      return <PhoneForm value={value as QrPayloadMap["phone"]} onChange={onChange as FormProps<"phone">["onChange"]} />;
    case "geo":
      return <GeoForm value={value as QrPayloadMap["geo"]} onChange={onChange as FormProps<"geo">["onChange"]} />;
    case "event":
      return <EventForm value={value as QrPayloadMap["event"]} onChange={onChange as FormProps<"event">["onChange"]} />;
    default:
      return null;
  }
}
