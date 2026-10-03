import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { hardenSecretsForStorage, maskWifiPasswords, sanitizeOptionsForStorage } from "./sanitize";

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
