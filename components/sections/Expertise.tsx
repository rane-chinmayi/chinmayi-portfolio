import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import { site } from "@/content/site";

export default function Expertise() {
  return (
    <Section id="expertise">
      <SectionHeader id="expertise" {...site.sections.expertise} />
      <p className="mt-10 text-center text-subtle">{site.comingSoon}</p>
    </Section>
  );
}
