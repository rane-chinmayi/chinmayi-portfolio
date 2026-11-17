import Link from "next/link";
import type { AnchorHTMLAttributes, HTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { isPlainAnchor, newTabProps } from "@/lib/links";

type Surface = "glass" | "solid";
type Edge = "default" | "raised" | "strong";
type CardElement = "div" | "article" | "li" | "figure" | "section";

interface StyleProps {
  /** "glass" = translucent surface; "solid" = near-opaque (floating badges). */
  surface?: Surface;
  /** "raised" = slightly stronger border (photo frame); "strong" = featured card. */
  edge?: Edge;
  /** Hover: border brightens and the card lifts (not under reduced motion). */
  interactive?: boolean;
}

type BoxProps = StyleProps &
  HTMLAttributes<HTMLElement> & { as?: CardElement; href?: undefined };

type LinkCardProps = StyleProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string;
    /** Opens in a new tab with rel="noopener noreferrer". */
    newTab?: boolean;
  };

export type CardProps = BoxProps | LinkCardProps;

const base = "rounded-card border";

const surfaces: Record<Surface, string> = {
  glass: "bg-surface",
  solid: "bg-surface-solid/95",
};

const edges: Record<Edge, string> = {
  default: "border-border",
  raised: "border-border-chip",
  strong: "border-border-strong",
};

const lift =
  "transition duration-200 hover:-translate-y-1 hover:border-border-strong active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0";

/** Glass surface, 20px radius, subtle border. Renders a link when `href` is set. */
export default function Card(props: CardProps) {
  if (props.href !== undefined) {
    const {
      surface = "glass",
      edge = "default",
      interactive = true,
      newTab,
      className,
      href,
      ...rest
    } = props;
    const classes = cn(
      base,
      surfaces[surface],
      edges[edge],
      "block",
      interactive && lift,
      className,
    );
    const extra = newTab ? newTabProps : {};

    if (isPlainAnchor(href)) {
      return <a href={href} className={classes} {...extra} {...rest} />;
    }
    return <Link href={href} className={classes} {...extra} {...rest} />;
  }

  const {
    surface = "glass",
    edge = "default",
    interactive = false,
    as: Tag = "div",
    className,
    ...rest
  } = props;
  return (
    <Tag
      className={cn(
        base,
        surfaces[surface],
        edges[edge],
        interactive && lift,
        className,
      )}
      {...rest}
    />
  );
}
