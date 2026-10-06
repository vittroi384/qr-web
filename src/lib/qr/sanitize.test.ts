import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { clipBody, hardenSecretsForStorage, maskEmail, maskIdentifier, maskPaymentIdentifiers, maskPhoneNumber, maskWifiPasswords, previewForStorage, sanitizeOptionsForStorage, sanitizePayloadForStorage } from "./sanitize";

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

describe("sanitizePayloadForStorage: key whitelist and size budget", () => {
  it("keeps only the fields the QR type has — a flooding client cannot store arbitrary keys", () => {
    const out = sanitizePayloadForStorage("url", { url: "https://x.com", junk1: "a".repeat(100), password: "p", __proto__x: 1 }, { maskWifiPassword: true });
    assert.deepEqual(out, { url: "https://x.com" });
  });
  it("accepts the batch summary fields only for a batch event", () => {
    const batch = { count: 3, mode: "mixed", sample: "https://a.com | https://b.com" };
    assert.deepEqual(sanitizePayloadForStorage("url", batch, { maskWifiPassword: true, event: "batch" }), batch);
    assert.deepEqual(sanitizePayloadForStorage("url", batch, { maskWifiPassword: true, event: "download_png" }), {});
  });
  it("caps the whole payload at 3000 characters, spent in field order", () => {
    const big = "x".repeat(5000);
    const out = sanitizePayloadForStorage("vcard", { firstName: "a".repeat(2500), lastName: big, note: big }, { maskWifiPassword: true });
    assert.equal((out.firstName as string).length, 2500);
    assert.equal((out.lastName as string).length, 500);
    assert.equal(out.note, "");
    // A single-field type keeps everything a QR can hold.
    assert.equal((sanitizePayloadForStorage("text", { text: "t".repeat(2953) }, { maskWifiPassword: true }).text as string).length, 2953);
    const total = Object.values(out).reduce<number>((n, v) => n + (typeof v === "string" ? v.length : 0), 0);
    assert.equal(total, 3000);
  });
});

describe("sanitizeOptionsForStorage", () => {
  it("keeps the frame preset and colour but only the length of the label text", () => {
    const out = sanitizeOptionsForStorage({ size: 512, frame: "custom", frameColor: "#881337", frameText: "우리 가게 Wi-Fi", logoDataUrl: "data:..." });
    assert.deepEqual(out, { size: 512, frame: "custom", frameColor: "#881337", frameTextLength: 11, hasLogo: true });
    assert.equal(sanitizeOptionsForStorage({ frameText: 42 }).frameTextLength, 0);
  });
  it("drops unknown option keys but keeps the browser-reported label length", () => {
    const out = sanitizeOptionsForStorage({ size: 512, frameTextLength: 7, logoDataUrl: "1", anything: "x".repeat(60), more: 1 });
    assert.deepEqual(out, { size: 512, frameTextLength: 7, hasLogo: true });
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

describe("hardenSecretsForStorage: personal data policy (2026-10-06)", () => {
  it("keeps only the ends of phone numbers and e-mail addresses", () => {
    assert.equal(maskPhoneNumber("010-1234-5678"), "010-****-5678");
    assert.equal(maskPhoneNumber("+82 10 1234 5678"), "+82 1* **** 5678"); // 국가번호 포함 앞 3자리·뒤 4자리
    assert.equal(maskPhoneNumber("1234"), "****"); // too short → whole mask
    assert.equal(maskEmail("jooky@gmail.com"), "jo****@gmail.com");
    assert.equal(maskEmail("a@b.co"), "a****@b.co");
    assert.deepEqual(hardenSecretsForStorage("sms", { phone: "01012345678", message: "hi" }), { phone: "010****5678", message: "hi" });
    assert.equal(hardenSecretsForStorage("vcard", { firstName: "길동", email: "hong@example.com", mobile: "010-9999-8888" }).email, "ho****@example.com");
  });
  it("clips free-text bodies to 40 characters with the original length", () => {
    const long = "가".repeat(100);
    assert.equal(clipBody("짧은 메모"), "짧은 메모");
    assert.equal(clipBody(long), `${"가".repeat(40)}… (100자)`);
    assert.equal(hardenSecretsForStorage("email", { to: "x@y.z", subject: "s", body: long }).body, `${"가".repeat(40)}… (100자)`);
    assert.equal(hardenSecretsForStorage("text", { text: long }).text, `${"가".repeat(40)}… (100자)`);
  });
  it("rounds coordinates to ~1 km and shortens wallet addresses", () => {
    assert.deepEqual(hardenSecretsForStorage("geo", { lat: "37.566535", lng: "126.9779692" }), { lat: "37.57", lng: "126.98" });
    assert.equal(hardenSecretsForStorage("crypto", { coin: "bitcoin", address: "bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq", amount: "" }).address, "bc1q****5mdq");
  });
  it("leaves URL-like types alone so the admin can still see domains and platforms", () => {
    assert.deepEqual(hardenSecretsForStorage("url", { url: "https://example.com/menu" }), { url: "https://example.com/menu" });
    assert.deepEqual(hardenSecretsForStorage("social", { platform: "instagram", handle: "mycafe" }), { platform: "instagram", handle: "mycafe" });
  });
  it("drops the encoded preview for types whose encoding repeats the masked fields", () => {
    assert.equal(previewForStorage("sms", "download_png", "SMSTO:01012345678:hi"), null);
    assert.equal(previewForStorage("vcard", "copy", "BEGIN:VCARD…"), null);
    assert.equal(previewForStorage("url", "download_png", "https://example.com"), "https://example.com");
    assert.equal(previewForStorage("wifi", "download_png", "WIFI:T:WPA;S:Cafe;P:hunter2;;"), "WIFI:T:WPA;S:Cafe;P:****;;");
    assert.equal(previewForStorage("text", "batch", "a | b"), "a | b");
    assert.equal(previewForStorage("url", "download_png", ""), null);
  });
});
