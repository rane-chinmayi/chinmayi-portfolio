import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Chip from "@/components/ui/Chip";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import { site } from "@/content/site";

export default function Offers() {
  return (
    <Section id="offers">
      <SectionHeader id="offers" {...site.sections.offers} />

      <ul className="mt-12 grid gap-5 lg:grid-cols-3">
        {site.offers.items.map((offer) => {
          const href = offer.cta?.href;
          // Price wins over status once you set one.
          const note = offer.price ?? offer.status;

          return (
            <li key={offer.title}>
              <Card
                edge={offer.featured ? "strong" : "default"}
                className="flex h-full flex-col gap-3.5 p-8"
              >
                <Chip tone="accent" className="self-start">
                  {offer.chip}
                </Chip>
                <h3 className="font-heading text-[22px] font-semibold text-foreground">
                  {offer.title}
                </h3>
                <p className="text-[15px] leading-[1.6] text-muted">
                  {offer.description}
                </p>

                {/* Bottom row, pinned so the three cards line up. */}
                {offer.featured ? (
                  <div className="mt-auto">
                    {offer.price && (
                      <p className="mb-3 font-semibold text-foreground">
                        {offer.price}
                      </p>
                    )}
                    {href && offer.cta && (
                      <Button
                        href={href}
                        size="block"
                        glow={false}
                        className="w-full"
                      >
                        {offer.cta.label}
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="mt-auto flex items-center justify-between gap-3">
                    <span className="font-semibold text-foreground">{note}</span>
                    {href && offer.cta && (
                      <Button href={href} variant="outline" size="sm">
                        {offer.cta.label}
                      </Button>
                    )}
                  </div>
                )}
              </Card>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
