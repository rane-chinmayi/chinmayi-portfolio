/**
 * Links that must NOT go through next/link: other schemes (https:, mailto:)
 * and direct file URLs such as /resume.pdf. Everything else is an internal
 * route or hash and uses next/link.
 */
const PLAIN_ANCHOR =
  /^(?:[a-z][a-z0-9+.-]*:|\/\/)|\/[^/?#]*\.[a-z]{2,5}(?:[?#]|$)/i;

export function isPlainAnchor(href: string): boolean {
  return PLAIN_ANCHOR.test(href);
}

/** Props for a link that opens in a new tab. */
export const newTabProps = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;
