import { ArrowRight, FileText } from "lucide-react";
import Card from "@/components/ui/Card";
import CardSlider from "@/components/ui/CardSlider";
import IconTile from "@/components/ui/IconTile";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import { cn } from "@/lib/cn";
import { newTabProps } from "@/lib/links";
import { reveal } from "@/lib/reveal";
import { site } from "@/content/site";

export default function Experience() {
  const {
    roles,
    education,
    educationHeading,
    publicationsHeading,
    readPaperLabel,
    slider,
  } = site.experience;
  // Draft placeholders (`draft: true`) never render.
  const publications = site.experience.publications.filter((paper) => !paper.draft);

  return (
    <Section id="experience" width="timeline">
      <SectionHeader id="experience" {...site.sections.experience} />

      {/* Timeline: 36px of left padding, a 2px line centred 6px in, one glass card +
          dot per role, 36px apart. */}
      <ol className="relative mt-12 flex flex-col gap-9 pl-9">
        <span
          aria-hidden="true"
          className="absolute bottom-1.5 left-[5px] top-1.5 w-0.5 bg-border-soft"
        />
        {roles.map((role) => (
          <li key={`${role.title}-${role.dates}`} {...reveal()}>
            <Card className="relative px-6 py-6 sm:px-8 sm:py-[30px]">
              {/* Dot: centred on the line (31px left of the card's inner edge) and on
                  the title row (card padding + half the 32px title line). */}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute -left-[31px] top-[40px] -translate-x-1/2 -translate-y-1/2 rounded-pill shadow-dot sm:top-[46px]",
                  role.current
                    ? "size-4 bg-accent"
                    : "size-5 border-2 border-accent-text bg-marker",
                )}
              />
              <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
                <h3 className="font-heading text-[20px] font-semibold leading-8 text-foreground">
                  {role.title}
                </h3>
                <p className="text-[13px] leading-8 text-muted">{role.dates}</p>
              </div>
              <p className="mb-1 mt-1.5 text-[15px] font-semibold leading-[1.6] text-accent-text">
                {role.company} · {role.location}
              </p>
              <p className="text-[15px] leading-[1.6] text-muted">
                {role.summary}
              </p>
            </Card>
          </li>
        ))}
      </ol>

      <h3 className="sr-only">{educationHeading}</h3>
      {/* Education and Publications share the timeline cards' left edge (36px in),
          width and padding, so the whole section lines up. */}
      <ul className="mt-9 grid gap-6 pl-9 sm:grid-cols-2">
        {education.map((item, index) => (
          <li key={item.degree} {...reveal(index, 2)}>
            <Card className="h-full px-6 py-6 sm:px-8 sm:py-[30px]">
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
          className="mt-14 pl-9"
        >
          <h3
            id="publications-title"
            className="mb-6 font-heading text-[22px] font-semibold text-foreground"
            {...reveal()}
          >
            {publicationsHeading}
          </h3>
          {/* Slider: 2 cards at a time from md up, 1 on phones; moves one card per step. */}
          <CardSlider
            labels={slider}
            visible={{ base: 1, md: 2 }}
            items={publications.map((paper) => (
              <Card
                key={paper.href}
                className="flex h-full w-full flex-col p-7 transition-colors duration-200 hover:border-border-strong motion-reduce:transition-none"
              >
                <IconTile>
                  <FileText className="size-5" aria-hidden="true" />
                </IconTile>
                <p className="mt-5 text-[12px] font-semibold uppercase tracking-[0.14em] text-accent-text">
                  {paper.venueFull ? (
                    <abbr
                      title={paper.venueFull}
                      className="cursor-help no-underline decoration-dotted underline-offset-4 hover:underline"
                    >
                      {paper.venue}
                    </abbr>
                  ) : (
                    paper.venue
                  )}{" "}
                  · {paper.year}
                </p>
                <h4 className="mt-2.5 font-heading text-[18px] font-semibold leading-[1.35] text-foreground">
                  {paper.title}
                </h4>
                <p className="mt-3 text-[15px] leading-[1.65] text-muted">
                  {paper.takeaway}
                </p>
                <a
                  href={paper.href}
                  {...newTabProps}
                  className="mt-auto inline-flex items-center gap-1.5 self-start rounded-pill pt-5 text-[14px] font-semibold text-accent-text underline-offset-4 transition-colors hover:underline active:opacity-80"
                >
                  {readPaperLabel}
                  <ArrowRight className="size-4" aria-hidden="true" />
                  <span className="sr-only">
                    : {paper.title} {site.labels.opensInNewTab}
                  </span>
                </a>
              </Card>
            ))}
          />
        </section>
      )}
    </Section>
  );
}
