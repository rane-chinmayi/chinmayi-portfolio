"use client";

import { useEffect, useState } from "react";

interface TypewriterTextProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
}

/**
 * Types, pauses, deletes and loops through `texts`.
 * With prefers-reduced-motion it shows the first text, static. All texts are
 * available to screen readers and crawlers via an sr-only copy.
 */
export default function TypewriterText({
  texts,
  typingSpeed = 65,
  deletingSpeed = 35,
  pauseDuration = 1750,
  className,
}: TypewriterTextProps) {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
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
    <span className={className}>
      <span className="sr-only">{texts.join(" ")}</span>
      <span aria-hidden="true">
        {reduceMotion ? texts[0] : texts[textIndex].slice(0, charIndex)}
        {!reduceMotion && <span className="animate-blink">|</span>}
      </span>
    </span>
  );
}
