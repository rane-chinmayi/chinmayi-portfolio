import Button from "@/components/ui/Button";
import Chip from "@/components/ui/Chip";
import Emoji from "@/components/ui/Emoji";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import { reveal } from "@/lib/reveal";
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

      <div className="mt-8 flex flex-wrap justify-center gap-4" {...reveal()}>
        <Button href={links.emailHref} size="xl">
          <Emoji>{contact.emailIcon}</Emoji>
          {contact.emailLabel}
        </Button>
        <Button href={links.linkedin} newTab variant="secondary" size="xl">
          <Emoji>{contact.linkedinIcon}</Emoji>
          {contact.linkedinLabel}
          <span className="sr-only">{site.labels.opensInNewTab}</span>
        </Button>
        <Button
          href={links.resume}
          download={links.resumeFilename}
          variant="secondary"
          size="xl"
        >
          <Emoji>{contact.resumeIcon}</Emoji>
          {contact.resumeLabel}
        </Button>
      </div>

      <p
        className="mt-8 flex items-center justify-center gap-2 text-[16px] text-muted"
        {...reveal(1, 2)}
      >
        <Emoji>{contact.location.icon}</Emoji>
        <span>
          {contact.location.prefix}{" "}
          <strong className="font-semibold text-foreground">
            {contact.location.place}
          </strong>
        </span>
      </p>

      <ul className="mt-6 flex flex-wrap justify-center gap-3" {...reveal()}>
        {contact.chips.map(({ icon, label }) => (
          <li key={label}>
            <Chip tone="muted" size="md">
              <Emoji size="sm">{icon}</Emoji>
              {label}
            </Chip>
          </li>
        ))}
      </ul>
    </Section>
  );
}
