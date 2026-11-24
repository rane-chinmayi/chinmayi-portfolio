"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import type { SliderLabels } from "@/content/types";
import { cn } from "@/lib/cn";

// Static class names (Tailwind can't build them from variables): how many cards show.
const BASE_VISIBLE: Record<number, string> = {
  1: "[--visible:1]",
  2: "[--visible:2]",
  3: "[--visible:3]",
  4: "[--visible:4]",
};
const MD_VISIBLE: Record<number, string> = {
  1: "md:[--visible:1]",
  2: "md:[--visible:2]",
  3: "md:[--visible:3]",
  4: "md:[--visible:4]",
};

const fill = (template: string, values: Record<string, number>) =>
  template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ""));

interface CardSliderProps {
  /** One element per slide (e.g. a Card). */
  items: ReactNode[];
  labels: SliderLabels;
  /** Cards visible at once: `base` on phones, `md` from the md breakpoint up (1-4). */
  visible?: { base: number; md: number };
  className?: string;
}

/**
 * A horizontal card slider. The track is a plain overflow-x scroller with
 * scroll-snap (one snap point per card), so touch swipe, trackpads and the
 * keyboard scroll it natively, and without JavaScript every card is still
 * reachable. With JS it adds Previous / Next buttons and pagination dots, which
 * move the track by ONE card; the active position is derived from the scroll
 * position itself, so swipes and clicks stay in sync.
 *
 * Accessibility: a labelled "carousel" region, "n of total" slide groups, a polite
 * live announcement of the visible range, Left/Right arrow keys, and slides
 * outside the visible window are `inert` (their links are not tabbable).
 * No autoplay and no looping; smooth scrolling is instant under reduced motion.
 */
export default function CardSlider({
  items,
  labels,
  visible = { base: 1, md: 2 },
  className,
}: CardSliderProps) {
  const regionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false); // controls need JS, so they appear after mount
  const [active, setActive] = useState(0);
  const [shown, setShown] = useState(visible.base);
  const [announcement, setAnnouncement] = useState("");
  const interacted = useRef(false); // announce only after the user scrolls or clicks

  const total = items.length;
  const positions = Math.max(1, total - shown + 1);

  const stepOf = useCallback(() => {
    const track = trackRef.current;
    const first = track?.children[0] as HTMLElement | undefined;
    if (!track || !first) return 0;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    return first.offsetWidth + gap;
  }, []);

  // Read how many cards fit and which position the track is at, from the DOM.
  const measure = useCallback(() => {
    const track = trackRef.current;
    const step = stepOf();
    if (!track || !step) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const fits = Math.max(1, Math.round((track.clientWidth + gap) / step));
    setShown(fits);
    const maxIndex = Math.max(0, total - fits);
    setActive(Math.min(maxIndex, Math.max(0, Math.round(track.scrollLeft / step))));
  }, [stepOf, total]);

  useEffect(() => {
    setReady(true);
    const track = trackRef.current;
    if (!track) return;
    measure();
    let raf = 0;
    const onScroll = () => {
      interacted.current = true;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => {
      cancelAnimationFrame(raf);
      track.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, [measure]);

  // Cards outside the visible window: not focusable, hidden from assistive tech.
  useEffect(() => {
    const track = trackRef.current;
    const region = regionRef.current;
    if (!track || !region) return;
    Array.from(track.children).forEach((child, i) => {
      (child as HTMLElement).inert = i < active || i >= active + shown;
    });
    // If the focused link just scrolled out (its slide is now inert), the browser
    // would drop focus to <body> at its next rendering step; move it to the
    // carousel now so the arrow keys keep working.
    if (document.activeElement?.closest("[inert]") && region.contains(document.activeElement)) {
      region.focus({ preventScroll: true });
    }
  }, [active, shown, items.length]);

  // Tell screen readers which cards are showing (not at page load).
  useEffect(() => {
    if (!interacted.current) return;
    const from = active + 1;
    const to = Math.min(total, active + shown);
    setAnnouncement(
      shown > 1
        ? fill(labels.showingRange, { from, to, total })
        : fill(labels.showingOne, { from, total }),
    );
  }, [active, shown, total, labels]);

  const goTo = (index: number) => {
    const track = trackRef.current;
    const step = stepOf();
    if (!track || !step) return;
    interacted.current = true;
    const target = Math.min(positions - 1, Math.max(0, index));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({ left: target * step, behavior: reduced ? "auto" : "smooth" });
  };

  // One card forward/back from where the track really is (read from the scroll
  // position, not React state, which can lag behind a swipe or rapid clicks).
  // Returns false at either end.
  const move = (delta: number) => {
    const track = trackRef.current;
    const step = stepOf();
    if (!track || !step) return false;
    const current = Math.round(track.scrollLeft / step);
    const target = current + delta;
    if (target < 0 || target > positions - 1) return false;
    goTo(target);
    return true;
  };

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    if (move(event.key === "ArrowRight" ? 1 : -1)) event.preventDefault();
  };

  const arrow =
    "flex size-16 shrink-0 items-center justify-center rounded-pill border border-border-strong bg-transparent text-foreground transition duration-200 enabled:hover:border-accent-text enabled:hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-35 motion-reduce:transition-none";

  return (
    <section
      ref={regionRef}
      tabIndex={-1}
      aria-roledescription="carousel"
      aria-label={labels.region}
      onKeyDown={onKeyDown}
      className={cn("outline-none", className)}
    >
      <div
        ref={trackRef}
        className={cn(
          "flex snap-x snap-mandatory gap-6 overflow-x-auto motion-safe:scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          BASE_VISIBLE[visible.base],
          MD_VISIBLE[visible.md],
        )}
      >
        {items.map((item, index) => (
          <div
            key={index}
            role="group"
            aria-roledescription="slide"
            aria-label={fill(labels.slide, { n: index + 1, total })}
            className="flex shrink-0 basis-[calc((100%-1.5rem*(var(--visible)-1))/var(--visible))] snap-start"
          >
            {item}
          </div>
        ))}
      </div>

      {ready && positions > 1 && (
        <div className="mt-8 flex items-center justify-center gap-6">
          <button
            type="button"
            aria-label={labels.previous}
            disabled={active <= 0}
            onClick={() => move(-1)}
            className={arrow}
          >
            <ChevronLeft className="size-[22px]" aria-hidden="true" />
          </button>

          <div className="flex items-center gap-4">
            {Array.from({ length: positions }, (_, i) => {
              const isActive = i === active;
              return (
                <button
                  key={i}
                  type="button"
                  aria-label={fill(labels.goTo, { n: i + 1 })}
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => goTo(i)}
                  className="flex h-6 items-center rounded-pill"
                >
                  {/* Width animates; the gradient fades in on top of the subtle fill. */}
                  <span
                    className={cn(
                      "relative block h-3 rounded-pill bg-border-soft transition-[width] duration-[250ms] motion-reduce:transition-none",
                      isActive ? "w-10" : "w-3",
                    )}
                  >
                    <span
                      className={cn(
                        "absolute inset-0 rounded-pill bg-accent bg-accent-gradient transition-opacity duration-[250ms] motion-reduce:transition-none",
                        isActive ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            aria-label={labels.next}
            disabled={active >= positions - 1}
            onClick={() => move(1)}
            className={arrow}
          >
            <ChevronRight className="size-[22px]" aria-hidden="true" />
          </button>
        </div>
      )}

      <div aria-live="polite" className="sr-only">
        {announcement}
      </div>
    </section>
  );
}
