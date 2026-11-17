import type { SiteContent } from "./types";

/**
 * Single source of truth for site copy and links.
 * Components import from here; they do not hard-code text or URLs.
 */
export const site: SiteContent = {
  name: "Chinmayi Rane",
  shortName: "Chinmayi",
  tagline: "AI × Product, made simple.",
  title: "Chinmayi Rane — AI Product Manager",
  description:
    "AI Product Manager turning messy problems into simple AI products. Writing on applied AI for PMs and founders.",

  nav: [
    { label: "About", href: "/#about" },
    { label: "Expertise", href: "/#expertise" },
    { label: "Work", href: "/#work" },
    { label: "Experience", href: "/#experience" },
    { label: "Writing", href: "/#writing" },
    { label: "Courses", href: "/#offers" },
    { label: "Contact", href: "/#contact" },
  ],

  links: {
    linkedin: "https://www.linkedin.com/in/chinmayi-rane/",
    email: "chinmayi.m.rane@gmail.com",
    emailHref: "mailto:chinmayi.m.rane@gmail.com",
    resume: "/Chinmayi-Rane-Resume.pdf",
  },

  footer: "© 2026 Chinmayi Rane · AI × Product, made simple.",
  comingSoon: "Coming soon.",

  labels: {
    skipToContent: "Skip to content",
    primaryNav: "Primary",
    mobileNav: "Mobile",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    resume: "Resume",
    linkedin: "LinkedIn",
    email: "Email",
  },

  hero: {
    eyebrow: "AI × Product, made simple",
    greeting: "Hi, I'm",
    name: "Chinmayi Rane.",
    rotatingTaglines: [
      "I turn messy problems into simple AI products.",
      "I build AI products people actually use.",
      "I explain AI in plain language.",
      "I take products from 0→1.",
    ],
    bio: [
      "AI Product Manager who started in electronics engineering and moved toward the ",
      { em: "why" },
      " behind what we build. I ship AI platforms, write about applied AI for PMs and founders, and teach what I learn along the way.",
    ],
    primaryCta: { label: "View My Work", href: "/#work" },
    secondaryCta: { label: "Get In Touch", href: "/#contact" },
    chips: ["Open to AI PM roles in London", "Weekly newsletter on applied AI"],
    connectLabel: "Connect",
    // The source photo is landscape (920×809); 65% keeps the face centred in the 4:5 crop.
    photo: { src: "/photo.jpg", alt: "Chinmayi Rane", objectPosition: "65% center" },
    statBadge: { value: "30+", lines: ["daily users on", "my latest product"] },
    awardBadge: { value: "2×", label: "IEEE published" },
  },

  about: {
    paragraphs: [
      [
        "I graduated as an Electronics & Telecom engineer, built things close to the code, and realised I cared more about ",
        { em: "why" },
        " we build than how. Today I work where technology meets people: what problem does this solve, who benefits, and how do we know it's working?",
      ],
      [
        "I'm based in Mumbai and relocating to London. Alongside product work, I write about startups, growth and applied AI, focused on real decisions rather than theory.",
      ],
    ],
    stats: [
      { value: "30+", label: "Daily active users" },
      { value: "100+", label: "Customer interviews" },
      { value: "18.9K", label: "Records in my NLP pipeline" },
      { value: "2", label: "IEEE publications" },
    ],
  },

  expertise: {
    items: [
      {
        icon: "search",
        title: "Discovery & Strategy",
        description:
          "Customer interviews, on-site visits and competitive analysis that change what we build, like pivoting MSIS to a modular API architecture.",
        chips: [
          "User Research",
          "GTM Strategy",
          "Competitive Analysis",
          "Roadmapping",
        ],
      },
      {
        icon: "sparkles",
        title: "AI Product Development",
        description:
          "Technical PRDs and MCP-based architecture for AI layers, natural-language querying and copilot roadmaps that unblock engineering.",
        chips: ["Generative AI", "Agentic AI", "MCP Architecture", "NLP"],
      },
      {
        icon: "code",
        title: "Prototyping & Delivery",
        description:
          "AI-assisted prototypes clients can click through, cutting feedback cycles from weeks to two days, then shipping with Agile and UAT.",
        chips: ["Claude Code", "Lovable", "Figma", "UAT"],
      },
      {
        icon: "chart",
        title: "Data & Metrics",
        description:
          "Metrics definitions, funnels and scoring models that make decisions objective and auditable instead of gut calls.",
        chips: ["Python", "SQL", "Mixpanel", "Tableau"],
      },
    ],
  },

  work: {
    items: [
      {
        slug: "ypc-workspace",
        chip: "0→1 Platform · Claude Code",
        title: "YPC Workspace",
        description:
          "Sole builder and PM of a company management platform for hiring, projects and internships, with database-level permissions across 5 roles.",
        outcome: "30+ daily active users",
        glowPosition: "30% 40%",
      },
      {
        slug: "msis",
        chip: "AI Layer · MCP",
        title: "MakerSpace Information Systems",
        description:
          "Led a team of 6 and specced an AI operating layer with natural-language querying for lab management and analytics.",
        outcome: "Feedback cycles: weeks → 2 days",
        glowPosition: "70% 30%",
      },
      {
        slug: "elsa",
        chip: "GTM · NSF I-Corps",
        title: "Elsa, an elder-care robot",
        description:
          "Shaped B2B/B2C go-to-market and a dual-revenue pricing model, validated with an AI simulation layer.",
        outcome: "100+ customer interviews",
        glowPosition: "40% 70%",
      },
      {
        slug: "nlp-analyst-research",
        chip: "NLP · Research",
        title: "Analyst experience, decoded",
        description:
          "A Python NLP pipeline (spaCy, YAKE) that replaced manual keyword extraction across financial-services Glassdoor reviews.",
        outcome: "18,900+ records processed",
        glowPosition: "75% 65%",
      },
    ],
  },

  // Section headings, taken from design/design-reference.html.
  sections: {
    about: { eyebrow: "About", title: "A Bit About Me" },
    expertise: {
      eyebrow: "Expertise",
      title: "How I Build Products",
      lead: "From the first customer interview to a working AI prototype, and the metrics that prove it worked.",
    },
    work: {
      eyebrow: "Featured Work",
      title: "Products I've Shaped",
      lead: "Case studies from 0→1 platforms, AI layers and go-to-market research.",
    },
    experience: {
      eyebrow: "Career",
      title: "Work Experience",
      lead: "From engineering to research to product, across India and the US.",
    },
    writing: {
      eyebrow: "Writing",
      title: "AI × Product, Made Simple",
      lead: "Plain-language explainers on how AI works and what it means for real product decisions.",
    },
    offers: {
      eyebrow: "Learn with me",
      title: "Courses, Templates & Mentorship",
      lead: "Practical resources for PMs who want to build with AI.",
    },
    testimonials: { eyebrow: "Testimonials", title: "Kind Words" },
    contact: {
      title: "Let's Make Something Simple Together",
      lead: "Hiring an AI PM, looking for a collaborator, or want help shipping your first AI feature? I'd love to hear from you.",
    },
  },
};

/** URL of a case-study page. The pages themselves arrive in a later step. */
export function caseStudyHref(slug: string): string {
  return `/work/${slug}`;
}
