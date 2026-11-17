import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import Container from "./Container";

interface SectionProps {
  /** Anchor id, e.g. "about" → /#about. */
  id: string;
  /** id of the heading that names this region. Defaults to `${id}-title`. */
  labelledBy?: string;
  /** "default" = bottom spacing only. "none" lets a section (the hero) set its own. */
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
        // Reference rhythm: no top padding, 120px below each section.
        padding === "default" && "pb-20 md:pb-[120px]",
        className,
      )}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
