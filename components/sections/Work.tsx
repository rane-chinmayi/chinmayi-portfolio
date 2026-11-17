import { ArrowRight } from "lucide-react";
import Card from "@/components/ui/Card";
import Chip from "@/components/ui/Chip";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import { caseStudyHref, site } from "@/content/site";

export default function Work() {
  return (
    <Section id="work">
      <SectionHeader id="work" {...site.sections.work} />

      <ul className="mt-12 grid gap-5 md:grid-cols-2">
        {site.work.items.map((study) => (
          <li key={study.slug}>
            <Card
              href={caseStudyHref(study.slug)}
              className="flex h-full flex-col overflow-hidden"
            >
              {/* Image area: soft accent glow, positioned per card. */}
              <div
                className="flex h-[220px] items-end bg-media px-6 py-5"
                style={{
                  backgroundImage: `radial-gradient(circle at ${study.glowPosition}, var(--accent-glow), transparent 60%)`,
                }}
              >
                <Chip tone="overlay">{study.chip}</Chip>
              </div>
              <div className="px-7 pb-7 pt-6">
                <h3 className="mb-2 font-heading text-[22px] font-semibold text-foreground">
                  {study.title}
                </h3>
                <p className="mb-4 text-[15px] leading-[1.6] text-muted">
                  {study.description}
                </p>
                <p className="flex items-center gap-1.5 text-[14px] font-semibold text-accent-text">
                  {study.outcome}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </p>
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  );
}
