import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

/** Centred page-width wrapper (max 1200px, 24px gutters). */
export default function Container({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mx-auto w-full max-w-container px-6", className)}
      {...props}
    />
  );
}
