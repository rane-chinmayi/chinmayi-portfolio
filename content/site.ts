import type { SiteContent } from "./types";

/**
 * Single source of truth for site copy and links.
 * Components import from here; they do not hard-code text or URLs.
 * Later steps add the full section content to this file.
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

  // Current hero copy, unchanged. Step 2 reworks the hero.
  hero: {
    eyebrow: "Welcome to my portfolio",
    greeting: "Hi, I'm",
    name: "Chinmayi Rane.",
    rotatingTaglines: [
      "I drive product strategy.",
      "I grow products with data.",
      "I build 0→1 products.",
      "I build AI products.",
      "I turn ideas into products.",
      "I launch products that matter.",
    ],
    bio: "Product Manager with 1+ years of experience building SaaS and AI products. I partner with users, designers, engineers, and stakeholders to take products from discovery through launch and continuous product growth.",
    primaryCta: { label: "View My Work", href: "/#work" },
    secondaryCta: { label: "Get In Touch", href: "/#contact" },
    chips: [
      "Available for Product Management Opportunities",
      "Product Advisory & Mentorship",
    ],
    connectLabel: "Connect",
    photo: { src: "/photo.jpg", alt: "Chinmayi Rane" },
    badge: { value: "1+", line1: "Years", line2: "Experience" },
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
