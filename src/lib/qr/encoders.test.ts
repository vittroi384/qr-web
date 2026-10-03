import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  crc16ccitt,
  encodeEmail,
  encodeEpc,
  encodeEvent,
  encodeGeo,
  encodePayload,
  encodePhone,
  encodePix,
  encodeSms,
  encodeUpi,
  encodeUrl,
  encodeVCard,
  encodeWifi,
  formatAmount,
  isValidIban,
  isValidPixKey,
  normalizePixKey,
} from "./encoders";
import { sanitizePayloadForStorage } from "./sanitize";

describe("encodeUrl", () => {
  it("adds https:// when no scheme", () => {
    assert.equal(encodeUrl("example.com/a b"), "https://example.com/a b");
  });
  it("keeps existing scheme", () => {
    assert.equal(encodeUrl("http://x.com"), "http://x.com");
    assert.equal(encodeUrl("mailto:a@b.c"), "mailto:a@b.c");
  });
  it("empty stays empty", () => {
    assert.equal(encodeUrl("   "), "");
  });
  it("treats host:port as an address, not an unknown scheme", () => {
    assert.equal(encodeUrl("example.com:8080/menu"), "https://example.com:8080/menu");
    assert.equal(encodeUrl("localhost:3000"), "https://localhost:3000");
    assert.equal(encodeUrl("shop.example.co.kr:8443/?x=1#top"), "https://shop.example.co.kr:8443/?x=1#top");
  });
  it("still refuses unknown and dangerous schemes", () => {
    assert.equal(encodeUrl("javascript:alert(1)"), "");
    assert.equal(encodeUrl("data:text/html,hi"), "");
    assert.equal(encodeUrl("Note:1234"), ""); // no dot in the host → not a host:port
    assert.equal(encodeUrl("example.com:12345678"), ""); // not a port
    assert.equal(encodeUrl("example.com:80 80"), "");
  });
});

describe("encodeWifi", () => {
  it("escapes structural characters", () => {
    assert.equal(
      encodeWifi({ ssid: "My;Net", password: 'p:a,s"s\\x', encryption: "WPA", hidden: true }),
      'WIFI:T:WPA;S:My\\;Net;P:p\\:a\\,s\\"s\\\\x;H:true;;',
    );
  });
  it("omits password for open networks", () => {
    assert.equal(encodeWifi({ ssid: "Cafe", password: "ignored", encryption: "nopass", hidden: false }), "WIFI:T:nopass;S:Cafe;;");
  });
});

describe("encodeVCard", () => {
  it("builds a vCard 3.0", () => {
    const v = encodeVCard({
      firstName: "길동",
      lastName: "홍",
      org: "A,B",
      title: "",
      phone: "",
      mobile: "010-1234-5678",
      email: "h@x.kr",
      website: "x.kr",
      address: "",
      note: "line1\nline2",
    });
    const lines = v.split("\r\n");
    assert.equal(lines[0], "BEGIN:VCARD");
    assert.ok(lines.includes("N:홍;길동;;;"));
    assert.ok(lines.includes("FN:홍 길동"));
    assert.ok(lines.includes("ORG:A\\,B"));
    assert.ok(lines.includes("TEL;TYPE=CELL:010-1234-5678"));
    assert.ok(lines.includes("URL:https://x.kr"));
    assert.ok(lines.includes("NOTE:line1\\nline2"));
    assert.equal(lines.at(-1), "END:VCARD");
  });
  it("puts the given name first for Latin names", () => {
    const v = encodeVCard({ firstName: "John", lastName: "Smith", org: "", title: "", phone: "", mobile: "", email: "", website: "", address: "", note: "" });
    assert.ok(v.includes("N:Smith;John;;;"));
    assert.ok(v.includes("FN:John Smith"));
  });
  it("keeps family name first when either part is CJK", () => {
    const v = encodeVCard({ firstName: "太郎", lastName: "山田", org: "", title: "", phone: "", mobile: "", email: "", website: "", address: "", note: "" });
    assert.ok(v.includes("FN:山田 太郎"));
    const w = encodeVCard({ firstName: "Mina", lastName: "김", org: "", title: "", phone: "", mobile: "", email: "", website: "", address: "", note: "" });
    assert.ok(w.includes("FN:김 Mina"));
  });
  it("never emits an empty FN: falls back to organisation, then phone, then e-mail", () => {
    const base = { firstName: "", lastName: "", title: "", website: "", address: "", note: "" };
    const org = encodeVCard({ ...base, org: "Acme", phone: "02-123-4567", mobile: "", email: "" });
    assert.ok(org.includes("FN:Acme"));
    const phone = encodeVCard({ ...base, org: "", phone: "", mobile: "010-1234-5678", email: "" });
    assert.ok(phone.includes("FN:010-1234-5678"));
    const email = encodeVCard({ ...base, org: "", phone: "", mobile: "", email: "a@b.c" });
    assert.ok(email.includes("FN:a@b.c"));
    assert.ok(!email.includes("FN:\r\n"));
  });
  it("requires at least a name or contact field", () => {
    assert.equal(
      encodeVCard({ firstName: "", lastName: "", org: "Org", title: "", phone: "", mobile: "", email: "", website: "", address: "", note: "" }),
      "",
    );
  });
});

describe("misc encoders", () => {
  it("email uses percent-encoding without plus signs", () => {
    assert.equal(encodeEmail({ to: "a@b.c", subject: "hi there", body: "x&y" }), "mailto:a@b.c?subject=hi%20there&body=x%26y");
  });
  it("sms/phone strip formatting", () => {
    assert.equal(encodeSms({ phone: "010-1234-5678", message: "hi" }), "SMSTO:01012345678:hi");
    assert.equal(encodePhone({ phone: "+82 (10) 1234-5678" }), "tel:+821012345678");
  });
  it("geo validates range", () => {
    assert.equal(encodeGeo({ lat: "37.5665", lng: "126.978" }), "geo:37.5665,126.978");
    assert.equal(encodeGeo({ lat: "95", lng: "0" }), "");
    assert.equal(encodeGeo({ lat: "abc", lng: "0" }), "");
  });
});

describe("encodeEvent", () => {
  it("all-day event uses DATE values", () => {
    const v = encodeEvent({ title: "휴가", location: "", description: "", start: "2026-10-03", end: "2026-10-05", allDay: true });
    assert.ok(v.includes("DTSTART;VALUE=DATE:20261003"));
    assert.ok(v.includes("DTEND;VALUE=DATE:20261006")); // exclusive end: last day 10-05 → DTEND 10-06
  });
  it("timed event converts to UTC stamp", () => {
    const v = encodeEvent({ title: "회의", location: "3층", description: "", start: "2026-10-03T10:00", end: "", allDay: false });
    assert.match(v, /DTSTART:\d{8}T\d{6}Z/);
    assert.ok(v.includes("LOCATION:3층"));
  });
  it("needs title and start", () => {
    assert.equal(encodeEvent({ title: "", location: "", description: "", start: "2026-10-03T10:00", end: "", allDay: false }), "");
  });
});

describe("sanitizePayloadForStorage", () => {
  it("masks wifi password when enabled and drops non-primitive fields", () => {
    const out = sanitizePayloadForStorage(
      "wifi",
      { ssid: "Home", password: "secret123", nested: { a: 1 }, encryption: "WPA" },
      { maskWifiPassword: true },
    );
    assert.deepEqual(out, { ssid: "Home", password: "*********", encryption: "WPA" });
  });
  it("keeps password when masking is off", () => {
    const out = sanitizePayloadForStorage("wifi", { ssid: "Home", password: "secret" }, { maskWifiPassword: false });
    assert.equal(out.password, "secret");
  });
});

/* ---------- Bank-transfer codes: Pix, UPI, EPC ---------- */

describe("crc16ccitt", () => {
  it("matches the CRC-16/CCITT-FALSE check value", () => {
    assert.equal(crc16ccitt("123456789"), "29B1");
  });
  it("includes the trailing 6304 in the Pix checksum", () => {
    // Third-party vector: pix-payload-generator.net README (https://github.com/alexandresanlim/pix-payload-generator.net).
    // Its txid contains hyphens (not allowed by the BCB txid rule), so only the CRC is checked here.
    const payload =
      "00020126580014br.gov.bcb.pix0136bee05743-4291-4f3c-9259-595df1307ba1520400005303986540510.005802BR5914Alexandre Lima6019Presidente Prudente62180514Um-Id-Qualquer6304";
    assert.equal(crc16ccitt(payload), "D475");
  });
});

describe("encodePix", () => {
  it("reproduces the Banco Central's static example byte for byte", () => {
    // Manual de Padrões para Iniciação do Pix, §2.6.3 "Exemplo de QR Code estático":
    // https://www.bcb.gov.br/content/estabilidadefinanceira/pix/Regulamento_Pix/II_ManualdePadroesparaIniciacaodoPix.pdf
    assert.equal(
      encodePix({ key: "123e4567-e12b-12d1-a456-426655440000", name: "Fulano de Tal", city: "BRASILIA", amount: "", description: "", txid: "" }),
      "00020126580014br.gov.bcb.pix0136123e4567-e12b-12d1-a456-4266554400005204000053039865802BR5913Fulano de Tal6008BRASILIA62070503***63041D3D",
    );
  });
  it("reproduces a public decoder sample with an amount", () => {
    // QI Tech "Decode Pix QR Code" documentation sample: https://docs.qitech.com.br/en/documentation/pix/decodificar_qr_code/
    assert.equal(
      encodePix({ key: "a23bf0e9-5175-4829-bf89-e8fe6ac09aa1", name: "TywinLannister", city: "saopaulo", amount: "30", description: "", txid: "" }),
      "00020126580014br.gov.bcb.pix0136a23bf0e9-5175-4829-bf89-e8fe6ac09aa1520400005303986540530.005802BR5914TywinLannister6008saopaulo62070503***6304D4FD",
    );
  });
  it("normalises keys: formatted CPF/CNPJ to digits, phones to +55 digits, e-mail as typed", () => {
    assert.equal(normalizePixKey("123.456.789-09"), "12345678909");
    assert.equal(normalizePixKey("12.345.678/0001-95"), "12345678000195");
    assert.equal(normalizePixKey("+55 (11) 91234-5678"), "+5511912345678");
    assert.equal(normalizePixKey(" maria@example.com "), "maria@example.com");
    assert.ok(isValidPixKey("12345678909"));
    assert.ok(isValidPixKey("+5511912345678"));
    assert.ok(!isValidPixKey("1191234567")); // ten digits: neither CPF nor +55 phone
    assert.ok(!isValidPixKey("not a key"));
  });
  it("strips accents, clips name/city, writes the amount with two decimals and keeps the txid", () => {
    const code = encodePix({ key: "12345678909", name: "Padaria São José Ltda ME 1234", city: "São Paulo", amount: "12,5", description: "Pão", txid: "PEDIDO123" });
    assert.ok(code.includes("5924Padaria Sao Jose Ltda ME")); // cut at 25, then the dangling space is trimmed
    assert.ok(code.includes("6009Sao Paulo"));
    assert.ok(code.includes("540512.50"));
    assert.ok(code.includes("0203Pao"));
    assert.ok(code.includes("62130509PEDIDO123"));
    assert.equal(code.slice(-8, -4), "6304");
    assert.equal(crc16ccitt(code.slice(0, -4)), code.slice(-4));
  });
  it("refuses invalid keys, amounts and txids", () => {
    const base = { key: "12345678909", name: "A", city: "B", amount: "", description: "", txid: "" };
    assert.equal(encodePix({ ...base, key: "1191234567" }), "");
    assert.equal(encodePix({ ...base, amount: "0" }), "");
    assert.equal(encodePix({ ...base, amount: "1.234" }), "");
    assert.equal(encodePix({ ...base, txid: "pedido-1" }), "");
    assert.equal(encodePix({ ...base, name: "" }), "");
  });
});

describe("encodeUpi", () => {
  it("builds the NPCI upi://pay link with percent-encoded name and note", () => {
    assert.equal(
      encodeUpi({ vpa: "shop@okaxis", name: "Sharma General Store", amount: "250", note: "Table 4 & 5" }),
      "upi://pay?pa=shop@okaxis&pn=Sharma%20General%20Store&am=250.00&cu=INR&tn=Table%204%20%26%205",
    );
    assert.equal(encodeUpi({ vpa: "9876543210@ybl", name: "Asha", amount: "", note: "" }), "upi://pay?pa=9876543210@ybl&pn=Asha&cu=INR");
  });
  it("accepts a decimal comma and rejects bad VPAs or amounts", () => {
    assert.ok(encodeUpi({ vpa: "a.b-c_d@upi", name: "X", amount: "99,5", note: "" }).includes("am=99.50"));
    assert.equal(encodeUpi({ vpa: "shop", name: "X", amount: "", note: "" }), "");
    assert.equal(encodeUpi({ vpa: "shop@ok axis", name: "X", amount: "", note: "" }), "");
    assert.equal(encodeUpi({ vpa: "shop@okaxis", name: "", amount: "", note: "" }), "");
    assert.equal(encodeUpi({ vpa: "shop@okaxis", name: "X", amount: "abc", note: "" }), "");
  });
});

describe("isValidIban", () => {
  it("accepts well-known valid IBANs with or without spaces", () => {
    for (const iban of [
      "DE89 3704 0044 0532 0130 00",
      "FR14 2004 1010 0505 0001 3M02 606",
      "NL91 ABNA 0417 1643 00",
      "ES91 2100 0418 4502 0005 1332",
      "IT60 X054 2811 1010 0000 0123 456",
      "PT50 0002 0123 1234 5678 9015 4",
      "GB82 WEST 1234 5698 7654 32",
      "de89370400440532013000",
    ]) {
      assert.ok(isValidIban(iban), iban);
    }
  });
  it("rejects wrong check digits, wrong country lengths and junk", () => {
    assert.ok(!isValidIban("DE89 3704 0044 0532 0130 01"));
    assert.ok(!isValidIban("DE89370400440532013000 0")); // one digit too long once spaces are removed
    assert.ok(!isValidIban("NL91ABNA041716430"));
    assert.ok(!isValidIban("1234567890123456"));
    assert.ok(!isValidIban(""));
  });
});

describe("encodeEpc", () => {
  it("matches the guideline's version-2 example (BIC empty, unstructured remittance)", () => {
    // EPC069-12 v2.1, "Examples — V2": https://www.europeanpaymentscouncil.eu/document-library/guidance-documents/quick-response-code-guidelines-enable-data-capture-initiation
    // The guideline example is encoded in ISO 8859-1 (charset "2"); this generator always writes UTF-8 ("1"), so line 3 differs.
    assert.equal(
      encodeEpc({ name: "François D'Alsace S.A.", iban: "FR1420041010050500013M02606", bic: "", amount: "12.3", remittance: "Client:Marie Louise La Lune", info: "" }),
      ["BCD", "002", "1", "SCT", "", "François D'Alsace S.A.", "FR1420041010050500013M02606", "EUR12.30", "", "", "Client:Marie Louise La Lune"].join("\n"),
    );
  });
  it("puts an RF creditor reference in the structured line and drops trailing empty lines", () => {
    const code = encodeEpc({ name: "Franz Mustermann", iban: "DE71 1102 2033 0123 4567 89", bic: "bhbldehhxxx", amount: "", remittance: "RF18 5390 0754 7034", info: "" });
    assert.equal(code, ["BCD", "002", "1", "SCT", "BHBLDEHHXXX", "Franz Mustermann", "DE71110220330123456789", "", "", "RF18539007547034"].join("\n"));
    assert.ok(!code.endsWith("\n"));
  });
  it("needs a name and a valid IBAN; rejects bad BIC, out-of-range amounts and over-long payloads", () => {
    const base = { name: "X", iban: "DE89370400440532013000", bic: "", amount: "", remittance: "", info: "" };
    assert.equal(encodeEpc({ ...base, name: "" }), "");
    assert.equal(encodeEpc({ ...base, iban: "DE00370400440532013000" }), "");
    assert.equal(encodeEpc({ ...base, bic: "COBA" }), "");
    assert.equal(encodeEpc({ ...base, amount: "1000000000" }), "");
    assert.ok(encodeEpc({ ...base, amount: "999999999.99" }).includes("EUR999999999.99"));
    // Every field at its character limit still fits in ASCII (323 bytes) …
    assert.ok(encodeEpc({ ...base, name: "N".repeat(70), remittance: "R".repeat(140), info: "I".repeat(70) }));
    // … but the cap is in bytes, so two-byte letters push it over.
    assert.equal(encodeEpc({ ...base, name: "ä".repeat(70), remittance: "R".repeat(140), info: "I".repeat(70) }), "");
  });
  it("is reachable through encodePayload", () => {
    assert.ok(encodePayload("epc", { name: "X", iban: "NL91ABNA0417164300", bic: "", amount: "", remittance: "", info: "" }).startsWith("BCD\n002\n1\nSCT\n"));
    assert.ok(encodePayload("upi", { vpa: "ab@bank", name: "n", amount: "", note: "" }).startsWith("upi://pay?"));
    assert.ok(encodePayload("pix", { key: "12345678909", name: "n", city: "c", amount: "", description: "", txid: "" }).startsWith("000201"));
  });
});

describe("formatAmount", () => {
  it("normalises dot and comma decimals to two places and rejects everything else", () => {
    assert.equal(formatAmount("12"), "12.00");
    assert.equal(formatAmount("12.5"), "12.50");
    assert.equal(formatAmount("12,50"), "12.50");
    assert.equal(formatAmount(" 0.01 "), "0.01");
    assert.equal(formatAmount("0"), null);
    assert.equal(formatAmount("0,00"), null);
    assert.equal(formatAmount("1.234"), null);
    assert.equal(formatAmount("1,234.56"), null);
    assert.equal(formatAmount("ten"), null);
  });
});
