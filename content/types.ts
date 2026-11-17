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

export interface RoleItem {
  title: string;
  company: string;
  location: string;
  /** Display string, e.g. "May 2025 – Present". */
  dates: string;
  summary: string;
  /** The current role gets a solid accent timeline dot. */
  current?: boolean;
}

export interface EducationItem {
  /** Small uppercase label line, e.g. "MS · 2022–2024". */
  label: string;
  degree: string;
  institution: string;
  gpa: string;
}

export interface ExperienceContent {
  roles: RoleItem[];
  /** Visually hidden heading for the education cards. */
  educationHeading: string;
  education: EducationItem[];
}

export type PostType = "Carousel" | "Newsletter";

export interface PostItem {
  title: string;
  type: PostType;
  /** Omit for posts that are not published yet (rendered as a plain card). */
  href?: string;
}

export interface NewsletterContent {
  /** Which email service handles signups. null until one is chosen. */
  provider: string | null;
  /** Form POST endpoint. Empty = "launching soon" message, nothing is submitted. */
  actionUrl: string;
  heading: string;
  subline: string;
  emailLabel: string;
  emailPlaceholder: string;
  submitLabel: string;
  invalidMessage: string;
  unavailableMessage: string;
}

export interface WritingContent {
  posts: PostItem[];
  readLabel: string;
  newsletter: NewsletterContent;
}

export interface OfferItem {
  kind: "course" | "template" | "mentorship";
  chip: string;
  title: string;
  description: string;
  /** Shown in the bottom row instead of `status` once you set it. */
  price?: string;
  /** Bottom-row text while there is no price, e.g. "Waitlist open". */
  status?: string;
  /** The button is hidden until `href` is set. */
  cta?: { label: string; href?: string };
  /** Stronger border + full-width primary button (the featured offer). */
  featured?: boolean;
}

export interface TestimonialItem {
  quote: string;
  name: string;
  role: string;
  initials: string;
}

export interface ContactContent {
  emailLabel: string;
  linkedinLabel: string;
  resumeLabel: string;
  chips: string[];
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
    /** Suggested filename when the resume is downloaded. */
    resumeFilename: string;
  };
  footer: string;
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
    opensInNewTab: string;
  };
  hero: HeroContent;
  about: AboutContent;
  expertise: { items: ExpertiseItem[] };
  work: { items: CaseStudy[] };
  experience: ExperienceContent;
  writing: WritingContent;
  offers: { items: OfferItem[] };
  testimonials: { items: TestimonialItem[] };
  contact: ContactContent;
  sections: Record<SectionKey, SectionIntro>;
}
