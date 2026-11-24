"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Scroll-reveal, progressively enhanced. Elements marked with `data-reveal`
 * (see lib/reveal.ts) are server-rendered fully visible. After hydration this
 * hides only the ones still below the fold, then fades each one up as it
 * enters the viewport. Without JS, or with prefers-reduced-motion, nothing is
 * ever hidden. Only opacity/transform change, so there is no layout shift.
 *
 * Each element animates once: it is unobserved the moment it is shown, so
 * scrolling back up and down never replays it. Nothing is stored (no
 * localStorage or cookies), so a refresh or a new visit plays it again.
 *
 * "How I Think" timeline items (`data-reveal-kind="timeline"`) differ in two
 * ways: they trigger when 20% of the item is visible, and an item that is
 * already on screen at load is hidden first and then animates straight away
 * (e.g. after jumping to #how-i-think), instead of being left as is.
 */
export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const finish = (el: HTMLElement) => {
      el.dataset.reveal = "done"; // drop the reveal transition so hover effects aren't slowed
    };

    const makeObserver = (options: IntersectionObserverInit) => {
      const observer: IntersectionObserver = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          observer.unobserve(el);
          el.dataset.reveal = "shown";
          el.addEventListener(
            "transitionend",
            (event) => {
              if (event.target === el) finish(el);
            },
            { once: false },
          );
          window.setTimeout(() => finish(el), 1500); // also covers children's transitions
        }
      }, options);
      return observer;
    };

    const observer = makeObserver({ rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    const timelineObserver = makeObserver({ rootMargin: "0px", threshold: 0.2 });

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal=""], [data-reveal="hidden"]'),
    );
    for (const el of targets) {
      if (el.dataset.revealKind === "timeline") {
        // Always play the entrance, even if already in view: hide, then observe
        // (the observer fires straight away for anything at least 20% visible).
        el.dataset.reveal = "hidden";
        timelineObserver.observe(el);
        continue;
      }
      // Already on screen (or scrolled past, e.g. a deep link): leave it visible.
      if (el.dataset.reveal === "" && el.getBoundingClientRect().top < window.innerHeight * 0.92) {
        continue;
      }
      el.dataset.reveal = "hidden";
      observer.observe(el);
    }

    return () => {
      observer.disconnect();
      timelineObserver.disconnect();
    };
  }, [pathname]);

  return null;
}
