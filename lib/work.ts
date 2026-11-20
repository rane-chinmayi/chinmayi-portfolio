import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type {
  WorkFrontmatter,
  WorkItem,
  WorkLink,
  WorkMetric,
} from "@/content/types";

/**
 * Case studies: content/work/<slug>.mdx, YAML frontmatter + MDX body.
 * Server-only (reads the file system); used by Server Components and metadata.
 *
 * Frontmatter is validated when the files are read, so a missing or malformed
 * field fails `next build` (and shows in `next dev`) with the file and field.
 */
const WORK_DIR = path.join(process.cwd(), "content", "work");
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

type Data = Record<string, unknown>;

function fail(file: string, field: string, problem: string): never {
  throw new Error(
    `content/work/${file}: frontmatter "${field}" ${problem}. ` +
      `Required fields: title, slug, summary, category, role, timeline, tools, ` +
      `tags, featured, order, metrics (at least one {value, label}), links.`,
  );
}

function text(data: Data, file: string, key: string): string {
  const value = data[key];
  if (typeof value !== "string" || value.trim() === "") {
    fail(file, key, "is missing or not a non-empty string");
  }
  return value;
}

function textList(data: Data, file: string, key: string): string[] {
  const value = data[key];
  if (
    !Array.isArray(value) ||
    value.some((v) => typeof v !== "string" || v.trim() === "")
  ) {
    fail(file, key, "is missing or not a list of non-empty strings");
  }
  return value as string[];
}

function objectList(
  data: Data,
  file: string,
  key: string,
  fields: [string, string],
  min: number,
): Array<Record<string, string>> {
  const value = data[key];
  if (!Array.isArray(value)) fail(file, key, "is missing or not a list");
  if (value.length < min) fail(file, key, `needs at least ${min} item(s)`);
  return value.map((entry, index) => {
    const row = (entry ?? {}) as Data;
    for (const field of fields) {
      if (typeof row[field] !== "string" || (row[field] as string).trim() === "") {
        fail(file, `${key}[${index}].${field}`, "is missing or not a non-empty string");
      }
    }
    return { [fields[0]]: row[fields[0]] as string, [fields[1]]: row[fields[1]] as string };
  });
}

function parse(file: string): WorkItem {
  const raw = fs.readFileSync(path.join(WORK_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const fileSlug = file.replace(/\.mdx$/, "");

  const slug = text(data, file, "slug");
  if (!SLUG.test(slug)) fail(file, "slug", "must be lowercase letters, digits and hyphens");
  if (slug !== fileSlug) fail(file, "slug", `must match the file name ("${fileSlug}")`);

  if (typeof data.featured !== "boolean") fail(file, "featured", "must be true or false");
  if (typeof data.order !== "number" || !Number.isFinite(data.order)) {
    fail(file, "order", "must be a number");
  }

  const frontmatter: WorkFrontmatter = {
    title: text(data, file, "title"),
    slug,
    summary: text(data, file, "summary"),
    category: text(data, file, "category"),
    role: text(data, file, "role"),
    timeline: text(data, file, "timeline"),
    tools: textList(data, file, "tools"),
    tags: textList(data, file, "tags"),
    featured: data.featured,
    order: data.order,
    metrics: objectList(data, file, "metrics", ["value", "label"], 1) as unknown as WorkMetric[],
    links: objectList(data, file, "links", ["label", "href"], 0) as unknown as WorkLink[],
  };

  return { ...frontmatter, body: content };
}

let cache: WorkItem[] | null = null;

/** All case studies, sorted by `order`. Cached in production, re-read in dev. */
export function getAllWork(): WorkItem[] {
  if (cache && process.env.NODE_ENV === "production") return cache;

  const items = fs
    .readdirSync(WORK_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map(parse)
    .sort((a, b) => a.order - b.order);

  const seen = new Map<string, string>();
  for (const item of items) {
    for (const [field, value] of [
      ["slug", item.slug],
      ["order", String(item.order)],
    ] as const) {
      const key = `${field}:${value}`;
      const other = seen.get(key);
      if (other) {
        throw new Error(
          `content/work/${item.slug}.mdx: frontmatter "${field}" (${value}) is already used by ${other}.mdx`,
        );
      }
      seen.set(key, item.slug);
    }
  }

  cache = items;
  return items;
}

export function getWorkBySlug(slug: string): WorkItem | undefined {
  return getAllWork().find((item) => item.slug === slug);
}

/** Case studies shown on the homepage, in `order`. */
export function getFeaturedWork(): WorkItem[] {
  return getAllWork().filter((item) => item.featured);
}

/** The case study after `slug` by `order`, wrapping around to the first. */
export function getNextWork(slug: string): WorkItem | undefined {
  const all = getAllWork();
  const index = all.findIndex((item) => item.slug === slug);
  if (index === -1 || all.length < 2) return undefined;
  return all[(index + 1) % all.length];
}

/** Card outcome line: the first metric, e.g. "84% less time than manual doc search". */
export function outcomeLine(item: WorkItem): string {
  const [first] = item.metrics;
  return `${first.value} ${first.label}`;
}
