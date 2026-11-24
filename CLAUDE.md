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
  `#expertise`, How I Think `#how-i-think` (not in the nav; `site.howIThink`), Work `#work`, Experience `#experience`, Writing `#writing`,
  Offers `#offers` (only while `features.offers` is on), Testimonials `#testimonials`,
  Contact `#contact`.
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
| text-heading | #B6BAC8 | `text-heading` (hero name, section/page h1-h2, case-study and 404 titles; card titles, stats, eyebrows stay `text-foreground`) |
| text-subtle | #8A8EA0 | `text-subtle` |
| chip-text | #E4DEFF | `text-chip` |
| accent (solid fills: dots, avatar; gradient start) | #8B5CF6 | `bg-accent` |
| accent-2 (gradient end) | #A855F7 | `bg-accent-2` |
| accent gradient (primary buttons, icons, share pills) | 90deg, accent → accent-2 | `bg-accent-gradient` (use with `bg-accent` as the solid fallback) |
| accent-text (accent text on dark) | #A78BFA | `text-accent-text` |
| accent-glow | rgba(139,92,246,0.35) | `shadow-glow`, `glow-hover` (button hover glow), `bg-page-glow`, `bg-band-glow` |
| on-accent (text/icons ON accent fills) | #110A19 (dark, not white) | `text-on-accent` |

Radii: card 20px `rounded-card`, inner 14px `rounded-inner`, pill 999px
`rounded-pill`. Container: `<Container>` / `max-w-container`. Its *content* is
1072px wide with 24px gutters, so `max-w-container` is 1120px border-box (the same as the
sample site's `.wrap`: 1120px max, 24px padding). The header pill is `--nav-max` (1080px,
`max-w-[var(--nav-max)]`) with a constant 16px side margin, so it is 4px wider than the
content on each side, as in the sample. Content's left edge = `max(24px, (viewport - 1120px) / 2 + 24px)`.
`Section`/`Container` take `width="timeline"` (900px content,
Experience: a 900px block = 36px left padding + 864px cards, line centred 6px in, cards `30px 32px` padding (24px on phones), 36px apart; Education and Publications share the cards' left edge, width and padding) or `"narrow"` (900px, testimonials/contact): deliberately narrower, centred
blocks (the sample does the same). Case-study pages use the default width, so their
heading, metrics and body start on the same left edge as every other section. Type tokens: `text-display` (hero h1), `text-tagline`, `text-h2`
(+ `font-heading`); `tracking-eyebrow`.

**Matching the reference exactly:** the reference is content-box with no base
line-height, so `<body>` sets `line-height: normal`. For text that must match it,
use `text-[Npx]` (no line-height) rather than `text-xs`/`text-sm`/`text-base`,
which add Tailwind's own line-heights. The reference's stated "44px tile /
40px icon / 180px image" are content-box, so they render at 46 / 42 / 220px;
we match what renders.

Brand colour is changed in one place: `--accent`, `--accent-2`, `--accent-text`,
`--accent-glow`, `--on-accent` in `globals.css` (the previous blue theme is in the comment
there), plus the mirror in `content/brand.ts` for generated images. The tokens hold RGB
triplets (so `bg-accent/20` works); hex values are in the comments.

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
   for accent-coloured text on dark (7.4:1 on the page bg). Text on accent fills is
   `text-on-accent` (#110A19): 4.59:1 on #8B5CF6, 4.91:1 on #A855F7; never white.
6. **Respect `prefers-reduced-motion`.** Every animation or transition needs a
   reduced-motion fallback (`motion-reduce:` utilities or a media query).
7. **Icons: lucide-react only. No emoji or text glyphs (✓ ✦ ☰) as icons, except the
   Contact section and the My Toolkit headings, which use emoji by design.** Those live in `content/site.ts`
   (`contact.*Icon`, `chips[].icon`), render through `ui/Emoji` (`aria-hidden`, tailwind
   `font-emoji`). They are set in a ~7 KB **subset** of Noto Color Emoji loaded with
   `next/font/local` (`app/emoji-font.ts`, files + how to regenerate in `app/fonts/README.md`),
   not `next/font/google`: that has no glyph subsetting and would ship ~1.2 MB of
   unicode-range chunks (mobile Lighthouse fell from ~98 to ~56). A new emoji needs adding
   to the subset, otherwise it falls back to the system emoji font. Safari/iOS cannot use
   this colour-vector font and show Apple's emoji.
8. **Internal links use `next/link`.** Navigation hrefs are `/#id` so they work
   from any route. Files (PDF) and external URLs use `<a>`; `ui/Button` picks
   the right one automatically.
9. **Use the shared UI**: `Section` + `SectionHeader` for sections, `Card`
   (also a link via `href`), `Chip` (tones: default/muted/accent/overlay; sizes sm 13px /
   md 14px), `Eyebrow`,
   `Button` (variants primary/secondary/outline; sizes xl (52px, contact)/lg/md/sm/field/block; link or
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
is `<venue> <year>`, so keep the year out of `venue`. Keep the list newest first. They render as vertical cards (FileText tile, `VENUE · YEAR` label, title, takeaway, "Read paper" pinned to the bottom) in a `CardSlider`: 2 cards visible from md, 1 on phones, equal height. Slider text is `site.experience.slider`. Optional `venueFull` adds a tooltip
(`<abbr title>`) and is used as the venue name in the JSON-LD.

## Feature flag: expertise

`content/site.ts` → `features: { expertise: false }`. While false, the Expertise section
("How I Build Products", `#expertise`) is not rendered (`app/page.tsx`) and the "Expertise"
header link is hidden (desktop and mobile). The code, types and content (`site.expertise`,
`site.sections.expertise`, `components/sections/Expertise.tsx`) are kept; set the flag to
`true` to restore it exactly. Same mechanism as offers (`feature` on the `site.nav` entry).

## My Toolkit

`site.toolkit` (categories of emoji + name + tools) renders as a sub-block (`#toolkit`, an h3
label + one column per category) under the How I Think timeline, inside that section. Tools
are non-interactive pills (accent 15% fill, 35% border; hover only brightens). Marked
`TODO(chinmayi)` in `site.ts` for editing. Toolkit emoji use `ui/Emoji`; only the Contact
emoji are in the Noto subset, so these fall back to the system emoji font.

## Feature flag: offers

`content/site.ts` → `features: { offers: false }`. While false, the Offers section
("Courses, Templates & Mentorship", `#offers`) is not rendered (`app/page.tsx`) and the
"Courses" header link is hidden (desktop and mobile), so nothing points at `#offers`. All
Offers code, types and content stay (`components/sections/Offers.tsx`, `site.offers`,
`site.sections.offers`). Set it to `true` to restore everything exactly; first work through
the `TODO(chinmayi)` notes on the offers (names, prices, waitlist/purchase links). Nav items
can be gated the same way: give a `site.nav` entry `feature: "<flag>"`; the header reads
`navLinks()`, never `site.nav` directly.

## Feature flag: newsletter

`content/site.ts` → `features: { newsletter: false }`. While false, nothing
newsletter-related renders: the Writing band and the "Newsletter" post card are
hidden (2 centred cards + a LinkedIn profile card (`ui/ProfileCard`, whole card is one link) instead), the hero chip
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
"How I Think" timeline items are a variant (`data-reveal-kind="timeline"` on each `<li>`;
`.tl-node` / `.tl-card` in `globals.css`): the node scales in, then the card travels 100px
toward the centre line (700ms), triggered at 20% visible; items already on screen at load
animate immediately; the list clips overflow-x. Each item plays once per page load (nothing
is stored), so a refresh replays it.

## Expandable quotes

`components/ui/ExpandableQuote.tsx` (client) clamps a testimonial quote to 2 lines with a
"Read more" / "Show less" toggle (labels in `site.testimonials`). The full text is always in the
HTML (clamped only visually via `data-clamped`); a `<noscript>` rule shows it all without JS. The
button appears only if the text really exceeds 2 lines (measured on mount and via
ResizeObserver). The height tweens 300ms ease-out (line-clamp itself can't animate, so the
clamp is lifted during the tween and restored at the end of a collapse); instant under reduced
motion. Each quote expands independently.

## CardSlider

`components/ui/CardSlider.tsx` (client, reusable): `<CardSlider items={[...]} labels={...} visible={{ base: 1, md: 2 }} />`.
The track is a native `overflow-x` scroller with `scroll-snap` (one snap point per card), so swipe,
trackpad and keyboard scrolling work with no JS; with no JS the controls simply don't render and all
cards stay reachable. With JS it adds Previous/Next + pagination dots; the position is derived from
`scrollLeft`, so swipes and clicks stay in sync, and Previous/Next/arrow keys read the live scroll
position (not React state). Cards outside the visible window are `inert` (links not tabbable); if
focus was inside one, it moves to the carousel region so the arrow keys keep working. A polite live
region announces the visible range, only after the user interacts. Labels are templates
(`{n}`, `{total}`, `{from}`, `{to}`) in content (`SliderLabels`). Smooth scroll uses the browser's native
animation (about 400ms); instant under reduced motion.

## Count-up numbers

`components/ui/CountUp.tsx`: `<CountUp value="18.9K" delay={120} />` counts the number part
from 0 to its final value once (1.6s, ease-out) when first 30% visible; used on the About
stats only. It parses prefix / number / decimals / suffix; anything else ("Top 35%",
"5 + 2") renders as static text. The server HTML holds the final value; the digits are
`aria-hidden` and the wrapper has `aria-label` = the final value; reduced motion leaves the
final value in place. Poppins has no tabular figures, so every digit sits in a fixed-width
cell (and missing leading digits are reserved invisibly) to keep the layout still while counting.

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
- **A running `next dev` ignores new `tailwind.config.ts` keys until restarted**: it keeps
  serving the old CSS, so a class that only exists in the config silently has no rules. We
  hit this: the primary button had a dark `text-on-accent` label but no fill (near-black
  with invisible text). So accent utilities that must not fail (`bg-accent-gradient`,
  `glow-hover`, `text-heading`) are plain CSS in `app/globals.css` (which hot-reloads), and
  the primary button also has a solid `bg-accent` under the gradient. After changing the
  Tailwind config, restart the dev server. Also: tokens are RGB triplets, so inside a
  gradient/shadow write `rgb(var(--accent))`, never `var(--accent)` (`--accent-glow` is a
  full rgba and is fine as is).
- Visual checks: serve the reference with `python -m http.server 4000 --directory design`
  and compare against the dev server **in the same browser tab**; different
  device-pixel-ratios shift borders and rounding by up to 1px.
- `public/Chinmayi-Rane-Resume.pdf` must be added by hand; until then the
  Resume links 404.
- Headless Chrome (`--screenshot`) has a ~500px minimum window width, so 375px
  captures come out cropped. Use the browser pane's emulation for mobile shots.
- In Git Bash, a bare `/` argument is rewritten to a Windows path; prefix
  `MSYS_NO_PATHCONV=1` when passing URL paths to scripts.
