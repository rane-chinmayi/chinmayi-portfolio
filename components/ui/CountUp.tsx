"use client";

import { useEffect, useRef, useState } from "react";

const DURATION_MS = 1600;

/**
 * Poppins has no tabular figures (a "1" is 0.38em wide, a "4" 0.68em), so
 * `tabular-nums` alone would let the number wobble while it counts. Every digit
 * goes in a fixed-width cell instead, in the server HTML too, so the layout is
 * the same before, during and after counting (no snap at the end).
 */
function Cells({ text }: { text: string }) {
  return (
    <>
      {Array.from(text).map((char, i) =>
        /\d/.test(char) ? (
          <span key={i} className="inline-block w-[0.64em] text-center">
            {char}
          </span>
        ) : (
          <span key={i}>{char}</span>
        ),
      )}
    </>
  );
}
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * The prefix, the number in digit cells, and the suffix. Missing leading digits
 * (e.g. "4.7K" on the way to "18.9K") get invisible cells, so the decimal point
 * and the suffix stay exactly where they end up.
 */
function Display({ parsed, n }: { parsed: Parsed; n: number }) {
  const body = n.toFixed(parsed.decimals);
  const finalLen = Math.floor(parsed.target).toString().length;
  const pad = Math.max(0, finalLen - body.split(".")[0].length);
  return (
    <>
      {parsed.prefix}
      {Array.from({ length: pad }, (_, i) => (
        <span key={i} aria-hidden="true" className="invisible inline-block w-[0.64em]">
          0
        </span>
      ))}
      <Cells text={body} />
      {parsed.suffix}
    </>
  );
}

interface Parsed {
  prefix: string;
  /** The final number, e.g. 18.9. */
  target: number;
  /** Decimal places, kept for the whole count ("18.9K" -> 1: 0.0 ... 18.9). */
  decimals: number;
  suffix: string;
}

/**
 * Splits "30+", "18.9K", "$4.5M", "3×" into prefix / number / suffix. Strict on
 * purpose: the prefix may only be symbols and the suffix a few letters, "%", "+"
 * or "×" with no spaces or digits, so "Top 35%" and "5 + 2" are NOT parsed and
 * the caller shows them as static text.
 */
export function parseCountValue(value: string): Parsed | null {
  const m = /^([^\w\s]{0,2})(\d+(?:\.(\d+))?)([A-Za-z%+×]{0,3})$/.exec(value.trim());
  if (!m) return null;
  return {
    prefix: m[1],
    target: Number(m[2]),
    decimals: m[3]?.length ?? 0,
    suffix: m[4],
  };
}

interface CountUpProps {
  /** The final value as written, e.g. "30+" or "18.9K". Rendered as-is on the server. */
  value: string;
  /** Wait this long (ms) after the trigger before counting: staggers a row of numbers. */
  delay?: number;
  className?: string;
}

/**
 * Counts a number up from 0 to its final value once, when it first scrolls into
 * view (30% visible), then stays put. Only the numeric part moves; the prefix and
 * suffix are always shown.
 *
 * - The server HTML has the final value (SEO, no-JS). After hydration the display
 *   resets to 0 and counts when seen; nothing is stored, so a refresh replays it.
 * - Layout: an invisible copy of the final value reserves the width and every
 *   digit sits in a fixed-width cell (see Cells), so nothing wobbles while counting.
 * - Screen readers get the final value only (aria-label); the moving digits are
 *   aria-hidden. With prefers-reduced-motion the final value just stays.
 * - A value that can't be parsed renders as plain text.
 */
export default function CountUp({ value, delay = 0, className }: CountUpProps) {
  const parsed = parseCountValue(value);
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState<number | null>(null); // null = the final value

  useEffect(() => {
    const el = ref.current;
    if (!parsed || !el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const { target } = parsed;
    let raf = 0;
    let timer = 0;

    setShown(0); // start from 0 (the server rendered the final value)

    const run = () => {
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / DURATION_MS);
        if (t >= 1) {
          setShown(null); // the exact final value
          return;
        }
        setShown(target * easeOutCubic(t));
        raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        observer.disconnect(); // once per page load: no replay on scroll
        timer = window.setTimeout(run, delay);
      },
      { threshold: 0.3 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
    // `parsed` is derived from `value`, so `value` is the real dependency.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, delay]);

  if (!parsed) return <span className={className}>{value}</span>;

  return (
    <span
      ref={ref}
      role="img"
      aria-label={value}
      className={`relative inline-block tabular-nums ${className ?? ""}`}
    >
      {/* Reserves the final width so the box never changes size while counting. */}
      <span aria-hidden="true" className="invisible">
        <Display parsed={parsed} n={parsed.target} />
      </span>
      <span aria-hidden="true" className="absolute inset-0 whitespace-nowrap text-center">
        <Display parsed={parsed} n={shown ?? parsed.target} />
      </span>
    </span>
  );
}
