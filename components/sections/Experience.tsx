import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import { site } from "@/content/site";

export default function Experience() {
  return (
    <Section id="experience">
      <SectionHeader id="experience" {...site.sections.experience} />
      <p className="mt-10 text-center text-subtle">{site.comingSoon}</p>
    </Section>
  );
}
