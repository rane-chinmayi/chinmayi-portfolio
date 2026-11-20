import { caseStudyHref, site } from "@/content/site";
import type { WorkItem } from "@/content/types";
import { siteUrl } from "./site-url";

const personId = `${siteUrl}/#person`;

/** The person as a short reference, for `author` on other nodes. */
const personRef = { "@id": personId };

/**
 * Homepage JSON-LD: the Person plus her published papers, as one @graph.
 * Each ScholarlyArticle points back at the Person by @id. Draft publications
 * (placeholders) are left out.
 */
export function personJsonLd() {
  const person = {
    "@type": "Person",
    "@id": personId,
    name: site.name,
    jobTitle: site.seo.jobTitle,
    description: site.description,
    url: siteUrl,
    image: `${siteUrl}${site.hero.photo.src}`,
    email: site.links.email,
    sameAs: [site.links.linkedin],
    alumniOf: site.seo.alumniOf.map((name) => ({
      "@type": "CollegeOrUniversity",
      name,
    })),
    knowsAbout: site.seo.knowsAbout,
  };

  const papers = site.experience.publications
    .filter((paper) => !paper.draft)
    .map((paper) => ({
      "@type": "ScholarlyArticle",
      name: paper.title,
      url: paper.href,
      datePublished: paper.year,
      author: personRef,
      isPartOf: { "@type": "CreativeWork", name: `${paper.venue} ${paper.year}` },
      ...(paper.publisher && {
        publisher: { "@type": "Organization", name: paper.publisher },
      }),
    }));

  return {
    "@context": "https://schema.org",
    "@graph": [person, ...papers],
  };
}

/** schema.org CreativeWork for a case-study page, built from its frontmatter. */
export function caseStudyJsonLd(item: WorkItem) {
  const url = `${siteUrl}${caseStudyHref(item.slug)}`;
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: item.title,
    headline: item.title,
    description: item.summary,
    url,
    mainEntityOfPage: url,
    image: `${url}/opengraph-image`,
    genre: item.category,
    keywords: item.tags.join(", "),
    inLanguage: "en-GB",
    author: personRef,
    creator: personRef,
    isPartOf: { "@type": "WebSite", name: site.name, url: siteUrl },
  };
}
