import Button from "@/components/ui/Button";
import Chip from "@/components/ui/Chip";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import { site } from "@/content/site";

export default function Contact() {
  const { contact, links } = site;

  return (
    <Section
      id="contact"
      width="narrow"
      padding="none"
      className="pb-16 md:pb-24"
    >
      <SectionHeader
        id="contact"
        size="large"
        {...site.sections.contact}
      />

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href={links.emailHref} size="md" glow={false}>
          {contact.emailLabel}
        </Button>
        <Button href={links.linkedin} newTab variant="outline" size="md">
          {contact.linkedinLabel}
          <span className="sr-only">{site.labels.opensInNewTab}</span>
        </Button>
        <Button
          href={links.resume}
          download={links.resumeFilename}
          variant="outline"
          size="md"
        >
          {contact.resumeLabel}
        </Button>
      </div>

      <ul className="mt-7 flex flex-wrap justify-center gap-2.5">
        {contact.chips.map((chip) => (
          <li key={chip}>
            <Chip tone="muted">{chip}</Chip>
          </li>
        ))}
      </ul>
    </Section>
  );
}
