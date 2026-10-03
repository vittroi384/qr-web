import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { splitUrl, summarizeLog, topFacets, visitorLanguage } from "./summarize";

describe("summarizeLog", () => {
  it("url: host + path, www stripped, domain facet", () => {
    const s = summarizeLog("url", JSON.stringify({ url: "https://www.Example.com/menu/summer/" }));
    assert.equal(s.primary, "example.com");
    assert.equal(s.secondary, "/menu/summer");
    assert.equal(s.domain, "example.com");
  });

  it("url without scheme still parses", () => {
    assert.equal(summarizeLog("url", JSON.stringify({ url: "example.com" })).primary, "example.com");
    assert.equal(splitUrl("not a url at all")?.host, undefined);
  });

  it("social: handle + platform label", () => {
    const s = summarizeLog("social", JSON.stringify({ platform: "instagram", handle: "brand" }));
    assert.equal(s.primary, "@brand");
    assert.equal(s.platform, "Instagram");
  });

  it("wifi: SSID and encryption, never the password", () => {
    const s = summarizeLog("wifi", JSON.stringify({ ssid: "Cafe-Guest", password: "****", encryption: "WPA" }));
    assert.equal(s.primary, "Cafe-Guest");
    assert.equal(s.secondary, "WPA");
    assert.ok(!JSON.stringify(s).includes("****"));
  });

  it("phone-like types mask the middle digits", () => {
    const s = summarizeLog("whatsapp", JSON.stringify({ phone: "+82 10-1234-5678", message: "hi" }));
    assert.equal(s.primary, "+82 ···5678");
    assert.equal(summarizeLog("phone", JSON.stringify({ phone: "12345" })).primary, "···");
    assert.ok(!s.primary.includes("1234"));
  });

  it("vcard: name then org", () => {
    const s = summarizeLog("vcard", JSON.stringify({ firstName: "Gildong", lastName: "Hong", org: "ACME", title: "CEO" }));
    assert.equal(s.primary, "Gildong Hong");
    assert.equal(s.secondary, "ACME · CEO");
  });

  it("payment / crypto: handle with provider, shortened address", () => {
    assert.equal(summarizeLog("payment", JSON.stringify({ provider: "paypal", handle: "shop", amount: "12.50" })).secondary, "PayPal.Me · 금액 12.50");
    const c = summarizeLog("crypto", JSON.stringify({ coin: "bitcoin", address: "bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq", amount: "" }));
    assert.equal(c.primary, "bc1qar0s…5mdq");
    assert.equal(c.platform, "Bitcoin (BTC)");
  });

  it("tolerates broken JSON", () => {
    assert.equal(summarizeLog("url", "{not json").primary, "(빈 값)");
  });
});

describe("visitorLanguage", () => {
  it("maps the first Accept-Language tag to a Korean name", () => {
    assert.equal(visitorLanguage("pt-BR,pt;q=0.9,en;q=0.8"), "포르투갈어 (브라질)");
    assert.equal(visitorLanguage("en"), "영어");
    assert.equal(visitorLanguage(""), "(알 수 없음)");
    assert.equal(visitorLanguage(null), "(알 수 없음)");
  });
});

describe("topFacets", () => {
  it("counts and sorts, skipping undefined keys", () => {
    const rows = [{ k: "a" }, { k: "b" }, { k: "a" }, { k: undefined }];
    assert.deepEqual(topFacets(rows, (r) => r.k, 5), [
      { key: "a", count: 2 },
      { key: "b", count: 1 },
    ]);
  });
});

describe("summarizeLog edge cases", () => {
  it("batch payloads: count + first domain", () => {
    const s = summarizeLog("url", JSON.stringify({ count: 12, mode: "url", sample: "https://a.com/x | https://b.com" }));
    assert.equal(s.primary, "일괄 12개");
    assert.equal(s.domain, "a.com");
  });
  it("bare social handles are not domains; pasted links are", () => {
    assert.equal(summarizeLog("social", JSON.stringify({ platform: "youtube", handle: "@channel" })).domain, undefined);
    assert.equal(summarizeLog("social", JSON.stringify({ platform: "instagram", handle: "https://instagram.com/brand" })).domain, "instagram.com");
  });
});

describe("summarizeLog: pix / upi / epc", () => {
  it("shows the payee name, the stored (masked) identifier and the amount", () => {
    const pix = summarizeLog("pix", JSON.stringify({ key: "12****09", name: "Maria Silva", city: "Sao Paulo", amount: "25.00" }));
    assert.equal(pix.primary, "Maria Silva");
    assert.equal(pix.secondary, "12****09 · 금액 R$25.00");
    assert.equal(pix.platform, "Pix");
    const upi = summarizeLog("upi", JSON.stringify({ vpa: "sh****is", name: "Shop", amount: "" }));
    assert.equal(upi.secondary, "sh****is");
    assert.equal(upi.platform, "UPI");
    const epc = summarizeLog("epc", JSON.stringify({ iban: "DE****00", name: "", amount: "49.90" }));
    assert.equal(epc.primary, "DE****00");
    assert.equal(epc.secondary, "금액 €49.90");
    assert.equal(epc.platform, "EPC / GiroCode");
  });
});
