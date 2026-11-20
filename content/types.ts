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
  /** Chips that are always shown. */
  chips: string[];
  /** Last chip while the newsletter feature is on. */
  newsletterChip: string;
  /** Last chip while the newsletter feature is off. */
  writingChip: string;
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

/** One key result, shown as a stat card and (the first) as a card's outcome line. */
export interface WorkMetric {
  value: string;
  label: string;
}

/** An outbound link on a case study (live demo, dashboard, sheet...). */
export interface WorkLink {
  label: string;
  href: string;
}

/**
 * Frontmatter of content/work/<slug>.mdx. Every field is required; lib/work.ts
 * validates this at build time and fails with the file name and field.
 */
export interface WorkFrontmatter {
  title: string;
  /** URL segment: /work/[slug]. Must match the file name. */
  slug: string;
  summary: string;
  /** Chip text, e.g. "AI Product · RAG". */
  category: string;
  role: string;
  timeline: string;
  tools: string[];
  tags: string[];
  /** Shown in the homepage Work section. */
  featured: boolean;
  /** Sort order (ascending) on /work, the homepage and "Next case study". */
  order: number;
  /** At least one. The first is the card's outcome line. */
  metrics: WorkMetric[];
  /** May be empty (the links row is then hidden). */
  links: WorkLink[];
}

/** A case study: validated frontmatter plus the raw MDX body. */
export interface WorkItem extends WorkFrontmatter {
  body: string;
}

export interface WorkContent {
  /** Centre of the accent glow on each card's image area, cycled by position. */
  glowPositions: string[];
  /** Outline button under the homepage grid. */
  viewAllLabel: string;
  /** Text after the name on a case study's share image. */
  ogFooter: string;
  /** Heading block of the /work index page. */
  index: Required<SectionIntro>;
  /** Strings on the case-study page. */
  page: {
    backLabel: string;
    roleLabel: string;
    timelineLabel: string;
    toolsLabel: string;
    metricsLabel: string;
    nextLabel: string;
    ctaTitle: string;
    /** Accessible name of a scrollable table in the article body. */
    tableLabel: string;
  };
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

export interface PublicationItem {
  title: string;
  /** Conference or journal name, e.g. "ICCICT". Shown as "<venue> <year>". */
  venue: string;
  year: string;
  /** One line on what the paper taught or shaped. */
  takeaway: string;
  /** Link to the paper (opens in a new tab). */
  href: string;
  /** Publisher for structured data, e.g. "IEEE". */
  publisher?: string;
  /** Placeholder not filled in yet: never rendered, never in structured data. */
  draft?: boolean;
}

export interface ExperienceContent {
  roles: RoleItem[];
  /** Visually hidden heading for the education cards. */
  educationHeading: string;
  education: EducationItem[];
  /** Visible h3 above the publication cards (anchor: #publications). */
  publicationsHeading: string;
  readPaperLabel: string;
  publications: PublicationItem[];
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
  /** Shown instead of the newsletter band while the newsletter feature is off. */
  followCta: { line: string; label: string };
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
  cta?: {
    label: string;
    href?: string;
    /** Used instead of `href` while the newsletter feature is off. */
    hrefNoNewsletter?: string;
  };
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

export interface FeatureFlags {
  /** Newsletter signup (band, newsletter card, hero chip, offer links). */
  newsletter: boolean;
}

export interface SeoContent {
  keywords: string[];
  /** Browser UI colour. Mirror of --bg in app/globals.css. */
  themeColor: string;
  /** Open Graph locale. */
  locale: string;
  ogImageAlt: string;
  jobTitle: string;
  knowsAbout: string[];
  alumniOf: string[];
}

export interface NotFoundContent {
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
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
  features: FeatureFlags;
  seo: SeoContent;
  notFound: NotFoundContent;
  /** Static paths listed in sitemap.xml. Case-study pages are added from content/work. */
  publishedRoutes: string[];
  hero: HeroContent;
  about: AboutContent;
  expertise: { items: ExpertiseItem[] };
  work: WorkContent;
  experience: ExperienceContent;
  writing: WritingContent;
  offers: { items: OfferItem[] };
  testimonials: { items: TestimonialItem[] };
  contact: ContactContent;
  sections: Record<SectionKey, SectionIntro>;
}
