import { Quote } from "lucide-react";
import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import { cn } from "@/lib/cn";
import { site } from "@/content/site";

export default function Testimonials() {
  const { items } = site.testimonials;
  const single = items.length === 1;

  return (
    <Section id="testimonials" width={single ? "narrow" : "default"}>
      <SectionHeader id="testimonials" {...site.sections.testimonials} />

      {/* One testimonial renders as a single centred card; more become a grid. */}
      <ul className={cn("mt-10 grid gap-5", !single && "md:grid-cols-2")}>
        {items.map((item) => (
          <li key={item.name}>
            <Card as="figure" className="h-full p-6 text-left sm:p-10">
              <Quote
                className="size-6 fill-current text-accent-text"
                aria-hidden="true"
              />
              <blockquote className="mb-6 mt-4 text-[18px] leading-[1.7] text-soft">
                {item.quote}
              </blockquote>
              <figcaption className="flex items-center gap-3.5">
                <span
                  aria-hidden="true"
                  className="flex size-11 shrink-0 items-center justify-center rounded-pill bg-accent font-bold text-on-accent"
                >
                  {item.initials}
                </span>
                <span>
                  <span className="block text-[15px] font-bold text-foreground">
                    {item.name}
                  </span>
                  <span className="text-[14px] text-muted">{item.role}</span>
                </span>
              </figcaption>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  );
}
