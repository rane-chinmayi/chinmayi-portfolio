export interface LinkItem {
  label: string;
  href: string;
}

/**
 * Text with inline emphasis: plain strings and `{ em }` runs.
 * e.g. ["moved toward the ", { em: "why" }, " behind what we build."]
 */
export type RichTextContent = Array<string | { em: string }>;

/** Heading block shown at the top of a homepage section. */
export interface SectionIntro {
  eyebrow?: string;
  title: string;
  lead?: string;
}

export type SectionKey =
  | "about"
  | "expertise"
  | "work"
  | "experience"
  | "writing"
  | "offers"
  | "testimonials"
  | "contact";

export interface HeroContent {
  eyebrow: string;
  greeting: string;
  name: string;
  /** Typewriter sentences, in order. The first is also the static/SSR text. */
  rotatingTaglines: string[];
  bio: RichTextContent;
  primaryCta: LinkItem;
  secondaryCta: LinkItem;
  chips: string[];
  connectLabel: string;
  photo: { src: string; alt: string; objectPosition: string };
  /** Floating card, bottom-left of the photo. `lines` are stacked. */
  statBadge: { value: string; lines: string[] };
  /** Floating card, top-right of the photo. */
  awardBadge: { value: string; label: string };
}

export interface StatItem {
  value: string;
  label: string;
}

export interface AboutContent {
  paragraphs: RichTextContent[];
  stats: StatItem[];
}

export type ExpertiseIcon = "search" | "sparkles" | "code" | "chart";

export interface ExpertiseItem {
  icon: ExpertiseIcon;
  title: string;
  description: string;
  chips: string[];
}

export interface CaseStudy {
  /** URL segment: the card links to /work/[slug]. */
  slug: string;
  chip: string;
  title: string;
  description: string;
  /** Short result line shown with an arrow. */
  outcome: string;
  /** Centre of the accent glow in the card's image area, e.g. "30% 40%". */
  glowPosition: string;
}

export interface SiteContent {
  name: string;
  /** Used in the header wordmark. */
  shortName: string;
  tagline: string;
  /** Page <title>. */
  title: string;
  /** Meta description. */
  description: string;
  nav: LinkItem[];
  links: {
    linkedin: string;
    email: string;
    emailHref: string;
    /** Static file in /public. */
    resume: string;
  };
  footer: string;
  comingSoon: string;
  /** Accessible labels and short UI strings. */
  labels: {
    skipToContent: string;
    primaryNav: string;
    mobileNav: string;
    openMenu: string;
    closeMenu: string;
    resume: string;
    linkedin: string;
    email: string;
  };
  hero: HeroContent;
  about: AboutContent;
  expertise: { items: ExpertiseItem[] };
  work: { items: CaseStudy[] };
  sections: Record<SectionKey, SectionIntro>;
}
