import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type CardElement = "div" | "article" | "li" | "figure" | "section";

interface CardProps extends HTMLAttributes<HTMLElement> {
  as?: CardElement;
}

/** Glass surface: 20px radius, subtle border. */
export default function Card({ as: Tag = "div", className, ...props }: CardProps) {
  return (
    <Tag
      className={cn("rounded-card border border-border bg-surface", className)}
      {...props}
    />
  );
}
