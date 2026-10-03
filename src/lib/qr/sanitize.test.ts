import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { hardenSecretsForStorage, maskIdentifier, maskPaymentIdentifiers, maskWifiPasswords, sanitizeOptionsForStorage } from "./sanitize";

describe("maskWifiPasswords", () => {
  it("masks a plain WIFI: string", () => {
    assert.equal(maskWifiPasswords("WIFI:T:WPA;S:Cafe;P:hunter2;;"), "WIFI:T:WPA;S:Cafe;P:****;;");
  });
  it("ignores leading whitespace and lower-case prefixes", () => {
    assert.equal(maskWifiPasswords("   WIFI:T:WPA;S:Cafe;P:hunter2;;"), "   WIFI:T:WPA;S:Cafe;P:****;;");
    assert.equal(maskWifiPasswords("wifi:T:WPA;S:Cafe;P:hunter2;;"), "wifi:T:WPA;S:Cafe;P:****;;");
  });
  it("masks a block in the middle of other text (batch sample)", () => {
    assert.equal(
      maskWifiPasswords("https://a.com | WIFI:T:WPA;S:Cafe;P:hunter2;; | hello"),
      "https://a.com | WIFI:T:WPA;S:Cafe;P:****;; | hello",
    );
  });
  it("masks every block when several follow each other", () => {
    assert.equal(
      maskWifiPasswords("WIFI:T:WPA;S:A;P:one;; | WIFI:T:WPA;S:B;P:two;H:true;;WIFI:T:WEP;S:C;P:three;;"),
      "WIFI:T:WPA;S:A;P:****;; | WIFI:T:WPA;S:B;P:****;H:true;;WIFI:T:WEP;S:C;P:****;;",
    );
  });
  it("treats escaped characters inside the password as part of it", () => {
    // Password 'p;a:s\x' as the encoder writes it: p\;a\:s\\x
    assert.equal(maskWifiPasswords("WIFI:T:WPA;S:My\\;Net;P:p\\;a\\:s\\\\x;H:true;;"), "WIFI:T:WPA;S:My\\;Net;P:****;H:true;;");
    // Password ending in an escaped ';' right before the terminator.
    assert.equal(maskWifiPasswords("WIFI:T:WPA;S:X;P:a\\;;;"), "WIFI:T:WPA;S:X;P:****;;");
  });
  it("masks an unterminated tail when the string was cut mid-password", () => {
    assert.equal(maskWifiPasswords("WIFI:T:WPA;S:Cafe;P:hunt"), "WIFI:T:WPA;S:Cafe;P:****;");
    assert.equal(maskWifiPasswords("note | WIFI:T:WPA;S:Cafe;P:hunter2"), "note | WIFI:T:WPA;S:Cafe;P:****;");
  });
  it("leaves strings without a WIFI: block untouched", () => {
    for (const s of ["https://example.com/?P:x;", "P:secret;", "Wi-Fi password: hunter2", "", "SMSTO:0101234:P:1;"]) {
      assert.equal(maskWifiPasswords(s), s);
    }
  });
  it("does not mistake an SSID that contains P: for the password field", () => {
    assert.equal(maskWifiPasswords("WIFI:T:WPA;S:ShoP:1;P:x;;"), "WIFI:T:WPA;S:ShoP:1;P:****;;");
  });
});

describe("hardenSecretsForStorage", () => {
  it("fixes the wifi password to a constant mask", () => {
    assert.deepEqual(hardenSecretsForStorage("wifi", { ssid: "Home", password: "*********" }), { ssid: "Home", password: "****" });
    assert.deepEqual(hardenSecretsForStorage("wifi", { ssid: "Open", password: "" }), { ssid: "Open", password: "" });
  });
  it("masks embedded WIFI: strings in every string field of every type", () => {
    const batch = hardenSecretsForStorage("url", {
      count: 3,
      mode: "mixed",
      sample: "https://a.com | WIFI:T:WPA;S:Cafe;P:hunter2;; | memo",
    });
    assert.deepEqual(batch, { count: 3, mode: "mixed", sample: "https://a.com | WIFI:T:WPA;S:Cafe;P:****;; | memo" });
    assert.deepEqual(hardenSecretsForStorage("text", { text: "  WIFI:T:WPA;S:Cafe;P:hunter2;;" }), { text: "  WIFI:T:WPA;S:Cafe;P:****;;" });
  });
  it("returns other payloads unchanged", () => {
    assert.deepEqual(hardenSecretsForStorage("url", { url: "https://x.com" }), { url: "https://x.com" });
  });
});

describe("sanitizeOptionsForStorage", () => {
  it("keeps the frame preset and colour but only the length of the label text", () => {
    const out = sanitizeOptionsForStorage({ size: 512, frame: "custom", frameColor: "#881337", frameText: "우리 가게 Wi-Fi", logoDataUrl: "data:..." });
    assert.deepEqual(out, { size: 512, frame: "custom", frameColor: "#881337", frameTextLength: 11, hasLogo: true });
    assert.equal(sanitizeOptionsForStorage({ frameText: 42 }).frameTextLength, 0);
  });
});

describe("maskIdentifier / maskPaymentIdentifiers", () => {
  it("keeps the first and last two characters", () => {
    assert.equal(maskIdentifier("DE89370400440532013000"), "DE****00");
    assert.equal(maskIdentifier("shop@okaxis"), "sh****is");
    assert.equal(maskIdentifier("abcdef"), "****");
    assert.equal(maskIdentifier(""), "");
  });
  it("masks the key inside a Pix BR Code", () => {
    const code = "00020126580014br.gov.bcb.pix0136123e4567-e12b-12d1-a456-4266554400005204000053039865802BR5913Fulano de Tal6008BRASILIA62070503***63041D3D";
    assert.equal(
      maskPaymentIdentifiers(code),
      "00020126580014br.gov.bcb.pix010812****005204000053039865802BR5913Fulano de Tal6008BRASILIA62070503***63041D3D",
    );
    assert.ok(!maskPaymentIdentifiers(`memo | ${code}`).includes("123e4567"));
  });
  it("masks the pa= value of a UPI link and the IBAN line of an EPC payload", () => {
    assert.equal(maskPaymentIdentifiers("upi://pay?pa=shop@okaxis&pn=Shop&cu=INR"), "upi://pay?pa=sh****is&pn=Shop&cu=INR");
    assert.equal(
      maskPaymentIdentifiers("BCD\n002\n1\nSCT\n\nFirma\nDE89370400440532013000\nEUR12.00"),
      "BCD\n002\n1\nSCT\n\nFirma\nDE****00\nEUR12.00",
    );
  });
  it("leaves other strings alone", () => {
    for (const s of ["https://example.com", "WIFI:T:WPA;S:Cafe;P:****;;", "pa=shop@okaxis", "BCD 002", ""]) {
      assert.equal(maskPaymentIdentifiers(s), s);
    }
  });
});

describe("hardenSecretsForStorage: payment identifiers", () => {
  it("partially masks the Pix key, UPI ID and IBAN fields", () => {
    assert.deepEqual(hardenSecretsForStorage("pix", { key: "12345678909", name: "Maria", amount: "10.00" }), { key: "12****09", name: "Maria", amount: "10.00" });
    assert.deepEqual(hardenSecretsForStorage("upi", { vpa: "shop@okaxis", name: "S" }), { vpa: "sh****is", name: "S" });
    assert.deepEqual(hardenSecretsForStorage("epc", { iban: "DE89370400440532013000", name: "F" }), { iban: "DE****00", name: "F" });
    assert.deepEqual(hardenSecretsForStorage("pix", { key: "", name: "" }), { key: "", name: "" });
  });
  it("masks identifiers embedded in any string field (batch samples)", () => {
    const out = hardenSecretsForStorage("url", { count: 2, mode: "mixed", sample: "upi://pay?pa=shop@okaxis&pn=S | https://a.com" });
    assert.equal(out.sample, "upi://pay?pa=sh****is&pn=S | https://a.com");
  });
});
