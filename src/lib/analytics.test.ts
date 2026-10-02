import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { pageContextFromReferer, parseFunnelBody } from "./analytics";

const HOST = "qr.example.com";

describe("pageContextFromReferer", () => {
  it("reads locale and unprefixed page from a same-origin referer", () => {
    assert.deepEqual(pageContextFromReferer("https://qr.example.com/ko/wifi-qr-code?x=1#y", HOST), { locale: "ko", page: "/wifi-qr-code" });
    assert.deepEqual(pageContextFromReferer("https://qr.example.com/es", HOST), { locale: "es", page: "/" });
    assert.deepEqual(pageContextFromReferer("https://qr.example.com/", HOST), { locale: "en", page: "/" });
    assert.deepEqual(pageContextFromReferer("https://qr.example.com/batch", HOST), { locale: "en", page: "/batch" });
  });
  it("keeps the port in the host comparison", () => {
    assert.deepEqual(pageContextFromReferer("http://localhost:3000/ja/batch", "localhost:3000"), { locale: "ja", page: "/batch" });
    assert.deepEqual(pageContextFromReferer("http://localhost:3300/ja/batch", "localhost:3000"), { locale: null, page: null });
  });
  it("ignores foreign, missing or malformed referers", () => {
    const none = { locale: null, page: null };
    assert.deepEqual(pageContextFromReferer("https://evil.example/ko/", HOST), none);
    assert.deepEqual(pageContextFromReferer(null, HOST), none);
    assert.deepEqual(pageContextFromReferer("https://qr.example.com/", null), none);
    assert.deepEqual(pageContextFromReferer("not a url", HOST), none);
  });
  it("caps the page length at 200", () => {
    const long = `/${"a".repeat(500)}`;
    assert.equal(pageContextFromReferer(`https://qr.example.com${long}`, HOST).page?.length, 200);
  });
});

describe("parseFunnelBody", () => {
  it("accepts select and preview with a known type and locale", () => {
    assert.deepEqual(parseFunnelBody({ step: "select", type: "wifi", locale: "ko" }), { step: "select", type: "wifi", locale: "ko" });
    assert.deepEqual(parseFunnelBody({ step: "preview", type: "url", locale: "en", extra: 1 }), { step: "preview", type: "url", locale: "en" });
  });
  it("rejects save (server-only), unknown values and non-objects", () => {
    assert.equal(parseFunnelBody({ step: "save", type: "url", locale: "en" }), null);
    assert.equal(parseFunnelBody({ step: "select", type: "nope", locale: "en" }), null);
    assert.equal(parseFunnelBody({ step: "select", type: "url", locale: "xx" }), null);
    assert.equal(parseFunnelBody(null), null);
    assert.equal(parseFunnelBody("select"), null);
  });
});
