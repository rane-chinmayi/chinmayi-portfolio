import type { OfferItem, PostItem, SiteContent } from "./types";

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
    // TODO(chinmayi): add the PDF at public/Chinmayi-Rane-Resume.pdf (the Resume
    // and "Download Resume" links 404 until it exists).
    resume: "/Chinmayi-Rane-Resume.pdf",
    resumeFilename: "Chinmayi-Rane-Resume.pdf",
  },

  footer: "© 2026 Chinmayi Rane · AI × Product, made simple.",

  labels: {
    skipToContent: "Skip to content",
    primaryNav: "Primary",
    mobileNav: "Mobile",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    resume: "Resume",
    linkedin: "LinkedIn",
    email: "Email",
    opensInNewTab: "(opens in a new tab)",
  },

  /**
   * Feature flags. Turned-off features are hidden, not deleted: all the code
   * stays, so flipping a flag restores the behaviour exactly.
   *
   * newsletter: set to true once an email provider is connected. Before you
   * flip it: set `writing.newsletter.provider` and `actionUrl` (see the TODO
   * there) and, if you like, replace the "Newsletter" post card with the real
   * latest issue. While false: no signup band, no Newsletter card, the hero
   * chip says "Writing on applied AI for PMs", the Writing section shows a
   * "Follow along on LinkedIn" call to action, and the course/template offer
   * buttons email you instead of pointing at the signup form.
   */
  features: {
    newsletter: false,
  },

  seo: {
    keywords: [
      "AI product manager",
      "AI product management",
      "product manager London",
      "generative AI",
      "agentic AI",
      "NLP",
      "product strategy",
      "0 to 1 products",
      "Chinmayi Rane",
    ],
    // Mirror of --bg in app/globals.css (#08080B). Keep in sync.
    themeColor: "#08080B",
    locale: "en_GB",
    ogImageAlt:
      "Chinmayi Rane. AI × Product, made simple. AI Product Manager, Mumbai to London.",
    jobTitle: "AI Product Manager",
    knowsAbout: [
      "AI product management",
      "Generative AI",
      "NLP",
      "Product strategy",
    ],
    alumniOf: ["Oklahoma State University", "Sardar Patel Institute of Technology"],
  },

  notFound: {
    eyebrow: "404",
    title: "This page is still in the prototype stage.",
    body: "The page you're looking for doesn't exist (yet). Let's get you back to the good stuff.",
    cta: "Back to home",
  },

  // Static paths listed in sitemap.xml; only list pages that actually render.
  // /work/[slug] pages are added automatically from content/work (app/sitemap.ts).
  // Add "/writing" etc. here once those pages exist.
  publishedRoutes: ["/", "/work"],

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
    chips: ["Open to AI PM roles in London"],
    newsletterChip: "Weekly newsletter on applied AI",
    writingChip: "Writing on applied AI for PMs",
    connectLabel: "Connect",
    // The source photo is landscape (920×809); 65% keeps the face centred in the 4:5 crop.
    photo: { src: "/photo.jpg", alt: "Chinmayi Rane", objectPosition: "65% center" },
    statBadge: { value: "30+", lines: ["daily users on", "my latest product"] },
    awardBadge: { value: "3×", label: "AI/ML publications" },
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
      { value: "3", label: "AI/ML publications" },
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

  // Case-study copy lives in content/work/*.mdx (frontmatter + body); read it
  // through lib/work.ts. Only the UI strings around it are here.
  work: {
    // Glow position per card, cycled by order (the image area is decorative).
    glowPositions: ["30% 40%", "70% 30%", "40% 70%", "75% 65%"],
    viewAllLabel: "View all case studies",
    ogFooter: "Case study",
    index: {
      eyebrow: "Work",
      title: "Case Studies",
      lead: "AI products, platforms and product analyses, with the decisions and numbers behind them.",
    },
    page: {
      backLabel: "All work",
      roleLabel: "Role",
      timelineLabel: "Timeline",
      toolsLabel: "Tools",
      metricsLabel: "Key results",
      nextLabel: "Next case study",
      ctaTitle: "Want to talk about this work?",
      tableLabel: "Table, scrolls sideways on small screens",
    },
  },

  experience: {
    roles: [
      {
        title: "Product Manager",
        company: "YPoint Combinator (MapIoT AI)",
        location: "Remote",
        dates: "May 2025 – Present",
        summary:
          "PM for YPC Workspace and MSIS. Built a quantitative eligibility engine that made intern bonus selection objective and auditable.",
        current: true,
      },
      {
        title: "Graduate Research & Teaching Assistant",
        company: "Oklahoma State University",
        location: "USA",
        dates: "Jan 2023 – Apr 2025",
        summary:
          "Strategy research with an NLP pipeline over 18,900+ records; taught Corporate Strategy and Programming for Data Science.",
      },
      {
        title: "I-Corps Scholar",
        company: "National Science Foundation",
        location: "USA",
        dates: "Aug 2023 – Jan 2024",
        summary:
          "Explored commercial viability of Elsa, a home healthcare robot, through 100+ customer interviews.",
      },
      {
        title: "Software Developer",
        company: "Innovation Foundation at OSU",
        location: "USA",
        dates: "Sept 2022 – Jan 2023",
        summary:
          "Built user-facing features for Healthy Homes Youth, an Android health-education app.",
      },
    ],
    educationHeading: "Education",
    education: [
      {
        label: "MS · 2022–2024",
        degree: "Management Information Systems",
        institution: "Oklahoma State University",
        gpa: "GPA 3.83",
      },
      {
        label: "BTech · 2019–2022",
        degree: "Electrical & Telecom Engineering",
        institution: "Sardar Patel Institute of Technology",
        gpa: "GPA 3.70",
      },
    ],
    publicationsHeading: "Publications",
    readPaperLabel: "Read paper",
    // Items with `draft: true` are never rendered (or put in structured data).
    publications: [
      {
        title: "Image Captioning based Smart Navigation System for Visually Impaired",
        venue: "ICCICT",
        year: "2021",
        takeaway:
          "Shaped how I think about AI reliability when users depend on the system for safety.",
        href: "https://ieeexplore.ieee.org/document/9510102",
        publisher: "IEEE",
      },
      {
        title: "Data Driven Analysis for Startup Investments for Venture Capitalists",
        venue: "ICONAT",
        year: "2022",
        takeaway:
          "Taught me how investors structure evaluation frameworks, the logic behind the scoring systems I build.",
        href: "https://ieeexplore.ieee.org/document/9725892",
        publisher: "IEEE",
      },
      {
        // TODO(chinmayi): add the third publication (title, venue, year, takeaway,
        // IEEE link), then delete `draft: true`. Until then only two cards show;
        // the "3 AI/ML publications" stats stay as they are.
        title: "TODO(chinmayi): third publication title",
        venue: "TODO venue",
        year: "TODO",
        takeaway: "TODO(chinmayi): one-line takeaway.",
        href: "https://ieeexplore.ieee.org/",
        publisher: "IEEE",
        draft: true,
      },
    ],
  },

  writing: {
    posts: [
      {
        title: "8 AI agent architectures and when to use each",
        type: "Carousel",
        // TODO(chinmayi): replace with the exact LinkedIn post URL for this carousel.
        href: "https://www.linkedin.com/in/chinmayi-rane/recent-activity/all/",
      },
      {
        title: "What happens after you hit Enter on ChatGPT",
        type: "Carousel",
        // TODO(chinmayi): replace with the exact LinkedIn post URL for this carousel.
        href: "https://www.linkedin.com/in/chinmayi-rane/recent-activity/all/",
      },
      {
        // TODO(chinmayi): when the newsletter launches, replace this with the
        // latest issue's title and add its `href`.
        title: "Newsletter launching soon",
        type: "Newsletter",
      },
    ],
    readLabel: "Read",
    newsletter: {
      // TODO(chinmayi): pick an email provider (Buttondown, ConvertKit, Mailchimp,
      // Beehiiv...), then set `provider` and its form POST URL in `actionUrl`.
      // While `actionUrl` is empty the form submits nothing and shows
      // `unavailableMessage` instead.
      provider: null,
      actionUrl: "",
      heading: "Get one AI idea a week, with the product lens.",
      subline: "For PMs, founders and builders. No jargon, no hype.",
      emailLabel: "Email",
      emailPlaceholder: "you@company.com",
      submitLabel: "Subscribe",
      invalidMessage: "Enter a valid email address.",
      unavailableMessage: "Newsletter launching soon. Check back shortly.",
    },
    followCta: {
      line: "I post plain-language AI explainers for PMs and founders every week.",
      label: "Follow along on LinkedIn",
    },
  },

  // Each offer can take an optional `price` and a `cta.href`. Until then the
  // card shows `status` and the button stays hidden/points at the newsletter.
  offers: {
    items: [
      {
        kind: "course",
        chip: "Course · Coming soon",
        // TODO(chinmayi): confirm the course name and description.
        title: "AI Product Management, From Zero to Shipped",
        description:
          "A practical course for PMs who want to scope, prototype and ship their first AI feature.",
        // TODO(chinmayi): set `price` when you have one (it replaces `status`).
        status: "Waitlist open",
        // TODO(chinmayi): replace the mailto with a waitlist form link once you
        // have one. `href` is used when features.newsletter is true.
        cta: {
          label: "Join waitlist",
          href: "/#writing",
          hrefNoNewsletter:
            "mailto:chinmayi.m.rane@gmail.com?subject=Course%20waitlist",
        },
      },
      {
        kind: "template",
        chip: "Template",
        // TODO(chinmayi): confirm the template name and description.
        title: "The AI PRD Template",
        description:
          "The PRD structure I used to unblock engineering on an AI operating layer.",
        // TODO(chinmayi): set `price` and a purchase link when it is ready.
        status: "Coming soon",
        // TODO(chinmayi): replace the mailto with a sign-up/purchase link when
        // the template is ready. `href` is used when features.newsletter is true.
        cta: {
          label: "Get notified",
          href: "/#writing",
          hrefNoNewsletter:
            "mailto:chinmayi.m.rane@gmail.com?subject=PRD%20template",
        },
      },
      {
        kind: "mentorship",
        chip: "1:1 Mentorship",
        title: "Breaking into AI PM",
        description:
          "Career moves from engineering to product, portfolio reviews and AI PM interview prep.",
        // TODO(chinmayi): optionally add a `price`.
        featured: true,
        cta: {
          label: "Book a session",
          // TODO(chinmayi): replace the mailto with a Calendly or Topmate link.
          href: "mailto:chinmayi.m.rane@gmail.com?subject=Mentorship%20session",
        },
      },
    ],
  },

  // Add more testimonials by appending to this array: one renders as a single
  // centred card, two or more become a grid.
  testimonials: {
    items: [
      {
        quote:
          "Chinmayi Rane is thoughtful, capable and consistent in her character through professional and social situations. While serving as a Graduate Teaching Assistant, she supported differing faculty members who, term over term, equally rated her work exceptionally high. Chinmayi Rane has my full-fledged endorsement.",
        name: "Kenneth Kern",
        role: "Director, Business Graduate Programs, Oklahoma State University",
        initials: "KK",
      },
    ],
  },

  contact: {
    // Icons here are emoji by design (the only place on the site that uses them).
    // They are decorative: shown with aria-hidden, rendered in Noto Color Emoji.
    emailLabel: "Email Me",
    emailIcon: "✉️",
    linkedinLabel: "LinkedIn",
    linkedinIcon: "🔗",
    resumeLabel: "Download Resume",
    resumeIcon: "📄",
    location: { icon: "📍", prefix: "Currently based in", place: "Mumbai, India" },
    chips: [
      { icon: "🌍", label: "Available worldwide" },
      { icon: "💼", label: "Remote · Hybrid · On-site" },
      { icon: "✈️", label: "Open to relocation" },
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
      // "\n" marks the desktop line break (see SectionHeader).
      title: "Let's Build Better Products\nTogether",
      lead: "Whether you're hiring a Product Manager, looking for product advisory, or seeking Product Management mentorship, I'd love to hear about your goals and explore how we can work together.",
    },
  },
};

/** URL of a case-study page (app/work/[slug]). */
export function caseStudyHref(slug: string): string {
  return `/work/${slug}`;
}

/** Link for an offer button, honouring the newsletter feature flag. */
export function offerHref(cta: NonNullable<OfferItem["cta"]>): string | undefined {
  if (!site.features.newsletter && cta.hrefNoNewsletter) return cta.hrefNoNewsletter;
  return cta.href;
}

/** Hero chips: always-on ones plus the one that depends on the newsletter flag. */
export function heroChips(): string[] {
  const { chips, newsletterChip, writingChip } = site.hero;
  return [...chips, site.features.newsletter ? newsletterChip : writingChip];
}

/** Writing posts: the Newsletter card is hidden while the newsletter flag is off. */
export function visiblePosts(): PostItem[] {
  return site.writing.posts.filter(
    (post) => site.features.newsletter || post.type !== "Newsletter",
  );
}
