import type { MetadataRoute } from "next";
import { caseStudyHref, site } from "@/content/site";
import { siteUrl } from "@/lib/site-url";
import { getAllWork } from "@/lib/work";

/**
 * Static routes from `site.publishedRoutes` plus one entry per case study in
 * content/work (added automatically). Add future pages (/writing, ...) to
 * `publishedRoutes` in content/site.ts once they exist.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const url = (path: string) => (path === "/" ? siteUrl : `${siteUrl}${path}`);

  const staticRoutes = site.publishedRoutes.map((path) => ({
    url: url(path),
    lastModified,
    changeFrequency: path === "/" ? ("monthly" as const) : ("yearly" as const),
    priority: path === "/" ? 1 : 0.8,
  }));

  const caseStudies = getAllWork().map((item) => ({
    url: url(caseStudyHref(item.slug)),
    lastModified,
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...caseStudies];
}
