import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import WorkCard from "@/components/work/WorkCard";
import { site } from "@/content/site";
import { getFeaturedWork } from "@/lib/work";
import { reveal } from "@/lib/reveal";

/** Homepage Work section: featured case studies from content/work. */
export default function Work() {
  const items = getFeaturedWork();

  return (
    <Section id="work">
      <SectionHeader id="work" {...site.sections.work} />

      <ul className="mt-12 grid gap-5 md:grid-cols-2">
        {items.map((item, index) => (
          <li key={item.slug} {...reveal(index, 2)}>
            <WorkCard item={item} index={index} />
          </li>
        ))}
      </ul>

      <div className="mt-10 text-center" {...reveal()}>
        <Button href="/work" variant="outline" size="md">
          {site.work.viewAllLabel}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Button>
      </div>
    </Section>
  );
}
