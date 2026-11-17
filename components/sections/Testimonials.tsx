import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import { site } from "@/content/site";

export default function Testimonials() {
  return (
    <Section id="testimonials">
      <SectionHeader id="testimonials" {...site.sections.testimonials} />
      <p className="mt-10 text-center text-subtle">{site.comingSoon}</p>
    </Section>
  );
}
