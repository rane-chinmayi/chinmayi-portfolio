import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "@/lib/cn";
import { isPlainAnchor, newTabProps } from "@/lib/links";

type Variant = "primary" | "secondary" | "outline";
type Size = "xl" | "lg" | "md" | "sm" | "field" | "block";

interface CommonProps {
  variant?: Variant;
  size?: Size;
  /** Resting glow under a primary button (stronger on hover). On for every primary; pass false to opt out. */
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
  "inline-flex items-center justify-center gap-2 rounded-pill border font-semibold transition duration-200 motion-safe:active:scale-[0.98] motion-reduce:transition-none";

const variants: Record<Variant, string> = {
  // bg-accent is the solid fallback under the gradient: the label (on-accent) is
  // dark, so a button must never be left without a fill.
  primary:
    "border-transparent bg-accent bg-accent-gradient text-on-accent hover:brightness-110 active:brightness-95",
  // Hero secondary: outline with a faint fill.
  secondary:
    "border-border-strong bg-fill-subtle text-foreground hover:bg-fill-chip active:bg-fill-soft",
  // Plain outline, no fill (contact, offers).
  outline:
    "border-border-strong bg-transparent text-foreground hover:bg-fill-chip active:bg-fill-soft",
};

// Padding includes the 1px border, so primary and secondary are the same size.
// Each size mirrors a button in the reference (outer padding in comments).
const sizes: Record<Size, string> = {
  xl: "min-h-[52px] px-7 py-3.5 text-[16px]", // contact CTAs: 52px tall
  lg: "px-[27px] py-3.5 text-[16px]", // 15/28: hero CTAs
  md: "px-[25px] py-[13px] text-[16px]", // 14/26: contact CTAs
  sm: "px-[19px] py-[9px] text-[14px]", // 10/20: nav, offer links
  field: "px-[25px] py-3.5 text-[15px]", // 15/26: form submit
  block: "px-[19px] py-3 text-[15px]", // 13/20: full-width card button
};

/** Pill button. Renders a link when `href` is given, otherwise a <button>. */
export default function Button(props: ButtonProps) {
  if (props.href !== undefined) {
    const {
      variant = "primary",
      size = "lg",
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
      variant === "primary" && glow && "shadow-glow glow-hover",
      sizes[size],
      className,
    );
    const extra = newTab ? newTabProps : {};

    if (isPlainAnchor(href)) {
      return (
        <a href={href} className={classes} {...extra} {...rest}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...extra} {...rest}>
        {children}
      </Link>
    );
  }

  const {
    variant = "primary",
    size = "lg",
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
        variant === "primary" && glow && "shadow-glow glow-hover",
        sizes[size],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
