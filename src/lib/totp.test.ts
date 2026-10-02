import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { base32Decode, base32Encode, totpAt, verifyTotp } from "./totp";

// RFC 6238 test vector secret "12345678901234567890" (SHA-1).
const RFC_SECRET_B32 = "GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ";

describe("totp", () => {
  it("base32 round-trips", () => {
    const bytes = Uint8Array.from([0xde, 0xad, 0xbe, 0xef, 0x01, 0x02, 0x03]);
    assert.deepEqual(base32Decode(base32Encode(bytes)), bytes);
    assert.equal(Buffer.from(base32Decode(RFC_SECRET_B32)).toString("utf8"), "12345678901234567890");
  });
  it("matches RFC 6238 SHA-1 vectors (6 digits)", () => {
    assert.equal(totpAt(RFC_SECRET_B32, 59), "287082");
    assert.equal(totpAt(RFC_SECRET_B32, 1111111109), "081804");
    assert.equal(totpAt(RFC_SECRET_B32, 1234567890), "005924");
  });
  it("accepts one step of drift, rejects garbage, and never accepts a code twice", () => {
    const now = 1111111109 * 1000;
    assert.equal(verifyTotp(RFC_SECRET_B32, totpAt(RFC_SECRET_B32, 1111111109 - 30), now), true);
    assert.equal(verifyTotp(RFC_SECRET_B32, "081804", now), true);
    assert.equal(verifyTotp(RFC_SECRET_B32, "081804", now), false); // replay within the window
    assert.equal(verifyTotp(RFC_SECRET_B32, totpAt(RFC_SECRET_B32, 1111111109 - 30), now), false);
    assert.equal(verifyTotp(RFC_SECRET_B32, "000000", now), false);
    assert.equal(verifyTotp(RFC_SECRET_B32, "08180", now), false);
  });
});
