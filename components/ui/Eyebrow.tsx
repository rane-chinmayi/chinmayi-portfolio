import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Small neutral uppercase pill that sits above a heading. */
export default function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-pill border border-border bg-fill-subtle px-4 py-2 text-xs font-semibold uppercase tracking-eyebrow text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
