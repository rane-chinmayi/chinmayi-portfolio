import type { CSSProperties } from "react";

/**
 * Props that mark an element for the scroll-reveal fade-up (see
 * components/ui/RevealObserver.tsx and the `[data-reveal]` rules in globals.css).
 *
 * `columns` staggers siblings in a grid: the item in column n waits n * 80ms.
 * Stacked items use the default (no stagger).
 */
export function reveal(index = 0, columns = 1) {
  const delay = columns > 1 ? (index % columns) * 80 : 0;
  return {
    "data-reveal": "",
    style: { "--reveal-delay": `${delay}ms` } as CSSProperties,
  } as const;
}
