import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { checkRow, rowsFromPaste } from "./parse";

describe("checkRow", () => {
  it("classifies host:port rows as links, like the single generator", () => {
    assert.deepEqual(checkRow({ name: "", content: "example.com:8080/menu" }), { state: "ok", kind: "url", encoded: "https://example.com:8080/menu" });
    assert.deepEqual(checkRow({ name: "", content: "localhost:3000" }), { state: "ok", kind: "url", encoded: "https://localhost:3000" });
  });
  it("keeps text that merely contains a colon as text", () => {
    assert.deepEqual(checkRow({ name: "", content: "Note: 1234" }), { state: "ok", kind: "text", encoded: "Note: 1234" });
    assert.deepEqual(checkRow({ name: "", content: "Ref:1234" }), { state: "ok", kind: "text", encoded: "Ref:1234" });
  });
  it("refuses script schemes", () => {
    assert.deepEqual(checkRow({ name: "", content: "javascript:alert(1)" }), { state: "invalid", error: "scheme" });
  });
});

describe("rowsFromPaste", () => {
  it("recognises a host:port link in the first column and swaps it into the content cell", () => {
    assert.deepEqual(rowsFromPaste("example.com:8080/menu\tMenu"), [{ name: "Menu", content: "example.com:8080/menu" }]);
  });
});
