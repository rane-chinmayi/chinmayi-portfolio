import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Centred intro paragraph (17px, max 640px) used under section headings. */
export default function Lead({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "mx-auto max-w-[640px] text-center text-[17px] leading-[1.65] text-muted",
        className,
      )}
    >
      {children}
    </p>
  );
}
