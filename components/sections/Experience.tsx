import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import { cn } from "@/lib/cn";
import { site } from "@/content/site";

export default function Experience() {
  const { roles, education, educationHeading } = site.experience;

  return (
    <Section id="experience" width="timeline">
      <SectionHeader id="experience" {...site.sections.experience} />

      {/* Timeline: a 2px line on the left, one glass card + dot per role. */}
      <ol className="mt-12 flex flex-col gap-5 border-l-2 border-border-soft pl-8">
        {roles.map((role) => (
          <li key={`${role.title}-${role.dates}`}>
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
        {education.map((item) => (
          <li key={item.degree}>
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
    </Section>
  );
}
