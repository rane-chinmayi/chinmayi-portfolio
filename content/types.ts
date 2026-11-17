export interface LinkItem {
  label: string;
  href: string;
}

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
  /** Sentences the typewriter cycles through, in order. */
  rotatingTaglines: string[];
  bio: string;
  primaryCta: LinkItem;
  secondaryCta: LinkItem;
  chips: string[];
  connectLabel: string;
  photo: { src: string; alt: string };
  badge: { value: string; line1: string; line2: string };
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
  sections: Record<SectionKey, SectionIntro>;
}
