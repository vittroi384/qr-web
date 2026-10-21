/**
 * Where visitors come from and which crawlers read the site. Pure functions only — imported by the
 * browser (visit beacon), the proxy (crawler counter) and the admin stats page.
 */

export type SourceGroup = "ai" | "search" | "social" | "direct" | "other";

type SourceRule = { key: string; label: string; group: Exclude<SourceGroup, "direct" | "other">; hosts: string[] };

/** Order matters: AI assistants on a search engine's domain (gemini.google.com) come before the engine. */
const SOURCE_RULES: SourceRule[] = [
  { key: "chatgpt", label: "ChatGPT", group: "ai", hosts: ["chatgpt.com", "chat.openai.com", "openai.com"] },
  { key: "perplexity", label: "Perplexity", group: "ai", hosts: ["perplexity.ai"] },
  { key: "gemini", label: "Gemini", group: "ai", hosts: ["gemini.google.com", "bard.google.com"] },
  { key: "claude", label: "Claude", group: "ai", hosts: ["claude.ai"] },
  { key: "copilot", label: "Copilot", group: "ai", hosts: ["copilot.microsoft.com", "copilot.cloud.microsoft", "copilot.com"] },
  { key: "deepseek", label: "DeepSeek", group: "ai", hosts: ["deepseek.com"] },
  { key: "grok", label: "Grok", group: "ai", hosts: ["grok.com", "x.ai"] },
  { key: "mistral", label: "Le Chat (Mistral)", group: "ai", hosts: ["chat.mistral.ai"] },
  { key: "meta-ai", label: "Meta AI", group: "ai", hosts: ["meta.ai"] },
  { key: "you", label: "You.com", group: "ai", hosts: ["you.com"] },
  { key: "phind", label: "Phind", group: "ai", hosts: ["phind.com"] },
  { key: "wrtn", label: "뤼튼", group: "ai", hosts: ["wrtn.ai"] },
  { key: "google", label: "구글", group: "search", hosts: ["google"] }, // google.com, google.co.kr, …
  { key: "naver", label: "네이버", group: "search", hosts: ["search.naver.com", "m.search.naver.com", "naver.com"] },
  { key: "bing", label: "빙", group: "search", hosts: ["bing.com"] },
  { key: "daum", label: "다음", group: "search", hosts: ["daum.net"] },
  { key: "yahoo", label: "야후", group: "search", hosts: ["yahoo.com", "yahoo.co.jp"] },
  { key: "duckduckgo", label: "DuckDuckGo", group: "search", hosts: ["duckduckgo.com"] },
  { key: "baidu", label: "바이두", group: "search", hosts: ["baidu.com"] },
  { key: "yandex", label: "얀덱스", group: "search", hosts: ["yandex.ru", "yandex.com"] },
  { key: "ecosia", label: "Ecosia", group: "search", hosts: ["ecosia.org"] },
  { key: "brave", label: "Brave 검색", group: "search", hosts: ["search.brave.com"] },
  { key: "youtube", label: "유튜브", group: "social", hosts: ["youtube.com", "youtu.be"] },
  { key: "facebook", label: "페이스북", group: "social", hosts: ["facebook.com", "fb.com"] },
  { key: "instagram", label: "인스타그램", group: "social", hosts: ["instagram.com"] },
  { key: "x", label: "X (트위터)", group: "social", hosts: ["x.com", "twitter.com", "t.co"] },
  { key: "threads", label: "스레드", group: "social", hosts: ["threads.net", "threads.com"] },
  { key: "reddit", label: "레딧", group: "social", hosts: ["reddit.com"] },
  { key: "linkedin", label: "링크드인", group: "social", hosts: ["linkedin.com", "lnkd.in"] },
  { key: "tiktok", label: "틱톡", group: "social", hosts: ["tiktok.com"] },
  { key: "pinterest", label: "핀터레스트", group: "social", hosts: ["pinterest.com"] },
  { key: "kakao", label: "카카오", group: "social", hosts: ["kakao.com"] },
];

/** Naver blogs and cafés are communities, not search results. */
const NAVER_COMMUNITY = ["blog.naver.com", "m.blog.naver.com", "cafe.naver.com", "m.cafe.naver.com"];

const RULE_BY_KEY = new Map(SOURCE_RULES.map((r) => [r.key, r]));
/** utm_source spellings that are neither a key nor a host. */
const UTM_ALIASES: Record<string, string | undefined> = { openai: "chatgpt", bard: "gemini", twitter: "x", fb: "facebook", ig: "instagram" };
const SOURCE_KEY_RE = /^[a-z0-9][a-z0-9.-]{0,59}$/;

/** A key as stored: a known source ("chatgpt"), "direct", "naver-community", or a bare host. */
export function isSourceKey(value: unknown): value is string {
  return typeof value === "string" && SOURCE_KEY_RE.test(value);
}

function hostMatches(host: string, pattern: string): boolean {
  if (pattern === "google") return /(^|\.)google\.[a-z.]+$/.test(host);
  return host === pattern || host.endsWith(`.${pattern}`);
}

function ruleForHost(host: string): string | null {
  if (NAVER_COMMUNITY.includes(host)) return "naver-community";
  return SOURCE_RULES.find((r) => r.hosts.some((h) => hostMatches(host, h)))?.key ?? null;
}

function hostOf(value: string): string | null {
  try {
    return new URL(value).hostname.toLowerCase().replace(/^www\./, "");
  } catch {
    return null;
  }
}

/** "chatgpt.com" → chatgpt, "ChatGPT" → chatgpt, "newsletter" → newsletter (kept as written). */
function keyFromUtm(utm: string): string | null {
  const value = utm.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0];
  if (!value) return null;
  const known = ruleForHost(value) ?? (RULE_BY_KEY.has(value) ? value : null) ?? UTM_ALIASES[value];
  if (known) return known;
  const cleaned = value.replace(/[^a-z0-9.-]/g, "-").replace(/^[^a-z0-9]+/, "").slice(0, 60);
  return cleaned || null;
}

/**
 * Where a visit came from. utm_source wins (ChatGPT adds ?utm_source=chatgpt.com and usually sends
 * no Referer), then the Referer host. Returns null for a link from this site itself — not a new visit.
 */
export function classifySource(referrer: string | null | undefined, utmSource: string | null | undefined, ownHost: string): string | null {
  if (utmSource) {
    const key = keyFromUtm(utmSource);
    if (key) return key;
  }
  const host = referrer ? hostOf(referrer) : null;
  if (!host) return "direct";
  if (host === ownHost.toLowerCase().replace(/^www\./, "")) return null;
  return ruleForHost(host) ?? host.slice(0, 60);
}

export function sourceGroup(key: string): SourceGroup {
  if (key === "direct") return "direct";
  if (key === "naver-community") return "social";
  return RULE_BY_KEY.get(key)?.group ?? "other";
}

export function sourceLabel(key: string): string {
  if (key === "direct") return "직접 (주소 입력·즐겨찾기·앱)";
  if (key === "naver-community") return "네이버 블로그·카페";
  return RULE_BY_KEY.get(key)?.label ?? key;
}

export const SOURCE_GROUP_LABELS: Record<SourceGroup, string> = {
  ai: "AI",
  search: "검색",
  social: "SNS·커뮤니티",
  direct: "직접",
  other: "기타 사이트",
};

/* ---------- Crawlers ---------- */

type CrawlerRule = { key: string; label: string; ai: boolean; ua: RegExp };

/** AI crawlers first; the big search crawlers are listed too because AI answers draw on their indexes. */
const CRAWLERS: CrawlerRule[] = [
  { key: "gptbot", label: "GPTBot (OpenAI 학습)", ai: true, ua: /GPTBot/i },
  { key: "oai-searchbot", label: "OAI-SearchBot (ChatGPT 검색)", ai: true, ua: /OAI-SearchBot/i },
  { key: "chatgpt-user", label: "ChatGPT-User (사용자 질문 중 열람)", ai: true, ua: /ChatGPT-User/i },
  { key: "claudebot", label: "ClaudeBot (Anthropic 학습)", ai: true, ua: /ClaudeBot/i },
  { key: "claude-searchbot", label: "Claude-SearchBot (Claude 검색)", ai: true, ua: /Claude-SearchBot/i },
  { key: "claude-user", label: "Claude-User (사용자 질문 중 열람)", ai: true, ua: /Claude-User/i },
  { key: "perplexitybot", label: "PerplexityBot (Perplexity 검색)", ai: true, ua: /PerplexityBot/i },
  { key: "perplexity-user", label: "Perplexity-User (사용자 질문 중 열람)", ai: true, ua: /Perplexity-User/i },
  { key: "mistralai-user", label: "MistralAI-User (Le Chat)", ai: true, ua: /MistralAI-User/i },
  { key: "duckassistbot", label: "DuckAssistBot (DuckDuckGo AI)", ai: true, ua: /DuckAssistBot/i },
  { key: "meta-externalagent", label: "Meta-ExternalAgent (Meta AI)", ai: true, ua: /meta-external(agent|fetcher)/i },
  { key: "applebot", label: "Applebot (Siri·Apple Intelligence)", ai: true, ua: /Applebot/i },
  { key: "amazonbot", label: "Amazonbot (Alexa)", ai: true, ua: /Amazonbot/i },
  { key: "bytespider", label: "Bytespider (바이트댄스)", ai: true, ua: /Bytespider/i },
  { key: "ccbot", label: "CCBot (Common Crawl)", ai: true, ua: /CCBot/i },
  { key: "googlebot", label: "Googlebot (구글 검색·AI 개요)", ai: false, ua: /Googlebot/i },
  { key: "bingbot", label: "Bingbot (빙·Copilot·ChatGPT 검색 바탕)", ai: false, ua: /bingbot/i },
  { key: "yeti", label: "Yeti (네이버 검색)", ai: false, ua: /Yeti\//i },
  { key: "daumoa", label: "Daumoa (다음 검색)", ai: false, ua: /Daumoa/i },
];

const CRAWLER_BY_KEY = new Map(CRAWLERS.map((c) => [c.key, c]));

/** The crawler a User-Agent belongs to, or null for browsers and unlisted bots. */
export function crawlerOf(userAgent: string | null | undefined): string | null {
  if (!userAgent) return null;
  return CRAWLERS.find((c) => c.ua.test(userAgent))?.key ?? null;
}

export function crawlerLabel(key: string): string {
  return CRAWLER_BY_KEY.get(key)?.label ?? key;
}

export function isAiCrawler(key: string): boolean {
  return CRAWLER_BY_KEY.get(key)?.ai ?? false;
}
