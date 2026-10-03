import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { encodePayload } from "./encoders";
import { DEFAULT_PAYLOADS } from "./types";
import { TEXT_MAX, validatePayload } from "./validate";

describe("validatePayload: url / file", () => {
  it("accepts allowed schemes and bare hosts", () => {
    assert.equal(validatePayload("url", { url: "example.com" }), null);
    assert.equal(validatePayload("url", { url: "https://example.com" }), null);
    assert.equal(validatePayload("url", { url: "mailto:a@b.c" }), null);
    assert.equal(validatePayload("file", { url: "https://drive.google.com/x" }), null);
  });
  it("names the blocked scheme the encoder refuses", () => {
    assert.deepEqual(validatePayload("url", { url: "javascript:alert(1)" }), { field: "url", reason: "urlScheme" });
    assert.deepEqual(validatePayload("file", { url: "data:text/html,hi" }), { field: "url", reason: "urlScheme" });
    assert.equal(encodePayload("url", { url: "javascript:alert(1)" }), "");
  });
  it("empty is not an issue", () => {
    assert.equal(validatePayload("url", { url: "   " }), null);
  });
  it("flags a vCard website with a blocked scheme", () => {
    assert.deepEqual(validatePayload("vcard", { ...DEFAULT_PAYLOADS.vcard, firstName: "A", website: "javascript:x" }), {
      field: "website",
      reason: "urlScheme",
    });
    assert.equal(validatePayload("vcard", { ...DEFAULT_PAYLOADS.vcard, firstName: "A", website: "x.kr" }), null);
  });
});

describe("validatePayload: geo", () => {
  it("accepts coordinates in range", () => {
    assert.equal(validatePayload("geo", { lat: "37.5665", lng: "126.9780" }), null);
    assert.equal(validatePayload("geo", { lat: "-90", lng: "180" }), null);
  });
  it("reports non-numeric and out-of-range values per field", () => {
    assert.deepEqual(validatePayload("geo", { lat: "abc", lng: "1" }), { field: "lat", reason: "coordNumber" });
    assert.deepEqual(validatePayload("geo", { lat: "95", lng: "1" }), { field: "lat", reason: "latRange" });
    assert.deepEqual(validatePayload("geo", { lat: "1", lng: "200" }), { field: "lng", reason: "lngRange" });
    assert.deepEqual(validatePayload("geo", { lat: "1", lng: "12abc" }), { field: "lng", reason: "coordNumber" });
  });
  it("ignores fields that are still empty", () => {
    assert.equal(validatePayload("geo", { lat: "", lng: "" }), null);
    assert.equal(validatePayload("geo", { lat: "10", lng: "" }), null);
  });
});

describe("validatePayload: phone / sms / whatsapp", () => {
  it("allows digits, +, spaces, dashes and parentheses", () => {
    assert.equal(validatePayload("phone", { phone: "+82 (10) 1234-5678" }), null);
    assert.equal(validatePayload("sms", { phone: "010-1234-5678", message: "" }), null);
  });
  it("rejects letters and numbers without digits", () => {
    assert.deepEqual(validatePayload("phone", { phone: "hello" }), { field: "phone", reason: "phoneChars" });
    assert.deepEqual(validatePayload("sms", { phone: "call me", message: "" }), { field: "phone", reason: "phoneChars" });
    assert.deepEqual(validatePayload("phone", { phone: "+ -" }), { field: "phone", reason: "phoneNoDigits" });
  });
  it("whatsapp: too many digits is an issue, too few (still typing) is not", () => {
    assert.deepEqual(validatePayload("whatsapp", { phone: "1234567890123456", message: "" }), { field: "phone", reason: "phoneTooLong" });
    assert.equal(validatePayload("whatsapp", { phone: "+82 1", message: "" }), null);
    assert.deepEqual(validatePayload("whatsapp", { phone: "hello", message: "" }), { field: "phone", reason: "phoneChars" });
  });
});

describe("validatePayload: payment", () => {
  it("accepts up to two decimals and an empty amount", () => {
    assert.equal(validatePayload("payment", { provider: "paypal", handle: "me", amount: "12.34" }), null);
    assert.equal(validatePayload("payment", { provider: "paypal", handle: "me", amount: "" }), null);
  });
  it("flags three decimals, text and zero", () => {
    assert.deepEqual(validatePayload("payment", { provider: "paypal", handle: "me", amount: "12.345" }), { field: "amount", reason: "paymentAmount" });
    assert.deepEqual(validatePayload("payment", { provider: "venmo", handle: "me", amount: "ten" }), { field: "amount", reason: "paymentAmount" });
    assert.deepEqual(validatePayload("payment", { provider: "cashapp", handle: "me", amount: "0" }), { field: "amount", reason: "paymentAmount" });
  });
  it("ignores the amount for providers whose link cannot carry one", () => {
    assert.equal(validatePayload("payment", { provider: "kofi", handle: "me", amount: "12.345" }), null);
  });
});

describe("validatePayload: crypto", () => {
  const addr = "bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq";
  it("accepts a plain address and a BIP-21 amount", () => {
    assert.equal(validatePayload("crypto", { coin: "bitcoin", address: addr, amount: "0.001", label: "" }), null);
  });
  it("flags malformed addresses and amounts", () => {
    assert.deepEqual(validatePayload("crypto", { coin: "bitcoin", address: "bc1q?x", amount: "", label: "" }), { field: "address", reason: "cryptoAddress" });
    assert.deepEqual(validatePayload("crypto", { coin: "bitcoin", address: addr, amount: "0.000000001", label: "" }), { field: "amount", reason: "cryptoAmount" });
    assert.deepEqual(validatePayload("crypto", { coin: "bitcoin", address: addr, amount: "0", label: "" }), { field: "amount", reason: "cryptoAmount" });
  });
  it("ignores the amount for coins without amount support", () => {
    assert.equal(validatePayload("crypto", { coin: "ethereum", address: "0x" + "a".repeat(40), amount: "abc", label: "" }), null);
  });
});

describe("validatePayload: text and untouched types", () => {
  it("flags text over the limit only", () => {
    assert.equal(validatePayload("text", { text: "a".repeat(TEXT_MAX) }), null);
    assert.deepEqual(validatePayload("text", { text: "a".repeat(TEXT_MAX + 1) }), { field: "text", reason: "textMax" });
  });
  it("has nothing to say about wifi, email and events", () => {
    assert.equal(validatePayload("wifi", { ...DEFAULT_PAYLOADS.wifi, ssid: "x" }), null);
    assert.equal(validatePayload("email", { to: "a@b.c", subject: "", body: "" }), null);
    assert.equal(validatePayload("event", { ...DEFAULT_PAYLOADS.event, title: "t", start: "2026-10-02T10:00" }), null);
  });
});
