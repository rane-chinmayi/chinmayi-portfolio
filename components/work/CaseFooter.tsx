import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Chip from "@/components/ui/Chip";
import { caseStudyHref, site } from "@/content/site";
import type { WorkItem } from "@/content/types";
import { reveal } from "@/lib/reveal";

/** Bottom of a case-study page: "Next case study" card, then the contact CTA band. */
export default function CaseFooter({ next }: { next?: WorkItem }) {
  const { page } = site.work;
  const { contact, links } = site;

  return (
    <>
      {next && (
        <section aria-labelledby="next-case-title" className="mt-20" {...reveal()}>
          <h2
            id="next-case-title"
            className="mb-4 text-[12px] font-semibold uppercase tracking-eyebrow text-subtle"
          >
            {page.nextLabel}
          </h2>
          <Card
            href={caseStudyHref(next.slug)}
            className="flex flex-col gap-4 px-6 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-8"
          >
            <div className="min-w-0">
              <Chip tone="accent">{next.category}</Chip>
              <p className="mt-3 font-heading text-[22px] font-semibold leading-snug text-foreground sm:text-[26px]">
                {next.title}
              </p>
              <p className="mt-2 line-clamp-2 text-[15px] leading-[1.6] text-muted">
                {next.summary}
              </p>
            </div>
            <ArrowRight
              className="hidden size-6 shrink-0 text-accent-text sm:block"
              aria-hidden="true"
            />
          </Card>
        </section>
      )}

      <section aria-labelledby="case-cta-title" className="mt-10" {...reveal()}>
        <Card className="bg-band-glow px-6 py-9 text-center sm:px-10 sm:py-11">
          <h2
            id="case-cta-title"
            className="text-balance font-heading text-[26px] font-bold leading-[1.2] text-foreground sm:text-[32px]"
          >
            {page.ctaTitle}
          </h2>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button href={links.emailHref} size="md" glow={false}>
              {contact.emailLabel}
            </Button>
            <Button href={links.linkedin} newTab variant="outline" size="md">
              {contact.linkedinLabel}
              <span className="sr-only">{site.labels.opensInNewTab}</span>
            </Button>
          </div>
        </Card>
      </section>
    </>
  );
}
