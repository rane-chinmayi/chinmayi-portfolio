import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import Container from "./Container";

interface SectionProps {
  /** Anchor id, e.g. "about" → /#about. */
  id: string;
  /** id of the heading that names this region. Defaults to `${id}-title`. */
  labelledBy?: string;
  /** "none" lets a section (e.g. the hero) set its own vertical spacing. */
  padding?: "default" | "none";
  className?: string;
  containerClassName?: string;
  children: ReactNode;
}

/** Page section: anchor id, vertical rhythm and a Container. */
export default function Section({
  id,
  labelledBy = `${id}-title`,
  padding = "default",
  className,
  containerClassName,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "relative",
        padding === "default" && "py-16 sm:py-24 lg:py-28",
        className,
      )}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
