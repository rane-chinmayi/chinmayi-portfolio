import { ArrowRight } from "lucide-react";
import NewsletterForm from "@/components/forms/NewsletterForm";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Chip from "@/components/ui/Chip";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import { cn } from "@/lib/cn";
import { isPlainAnchor } from "@/lib/links";
import { reveal } from "@/lib/reveal";
import { site, visiblePosts } from "@/content/site";

export default function Writing() {
  const { readLabel, newsletter, followCta } = site.writing;
  const newsletterOn = site.features.newsletter;
  const posts = visiblePosts();

  // Two (or fewer) posts sit in a centred 2-column grid whose cards are the same
  // width as in the 3-column layout; three or more use the full 3-column grid.
  const gridClass =
    posts.length > 2
      ? "lg:grid-cols-3"
      : posts.length === 2
        ? "mx-auto max-w-[800px] md:grid-cols-2"
        : "mx-auto max-w-[400px]";

  return (
    <Section id="writing">
      <SectionHeader id="writing" {...site.sections.writing} />

      <ul className={cn("mt-12 grid gap-5", gridClass)}>
        {posts.map((post, index) => {
          const body = (
            <>
              <Chip className="self-start">{post.type}</Chip>
              <h3 className="font-heading text-[20px] font-semibold leading-[1.35] text-foreground">
                {post.title}
              </h3>
              {post.href && (
                <span className="mt-auto flex items-center gap-1.5 text-[14px] font-semibold text-accent-text">
                  {readLabel}
                  <ArrowRight className="size-4" aria-hidden="true" />
                  {isPlainAnchor(post.href) && (
                    <span className="sr-only">{site.labels.opensInNewTab}</span>
                  )}
                </span>
              )}
            </>
          );
          const cardClass = "flex h-full flex-col gap-3 p-7";

          return (
            <li key={post.title} {...reveal(index, 3)}>
              {post.href ? (
                <Card
                  href={post.href}
                  newTab={isPlainAnchor(post.href)}
                  className={cardClass}
                >
                  {body}
                </Card>
              ) : (
                <Card className={cardClass}>{body}</Card>
              )}
            </li>
          );
        })}
      </ul>

      {newsletterOn ? (
        /* Newsletter band */
        <Card
          className="mt-5 flex flex-wrap items-center justify-between gap-6 bg-band-glow px-6 py-8 sm:px-10 sm:py-9"
          {...reveal()}
        >
          <div className="min-w-0 flex-1 basis-[380px]">
            <h3 className="mb-2 font-heading text-[24px] font-bold text-foreground">
              {newsletter.heading}
            </h3>
            <p className="text-[15px] text-muted">{newsletter.subline}</p>
          </div>
          <div className="min-w-0 flex-1 basis-[400px]">
            <NewsletterForm config={newsletter} />
          </div>
        </Card>
      ) : (
        /* Shown only while the newsletter feature is off. */
        <div className="mt-10 text-center" {...reveal()}>
          <p className="mx-auto max-w-[520px] text-[15px] text-muted">
            {followCta.line}
          </p>
          <Button
            href={site.links.linkedin}
            newTab
            variant="outline"
            size="md"
            className="mt-5"
          >
            {followCta.label}
            <span className="sr-only">{site.labels.opensInNewTab}</span>
          </Button>
        </div>
      )}
    </Section>
  );
}
