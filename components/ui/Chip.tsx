import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface ChipProps {
  children: ReactNode;
  /** "muted" is for chips that carry status (e.g. availability) rather than a label. */
  tone?: "default" | "muted";
  className?: string;
}

/** Small pill label (13px). */
export default function Chip({ children, tone = "default", className }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-pill border border-border-chip bg-fill-chip px-3 py-1.5 text-[13px] font-medium",
        tone === "muted" ? "text-muted" : "text-chip",
        className,
      )}
    >
      {children}
    </span>
  );
}
