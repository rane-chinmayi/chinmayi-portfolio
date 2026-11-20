import { Briefcase, FileText, Globe, Link as LinkIcon, Mail, MapPin, Plane } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Button from "@/components/ui/Button";
import Chip from "@/components/ui/Chip";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import { reveal } from "@/lib/reveal";
import { site } from "@/content/site";
import type { ContactChipIcon } from "@/content/types";

const chipIcons: Record<ContactChipIcon, LucideIcon> = {
  globe: Globe,
  briefcase: Briefcase,
  plane: Plane,
};

const iconClass = "size-[18px] shrink-0";

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
          <Mail className={iconClass} aria-hidden="true" />
          {contact.emailLabel}
        </Button>
        <Button href={links.linkedin} newTab variant="secondary" size="xl">
          <LinkIcon className={iconClass} aria-hidden="true" />
          {contact.linkedinLabel}
          <span className="sr-only">{site.labels.opensInNewTab}</span>
        </Button>
        <Button
          href={links.resume}
          download={links.resumeFilename}
          variant="secondary"
          size="xl"
        >
          <FileText className={iconClass} aria-hidden="true" />
          {contact.resumeLabel}
        </Button>
      </div>

      <p
        className="mt-8 flex items-center justify-center gap-2 text-[16px] text-muted"
        {...reveal(1, 2)}
      >
        <MapPin className="size-[18px] shrink-0 text-accent-text" aria-hidden="true" />
        <span>
          {contact.location.prefix}{" "}
          <strong className="font-semibold text-foreground">
            {contact.location.place}
          </strong>
        </span>
      </p>

      <ul className="mt-6 flex flex-wrap justify-center gap-3" {...reveal()}>
        {contact.chips.map(({ icon, label }) => {
          const Icon = chipIcons[icon];
          return (
            <li key={label}>
              <Chip tone="muted" size="md">
                <Icon className="size-4 shrink-0 text-accent-text" aria-hidden="true" />
                {label}
              </Chip>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
