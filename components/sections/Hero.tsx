import { Check, Sparkles } from "lucide-react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Chip from "@/components/ui/Chip";
import Eyebrow from "@/components/ui/Eyebrow";
import RichText from "@/components/ui/RichText";
import Section from "@/components/ui/Section";
import SocialIcon from "@/components/ui/SocialIcon";
import TypewriterText from "@/components/ui/TypewriterText";
import { site } from "@/content/site";

const iconLinkClass =
  "flex size-[42px] items-center justify-center rounded-pill border border-border-chip text-muted transition-colors duration-200 hover:border-accent-text hover:text-accent-text motion-reduce:transition-none";

export default function Hero() {
  const { hero, links, labels } = site;

  return (
    <Section
      id="top"
      labelledBy="hero-title"
      padding="none"
      className="pb-24 pt-32 sm:pt-40 lg:pb-28 lg:pt-[182px]"
    >
      <div className="grid items-center gap-16 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div>
          <Eyebrow>
            <Sparkles className="size-3.5 text-accent-text" aria-hidden="true" />
            {hero.eyebrow}
          </Eyebrow>

          <p className="mb-1 mt-7 text-[26px] text-muted">{hero.greeting}</p>
          <h1
            id="hero-title"
            className="m-0 font-heading text-display text-foreground"
          >
            {hero.name}
          </h1>
          <p className="mt-3.5 font-heading text-tagline text-accent-text">
            <TypewriterText
              texts={hero.rotatingTaglines}
              cursorClassName="font-normal text-foreground"
            />
          </p>

          <p className="mt-6 max-w-[600px] text-[18px] leading-[1.65] text-muted">
            <RichText value={hero.bio} />
          </p>

          <div className="mt-8 flex flex-wrap gap-3.5">
            <Button href={hero.primaryCta.href}>{hero.primaryCta.label}</Button>
            <Button href={hero.secondaryCta.href} variant="secondary">
              {hero.secondaryCta.label}
            </Button>
          </div>

          <ul className="mt-7 flex flex-wrap gap-2.5">
            {hero.chips.map((chip) => (
              <li key={chip}>
                <Chip tone="muted">
                  <Check
                    className="size-3.5 text-accent-text"
                    aria-hidden="true"
                  />
                  {chip}
                </Chip>
              </li>
            ))}
          </ul>

          <div className="mt-7 flex items-center gap-4 text-[12px] font-semibold uppercase tracking-eyebrow text-muted">
            <span>{hero.connectLabel}</span>
            <a
              href={links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={labels.linkedin}
              className={iconLinkClass}
            >
              <SocialIcon kind="linkedin" className="size-[18px]" />
            </a>
            <a
              href={links.emailHref}
              aria-label={labels.email}
              className={iconLinkClass}
            >
              <SocialIcon kind="email" className="size-[18px]" />
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[380px]">
          <Card edge="raised" className="p-3">
            <div className="relative aspect-[4/5] overflow-hidden rounded-inner bg-surface-solid">
              <Image
                src={hero.photo.src}
                alt={hero.photo.alt}
                fill
                sizes="(min-width: 420px) 356px, calc(100vw - 72px)"
                className="object-cover"
                style={{ objectPosition: hero.photo.objectPosition }}
                priority
              />
            </div>
          </Card>

          {/* Floating badges. Offsets are smaller on phones so they stay inside the viewport. */}
          <Card
            surface="solid"
            className="absolute -left-4 bottom-14 flex items-center gap-3 px-[18px] py-3.5 sm:-left-9"
          >
            <span className="font-heading text-[26px] font-extrabold text-accent-text">
              {hero.statBadge.value}
            </span>
            <span className="text-[13px] leading-[1.3] text-muted">
              {hero.statBadge.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </span>
          </Card>

          <Card
            surface="solid"
            className="absolute -right-3 top-10 px-4 py-3 text-[13px] font-semibold sm:-right-6"
          >
            <span className="text-accent-text">{hero.awardBadge.value}</span>{" "}
            {hero.awardBadge.label}
          </Card>
        </div>
      </div>
    </Section>
  );
}
