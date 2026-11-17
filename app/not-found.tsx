import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import Lead from "@/components/ui/Lead";
import Section from "@/components/ui/Section";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Page not found",
};

/** 404. Header and footer come from the root layout. */
export default function NotFound() {
  const { eyebrow, title, body, cta } = site.notFound;

  return (
    <Section
      id="not-found"
      width="narrow"
      padding="none"
      className="flex min-h-[70vh] items-center pb-20 pt-40 text-center"
    >
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1
          id="not-found-title"
          className="mb-3 mt-4 text-balance font-heading text-h2-xl text-foreground"
        >
          {title}
        </h1>
        <Lead>{body}</Lead>
        <Button href="/" className="mt-8">
          {cta}
        </Button>
      </div>
    </Section>
  );
}
