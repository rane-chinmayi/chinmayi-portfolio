import { Plus } from "lucide-react";
import Image from "next/image";
import Card from "@/components/ui/Card";
import type { ProfileCardContent } from "@/content/types";

interface ProfileCardProps extends ProfileCardContent {
  /** Profile URL: the whole card links here, in a new tab. */
  href: string;
}

/**
 * LinkedIn-style profile card. The whole card is ONE link (no nested button):
 * the "Follow" pill is a styled span. Hover brightens the border, lifts the card
 * 2px and strengthens the pill's glow; keyboard focus shows the global focus
 * ring. No lift under reduced motion. Phone sizes are tighter (name 16px, 40px
 * photo, snug padding) so it stays on one row down to about 360px; below that the
 * pill drops under the name instead of squeezing the text.
 */
export default function ProfileCard({
  name,
  tagline,
  buttonLabel,
  ariaLabel,
  photo,
  href,
}: ProfileCardProps) {
  return (
    <Card
      href={href}
      newTab
      interactive={false}
      aria-label={ariaLabel}
      className="group mx-auto w-full max-w-[460px] px-3 py-4 text-left transition duration-200 hover:-translate-y-0.5 hover:border-border-strong active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:px-5"
    >
      <span className="flex flex-wrap items-center gap-x-2.5 gap-y-3 sm:gap-x-4">
        {/* Avatar: accent ring, small gap, then the photo. */}
        <span className="shrink-0 rounded-pill border-2 border-accent p-[3px]">
          <span
            aria-hidden="true"
            className="relative block size-10 overflow-hidden rounded-pill sm:size-[60px]"
          >
            <Image
              src={photo}
              alt=""
              fill
              sizes="(min-width: 640px) 60px, 40px"
              className="object-cover"
            />
          </span>
        </span>

        <span className="min-w-[126px] flex-1">
          <span className="block font-heading text-[16px] font-semibold leading-snug text-foreground sm:text-[20px]">
            {name}
          </span>
          <span className="mt-0.5 block text-[15px] leading-snug text-muted">{tagline}</span>
        </span>

        {/* Looks like a primary button but is a span: the card is the link. */}
        <span className="inline-flex h-10 shrink-0 items-center gap-1 rounded-pill bg-accent bg-accent-gradient px-3 text-[15px] font-semibold text-on-accent shadow-glow transition-shadow duration-200 group-glow motion-reduce:transition-none sm:gap-1.5 sm:px-5">
          <Plus className="size-3.5 sm:size-4" aria-hidden="true" />
          {buttonLabel}
        </span>
      </span>
    </Card>
  );
}
