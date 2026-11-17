import { ChartLine, Code, Search, Sparkles } from "lucide-react";
import Card from "@/components/ui/Card";
import Chip from "@/components/ui/Chip";
import IconTile from "@/components/ui/IconTile";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import { reveal } from "@/lib/reveal";
import { site } from "@/content/site";
import type { ExpertiseIcon } from "@/content/types";

const icons: Record<ExpertiseIcon, typeof Search> = {
  search: Search,
  sparkles: Sparkles,
  code: Code,
  chart: ChartLine,
};

export default function Expertise() {
  return (
    <Section id="expertise">
      <SectionHeader id="expertise" {...site.sections.expertise} />

      <ul className="mt-12 grid gap-5 md:grid-cols-2">
        {site.expertise.items.map((item, index) => {
          const Icon = icons[item.icon];
          return (
            <li key={item.title} {...reveal(index, 2)}>
              <Card className="h-full p-8">
                <IconTile>
                  <Icon className="size-5" aria-hidden="true" />
                </IconTile>
                <h3 className="mb-2.5 mt-5 font-heading text-[22px] font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mb-5 text-[15px] leading-[1.65] text-muted">
                  {item.description}
                </p>
                <ul className="flex flex-wrap gap-2">
                  {item.chips.map((chip) => (
                    <li key={chip}>
                      <Chip>{chip}</Chip>
                    </li>
                  ))}
                </ul>
              </Card>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
