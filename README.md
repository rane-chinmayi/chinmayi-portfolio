# Chinmayi Rane — portfolio

Personal portfolio and brand hub for Chinmayi Rane, AI Product Manager.
Tagline: **AI × Product, made simple.** It will grow to host a newsletter,
courses, templates and mentorship.

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS 3 · lucide-react.
Fonts: Poppins (headings) and Inter (body) via `next/font`.

## Getting started

Requires Node 20 or newer.

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script              | What it does                 |
| ------------------- | ---------------------------- |
| `npm run dev`       | Dev server                   |
| `npm run build`     | Production build             |
| `npm run start`     | Serve the production build   |
| `npm run lint`      | ESLint (`next lint`)         |
| `npm run typecheck` | TypeScript, no emit          |

## Where things live

- `content/site.ts` — all copy and links (typed in `content/types.ts`).
- `app/globals.css` — design tokens; `tailwind.config.ts` maps them to Tailwind.
- `components/ui` — shared primitives; `components/layout` — header, footer,
  background; `components/sections` — homepage sections.

See `CLAUDE.md` for the conventions and design rules.

## Resume

The header, hero and footer link to `/Chinmayi-Rane-Resume.pdf`. Put the PDF at
`public/Chinmayi-Rane-Resume.pdf`.
