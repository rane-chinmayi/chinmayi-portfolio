import { ExternalLink } from "lucide-react";
import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import { cn } from "@/lib/cn";
import { newTabProps } from "@/lib/links";
import { reveal } from "@/lib/reveal";
import { site } from "@/content/site";

export default function Experience() {
  const { roles, education, educationHeading, publicationsHeading, readPaperLabel } =
    site.experience;
  // Draft placeholders (`draft: true`) never render.
  const publications = site.experience.publications.filter((paper) => !paper.draft);

  return (
    <Section id="experience" width="timeline">
      <SectionHeader id="experience" {...site.sections.experience} />

      {/* Timeline: a 2px line on the left, one glass card + dot per role. */}
      <ol className="mt-12 flex flex-col gap-5 border-l-2 border-border-soft pl-8">
        {roles.map((role) => (
          <li key={`${role.title}-${role.dates}`} {...reveal()}>
            <Card className="relative p-7">
              <span
                aria-hidden="true"
                className={cn(
                  "absolute -left-[42px] top-8 rounded-pill shadow-dot",
                  role.current
                    ? "size-4 bg-accent"
                    : "size-5 border-2 border-accent-text bg-marker",
                )}
              />
              <div className="flex flex-wrap justify-between gap-2">
                <h3 className="font-heading text-[20px] font-semibold text-foreground">
                  {role.title}
                </h3>
                <p className="text-[13px] text-muted">{role.dates}</p>
              </div>
              <p className="mb-3 mt-1 text-[15px] font-semibold text-accent-text">
                {role.company} · {role.location}
              </p>
              <p className="text-[15px] leading-[1.65] text-muted">
                {role.summary}
              </p>
            </Card>
          </li>
        ))}
      </ol>

      <h3 className="sr-only">{educationHeading}</h3>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {education.map((item, index) => (
          <li key={item.degree} {...reveal(index, 2)}>
            <Card className="h-full p-6">
              <p className="mb-1.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-accent-text">
                {item.label}
              </p>
              <p className="font-heading text-[17px] font-semibold text-foreground">
                {item.degree}
              </p>
              <p className="mt-1.5 text-[14px] text-muted">
                {item.institution} · {item.gpa}
              </p>
            </Card>
          </li>
        ))}
      </ul>

      {publications.length > 0 && (
        <section
          id="publications"
          aria-labelledby="publications-title"
          className="mt-14"
        >
          <h3
            id="publications-title"
            className="mb-6 font-heading text-[22px] font-semibold text-foreground"
            {...reveal()}
          >
            {publicationsHeading}
          </h3>
          <ul className="flex flex-col gap-4">
            {publications.map((paper) => (
              <li key={paper.href} {...reveal()}>
                <Card className="p-6">
                  <h4 className="font-heading text-[18px] font-semibold leading-snug text-foreground">
                    {paper.title}
                  </h4>
                  <p className="mt-1.5 text-[14px] text-muted">
                    {paper.venue} {paper.year}
                  </p>
                  <p className="mt-3 text-[15px] leading-[1.65] text-soft">
                    {paper.takeaway}
                  </p>
                  <a
                    href={paper.href}
                    {...newTabProps}
                    className="mt-4 inline-flex items-center gap-1.5 rounded-pill text-[14px] font-semibold text-accent-text underline-offset-4 transition-colors hover:underline active:opacity-80"
                  >
                    {readPaperLabel}
                    <ExternalLink className="size-4" aria-hidden="true" />
                    <span className="sr-only">
                      : {paper.title} {site.labels.opensInNewTab}
                    </span>
                  </a>
                </Card>
              </li>
            ))}
          </ul>
        </section>
      )}
    </Section>
  );
}
