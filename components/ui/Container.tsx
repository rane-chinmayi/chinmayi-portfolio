import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type ContainerWidth = "default" | "timeline" | "narrow";

const widths: Record<ContainerWidth, string> = {
  default: "max-w-container", // content 1200px
  timeline: "max-w-timeline", // content 960px
  narrow: "max-w-narrow", // content 900px
};

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  width?: ContainerWidth;
}

/** Centred page-width wrapper with 24px gutters. */
export default function Container({
  width = "default",
  className,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full px-6", widths[width], className)}
      {...props}
    />
  );
}
