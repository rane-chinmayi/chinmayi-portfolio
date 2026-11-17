import { ArrowRight } from "lucide-react";
import NewsletterForm from "@/components/forms/NewsletterForm";
import Card from "@/components/ui/Card";
import Chip from "@/components/ui/Chip";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import { isPlainAnchor } from "@/lib/links";
import { site } from "@/content/site";

export default function Writing() {
  const { posts, readLabel, newsletter } = site.writing;

  return (
    <Section id="writing">
      <SectionHeader id="writing" {...site.sections.writing} />

      <ul className="mt-12 grid gap-5 lg:grid-cols-3">
        {posts.map((post) => {
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
            <li key={post.title}>
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

      {/* Newsletter band */}
      <Card className="mt-5 flex flex-wrap items-center justify-between gap-6 bg-band-glow px-6 py-8 sm:px-10 sm:py-9">
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
    </Section>
  );
}
