import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { siteUrl } from "@/lib/site-url";

/**
 * Lists `site.publishedRoutes`. To add pages (/work/[slug], /writing, ...),
 * add their paths to that array in content/site.ts once the pages exist.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return site.publishedRoutes.map((path) => ({
    url: path === "/" ? siteUrl : `${siteUrl}${path}`,
    lastModified,
    changeFrequency: path === "/" ? "monthly" : "yearly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
