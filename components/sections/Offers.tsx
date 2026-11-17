import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import { site } from "@/content/site";

export default function Offers() {
  return (
    <Section id="offers">
      <SectionHeader id="offers" {...site.sections.offers} />
      <p className="mt-10 text-center text-subtle">{site.comingSoon}</p>
    </Section>
  );
}
