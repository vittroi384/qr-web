import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { encodeCrypto, encodePayload, encodePayment, encodeWhatsApp } from "./encoders";

describe("encodeWhatsApp", () => {
  it("builds a wa.me link with digits only and an encoded message", () => {
    assert.equal(
      encodeWhatsApp({ phone: "+82 10-1234-5678", message: "Hi there & welcome" }),
      "https://wa.me/821012345678?text=Hi%20there%20%26%20welcome",
    );
  });
  it("omits text when the message is empty and rejects short numbers", () => {
    assert.equal(encodeWhatsApp({ phone: "14155552671", message: "  " }), "https://wa.me/14155552671");
    assert.equal(encodeWhatsApp({ phone: "123", message: "x" }), "");
  });
});

describe("encodeCrypto", () => {
  it("builds a BIP-21 URI with amount and label", () => {
    assert.equal(
      encodeCrypto({ coin: "bitcoin", address: "bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq", amount: "0.015", label: "Coffee shop" }),
      "bitcoin:bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq?amount=0.015&label=Coffee%20shop",
    );
  });
  it("ignores amount for coins without amount support and rejects bad addresses", () => {
    assert.equal(
      encodeCrypto({ coin: "ethereum", address: "0x52908400098527886E0F7030069857D2E4169EE7", amount: "1", label: "" }),
      "ethereum:0x52908400098527886E0F7030069857D2E4169EE7",
    );
    assert.equal(encodeCrypto({ coin: "bitcoin", address: "bc1q?amount=9", amount: "", label: "" }), "");
    assert.equal(encodeCrypto({ coin: "bitcoin", address: "short", amount: "", label: "" }), "");
  });
});

describe("file type", () => {
  it("is a plain link", () => {
    assert.equal(encodePayload("file", { url: "drive.google.com/file/d/abc/view" }), "https://drive.google.com/file/d/abc/view");
  });
});

describe("encodePayment", () => {
  it("builds provider links with and without amount", () => {
    assert.equal(encodePayment({ provider: "paypal", handle: "@shop", amount: "" }), "https://paypal.me/shop");
    assert.equal(encodePayment({ provider: "paypal", handle: "shop", amount: "12.50" }), "https://paypal.me/shop/12.50");
    assert.equal(encodePayment({ provider: "cashapp", handle: "$jane", amount: "5" }), "https://cash.app/$jane/5");
    assert.equal(encodePayment({ provider: "kofi", handle: "jane", amount: "5" }), "https://ko-fi.com/jane");
  });
  it("ignores malformed amounts and rejects unknown providers", () => {
    assert.equal(encodePayment({ provider: "venmo", handle: "jane", amount: "1.234" }), "https://venmo.com/u/jane");
    assert.equal(encodePayment({ provider: "nope", handle: "jane", amount: "" }), "");
  });
});
