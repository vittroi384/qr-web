"use client";

import { useId, type ReactNode } from "react";
import { CRYPTO_COINS, PAYMENT_PROVIDERS, SOCIAL_PLATFORMS, encodePayment, encodeSocial, encodeUrl, encodeWhatsApp } from "@/lib/qr/encoders";
import type { QrPayloadMap, QrType } from "@/lib/qr/types";
import { TEXT_MAX, type ValidationIssue } from "@/lib/qr/validate";
import { CheckIcon, LocateIcon, WarningIcon } from "../icons";
import { PlatformPicker, detectPlatform, withScheme } from "./PlatformPicker";
import { useI18n } from "../i18n/I18nProvider";

type FormProps<T extends QrType> = {
  value: QrPayloadMap[T];
  onChange: (next: QrPayloadMap[T]) => void;
  /** Why the current payload cannot be encoded (from validatePayload); shown under its field. */
  issue?: ValidationIssue | null;
};

/** `err("lat")` → the translated reason when the issue belongs to that field, else undefined. */
function useFieldError(issue: ValidationIssue | null | undefined) {
  const { t } = useI18n();
  return (field: string): string | undefined => {
    if (!issue || issue.field !== field) return undefined;
    switch (issue.reason) {
      case "urlScheme":
        return t.validation.urlScheme;
      case "coordNumber":
        return t.validation.coordNumber;
      case "latRange":
        return t.validation.latRange;
      case "lngRange":
        return t.validation.lngRange;
      case "phoneChars":
        return t.validation.phoneChars;
      case "phoneNoDigits":
        return t.validation.phoneNoDigits;
      case "phoneTooLong":
        return t.validation.phoneTooLong;
      case "textMax":
        return t.validation.textMax(TEXT_MAX);
      // These forms already had their own wording; keep it.
      case "paymentAmount":
        return t.forms.payment.amountInvalid;
      case "cryptoAddress":
        return t.forms.crypto.addressInvalid;
      case "cryptoAmount":
        return t.forms.crypto.amountInvalid;
    }
  };
}

/** Red border for a field whose value is present but wrong. */
const invalidClass = (error?: string) => (error ? " border-danger/60" : "");

function Field({
  label,
  children,
  hint,
  error,
  required,
  optional,
}: {
  label: string;
  children: ReactNode;
  hint?: ReactNode;
  /** One-line reason the value is wrong; replaces the hint and is announced. */
  error?: string;
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
      {error ? (
        <span role="alert" className="mt-1.5 block text-xs leading-relaxed font-medium text-danger">
          {error}
        </span>
      ) : hint ? (
        <span className="hint">{hint}</span>
      ) : null}
    </label>
  );
}

function UrlForm({ value, onChange, issue }: FormProps<"url">) {
  const t = useI18n().t.forms.url;
  const error = useFieldError(issue)("url");
  return (
    <Field label={t.label} hint={t.hint} error={error} required>
      <input
        className={`input${invalidClass(error)}`}
        type="url"
        inputMode="url"
        placeholder={t.placeholder}
        aria-invalid={error ? true : undefined}
        value={value.url}
        onChange={(e) => onChange({ url: e.target.value })}
      />
    </Field>
  );
}

/** Shown first; the rest sit behind "More". */
const POPULAR_SOCIAL = ["instagram", "youtube", "tiktok", "x", "facebook", "linkedin", "kakao_openchat", "telegram"] as const;

/** "Recognized as an Instagram link" under the field after a pasted link picked the platform. */
function Recognized({ text }: { text: string }) {
  return (
    <span className="mt-1.5 flex items-center gap-1.5 font-medium text-success">
      <CheckIcon className="size-3.5 shrink-0" />
      {text}
    </span>
  );
}

function SocialForm({ value, onChange }: FormProps<"social">) {
  const { t: all } = useI18n();
  const t = all.forms.social;
  const picker = all.forms.picker;
  const resultId = useId();
  const platform = SOCIAL_PLATFORMS.find((p) => p.id === value.platform) ?? SOCIAL_PLATFORMS[0];
  const url = encodeSocial(value);
  const fullName = (id: string, label: string) => t.platformNames[id] ?? label;
  const options = SOCIAL_PLATFORMS.map((p) => ({ id: p.id, fullName: fullName(p.id, p.label), name: picker.shortNames[p.id] ?? fullName(p.id, p.label) }));
  const recognized = detectPlatform(value.handle, SOCIAL_PLATFORMS) === platform.id;

  // A pasted profile link selects its platform; the link itself is kept (with https:// added).
  const onHandle = (text: string) => {
    const detected = detectPlatform(text, SOCIAL_PLATFORMS);
    onChange(detected ? { platform: detected, handle: withScheme(text) } : { ...value, handle: text });
  };

  return (
    <div className="grid gap-5">
      <div className="min-w-0">
        <p className="label">{t.platform}</p>
        <PlatformPicker
          label={t.platform}
          options={options}
          value={platform.id}
          onChange={(id) => onChange({ ...value, platform: id })}
          popular={POPULAR_SOCIAL}
          moreLabel={picker.more}
          lessLabel={picker.less}
        />
      </div>
      <Field
        label={`${t.handle} · ${fullName(platform.id, platform.label)}`}
        required
        hint={
          <>
            {picker.pasteHint}
            {recognized ? <Recognized text={picker.recognized(fullName(platform.id, platform.label))} /> : null}
            {url ? <ResultLine id={resultId} label={t.result} url={url} /> : null}
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
          onChange={(e) => onHandle(e.target.value)}
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

function WhatsAppForm({ value, onChange, issue }: FormProps<"whatsapp">) {
  const t = useI18n().t.forms.whatsapp;
  const resultId = useId();
  const url = encodeWhatsApp(value);
  const error = useFieldError(issue)("phone");
  return (
    <div className="grid gap-4">
      <Field
        label={t.phone}
        required
        error={error}
        hint={
          <>
            {t.phoneHint}
            {url ? <ResultLine id={resultId} label={t.result} url={url} /> : null}
          </>
        }
      >
        <input
          className={`input${invalidClass(error)}`}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder={t.phonePlaceholder}
          aria-describedby={url ? resultId : undefined}
          aria-invalid={error ? true : undefined}
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

function PaymentForm({ value, onChange, issue }: FormProps<"payment">) {
  const { t: all } = useI18n();
  const t = all.forms.payment;
  const picker = all.forms.picker;
  const resultId = useId();
  const provider = PAYMENT_PROVIDERS.find((p) => p.id === value.provider) ?? PAYMENT_PROVIDERS[0];
  const amountError = useFieldError(issue)("amount");
  // With a bad amount nothing is encoded (the generator blanks it), so no "Opens …" line either.
  const url = amountError ? "" : encodePayment(value);
  const set = <K extends keyof QrPayloadMap["payment"]>(k: K, v: QrPayloadMap["payment"][K]) => onChange({ ...value, [k]: v });
  const options = PAYMENT_PROVIDERS.map((p) => ({ id: p.id, fullName: p.label, name: picker.shortNames[p.id] ?? p.label }));
  const recognized = detectPlatform(value.handle, PAYMENT_PROVIDERS) === provider.id;
  const onHandle = (text: string) => {
    const detected = detectPlatform(text, PAYMENT_PROVIDERS);
    onChange(detected ? { ...value, provider: detected, handle: withScheme(text) } : { ...value, handle: text });
  };
  return (
    <div className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,200px)]">
      <div className="min-w-0 sm:col-span-2">
        <p className="label">{t.provider}</p>
        <PlatformPicker label={t.provider} options={options} value={provider.id} onChange={(id) => set("provider", id)} />
      </div>
      <Field
        label={`${t.handle} · ${provider.label}`}
        required
        hint={
          <>
            {t.handleHint} {picker.pasteHintShort}
            {recognized ? <Recognized text={picker.recognized(provider.label)} /> : null}
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
          onChange={(e) => onHandle(e.target.value)}
        />
      </Field>
      {/* Only PayPal, Venmo and Cash App accept an amount in the link. */}
      {provider.amountTemplate ? (
        <Field label={t.amount} optional hint={t.amountHint} error={amountError}>
          <input
            className={`input${invalidClass(amountError)}`}
            inputMode="decimal"
            placeholder={t.amountPlaceholder}
            aria-invalid={amountError ? true : undefined}
            value={value.amount}
            onChange={(e) => set("amount", e.target.value)}
          />
        </Field>
      ) : null}
    </div>
  );
}

function CryptoForm({ value, onChange, issue }: FormProps<"crypto">) {
  const t = useI18n().t.forms.crypto;
  const coin = CRYPTO_COINS.find((c) => c.id === value.coin) ?? CRYPTO_COINS[0];
  const err = useFieldError(issue);
  const addressError = err("address");
  const amountError = err("amount");
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
      <Field label={t.address} required error={addressError}>
        <input
          className={`input font-mono${invalidClass(addressError)}`}
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          placeholder={coin.placeholder}
          aria-invalid={addressError ? true : undefined}
          value={value.address}
          onChange={(e) => set("address", e.target.value)}
        />
      </Field>
      {/* No payee label: the code carries only the address and amount. */}
      {coin.supportsAmount ? (
        <Field label={`${t.amount} (${coin.label.replace(/^.*\((.+)\)$/, "$1")})`} optional hint={t.amountHint} error={amountError}>
          <input
            className={`input${invalidClass(amountError)}`}
            inputMode="decimal"
            placeholder={t.amountPlaceholder}
            aria-invalid={amountError ? true : undefined}
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

function FileForm({ value, onChange, issue }: FormProps<"file">) {
  const t = useI18n().t.forms.file;
  const resultId = useId();
  const url = encodeUrl(value.url);
  const error = useFieldError(issue)("url");
  return (
    <div className="grid gap-4">
      <p className="rounded-lg border border-border bg-subtle px-3 py-2.5 text-[13px] leading-relaxed text-muted">{t.guide}</p>
      <Field label={t.label} required error={error} hint={url ? <ResultLine id={resultId} label={t.result} url={url} /> : undefined}>
        <input
          className={`input${invalidClass(error)}`}
          type="url"
          inputMode="url"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          placeholder={t.placeholder}
          aria-describedby={url ? resultId : undefined}
          aria-invalid={error ? true : undefined}
          value={value.url}
          onChange={(e) => onChange({ url: e.target.value })}
        />
      </Field>
    </div>
  );
}

function TextForm({ value, onChange, issue }: FormProps<"text">) {
  const t = useI18n().t.forms.text;
  const n = value.text.length;
  // The textarea stops accepting input at the limit; say so instead of silently ignoring keystrokes.
  const atMax = n >= TEXT_MAX;
  const error = useFieldError(issue)("text");
  return (
    <Field
      label={t.label}
      required
      error={error}
      hint={
        <span role={atMax ? "status" : undefined} className={atMax ? "font-medium text-warning" : undefined}>
          {t.count(n)}
          {atMax ? ` ${t.max(TEXT_MAX)}` : null}
        </span>
      }
    >
      <textarea
        className={`input min-h-28${invalidClass(error)}`}
        placeholder={t.placeholder}
        value={value.text}
        maxLength={TEXT_MAX}
        aria-invalid={error ? true : undefined}
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

function VCardForm({ value, onChange, issue }: FormProps<"vcard">) {
  const set = (k: keyof QrPayloadMap["vcard"]) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    onChange({ ...value, [k]: e.target.value });
  const t = useI18n().t.forms.vcard;
  const websiteError = useFieldError(issue)("website");
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
      <Field label={t.website} error={websiteError}>
        <input
          className={`input${invalidClass(websiteError)}`}
          type="url"
          placeholder={t.ph.website}
          aria-invalid={websiteError ? true : undefined}
          value={value.website}
          onChange={set("website")}
        />
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

function SmsForm({ value, onChange, issue }: FormProps<"sms">) {
  const t = useI18n().t.forms.sms;
  const error = useFieldError(issue)("phone");
  return (
    <div className="grid gap-4">
      <Field label={t.phone} required error={error}>
        <input
          className={`input${invalidClass(error)}`}
          type="tel"
          placeholder={t.phonePlaceholder}
          aria-invalid={error ? true : undefined}
          value={value.phone}
          onChange={(e) => onChange({ ...value, phone: e.target.value })}
        />
      </Field>
      <Field label={t.message}>
        <textarea className="input min-h-24" placeholder={t.messagePlaceholder} value={value.message} onChange={(e) => onChange({ ...value, message: e.target.value })} />
      </Field>
    </div>
  );
}

function PhoneForm({ value, onChange, issue }: FormProps<"phone">) {
  const t = useI18n().t.forms.phone;
  const error = useFieldError(issue)("phone");
  return (
    <Field label={t.label} hint={t.hint} error={error} required>
      <input
        className={`input${invalidClass(error)}`}
        type="tel"
        placeholder={t.placeholder}
        aria-invalid={error ? true : undefined}
        value={value.phone}
        onChange={(e) => onChange({ phone: e.target.value })}
      />
    </Field>
  );
}

function GeoForm({ value, onChange, issue }: FormProps<"geo">) {
  const t = useI18n().t.forms.geo;
  const err = useFieldError(issue);
  const latError = err("lat");
  const lngError = err("lng");
  const locate = () => {
    navigator.geolocation?.getCurrentPosition((pos) =>
      onChange({ lat: pos.coords.latitude.toFixed(6), lng: pos.coords.longitude.toFixed(6) }),
    );
  };
  return (
    <div className="grid gap-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
      <Field label={t.lat} required error={latError}>
        <input
          className={`input${invalidClass(latError)}`}
          inputMode="decimal"
          placeholder="37.5665"
          aria-invalid={latError ? true : undefined}
          value={value.lat}
          onChange={(e) => onChange({ ...value, lat: e.target.value })}
        />
      </Field>
      <Field label={t.lng} required error={lngError}>
        <input
          className={`input${invalidClass(lngError)}`}
          inputMode="decimal"
          placeholder="126.9780"
          aria-invalid={lngError ? true : undefined}
          value={value.lng}
          onChange={(e) => onChange({ ...value, lng: e.target.value })}
        />
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

export function PayloadForm<T extends QrType>({ type, value, onChange, issue }: { type: T } & FormProps<T>) {
  switch (type) {
    case "url":
      return <UrlForm value={value as QrPayloadMap["url"]} onChange={onChange as FormProps<"url">["onChange"]} issue={issue} />;
    case "social":
      return <SocialForm value={value as QrPayloadMap["social"]} onChange={onChange as FormProps<"social">["onChange"]} />;
    case "whatsapp":
      return <WhatsAppForm value={value as QrPayloadMap["whatsapp"]} onChange={onChange as FormProps<"whatsapp">["onChange"]} issue={issue} />;
    case "payment":
      return <PaymentForm value={value as QrPayloadMap["payment"]} onChange={onChange as FormProps<"payment">["onChange"]} issue={issue} />;
    case "crypto":
      return <CryptoForm value={value as QrPayloadMap["crypto"]} onChange={onChange as FormProps<"crypto">["onChange"]} issue={issue} />;
    case "file":
      return <FileForm value={value as QrPayloadMap["file"]} onChange={onChange as FormProps<"file">["onChange"]} issue={issue} />;
    case "text":
      return <TextForm value={value as QrPayloadMap["text"]} onChange={onChange as FormProps<"text">["onChange"]} issue={issue} />;
    case "wifi":
      return <WifiForm value={value as QrPayloadMap["wifi"]} onChange={onChange as FormProps<"wifi">["onChange"]} />;
    case "vcard":
      return <VCardForm value={value as QrPayloadMap["vcard"]} onChange={onChange as FormProps<"vcard">["onChange"]} issue={issue} />;
    case "email":
      return <EmailForm value={value as QrPayloadMap["email"]} onChange={onChange as FormProps<"email">["onChange"]} />;
    case "sms":
      return <SmsForm value={value as QrPayloadMap["sms"]} onChange={onChange as FormProps<"sms">["onChange"]} issue={issue} />;
    case "phone":
      return <PhoneForm value={value as QrPayloadMap["phone"]} onChange={onChange as FormProps<"phone">["onChange"]} issue={issue} />;
    case "geo":
      return <GeoForm value={value as QrPayloadMap["geo"]} onChange={onChange as FormProps<"geo">["onChange"]} issue={issue} />;
    case "event":
      return <EventForm value={value as QrPayloadMap["event"]} onChange={onChange as FormProps<"event">["onChange"]} />;
    default:
      return null;
  }
}
