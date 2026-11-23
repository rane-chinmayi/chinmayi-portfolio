import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "default" | "muted" | "accent" | "overlay";
type Size = "sm" | "md";

interface ChipProps {
  children: ReactNode;
  /**
   * "muted": status chips (grey text). "accent": highlighted label. "overlay":
   * sits on an image/gradient, with a dark translucent background.
   */
  tone?: Tone;
  /** "sm" = 13px (default); "md" = 14px and roomier (contact chips). */
  size?: Size;
  className?: string;
}

const tones: Record<Tone, string> = {
  default: "bg-fill-chip text-chip",
  muted: "bg-fill-chip text-muted",
  accent: "bg-fill-chip text-accent-text",
  overlay: "bg-background/70 text-chip",
};

// gap = space between an icon and the label (6px, or 8px for md).
const sizes: Record<Size, string> = {
  sm: "gap-1.5 px-3 py-1.5 text-[13px]",
  md: "gap-2 px-4 py-2 text-[14px]",
};

/** Small pill label (13px, or 14px with size="md"). */
export default function Chip({
  children,
  tone = "default",
  size = "sm",
  className,
}: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill border border-border-chip font-medium",
        sizes[size],
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
