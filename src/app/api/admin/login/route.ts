import { NextResponse, type NextRequest } from "next/server";
import { GATE_COOKIE, gateSatisfied, ipAllowedForAdmin } from "@/lib/adminAccess";
import { writeAudit } from "@/lib/audit";
import {
  LOCK_WINDOW_SEC,
  SESSION_COOKIE,
  beginLoginAttempt,
  createSessionToken,
  endLoginAttempt,
  productionLoginBlocker,
  sessionCookieOptions,
  verifyPassword,
} from "@/lib/auth";
import { getRequestMeta, ipLimitKey, isSameOrigin } from "@/lib/ip";
import { logEvent } from "@/lib/log";
import { verifyTotp } from "@/lib/totp";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 2 * 1024;
const FAILURE_DELAY_MS = 400;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function POST(req: NextRequest) {
  const meta = getRequestMeta(req);

  // Same visibility rules as the pages: no gate cookie / disallowed IP → the endpoint "does not exist".
  if (!ipAllowedForAdmin(meta.ip)) return new NextResponse(null, { status: 404 });
  if (!(await gateSatisfied(req.cookies.get(GATE_COOKIE)?.value))) return new NextResponse(null, { status: 404 });
  if (!isSameOrigin(req)) return NextResponse.json({ ok: false, error: "bad_origin" }, { status: 403 });

  // Unsafe production configuration: refuse every login until .env is fixed.
  const blocker = productionLoginBlocker();
  if (blocker) {
    logEvent("error", "admin.login_refused_unsafe_config", { ip: meta.ip, reason: blocker });
    return NextResponse.json({ ok: false, error: "unsafe_config", message: blocker }, { status: 503 });
  }

  // Charge the attempt before any await so concurrent requests cannot all pass the lockout check.
  const limitKey = ipLimitKey(meta.ip);
  if (!beginLoginAttempt(limitKey)) {
    logEvent("warn", "admin.login_locked", { ip: meta.ip });
    return NextResponse.json(
      { ok: false, error: "locked" },
      { status: 429, headers: { "Retry-After": String(LOCK_WINDOW_SEC) } },
    );
  }

  const declared = Number.parseInt(req.headers.get("content-length") ?? "", 10);
  const raw = Number.isFinite(declared) && declared > MAX_BODY_BYTES ? "" : await req.text();
  let password = "";
  let code = "";
  if (raw && Buffer.byteLength(raw) <= MAX_BODY_BYTES) {
    try {
      const body = JSON.parse(raw);
      password = typeof body?.password === "string" ? body.password : "";
      code = typeof body?.code === "string" ? body.code : "";
    } catch {
      // fall through with empty credentials
    }
  }

  const totpSecret = process.env.ADMIN_TOTP_SECRET?.trim();
  const passwordOk = Boolean(password) && verifyPassword(password);
  // Without a secret TOTP is skipped — development only; productionLoginBlocker() refuses this in production.
  const totpOk = totpSecret ? verifyTotp(totpSecret, code) : true;

  if (!passwordOk || !totpOk) {
    endLoginAttempt(limitKey, false);
    await writeAudit({ action: "login_failed", key: !passwordOk ? "password" : "totp", ip: meta.ip, userAgent: meta.userAgent });
    logEvent("warn", "admin.login_failed", { ip: meta.ip, reason: !passwordOk ? "password" : "totp" });
    await sleep(FAILURE_DELAY_MS);
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 401 });
  }

  endLoginAttempt(limitKey, true);
  await writeAudit({ action: "login", ip: meta.ip, userAgent: meta.userAgent });
  logEvent("info", "admin.login", { ip: meta.ip });
  const token = await createSessionToken(meta.userAgent);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, token, sessionCookieOptions);
  res.headers.set("Cache-Control", "no-store");
  return res;
}

/** Tells the login form whether a one-time code field is required, and why login is refused (if it is). */
export async function GET(req: NextRequest) {
  const meta = getRequestMeta(req);
  if (!ipAllowedForAdmin(meta.ip)) return new NextResponse(null, { status: 404 });
  if (!(await gateSatisfied(req.cookies.get(GATE_COOKIE)?.value))) return new NextResponse(null, { status: 404 });
  return NextResponse.json(
    { totp: Boolean(process.env.ADMIN_TOTP_SECRET?.trim()), blocked: productionLoginBlocker() },
    { headers: { "Cache-Control": "no-store" } },
  );
}
