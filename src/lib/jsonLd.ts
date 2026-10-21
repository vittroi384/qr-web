/** JSON for a <script type="application/ld+json">: "<" is escaped so no string can close the tag. */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/** Copy may mark formats with backticks (`WIFI:T:WPA;…`); structured data and plain text drop them. */
export const plain = (text: string) => text.replace(/`([^`]+)`/g, "$1");
