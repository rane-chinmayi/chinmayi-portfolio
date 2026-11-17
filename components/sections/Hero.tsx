import { Check, ChevronDown, Sparkles } from "lucide-react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Chip from "@/components/ui/Chip";
import Eyebrow from "@/components/ui/Eyebrow";
import Section from "@/components/ui/Section";
import SocialIcon from "@/components/ui/SocialIcon";
import TypewriterText from "@/components/ui/TypewriterText";
import { site } from "@/content/site";

const iconLinkClass =
  "flex size-12 items-center justify-center rounded-pill border border-border-strong text-muted transition-all duration-200 hover:scale-105 hover:border-accent-text hover:text-accent-text motion-reduce:transition-none motion-reduce:hover:scale-100";

/** Step 1: layout unchanged, now on tokens/fonts/ui components. Reworked in Step 2. */
export default function Hero() {
  const { hero, links, labels } = site;

  return (
    <Section
      id="top"
      labelledBy="hero-title"
      padding="none"
      className="flex min-h-screen items-center pb-16 pt-28 lg:pt-24"
    >
      <div className="grid gap-16 lg:grid-cols-2 lg:items-center lg:gap-12">
        <div>
          <Eyebrow>
            <Sparkles className="size-3.5 text-accent-text" aria-hidden="true" />
            {hero.eyebrow}
          </Eyebrow>

          <p className="mt-6 text-lg font-medium text-muted">{hero.greeting}</p>
          <h1
            id="hero-title"
            className="mt-1 font-heading text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl lg:text-7xl"
          >
            {hero.name}
          </h1>
          <div className="mt-4 min-h-[3.5rem] font-heading text-xl font-bold text-accent-text sm:min-h-[4rem] sm:text-2xl">
            <TypewriterText texts={hero.rotatingTaglines} />
          </div>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
            {hero.bio}
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button href={hero.primaryCta.href}>{hero.primaryCta.label}</Button>
            <Button href={hero.secondaryCta.href} variant="secondary">
              {hero.secondaryCta.label}
            </Button>
          </div>

          <ul className="mt-6 flex flex-wrap gap-3">
            {hero.chips.map((chip) => (
              <li key={chip}>
                <Chip tone="muted">
                  <Check className="size-3.5 text-accent-text" aria-hidden="true" />
                  {chip}
                </Chip>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <p className="text-xs font-semibold uppercase tracking-eyebrow text-muted">
              {hero.connectLabel}
            </p>
            <div className="mt-3 flex items-center gap-4">
              <a
                href={links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={labels.linkedin}
                className={iconLinkClass}
              >
                <SocialIcon kind="linkedin" className="size-5" />
              </a>
              <a
                href={links.emailHref}
                aria-label={labels.email}
                className={iconLinkClass}
              >
                <SocialIcon kind="email" className="size-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative">
            <div className="relative aspect-[4/5] w-56 overflow-hidden rounded-card border border-border bg-surface-solid sm:w-64 lg:w-72">
              <Image
                src={hero.photo.src}
                alt={hero.photo.alt}
                fill
                sizes="(min-width: 1024px) 288px, (min-width: 640px) 256px, 224px"
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute -left-6 top-[80%] flex -translate-y-1/2 flex-col items-center">
              <div className="flex items-center gap-2.5 rounded-card border border-border-strong bg-surface-solid px-4 py-3 shadow-elevated">
                <span className="font-heading text-3xl font-extrabold leading-none text-accent-text">
                  {hero.badge.value}
                </span>
                <div className="flex flex-col leading-tight">
                  <span className="text-sm font-bold text-foreground">
                    {hero.badge.line1}
                  </span>
                  <span className="text-xs font-normal text-muted">
                    {hero.badge.line2}
                  </span>
                </div>
              </div>
              <ChevronDown
                className="mt-1.5 size-4 text-subtle"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
