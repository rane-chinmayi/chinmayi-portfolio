import type { ReactNode } from "react";

/**
 * Highlighted aside in a case study: glass card, accent left edge, Poppins
 * title. The title is a <p>, not a heading, so it doesn't change the outline.
 */
export default function Callout({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <aside
      className="my-8 rounded-card border border-l-4 border-border border-l-accent bg-surface px-6 py-5 sm:px-7 sm:py-6"
    >
      <p className="mb-2 font-heading text-[18px] font-semibold leading-snug text-foreground">
        {title}
      </p>
      <div className="[&>p]:my-0 [&>p]:text-[16px] [&>p]:leading-[1.7] [&>p+p]:mt-3">
        {children}
      </div>
    </aside>
  );
}
