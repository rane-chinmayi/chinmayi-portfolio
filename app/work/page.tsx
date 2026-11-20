import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import WorkCard from "@/components/work/WorkCard";
import { site } from "@/content/site";
import { reveal } from "@/lib/reveal";
import { getAllWork } from "@/lib/work";

const { index } = site.work;

export const metadata: Metadata = {
  title: index.title,
  description: index.lead,
  alternates: { canonical: "/work" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.seo.locale,
    title: index.title,
    description: index.lead,
    url: "/work",
  },
  twitter: {
    card: "summary_large_image",
    title: index.title,
    description: index.lead,
  },
};

/** All case studies, ordered by `order`. The page title is the h1. */
export default function WorkIndexPage() {
  const items = getAllWork();

  return (
    <Section id="work-index" className="pt-32 md:pt-40">
      <SectionHeader id="work-index" as="h1" {...index} />

      <ul className="mt-12 grid gap-5 md:grid-cols-2">
        {items.map((item, itemIndex) => (
          <li key={item.slug} {...reveal(itemIndex, 2)}>
            <WorkCard item={item} index={itemIndex} headingLevel="h2" />
          </li>
        ))}
      </ul>
    </Section>
  );
}
