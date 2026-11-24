"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";

const LINES = 2;
const DURATION_MS = 300;

interface ExpandableQuoteProps {
  children: string;
  readMoreLabel: string;
  showLessLabel: string;
  className?: string;
}

/**
 * A quote clamped to two lines with a "Read more" / "Show less" toggle.
 *
 * - The full text is always in the HTML; it is only visually clamped
 *   (`data-clamped`). The server renders it clamped, so hydration causes no
 *   layout shift, and a <noscript> rule shows the full text without JavaScript.
 * - The button only appears if the text really is longer than two lines
 *   (measured on mount and whenever the width changes).
 * - The height animates over 300ms ease-out. line-clamp can't be transitioned,
 *   so the clamp is lifted first, the height tweened between the measured
 *   collapsed and full heights, and the clamp restored at the end of a collapse.
 *   With prefers-reduced-motion it switches instantly.
 */
export default function ExpandableQuote({
  children,
  readMoreLabel,
  showLessLabel,
  className,
}: ExpandableQuoteProps) {
  const id = useId();
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const [overflowing, setOverflowing] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // Is the full text taller than two lines? (scrollHeight is the full height even when clamped.)
  const measure = useCallback(() => {
    const el = quoteRef.current;
    if (!el) return;
    const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
    setOverflowing(el.scrollHeight > lineHeight * LINES + 1);
  }, []);

  useEffect(() => {
    measure();
    const el = quoteRef.current;
    if (!el) return;
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [measure]);

  const toggle = () => {
    const el = quoteRef.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const opening = !expanded;
    setExpanded(opening);

    const fullHeight = () => {
      el.dataset.clamped = "false";
      return el.offsetHeight;
    };
    const clampedHeight = () => {
      el.dataset.clamped = "true";
      return el.offsetHeight;
    };

    const from = el.offsetHeight;
    // Measure both end states (each measurement leaves the clamp in that state).
    const to = opening ? fullHeight() : (fullHeight(), clampedHeight());
    const finish = () => {
      el.style.height = "";
      el.style.overflow = "";
      el.style.transition = "";
      el.dataset.clamped = opening ? "false" : "true";
    };

    if (reduced || from === to) {
      finish();
      return;
    }

    // Tween from the current height to the target; keep the text unclamped while
    // it moves (a collapse re-clamps at the end, so the ellipsis appears last).
    el.dataset.clamped = "false";
    el.style.overflow = "hidden";
    el.style.height = `${from}px`;
    el.getBoundingClientRect(); // commit the starting height
    el.style.transition = `height ${DURATION_MS}ms ease-out`;
    el.style.height = `${to}px`;
    window.setTimeout(finish, DURATION_MS + 30);
  };

  return (
    <div className={className}>
      {/* Without JavaScript there is no toggle, so show the whole quote. */}
      <noscript>
        <style>{`[data-clamped]{display:block!important;overflow:visible!important;-webkit-line-clamp:unset!important}`}</style>
      </noscript>
      <blockquote
        ref={quoteRef}
        id={id}
        data-clamped="true"
        className="text-[18px] leading-[1.7] text-soft data-[clamped=true]:line-clamp-2"
      >
        {children}
      </blockquote>
      {overflowing && (
        <button
          type="button"
          onClick={toggle}
          aria-expanded={expanded}
          aria-controls={id}
          className="mt-3 inline-flex items-center gap-1 rounded-sm text-[14px] font-semibold text-accent-text underline-offset-4 hover:underline"
        >
          {expanded ? showLessLabel : readMoreLabel}
          {expanded ? (
            <ChevronUp className="size-4" aria-hidden="true" />
          ) : (
            <ChevronDown className="size-4" aria-hidden="true" />
          )}
        </button>
      )}
    </div>
  );
}
