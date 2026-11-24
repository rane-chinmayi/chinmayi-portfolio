import { Quote } from "lucide-react";
import Image from "next/image";
import Card from "@/components/ui/Card";
import ExpandableQuote from "@/components/ui/ExpandableQuote";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import { cn } from "@/lib/cn";
import { newTabProps } from "@/lib/links";
import { reveal } from "@/lib/reveal";
import { site } from "@/content/site";

export default function Testimonials() {
  const { items, readMoreLabel, showLessLabel } = site.testimonials;
  const single = items.length === 1;

  return (
    <Section id="testimonials" width={single ? "narrow" : "default"}>
      <SectionHeader id="testimonials" {...site.sections.testimonials} />

      {/* One testimonial renders as a single centred card; more become a grid. */}
      <ul className={cn("mt-10 grid gap-5", !single && "md:grid-cols-2")}>
        {items.map((item, index) => (
          <li key={item.name} {...reveal(index, 2)}>
            <Card as="figure" className="h-full p-6 text-left sm:p-10">
              <Quote
                className="size-6 fill-current text-accent-text"
                aria-hidden="true"
              />
              <ExpandableQuote
                className="mb-6 mt-4"
                readMoreLabel={readMoreLabel}
                showLessLabel={showLessLabel}
              >
                {item.quote}
              </ExpandableQuote>
              <figcaption className="flex items-center gap-3.5">
                {item.photo ? (
                  <Image
                    src={item.photo}
                    alt={item.name}
                    width={48}
                    height={48}
                    sizes="48px"
                    className="size-12 shrink-0 rounded-pill border border-border-chip object-cover"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="flex size-12 shrink-0 items-center justify-center rounded-pill bg-accent font-bold text-on-accent"
                  >
                    {item.initials}
                  </span>
                )}
                <span className="min-w-0">
                  <span className="block text-[15px] font-bold text-foreground">
                    {item.linkedin ? (
                      <a
                        href={item.linkedin}
                        {...newTabProps}
                        className="rounded-sm underline decoration-border-strong underline-offset-4 transition-colors hover:decoration-foreground"
                      >
                        {item.name}
                        <span className="sr-only">{site.labels.opensInNewTab}</span>
                      </a>
                    ) : (
                      item.name
                    )}
                  </span>
                  <span className="block text-[14px] text-muted">{item.role}</span>
                  {item.context && (
                    <span className="mt-0.5 block text-[13px] text-subtle">
                      {item.context}
                    </span>
                  )}
                </span>
              </figcaption>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  );
}
