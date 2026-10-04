import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { preferredLocale } from "./locales";

describe("preferredLocale", () => {
  it("picks the highest-weighted supported language", () => {
    assert.equal(preferredLocale("ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7"), "ko");
    assert.equal(preferredLocale("en-US,en;q=0.9,ko;q=0.8"), "en");
    assert.equal(preferredLocale("fr;q=0.5,de;q=0.9"), "de");
  });

  it("maps region tags to their language", () => {
    assert.equal(preferredLocale("pt-BR"), "pt");
    assert.equal(preferredLocale("es-419,es;q=0.9"), "es");
  });

  it("skips unsupported languages and falls back to English", () => {
    assert.equal(preferredLocale("zh-CN,zh;q=0.9,ja;q=0.8"), "ja");
    assert.equal(preferredLocale("zh-CN,ru;q=0.9"), "en");
    assert.equal(preferredLocale(""), "en");
    assert.equal(preferredLocale(null), "en");
    assert.equal(preferredLocale("*"), "en");
  });

  it("ignores malformed weights", () => {
    assert.equal(preferredLocale("ko;q=abc,en;q=0.5"), "en");
    assert.equal(preferredLocale("ko;q=0,en;q=0.5"), "en");
  });
});
