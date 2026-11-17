import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "default" | "muted" | "accent" | "overlay";

interface ChipProps {
  children: ReactNode;
  /**
   * "muted": status chips (grey text). "accent": highlighted label. "overlay":
   * sits on an image/gradient, with a dark translucent background.
   */
  tone?: Tone;
  className?: string;
}

const tones: Record<Tone, string> = {
  default: "bg-fill-chip text-chip",
  muted: "bg-fill-chip text-muted",
  accent: "bg-fill-chip text-accent-text",
  overlay: "bg-background/70 text-chip",
};

/** Small pill label (13px). */
export default function Chip({
  children,
  tone = "default",
  className,
}: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-pill border border-border-chip px-3 py-1.5 text-[13px] font-medium",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
