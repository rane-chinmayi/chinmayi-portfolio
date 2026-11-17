"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

interface TypewriterTextProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
  /** Extra classes for the blinking cursor (e.g. a different colour/weight). */
  cursorClassName?: string;
}

/**
 * Types, pauses, deletes and loops through `texts`.
 *
 * - The first text is fully shown on the server and on first paint, then the
 *   loop starts by deleting it. With prefers-reduced-motion it stays put.
 * - No layout shift: every text is rendered invisibly in the same grid cell,
 *   so the element is always as tall as the tallest text at the current width.
 * - Screen readers get the first text once (sr-only); the animation is hidden.
 */
export default function TypewriterText({
  texts,
  typingSpeed = 65,
  deletingSpeed = 35,
  pauseDuration = 1750,
  className,
  cursorClassName,
}: TypewriterTextProps) {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(() => texts[0].length);
  const [isDeleting, setIsDeleting] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const currentText = texts[textIndex];

    if (!isDeleting && charIndex === currentText.length) {
      const pauseTimeout = setTimeout(() => setIsDeleting(true), pauseDuration);
      return () => clearTimeout(pauseTimeout);
    }

    if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % texts.length);
      return;
    }

    const timeout = setTimeout(
      () => setCharIndex((prev) => prev + (isDeleting ? -1 : 1)),
      isDeleting ? deletingSpeed : typingSpeed,
    );
    return () => clearTimeout(timeout);
  }, [
    charIndex,
    isDeleting,
    textIndex,
    texts,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    reduceMotion,
  ]);

  return (
    <span className={cn("grid", className)}>
      <span className="sr-only">{texts[0]}</span>
      {texts.map((text) => (
        <span
          key={text}
          aria-hidden="true"
          className="invisible col-start-1 row-start-1"
        >
          {text}|
        </span>
      ))}
      <span aria-hidden="true" className="col-start-1 row-start-1">
        {reduceMotion ? texts[0] : texts[textIndex].slice(0, charIndex)}
        {!reduceMotion && (
          <span className={cn("animate-blink", cursorClassName)}>|</span>
        )}
      </span>
    </span>
  );
}
