import { errorFields, logEvent } from "./log";
import { rateLimit } from "./rateLimit";
import { getSettings, isOn } from "./settings";
import { incrementCrawler } from "./stats";
import { crawlerOf } from "./traffic";

const SITE_RATE_LIMIT = 1200; // upserts per minute — a crawl burst must not flood the database
const RATE_WINDOW_MS = 60_000;

/**
 * Called by the proxy for public page GETs: +1 on today's counter when the User-Agent is a known
 * AI or search crawler. Fire-and-forget — never delays or fails the page.
 */
export function countCrawlerVisit(userAgent: string | null): void {
  const crawler = crawlerOf(userAgent);
  if (!crawler || !rateLimit("crawler:all", SITE_RATE_LIMIT, RATE_WINDOW_MS).ok) return;
  void (async () => {
    try {
      if (!isOn((await getSettings()).logging_enabled)) return;
      await incrementCrawler(crawler);
    } catch (err) {
      logEvent("error", "crawler.increment_failed", { crawler, ...errorFields(err) });
    }
  })();
}
