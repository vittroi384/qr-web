import assert from "node:assert/strict";
import { beforeEach, describe, it } from "node:test";
import { beginLoginAttempt, endLoginAttempt, productionLoginBlocker, resetLoginAttempts } from "./auth";

describe("login attempt accounting", () => {
  beforeEach(() => resetLoginAttempts());

  it("allows five attempts, locks the sixth", () => {
    for (let i = 0; i < 5; i++) assert.equal(beginLoginAttempt("k"), true, `attempt ${i + 1}`);
    assert.equal(beginLoginAttempt("k"), false);
  });

  it("charges the attempt up front, so a concurrent burst cannot all pass", () => {
    // Ten requests arrive before any of them has read its body or recorded a failure.
    const admitted = Array.from({ length: 10 }, () => beginLoginAttempt("burst")).filter(Boolean).length;
    assert.equal(admitted, 5);
  });

  it("a success refunds the key; a failure keeps the charge", () => {
    beginLoginAttempt("k");
    beginLoginAttempt("k");
    endLoginAttempt("k", false);
    for (let i = 0; i < 3; i++) beginLoginAttempt("k");
    assert.equal(beginLoginAttempt("k"), false);
    endLoginAttempt("k", true);
    assert.equal(beginLoginAttempt("k"), true);
  });

  it("expires after the lock window and keeps keys separate", () => {
    const t0 = 1_000_000;
    for (let i = 0; i < 6; i++) beginLoginAttempt("a", t0);
    assert.equal(beginLoginAttempt("a", t0 + 60_000), false);
    assert.equal(beginLoginAttempt("b", t0 + 60_000), true);
    assert.equal(beginLoginAttempt("a", t0 + 10 * 60_000 + 1), true);
  });
});

describe("productionLoginBlocker", () => {
  const good: NodeJS.ProcessEnv = {
    NODE_ENV: "production",
    APP_ENV: "production",
    ADMIN_TOTP_SECRET: "VKXVD3U53NZMM6FDZP5G6RINLZG6DDMQ",
    ADMIN_PASSWORD: "a-long-and-unique-password",
  };

  it("is silent outside a deployed image (dev, CI, local E2E production build)", () => {
    assert.equal(productionLoginBlocker({ NODE_ENV: "development", ADMIN_PASSWORD: "admin1234" }), null);
    assert.equal(productionLoginBlocker({ NODE_ENV: "production", ADMIN_PASSWORD: "admin1234" }), null);
    assert.equal(productionLoginBlocker({ NODE_ENV: "test" }), null);
  });
  it("accepts a complete production configuration", () => {
    assert.equal(productionLoginBlocker(good), null);
  });
  it("refuses a missing TOTP secret", () => {
    assert.match(productionLoginBlocker({ ...good, ADMIN_TOTP_SECRET: "  " }) ?? "", /TOTP/);
  });
  it("refuses short or example passwords", () => {
    assert.match(productionLoginBlocker({ ...good, ADMIN_PASSWORD: "short" }) ?? "", /10자 미만/);
    assert.match(productionLoginBlocker({ ...good, ADMIN_PASSWORD: "change-me-to-a-long-password" }) ?? "", /예시 값/);
    assert.match(productionLoginBlocker({ ...good, ADMIN_PASSWORD: undefined }) ?? "", /10자 미만/);
  });
});

describe("remembered sessions", () => {
  it("marks a 30-day session and reports renewal only after a day", async () => {
    process.env.SESSION_SECRET ??= "test-secret-test-secret-test-secret-1234";
    const { createSessionToken, sessionRenewalDue, REMEMBER_TTL_SEC, verifySessionToken } = await import("./auth");
    const daily = await createSessionToken("UA");
    const remembered = await createSessionToken("UA", REMEMBER_TTL_SEC);
    assert.equal(await verifySessionToken(remembered, "UA"), true);
    assert.equal(await sessionRenewalDue(daily), false, "daily sessions never slide");
    assert.equal(await sessionRenewalDue(remembered), false, "fresh remembered session is not due yet");
    assert.equal(await sessionRenewalDue("garbage"), false);
  });
});
