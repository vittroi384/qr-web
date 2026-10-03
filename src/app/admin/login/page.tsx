"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { LockIcon } from "@/components/icons";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [remember, setRemember] = useState(false);
  const [totpRequired, setTotpRequired] = useState<boolean | null>(null);
  // Production refuses login while .env is unsafe (no TOTP, weak password); the server says why.
  const [blocked, setBlocked] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/admin/login", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : { totp: false }))
      .then((d) => {
        if (cancelled) return;
        setTotpRequired(Boolean(d.totp));
        setBlocked(typeof d.blocked === "string" ? d.blocked : null);
      })
      .catch(() => !cancelled && setTotpRequired(false));
    return () => {
      cancelled = true;
    };
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, code, remember }),
      });
      if (res.ok) {
        const next = params.get("next");
        router.replace(next && next.startsWith("/admin") ? next : "/admin");
        router.refresh();
        return;
      }
      const data = await res.json().catch(() => ({}));
      setError(
        data.error === "unsafe_config" && typeof data.message === "string"
          ? data.message
          : data.error === "locked"
            ? "로그인 시도가 너무 많습니다. 10분 후 다시 시도하세요."
            : totpRequired
              ? "비밀번호 또는 인증 코드가 올바르지 않습니다."
              : "비밀번호가 올바르지 않습니다.",
      );
    } catch {
      setError("서버에 연결할 수 없습니다.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="mx-auto mt-10 w-full max-w-sm rounded-xl border border-border bg-card p-6 shadow-panel sm:mt-20 sm:p-8">
      <span className="grid size-10 place-items-center rounded-lg bg-surface text-foreground">
        <LockIcon />
      </span>
      <h1 className="mt-5 text-xl font-semibold tracking-tight">관리자 로그인</h1>
      <p className="mt-1.5 text-sm text-muted">{totpRequired ? "비밀번호와 인증 앱의 6자리 코드를 입력하세요." : "관리자 비밀번호를 입력하세요."}</p>
      <div className="mt-6 space-y-4">
        <label className="block">
          <span className="label">비밀번호</span>
          <input
            className="input"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            required
          />
        </label>
        {totpRequired ? (
          <label className="block">
            <span className="label">인증 코드 (OTP)</span>
            <input
              className="input font-mono tracking-[0.3em]"
              inputMode="numeric"
              autoComplete="one-time-code"
              pattern="[0-9]{6}"
              maxLength={6}
              placeholder="000000"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
              required
            />
          </label>
        ) : null}
        <label className="flex min-h-11 cursor-pointer items-center gap-2.5 text-sm text-foreground">
          <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
          이 기기에서 30일 동안 로그인 유지
        </label>
        {blocked && !error ? (
          <p role="alert" className="rounded-lg border border-red-200 bg-danger-soft px-3 py-2.5 text-sm text-danger">
            {blocked}
          </p>
        ) : null}
        {error ? (
          <p role="alert" className="rounded-lg border border-red-200 bg-danger-soft px-3 py-2.5 text-sm text-danger">
            {error}
          </p>
        ) : null}
        <button type="submit" className="btn btn-primary w-full" disabled={busy || totpRequired === null || blocked !== null}>
          {busy ? "확인 중…" : "로그인"}
        </button>
      </div>
    </form>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
