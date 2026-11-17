import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary";
type Size = "md" | "sm";

interface CommonProps {
  variant?: Variant;
  size?: Size;
  /** Resting glow under a primary button. On by default; off for nav buttons. */
  glow?: boolean;
  className?: string;
  children: ReactNode;
}

type LinkButtonProps = CommonProps & {
  href: string;
  /** Opens in a new tab with rel="noopener noreferrer". */
  newTab?: boolean;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps | "href">;

type NativeButtonProps = CommonProps & {
  href?: undefined;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps>;

export type ButtonProps = LinkButtonProps | NativeButtonProps;

const base =
  "inline-flex items-center justify-center gap-2 rounded-pill border font-semibold transition duration-200 motion-reduce:transition-none";

const variants: Record<Variant, string> = {
  primary: "border-transparent bg-accent text-on-accent hover:brightness-110",
  secondary:
    "border-border-strong bg-fill-subtle text-foreground hover:bg-fill-chip",
};

// Padding includes the 1px border, so primary and secondary are the same size.
const sizes: Record<Size, string> = {
  md: "px-[27px] py-3.5 text-[16px]",
  sm: "px-[19px] py-[9px] text-[14px]",
};

/**
 * Links that must NOT go through next/link: other schemes (https:, mailto:)
 * and direct file URLs such as /resume.pdf. Everything else is an internal
 * route or hash and uses next/link.
 */
const PLAIN_ANCHOR = /^(?:[a-z][a-z0-9+.-]*:|\/\/)|\/[^/?#]*\.[a-z]{2,5}(?:[?#]|$)/i;

/** Pill button. Renders a link when `href` is given, otherwise a <button>. */
export default function Button(props: ButtonProps) {
  if (props.href !== undefined) {
    const {
      variant = "primary",
      size = "md",
      glow = true,
      className,
      children,
      href,
      newTab,
      ...rest
    } = props;
    const classes = cn(
      base,
      variants[variant],
      variant === "primary" && glow && "shadow-glow",
      sizes[size],
      className,
    );
    const newTabProps = newTab
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};

    if (PLAIN_ANCHOR.test(href)) {
      return (
        <a href={href} className={classes} {...newTabProps} {...rest}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...newTabProps} {...rest}>
        {children}
      </Link>
    );
  }

  const {
    variant = "primary",
    size = "md",
    glow = true,
    className,
    children,
    ...rest
  } = props;
  return (
    <button
      type="button"
      className={cn(
        base,
        variants[variant],
        variant === "primary" && glow && "shadow-glow",
        sizes[size],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
