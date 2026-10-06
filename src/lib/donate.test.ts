import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { donateUrlFor } from "./donate";

describe("donateUrlFor", () => {
  const both = { donate_url: "https://ko-fi.com/x", donate_url_ko: "https://toss.me/x" };
  it("prefers the Korean link on Korean pages and the global link elsewhere", () => {
    assert.equal(donateUrlFor(both, "ko"), "https://toss.me/x");
    assert.equal(donateUrlFor(both, "en"), "https://ko-fi.com/x");
    assert.equal(donateUrlFor(both, "ja"), "https://ko-fi.com/x");
  });
  it("falls back to the global link when the Korean one is empty, and hides when both are empty", () => {
    assert.equal(donateUrlFor({ donate_url: "https://ko-fi.com/x", donate_url_ko: "" }, "ko"), "https://ko-fi.com/x");
    assert.equal(donateUrlFor({ donate_url: "", donate_url_ko: "" }, "ko"), "");
  });
});
