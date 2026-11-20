# CLAUDE.md

## Project

Portfolio and personal brand hub for **Chinmayi Rane**, AI Product Manager.
Tagline: **"AI × Product, made simple."** It supports the job search now and
will later host a newsletter, courses, templates and mentorship.

The approved design is `design/design-reference.html` (static mockup, blue
theme). Rebuild it as components; do not copy it verbatim.

## Stack

- Next.js 14 (App Router), React 18, TypeScript (strict), Tailwind CSS 3.
- Fonts via `next/font/google`: Poppins 500/600/700/800 → `font-heading`,
  Inter 400/500/600 → `font-sans`.
- Icons: `lucide-react` (note: v1 has no brand icons; `components/ui/SocialIcon`
  holds the inline LinkedIn SVG).
- npm (`package-lock.json`), Node >= 20. Deploys to Vercel. MDX for case
  studies and writing is planned (not installed yet).
- Scripts: `npm run dev | build | lint | typecheck`.

## Folder conventions

```
app/                 routes, layout.tsx (skip-link, header, main, footer), globals.css (tokens)
components/ui/       primitives: Container, Section, SectionHeader, Eyebrow, Card, Chip, Button,
                     SocialIcon, TypewriterText
components/layout/   Header, Footer, Backdrop, StarField (page chrome)
components/forms/    client-side forms (NewsletterForm; provider comes from content/site.ts)
components/sections/ one file per homepage section (Hero, About, Expertise, Work, Experience,
                     Writing, Offers, Testimonials, Contact)
components/work/     WorkCard (homepage + /work), CaseHeader, CaseFooter (case-study page)
components/mdx/      MDX element map (components.tsx), MdxBody, Figure, Callout
content/             site.ts = ALL site copy and links; types.ts = their TypeScript types;
                     work/*.mdx = case studies (frontmatter + body, see "Case studies")
lib/                 small helpers: cn (class names), links (isPlainAnchor, newTabProps),
                     work (case-study reader, server-only), image-size, og-*, structured-data
public/work/<slug>/  case-study images, referenced from MDX with <Figure src="/work/<slug>/x.png">
public/              static files (photo.jpg, resume PDF)
design/              design reference (not shipped)
```

- Import with the `@/` alias (maps to the repo root).
- Homepage order (`app/page.tsx`): Hero `#top`, About `#about`, Expertise
  `#expertise`, Work `#work`, Experience `#experience`, Writing `#writing`,
  Offers `#offers`, Testimonials `#testimonials`, Contact `#contact`.
- Header and footer live in `app/layout.tsx`, never inside `<main>`, so every
  route gets them.

## Design tokens

Defined as CSS variables in `app/globals.css`, mapped in `tailwind.config.ts`.
Solid colours are RGB triplets (opacity modifiers work: `bg-accent/20`);
translucent tokens carry their own alpha (use as-is).

| Token | Value | Tailwind |
| --- | --- | --- |
| bg | #08080B | `bg-background` |
| surface (glass) | rgba(22,22,32,0.72) | `bg-surface` |
| surface-solid | #101018 | `bg-surface-solid` |
| media-bg / field-bg / marker-bg | #12121B / #0E0E14 / #2A2A38 | `bg-media` (case-study image), `bg-field` (inputs), `bg-marker` (past-role dot) |
| text-soft | #E2E4EC | `text-soft` (testimonial quote) |
| error | #FCA5A5 | `text-error`, `border-error` (form errors, 8:1 on bg) |
| border / border-soft / border-chip / border-field / border-strong | rgba(255,255,255, .08 / .10 / .12 / .16 / .18) | `border-border`, `border-border-soft`, `border-border-chip`, `border-border-field`, `border-border-strong` |
| fill-subtle / fill-chip / fill-soft | rgba(255,255,255, .03 / .05 / .06) | `bg-fill-subtle`, `bg-fill-chip`, `bg-fill-soft` |
| text | #F8FAFC | `text-foreground` |
| text-muted | #B6BAC8 | `text-muted` |
| text-subtle | #8A8EA0 | `text-subtle` |
| chip-text | #E4DEFF | `text-chip` |
| accent (fills, buttons) | #2E5BFF | `bg-accent` |
| accent-text (accent text on dark) | #8FA8FF | `text-accent-text` |
| accent-glow | rgba(46,91,255,0.28) | `shadow-glow`, `bg-page-glow` |
| on-accent | #FFFFFF | `text-on-accent` |

Radii: card 20px `rounded-card`, inner 14px `rounded-inner`, pill 999px
`rounded-pill`. Container: `<Container>` / `max-w-container`. Its *content* is
1200px wide (the reference's container is content-box: 1200px + 24px gutters),
so `max-w-container` is 1248px border-box; `max-w-content` is the bare 1200px
(header pill). `Section`/`Container` take `width="timeline"` (960px content,
experience) or `"narrow"` (900px, testimonials/contact). Type tokens: `text-display` (hero h1), `text-tagline`, `text-h2`
(+ `font-heading`); `tracking-eyebrow`.

**Matching the reference exactly:** the reference is content-box with no base
line-height, so `<body>` sets `line-height: normal`. For text that must match it,
use `text-[Npx]` (no line-height) rather than `text-xs`/`text-sm`/`text-base`,
which add Tailwind's own line-heights. The reference's stated "44px tile /
40px icon / 180px image" are content-box, so they render at 46 / 42 / 220px;
we match what renders.

Brand colour is changed in one place: `--accent`, `--accent-text`,
`--accent-glow` in `globals.css` (a violet alternative is in the comment there).

## Rules

1. **All colours come from tokens.** No hex, rgb() or Tailwind palette colours
   (`bg-blue-500`, `text-white`, `border-white/10`) in components. Need a new
   colour? Add a token first.
2. **All copy lives in `content/`.** Components import from `content/site.ts` (or read
   `content/work` through `lib/work.ts`); they do not contain headings, paragraphs,
   labels or URLs. Arrows/back icons are lucide icons, never "←" / "→" in copy. Type new content
   in `content/types.ts`. Anything the owner still has to supply is marked
   `// TODO(chinmayi): ...` in `content/site.ts` (`grep -rn "TODO(chinmayi)" content`).
   Optional fields (`price`, `cta.href`, a post's `href`) hide their UI until set.
3. **Mobile-first, 360–1440px.** Write base styles for 360px, then add `sm:`,
   `lg:`. No horizontal scroll at any width in that range.
4. **Semantic HTML.** One `<h1>`; sections are `<section aria-labelledby>`;
   lists are `<ul>`; label every `<nav>`; header and footer are outside `<main>`.
5. **Contrast >= 4.5:1** for text. Use `text-accent-text` (not `text-accent`)
   for accent-coloured text on dark. White on `bg-accent` is 5.2:1.
6. **Respect `prefers-reduced-motion`.** Every animation or transition needs a
   reduced-motion fallback (`motion-reduce:` utilities or a media query).
7. **Icons: lucide-react only. No emoji or text glyphs (✓ ✦ ☰) as icons.**
8. **Internal links use `next/link`.** Navigation hrefs are `/#id` so they work
   from any route. Files (PDF) and external URLs use `<a>`; `ui/Button` picks
   the right one automatically.
9. **Use the shared UI**: `Section` + `SectionHeader` for sections, `Card`
   (also a link via `href`), `Chip` (tones: default/muted/accent/overlay), `Eyebrow`,
   `Button` (variants primary/secondary/outline; sizes lg/md/sm/field/block; link or
   button). Do not re-style these ad hoc. External and file links are detected
   automatically (`lib/links.ts`); pass `newTab` for a new tab.
10. **No new dependencies without a reason**, and state the reason in the commit.
11. Keep Server Components by default; add `"use client"` only for state,
    effects or browser APIs.
12. Before finishing a change: `npm run lint`, `npm run typecheck`, `npm run build`.

## Case studies (content/work/*.mdx)

Each file is `<slug>.mdx`: YAML frontmatter + MDX body. The MDX is the single source
of truth: the homepage Work section, `/work`, `/work/[slug]`, the sitemap and the share
images all read it. `site.ts` holds only the UI strings around it (`site.work`).

- **Frontmatter** (all required; `lib/work.ts` validates it and **fails the build** with
  the file and field): `title, slug (= file name), summary, category, role, timeline,
  tools[], tags[], featured, order (unique), metrics[{value,label}] (>= 1), links[{label,href}]`
  (may be `[]`). `featured: true` puts it on the homepage; `order` sorts everything and
  drives "Next case study" (wraps round). The first metric is the card's outcome line.
- **Pipeline:** `next-mdx-remote/rsc` (compiled at build in Server Components, no MDX
  runtime in the browser; `blockJS` stays on) + `gray-matter` + `remark-gfm` (tables).
  Elements are styled in `components/mdx/components.tsx`; tables sit in a focusable,
  horizontally scrolling glass card. `{/* comments */}` render nothing, so TODOs can
  live in the MDX (they are listed by `grep -rn "TODO(chinmayi)" content`).
- **`<Figure src alt caption?>`** reads the file from `/public` at build time (and its
  pixel size from the header, `lib/image-size.ts`, so there is no layout shift). Missing
  file = renders nothing + a dev-only console warning. **`<Callout title>`** is a glass
  card with an accent left edge.
- **Case-study page** (`app/work/[slug]`): SSG via `generateStaticParams`
  (`dynamicParams = false`), CreativeWork JSON-LD, per-page metadata. Metadata gotcha: a
  page-level `openGraph` *replaces* the root one, including its image, so every page that
  sets `openGraph` needs its own `opengraph-image` (see `app/work/opengraph-image.tsx`).
- **Share images** (`app/work/[slug]/opengraph-image.tsx`, `lib/og-card.tsx`) are edge
  runtime (next/og only works there on Windows), and edge has no `fs`. So
  `next.config.mjs` reads each file's slug/title/category in Node at startup and inlines
  them as `process.env.WORK_OG_CARDS` (`lib/work-cards.ts`). Restart `next dev` to see a
  changed title on the image; the pages themselves hot-reload.
- Adding a case study = drop `content/work/<slug>.mdx` (+ images in `public/work/<slug>/`).
  No code change; it appears everywhere, including the sitemap.

## Publications

`site.experience.publications` (Experience section, anchor `#publications`, after
Education). `draft: true` items never render and are left out of the Person JSON-LD
(which is an `@graph` of the Person + one ScholarlyArticle per published paper). Display
is `<venue> <year>`, so keep the year out of `venue`.

## Feature flag: newsletter

`content/site.ts` → `features: { newsletter: false }`. While false, nothing
newsletter-related renders: the Writing band and the "Newsletter" post card are
hidden (2 centred cards + a "Follow along on LinkedIn" CTA instead), the hero chip
uses `writingChip`, and Offers waitlist/notify buttons use `hrefNoNewsletter`
(mailto). All newsletter code stays (`NewsletterForm`, types, `site.newsletter`).
To turn it on: set up the provider + `actionUrl` (TODOs in `site.ts`), then set
the flag to `true`. Components read it only through the helpers `heroChips()`,
`visiblePosts()`, `offerHref()` in `content/site.ts`; do not add ad-hoc checks.

## Scroll-reveal

Spread `{...reveal()}` (`lib/reveal.ts`; `reveal(index, columns)` staggers grid siblings)
onto an element. Content is visible without JS; `components/ui/RevealObserver`
(one client component, IntersectionObserver, mounted in `app/layout.tsx`) hides
below-the-fold items after hydration and fades them in. Fully static under
`prefers-reduced-motion`. Never reveal above-the-fold content (layout shift).

## SEO and sharing

- `NEXT_PUBLIC_SITE_URL` (see `.env.example`; default `http://localhost:3000`) feeds
  `lib/site-url.ts` → `metadataBase`, sitemap, robots, JSON-LD. **Set it in Vercel.**
- Metadata lives in `app/layout.tsx` (copy from `content/site.ts` `seo`/`title`/`description`).
- `app/opengraph-image.tsx` (+ `twitter-image`, `icon`, `apple-icon`) use `next/og` and
  **`export const runtime = "edge"`**: the Node runtime fails on Windows (invalid font
  URL). Poppins is fetched in `lib/og-font.ts`.
- `content/brand.ts` is a JS mirror of the brand colours for those images (they cannot
  read CSS variables). **Keep it in sync with `globals.css`** when the accent changes.
- `app/sitemap.ts` = `publishedRoutes` in `content/site.ts` + every case study from
  `content/work` (automatic). Add `/writing` etc. to `publishedRoutes` when they exist.
- JSON-LD Person is built in `lib/structured-data.ts` and rendered by `ui/JsonLd`.
- Lighthouse (production build, simulated mobile): 95-98 / 100 / 100 / 100;
  desktop 99 / 100 / 100 / 100. Scores swing ±5 between runs; the first run after
  a server start is often an outlier, so repeat before concluding anything.

## Gotchas

- The project sits inside OneDrive. If the dev server throws `EBUSY`/`ENOENT`
  on `.next/`, stop it, delete `.next`, and restart.
- **Never run two `next dev` (or a `next build`) against the same `.next`.** They
  overwrite each other's files, and a long-running dev server keeps serving stale
  CSS (missing new Tailwind classes) after `.next` is rebuilt or the Tailwind
  config changes. Restart `next dev` after editing `tailwind.config.ts`. For a
  second server or a build, use a separate folder:
  `NEXT_DIST_DIR=.next-preview npx next dev -p 3002` and
  `NEXT_DIST_DIR=.next-build npm run build` (`/.next-*/` is git-ignored).
  Next then appends that folder to `tsconfig.json` `include`; undo it with
  `git checkout -- tsconfig.json` before committing.
- Visual checks: serve the reference with `python -m http.server 4000 --directory design`
  and compare against the dev server **in the same browser tab**; different
  device-pixel-ratios shift borders and rounding by up to 1px.
- `public/Chinmayi-Rane-Resume.pdf` must be added by hand; until then the
  Resume links 404.
- Headless Chrome (`--screenshot`) has a ~500px minimum window width, so 375px
  captures come out cropped. Use the browser pane's emulation for mobile shots.
- In Git Bash, a bare `/` argument is rewritten to a Windows path; prefix
  `MSYS_NO_PATHCONV=1` when passing URL paths to scripts.
