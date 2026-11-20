import { ArrowRight } from "lucide-react";
import Card from "@/components/ui/Card";
import Chip from "@/components/ui/Chip";
import { caseStudyHref, site } from "@/content/site";
import type { WorkItem } from "@/content/types";
import { outcomeLine } from "@/lib/work";

interface WorkCardProps {
  item: WorkItem;
  /** Position in the grid; picks the glow position. */
  index: number;
  /** Heading level of the title: h3 under a section h2, h2 under a page h1. */
  headingLevel?: "h2" | "h3";
}

/** Case-study card: glow header with category chip, title, summary, outcome. */
export default function WorkCard({ item, index, headingLevel = "h3" }: WorkCardProps) {
  const Heading = headingLevel;
  const { glowPositions } = site.work;
  const glow = glowPositions[index % glowPositions.length];

  return (
    <Card href={caseStudyHref(item.slug)} className="flex h-full flex-col overflow-hidden">
      {/* Image area: soft accent glow, positioned per card. */}
      <div
        className="flex h-[220px] items-end bg-media px-6 py-5"
        style={{
          backgroundImage: `radial-gradient(circle at ${glow}, var(--accent-glow), transparent 60%)`,
        }}
      >
        <Chip tone="overlay">{item.category}</Chip>
      </div>
      <div className="flex flex-1 flex-col px-7 pb-7 pt-6">
        <Heading className="mb-2 font-heading text-[22px] font-semibold text-foreground">
          {item.title}
        </Heading>
        <p className="mb-4 line-clamp-3 text-[15px] leading-[1.6] text-muted">
          {item.summary}
        </p>
        <p className="mt-auto flex items-center gap-1.5 text-[14px] font-semibold text-accent-text">
          <span>{outcomeLine(item)}</span>
          <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
        </p>
      </div>
    </Card>
  );
}
