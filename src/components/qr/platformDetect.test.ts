import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { SOCIAL_PLATFORMS } from "@/lib/qr/encoders";
import { detectPlatform } from "./PlatformPicker";

describe("detectPlatform: map share links", () => {
  it("recognises Naver Map, KakaoMap and Google Maps links, including the web versions", () => {
    assert.equal(detectPlatform("https://naver.me/5abCdEfG", SOCIAL_PLATFORMS), "naver_map");
    assert.equal(detectPlatform("https://map.naver.com/p/entry/place/123", SOCIAL_PLATFORMS), "naver_map");
    assert.equal(detectPlatform("https://kko.kakao.com/AbCdEf", SOCIAL_PLATFORMS), "kakao_map");
    assert.equal(detectPlatform("https://map.kakao.com/?itemId=123", SOCIAL_PLATFORMS), "kakao_map");
    assert.equal(detectPlatform("https://maps.app.goo.gl/XyZ123", SOCIAL_PLATFORMS), "google_maps");
    assert.equal(detectPlatform("https://www.instagram.com/mycafe/", SOCIAL_PLATFORMS), "instagram");
  });
});
