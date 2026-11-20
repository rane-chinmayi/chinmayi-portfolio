import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * Title and category of every case study (content/work/*.mdx), for the share
 * images. Those run on the edge runtime (next/og only works there on Windows),
 * which has no file system, so they can't read the MDX. This file runs in Node
 * at startup, so it reads the frontmatter here and inlines it as an env var
 * (see lib/work-cards.ts). Lenient on purpose: lib/work.ts does the strict
 * validation and reports a clear error; here a bad file is just skipped.
 * Edits to a title show on the share image after restarting `next dev`.
 */
function workCards() {
  const dir = path.join(process.cwd(), "content", "work");
  try {
    return fs
      .readdirSync(dir)
      .filter((file) => file.endsWith(".mdx"))
      .flatMap((file) => {
        try {
          const { data } = matter(fs.readFileSync(path.join(dir, file), "utf8"));
          const { slug, title, category } = data;
          return [slug, title, category].every((v) => typeof v === "string")
            ? [{ slug, title, category }]
            : [];
        } catch {
          return [];
        }
      });
  } catch {
    return [];
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Lets a second dev server or a build use its own output folder, so it can't
  // clobber a running `next dev`'s .next (they share files and break each other).
  // e.g.  NEXT_DIST_DIR=.next-preview npx next dev -p 3002
  distDir: process.env.NEXT_DIST_DIR || ".next",
  env: {
    WORK_OG_CARDS: JSON.stringify(workCards()),
  },
};

export default nextConfig;
