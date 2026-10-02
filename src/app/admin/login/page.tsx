"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { LockIcon } from "@/components/icons";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        const next = params.get("next");
        router.replace(next && next.startsWith("/admin") ? next : "/admin");
        router.refresh();
        return;
      }
      const data = await res.json().catch(() => ({}));
      setError(data.error === "locked" ? "로그인 시도가 너무 많습니다. 10분 후 다시 시도하세요." : "비밀번호가 올바르지 않습니다.");
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
      <p className="mt-1.5 text-sm text-muted">관리자 비밀번호를 입력하세요.</p>
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
      {error ? (
        <p role="alert" className="rounded-lg border border-red-200 bg-danger-soft px-3 py-2.5 text-sm text-danger">
          {error}
        </p>
      ) : null}
      <button type="submit" className="btn btn-primary w-full" disabled={busy}>
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
