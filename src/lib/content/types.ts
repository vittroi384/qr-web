/**
 * Long-form editorial content: the collapsed type guides under each landing page's FAQ and the
 * /guides articles. English only. Inline markup inside any string: `code` renders as inline code,
 * [text](/path) as a link to another page on this site.
 */
export type Block = { h2: string } | { h3: string } | { p: string } | { ul: string[] } | { ol: string[] };

/** Collapsed "Guide: … QR codes" section shown under a type landing's FAQ. */
export type TypeGuide = {
  /** Summary line, e.g. "Guide: Wi-Fi QR codes". */
  title: string;
  /** Three or four h3 sub-headings with paragraphs; the last paragraph links to 2–3 related pages. */
  blocks: Block[];
};

/** One /guides/<slug> article. */
export type GuidePost = {
  slug: string;
  /** H1 and <title>. */
  title: string;
  /** Meta description, about 140–160 characters. */
  description: string;
  /** Publication date, ISO (YYYY-MM-DD). */
  published: string;
  /** One or two sentences under the H1. */
  intro: string;
  /** h2 sections with paragraphs and lists. */
  blocks: Block[];
};
