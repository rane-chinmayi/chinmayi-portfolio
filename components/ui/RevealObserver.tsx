"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Scroll-reveal, progressively enhanced. Elements marked with `data-reveal`
 * (see lib/reveal.ts) are server-rendered fully visible. After hydration this
 * hides only the ones still below the fold, then fades each one up as it
 * enters the viewport. Without JS, or with prefers-reduced-motion, nothing is
 * ever hidden. Only opacity/transform change, so there is no layout shift.
 */
export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const finish = (el: HTMLElement) => {
      el.dataset.reveal = "done"; // drop the reveal transition so hover effects aren't slowed
    };

    const observer = new IntersectionObserver(
      (entries) => {
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
          window.setTimeout(() => finish(el), 1500); // fallback if no transition fires
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal=""], [data-reveal="hidden"]'),
    );
    for (const el of targets) {
      // Already on screen (or scrolled past, e.g. a deep link): leave it visible.
      if (el.dataset.reveal === "" && el.getBoundingClientRect().top < window.innerHeight * 0.92) {
        continue;
      }
      el.dataset.reveal = "hidden";
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
