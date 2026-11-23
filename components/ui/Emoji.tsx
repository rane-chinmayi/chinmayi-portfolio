import { cn } from "@/lib/cn";

interface EmojiProps {
  /** The emoji itself, from content/site.ts. */
  children: string;
  /** "md" = 1em (buttons, location line); "sm" = 0.95em (chips). */
  size?: "md" | "sm";
  className?: string;
}

const sizes = {
  md: "text-[1em]",
  sm: "text-[0.95em]",
};

/**
 * Decorative emoji icon, used only in the Contact section (the one place the
 * "no emoji as icons" rule is waived). Hidden from screen readers, so only the
 * label is read, and set in Noto Color Emoji so it looks the same everywhere.
 * `leading-none` + the parent's `items-center` keep it centred on the text.
 */
export default function Emoji({ children, size = "md", className }: EmojiProps) {
  return (
    <span
      aria-hidden="true"
      className={cn("shrink-0 font-emoji leading-none", sizes[size], className)}
    >
      {children}
    </span>
  );
}
