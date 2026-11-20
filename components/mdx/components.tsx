import Link from "next/link";
import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { isPlainAnchor, newTabProps } from "@/lib/links";
import Callout from "./Callout";
import Figure from "./Figure";

/*
 * Element map for case-study MDX, styled with the site tokens.
 * Body copy: Inter 17px / 1.75; headings: Poppins. The column width (720px)
 * is set by the wrapper in MdxBody.
 */

const body = "text-[17px] leading-[1.75] text-soft";

function A({ href = "", className, children, ...rest }: ComponentPropsWithoutRef<"a">) {
  const classes = cn(
    "font-medium text-accent-text underline decoration-accent-text/40 underline-offset-4 transition-colors hover:decoration-accent-text",
    className,
  );
  if (isPlainAnchor(href)) {
    const external = /^https?:|^\/\//i.test(href);
    return (
      <a href={href} className={classes} {...(external ? newTabProps : {})} {...rest}>
        {children}
        {external && <span className="sr-only">{site.labels.opensInNewTab}</span>}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}

/** Scrollable on narrow screens; focusable so keyboard users can scroll it. */
function Table({ children }: ComponentPropsWithoutRef<"table">) {
  return (
    <div
      role="region"
      aria-label={site.work.page.tableLabel}
      tabIndex={0}
      className="my-8 overflow-x-auto rounded-card border border-border bg-surface"
    >
      <table className="w-full border-collapse text-left">{children}</table>
    </div>
  );
}

export const mdxComponents: MDXComponents = {
  h2: ({ className, ...props }) => (
    <h2
      className={cn(
        "mb-4 mt-14 text-balance font-heading text-[26px] font-semibold leading-[1.25] text-foreground sm:text-[30px]",
        className,
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }) => (
    <h3
      className={cn(
        "mb-3 mt-10 text-balance font-heading text-[20px] font-semibold leading-[1.3] text-foreground sm:text-[22px]",
        className,
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }) => <p className={cn("my-5", body, className)} {...props} />,
  ul: ({ className, ...props }) => (
    <ul
      className={cn("my-5 list-disc space-y-2.5 pl-6 marker:text-accent-text", body, className)}
      {...props}
    />
  ),
  ol: ({ className, ...props }) => (
    <ol
      className={cn(
        "my-5 list-decimal space-y-2.5 pl-6 marker:font-semibold marker:text-accent-text",
        body,
        className,
      )}
      {...props}
    />
  ),
  li: ({ className, ...props }) => <li className={cn("pl-1", className)} {...props} />,
  strong: ({ className, ...props }) => (
    <strong className={cn("font-semibold text-foreground", className)} {...props} />
  ),
  a: A,
  code: ({ className, ...props }) => (
    <code
      className={cn(
        "rounded-md bg-fill-chip px-1.5 py-0.5 font-mono text-[0.88em] text-chip",
        className,
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }) => (
    <pre
      className={cn(
        "my-6 overflow-x-auto rounded-inner border border-border bg-field p-4 text-[14px] leading-[1.7] text-soft [&_code]:bg-transparent [&_code]:p-0",
        className,
      )}
      {...props}
    />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn("my-6 border-l-2 border-border-strong pl-5 italic [&>p]:my-2", className)}
      {...props}
    />
  ),
  hr: ({ className, ...props }) => (
    <hr className={cn("my-12 border-border-soft", className)} {...props} />
  ),
  table: Table,
  thead: (props) => <thead {...props} />,
  th: ({ className, ...props }) => (
    <th
      className={cn(
        "min-w-[120px] bg-fill-chip px-4 py-3 align-bottom text-[12px] font-semibold uppercase tracking-[0.1em] text-muted",
        className,
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }) => (
    <td
      className={cn(
        "min-w-[120px] border-t border-border px-4 py-3 align-top text-[15px] leading-[1.6] text-soft",
        className,
      )}
      {...props}
    />
  ),
  Figure,
  Callout,
};
