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
components/sections/ one file per homepage section (Hero, About, Expertise, Work, Experience,
                     Writing, Offers, Testimonials, Contact)
content/             site.ts = ALL copy and links; types.ts = their TypeScript types
lib/                 small helpers (cn)
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
| border / border-strong / border-chip | rgba(255,255,255, .08 / .18 / .12) | `border-border`, `border-border-strong`, `border-border-chip` |
| fill-subtle / fill-chip | rgba(255,255,255, .03 / .05) | `bg-fill-subtle`, `bg-fill-chip` |
| text | #F8FAFC | `text-foreground` |
| text-muted | #B6BAC8 | `text-muted` |
| text-subtle | #8A8EA0 | `text-subtle` |
| chip-text | #E4DEFF | `text-chip` |
| accent (fills, buttons) | #2E5BFF | `bg-accent` |
| accent-text (accent text on dark) | #8FA8FF | `text-accent-text` |
| accent-glow | rgba(46,91,255,0.28) | `shadow-glow`, `bg-page-glow` |
| on-accent | #FFFFFF | `text-on-accent` |

Radii: card 20px `rounded-card`, inner 14px `rounded-inner`, pill 999px
`rounded-pill`. Container: `max-w-container` (1200px). Section titles:
`text-h2` + `font-heading`. Eyebrows: `tracking-eyebrow`.

Brand colour is changed in one place: `--accent`, `--accent-text`,
`--accent-glow` in `globals.css` (a violet alternative is in the comment there).

## Rules

1. **All colours come from tokens.** No hex, rgb() or Tailwind palette colours
   (`bg-blue-500`, `text-white`, `border-white/10`) in components. Need a new
   colour? Add a token first.
2. **All copy lives in `content/`.** Components import from `content/site.ts`;
   they do not contain headings, paragraphs, labels or URLs. Type new content
   in `content/types.ts`.
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
9. **Use the shared UI**: `Section` + `SectionHeader` for sections, `Card`,
   `Chip`, `Eyebrow`, `Button`. Do not re-style these ad hoc.
10. **No new dependencies without a reason**, and state the reason in the commit.
11. Keep Server Components by default; add `"use client"` only for state,
    effects or browser APIs.
12. Before finishing a change: `npm run lint`, `npm run typecheck`, `npm run build`.

## Gotchas

- The project sits inside OneDrive. If the dev server throws `EBUSY`/`ENOENT`
  on `.next/`, stop it, delete `.next`, and restart.
- `public/Chinmayi-Rane-Resume.pdf` must be added by hand; until then the
  Resume links 404.
