"use client";

import type { ReactNode } from "react";
import type { QrPayloadMap, QrType } from "@/lib/qr/types";

type FormProps<T extends QrType> = {
  value: QrPayloadMap[T];
  onChange: (next: QrPayloadMap[T]) => void;
};

function Field({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) {
  return (
    <label className="block">
      <span className="label">{label}</span>
      {children}
      {hint ? <span className="mt-1 block text-xs text-muted">{hint}</span> : null}
    </label>
  );
}

function UrlForm({ value, onChange }: FormProps<"url">) {
  return (
    <Field label="웹사이트 주소" hint="https:// 를 생략하면 자동으로 붙습니다.">
      <input
        className="input"
        type="url"
        inputMode="url"
        placeholder="example.com 또는 https://example.com/page"
        value={value.url}
        onChange={(e) => onChange({ url: e.target.value })}
        autoFocus
      />
    </Field>
  );
}

function TextForm({ value, onChange }: FormProps<"text">) {
  return (
    <Field label="텍스트" hint={`${value.text.length} 자 · 길어질수록 QR이 복잡해집니다.`}>
      <textarea
        className="input min-h-28"
        placeholder="QR에 담을 내용을 입력하세요"
        value={value.text}
        maxLength={2000}
        onChange={(e) => onChange({ text: e.target.value })}
      />
    </Field>
  );
}

function WifiForm({ value, onChange }: FormProps<"wifi">) {
  const set = <K extends keyof QrPayloadMap["wifi"]>(k: K, v: QrPayloadMap["wifi"][K]) => onChange({ ...value, [k]: v });
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Field label="네트워크 이름 (SSID)">
        <input className="input" value={value.ssid} onChange={(e) => set("ssid", e.target.value)} autoFocus />
      </Field>
      <Field label="암호화 방식">
        <select className="input" value={value.encryption} onChange={(e) => set("encryption", e.target.value as QrPayloadMap["wifi"]["encryption"])}>
          <option value="WPA">WPA / WPA2 / WPA3</option>
          <option value="WEP">WEP</option>
          <option value="nopass">없음 (개방형)</option>
        </select>
      </Field>
      {value.encryption !== "nopass" ? (
        <Field label="비밀번호">
          <input className="input" type="text" autoComplete="off" value={value.password} onChange={(e) => set("password", e.target.value)} />
        </Field>
      ) : null}
      <label className="flex items-center gap-2 self-end pb-2 text-sm">
        <input type="checkbox" checked={value.hidden} onChange={(e) => set("hidden", e.target.checked)} />
        숨겨진 네트워크
      </label>
    </div>
  );
}

function VCardForm({ value, onChange }: FormProps<"vcard">) {
  const set = (k: keyof QrPayloadMap["vcard"]) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    onChange({ ...value, [k]: e.target.value });
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Field label="성">
        <input className="input" value={value.lastName} onChange={set("lastName")} autoFocus />
      </Field>
      <Field label="이름">
        <input className="input" value={value.firstName} onChange={set("firstName")} />
      </Field>
      <Field label="회사 / 소속">
        <input className="input" value={value.org} onChange={set("org")} />
      </Field>
      <Field label="직함">
        <input className="input" value={value.title} onChange={set("title")} />
      </Field>
      <Field label="휴대전화">
        <input className="input" type="tel" value={value.mobile} onChange={set("mobile")} />
      </Field>
      <Field label="회사 전화">
        <input className="input" type="tel" value={value.phone} onChange={set("phone")} />
      </Field>
      <Field label="이메일">
        <input className="input" type="email" value={value.email} onChange={set("email")} />
      </Field>
      <Field label="웹사이트">
        <input className="input" type="url" value={value.website} onChange={set("website")} />
      </Field>
      <div className="sm:col-span-2">
        <Field label="주소">
          <input className="input" value={value.address} onChange={set("address")} />
        </Field>
      </div>
      <div className="sm:col-span-2">
        <Field label="메모">
          <textarea className="input min-h-16" value={value.note} onChange={set("note")} />
        </Field>
      </div>
    </div>
  );
}

function EmailForm({ value, onChange }: FormProps<"email">) {
  return (
    <div className="grid gap-3">
      <Field label="받는 사람">
        <input className="input" type="email" placeholder="name@example.com" value={value.to} onChange={(e) => onChange({ ...value, to: e.target.value })} autoFocus />
      </Field>
      <Field label="제목">
        <input className="input" value={value.subject} onChange={(e) => onChange({ ...value, subject: e.target.value })} />
      </Field>
      <Field label="본문">
        <textarea className="input min-h-24" value={value.body} onChange={(e) => onChange({ ...value, body: e.target.value })} />
      </Field>
    </div>
  );
}

function SmsForm({ value, onChange }: FormProps<"sms">) {
  return (
    <div className="grid gap-3">
      <Field label="받는 번호">
        <input className="input" type="tel" placeholder="010-1234-5678" value={value.phone} onChange={(e) => onChange({ ...value, phone: e.target.value })} autoFocus />
      </Field>
      <Field label="메시지">
        <textarea className="input min-h-24" value={value.message} onChange={(e) => onChange({ ...value, message: e.target.value })} />
      </Field>
    </div>
  );
}

function PhoneForm({ value, onChange }: FormProps<"phone">) {
  return (
    <Field label="전화번호" hint="국제번호는 +82-10-1234-5678 형식으로 입력하세요.">
      <input className="input" type="tel" placeholder="010-1234-5678" value={value.phone} onChange={(e) => onChange({ phone: e.target.value })} autoFocus />
    </Field>
  );
}

function GeoForm({ value, onChange }: FormProps<"geo">) {
  const locate = () => {
    navigator.geolocation?.getCurrentPosition((pos) =>
      onChange({ lat: pos.coords.latitude.toFixed(6), lng: pos.coords.longitude.toFixed(6) }),
    );
  };
  return (
    <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
      <Field label="위도 (latitude)">
        <input className="input" inputMode="decimal" placeholder="37.5665" value={value.lat} onChange={(e) => onChange({ ...value, lat: e.target.value })} autoFocus />
      </Field>
      <Field label="경도 (longitude)">
        <input className="input" inputMode="decimal" placeholder="126.9780" value={value.lng} onChange={(e) => onChange({ ...value, lng: e.target.value })} />
      </Field>
      <button type="button" className="btn" onClick={locate}>
        현재 위치
      </button>
    </div>
  );
}

function EventForm({ value, onChange }: FormProps<"event">) {
  const set = <K extends keyof QrPayloadMap["event"]>(k: K, v: QrPayloadMap["event"][K]) => onChange({ ...value, [k]: v });
  const inputType = value.allDay ? "date" : "datetime-local";
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <Field label="일정 제목">
          <input className="input" value={value.title} onChange={(e) => set("title", e.target.value)} autoFocus />
        </Field>
      </div>
      <Field label="시작">
        <input className="input" type={inputType} value={value.start} onChange={(e) => set("start", e.target.value)} />
      </Field>
      <Field label="종료">
        <input className="input" type={inputType} value={value.end} onChange={(e) => set("end", e.target.value)} />
      </Field>
      <label className="flex items-center gap-2 text-sm sm:col-span-2">
        <input type="checkbox" checked={value.allDay} onChange={(e) => onChange({ ...value, allDay: e.target.checked, start: "", end: "" })} />
        하루 종일
      </label>
      <Field label="장소">
        <input className="input" value={value.location} onChange={(e) => set("location", e.target.value)} />
      </Field>
      <Field label="설명">
        <input className="input" value={value.description} onChange={(e) => set("description", e.target.value)} />
      </Field>
    </div>
  );
}

export function PayloadForm<T extends QrType>({ type, value, onChange }: { type: T } & FormProps<T>) {
  switch (type) {
    case "url":
      return <UrlForm value={value as QrPayloadMap["url"]} onChange={onChange as FormProps<"url">["onChange"]} />;
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
