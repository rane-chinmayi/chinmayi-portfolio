import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

/** Centred intro paragraph (17px, max 640px) used under section headings. */
export default function Lead({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "mx-auto max-w-[640px] text-center text-[17px] leading-[1.65] text-muted",
        className,
      )}
      {...props}
    />
  );
}
