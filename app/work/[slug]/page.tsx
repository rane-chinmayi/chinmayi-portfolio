import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MdxBody from "@/components/mdx/MdxBody";
import Container from "@/components/ui/Container";
import JsonLd from "@/components/ui/JsonLd";
import CaseFooter from "@/components/work/CaseFooter";
import CaseHeader from "@/components/work/CaseHeader";
import { caseStudyHref, site } from "@/content/site";
import { caseStudyJsonLd } from "@/lib/structured-data";
import { getAllWork, getNextWork, getWorkBySlug } from "@/lib/work";

interface PageProps {
  params: { slug: string };
}

// Only the slugs from content/work exist; anything else is the 404 page.
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllWork().map(({ slug }) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const item = getWorkBySlug(params.slug);
  if (!item) return {};
  const url = caseStudyHref(item.slug);

  return {
    title: item.title,
    description: item.summary,
    keywords: [...item.tags, ...site.seo.keywords],
    alternates: { canonical: url },
    // The share image comes from ./opengraph-image.tsx (added automatically).
    openGraph: {
      type: "article",
      siteName: site.name,
      locale: site.seo.locale,
      title: item.title,
      description: item.summary,
      url,
      authors: [site.name],
      tags: item.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: item.title,
      description: item.summary,
    },
  };
}

export default function CaseStudyPage({ params }: PageProps) {
  const item = getWorkBySlug(params.slug);
  if (!item) notFound();

  return (
    <article aria-labelledby="case-title">
      <JsonLd data={caseStudyJsonLd(item)} />
      <Container width="narrow" className="pb-20 pt-32 md:pb-[120px] md:pt-40">
        <CaseHeader item={item} />
        <div className="mt-14 md:mt-16">
          <MdxBody source={item.body} />
        </div>
        <CaseFooter next={getNextWork(item.slug)} />
      </Container>
    </article>
  );
}
