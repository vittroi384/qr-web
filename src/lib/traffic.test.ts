import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { classifySource, crawlerOf, isAiCrawler, isSourceKey, sourceGroup, sourceLabel } from "./traffic";

const HOST = "getqrmaker.com";

describe("classifySource", () => {
  it("prefers utm_source (ChatGPT sends one and usually no Referer)", () => {
    assert.equal(classifySource(null, "chatgpt.com", HOST), "chatgpt");
    assert.equal(classifySource("https://www.google.com/", "chatgpt.com", HOST), "chatgpt");
    assert.equal(classifySource(null, "ChatGPT", HOST), "chatgpt");
    assert.equal(classifySource(null, "openai", HOST), "chatgpt");
    assert.equal(classifySource(null, "perplexity.ai", HOST), "perplexity");
    assert.equal(classifySource(null, "copilot.com", HOST), "copilot");
  });

  it("keeps an unknown utm_source as a cleaned key", () => {
    assert.equal(classifySource(null, "Spring Newsletter!", HOST), "spring-newsletter-");
    assert.ok(isSourceKey(classifySource(null, "x".repeat(200), HOST)));
  });

  it("reads the Referer host", () => {
    assert.equal(classifySource("https://www.google.co.kr/", null, HOST), "google");
    assert.equal(classifySource("https://gemini.google.com/app", null, HOST), "gemini");
    assert.equal(classifySource("https://m.search.naver.com/search.naver?query=qr", null, HOST), "naver");
    assert.equal(classifySource("https://blog.naver.com/someone/123", null, HOST), "naver-community");
    assert.equal(classifySource("https://www.perplexity.ai/search/abc", null, HOST), "perplexity");
    assert.equal(classifySource("https://t.co/xyz", null, HOST), "x");
    assert.equal(classifySource("https://some-blog.example.org/post", null, HOST), "some-blog.example.org");
  });

  it("direct when nothing is known, null for this site's own pages", () => {
    assert.equal(classifySource("", null, HOST), "direct");
    assert.equal(classifySource(null, "", HOST), "direct");
    assert.equal(classifySource("not a url", null, HOST), "direct");
    assert.equal(classifySource("https://getqrmaker.com/ko/wifi-qr-code", null, HOST), null);
    assert.equal(classifySource("https://www.getqrmaker.com/", null, HOST), null);
  });
});

describe("source groups and labels", () => {
  it("groups keys", () => {
    assert.equal(sourceGroup("chatgpt"), "ai");
    assert.equal(sourceGroup("google"), "search");
    assert.equal(sourceGroup("naver-community"), "social");
    assert.equal(sourceGroup("direct"), "direct");
    assert.equal(sourceGroup("some-blog.example.org"), "other");
    assert.equal(sourceLabel("chatgpt"), "ChatGPT");
    assert.equal(sourceLabel("some-blog.example.org"), "some-blog.example.org");
  });

  it("validates stored keys", () => {
    assert.ok(isSourceKey("chatgpt"));
    assert.ok(isSourceKey("blog.example.com"));
    assert.ok(!isSourceKey(""));
    assert.ok(!isSourceKey("Bad Key"));
    assert.ok(!isSourceKey("-x"));
    assert.ok(!isSourceKey(1));
  });
});

describe("crawlerOf", () => {
  it("recognises AI and search crawlers, not browsers", () => {
    assert.equal(crawlerOf("Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; GPTBot/1.2; +https://openai.com/gptbot"), "gptbot");
    assert.equal(crawlerOf("Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ChatGPT-User/1.0; +https://openai.com/bot"), "chatgpt-user");
    assert.equal(crawlerOf("Mozilla/5.0 (compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot)"), "oai-searchbot");
    assert.equal(crawlerOf("Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; ClaudeBot/1.0; +claudebot@anthropic.com)"), "claudebot");
    assert.equal(crawlerOf("Mozilla/5.0 (compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)"), "perplexitybot");
    assert.equal(crawlerOf("Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"), "googlebot");
    assert.equal(crawlerOf("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36"), null);
    assert.equal(crawlerOf("Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 Chrome/130.0 Mobile Safari/537.36 DaumApps/6.9"), null);
    assert.equal(crawlerOf(null), null);
    assert.ok(isAiCrawler("gptbot"));
    assert.ok(!isAiCrawler("googlebot"));
  });
});
