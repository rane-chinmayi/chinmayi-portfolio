import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import { site } from "@/content/site";

export default function Work() {
  return (
    <Section id="work">
      <SectionHeader id="work" {...site.sections.work} />
      <p className="mt-10 text-center text-subtle">{site.comingSoon}</p>
    </Section>
  );
}
