import { site } from "@/content/site";
import { siteUrl } from "./site-url";

/** schema.org Person for the homepage, built from content. */
export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
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
}
