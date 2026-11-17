import Card from "@/components/ui/Card";
import { reveal } from "@/lib/reveal";
import Lead from "@/components/ui/Lead";
import RichText from "@/components/ui/RichText";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import { site } from "@/content/site";

export default function About() {
  const { paragraphs, stats } = site.about;

  return (
    <Section id="about">
      <SectionHeader id="about" {...site.sections.about} />

      {paragraphs.map((paragraph, index) => (
        <Lead key={index} className={index > 0 ? "mt-4" : undefined} {...reveal(index)}>
          <RichText value={paragraph} />
        </Lead>
      ))}

      <ul className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <li key={stat.label} {...reveal(index, 4)}>
            <Card className="h-full px-5 py-7 text-center">
              <p className="font-heading text-[38px] font-bold text-accent-text">
                {stat.value}
              </p>
              <p className="mt-1.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-muted">
                {stat.label}
              </p>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  );
}
