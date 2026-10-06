import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { CSP_REPORT_PATH, buildCsp, makeNonce } from "./csp";

describe("buildCsp", () => {
  it("is nonce-based for scripts, reports to our endpoint, and never uses unsafe-inline for scripts", () => {
    const csp = buildCsp("abc123", { admin: false, dev: false });
    assert.match(csp, /script-src 'self' 'nonce-abc123' 'strict-dynamic'/);
    assert.ok(csp.includes(`report-uri ${CSP_REPORT_PATH}`));
    assert.ok(!/script-src[^;]*'unsafe-inline'/.test(csp));
    assert.ok(!csp.includes("'unsafe-eval'"));
    assert.ok(csp.includes("frame-ancestors 'self'"));
  });
  it("forbids framing the admin and allows eval only in development", () => {
    assert.ok(buildCsp("n", { admin: true, dev: false }).includes("frame-ancestors 'none'"));
    assert.ok(buildCsp("n", { admin: false, dev: true }).includes("'unsafe-eval'"));
  });
  it("mints a fresh base64 nonce each time", () => {
    const a = makeNonce(), b = makeNonce();
    assert.match(a, /^[A-Za-z0-9+/]+=*$/);
    assert.notEqual(a, b);
  });
});
