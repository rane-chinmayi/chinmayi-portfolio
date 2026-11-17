import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import { site } from "@/content/site";

export default function Writing() {
  return (
    <Section id="writing">
      <SectionHeader id="writing" {...site.sections.writing} />
      <p className="mt-10 text-center text-subtle">{site.comingSoon}</p>
    </Section>
  );
}
