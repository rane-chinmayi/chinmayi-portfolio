import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Chip from "@/components/ui/Chip";
import { site } from "@/content/site";
import type { WorkItem } from "@/content/types";
import { cn } from "@/lib/cn";
import { isPlainAnchor } from "@/lib/links";

// Desktop columns follow the number of metrics (max 4); phones always use 2.
const desktopColumns: Record<number, string> = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
};

/** Top of a case-study page: back link, chip, h1, lead, meta, metrics, links. */
export default function CaseHeader({ item }: { item: WorkItem }) {
  const { page } = site.work;
  const columns = desktopColumns[Math.min(item.metrics.length, 4)];
  const oddOnPhone = item.metrics.length % 2 === 1;

  const meta = [
    { label: page.roleLabel, values: [item.role] },
    { label: page.timelineLabel, values: [item.timeline] },
    { label: page.toolsLabel, values: item.tools },
  ];

  return (
    <header>
      <Link
        href="/work"
        className="inline-flex items-center gap-2 rounded-pill text-[14px] font-semibold text-muted transition-colors hover:text-foreground active:text-muted"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        {page.backLabel}
      </Link>

      <div className="mt-8">
        <Chip tone="accent">{item.category}</Chip>
      </div>
      <h1 id="case-title" className="mt-5 text-balance font-heading text-case-title text-foreground">
        {item.title}
      </h1>
      <p className="mt-5 max-w-[720px] text-[18px] leading-[1.65] text-muted">
        {item.summary}
      </p>

      {/* Role · Timeline · Tools */}
      <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-5">
        {meta.map(({ label, values }) => (
          <div key={label} className="min-w-0">
            <dt className="mb-2 text-[12px] font-semibold uppercase tracking-eyebrow text-subtle">
              {label}
            </dt>
            <dd>
              <ul className="flex flex-wrap gap-2">
                {values.map((value) => (
                  <li key={value} className="min-w-0">
                    <Chip tone="muted">{value}</Chip>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>

      {/* Metrics: same stat-card style as the homepage About stats. */}
      <ul
        aria-label={page.metricsLabel}
        className={cn("mt-10 grid grid-cols-2 gap-4", columns)}
      >
        {item.metrics.map((metric, index) => (
          <li
            key={metric.label}
            className={cn(
              oddOnPhone && index === item.metrics.length - 1 && "col-span-2 lg:col-span-1",
            )}
          >
            <Card className="flex h-full flex-col items-center justify-start px-4 py-6 text-center sm:px-5 sm:py-7">
              <p className="font-heading text-[28px] font-bold leading-tight text-accent-text sm:text-[34px] lg:text-[38px]">
                {metric.value}
              </p>
              <p className="mt-1.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-muted">
                {metric.label}
              </p>
            </Card>
          </li>
        ))}
      </ul>

      {item.links.length > 0 && (
        <ul className="mt-8 flex flex-wrap gap-3">
          {item.links.map((link, index) => {
            const external = isPlainAnchor(link.href);
            return (
              <li key={link.href}>
                <Button
                  href={link.href}
                  newTab={external}
                  variant={index === 0 ? "primary" : "outline"}
                  size="md"
                >
                  {link.label}
                  {external && (
                    <>
                      <ExternalLink className="size-4" aria-hidden="true" />
                      <span className="sr-only">{site.labels.opensInNewTab}</span>
                    </>
                  )}
                </Button>
              </li>
            );
          })}
        </ul>
      )}
    </header>
  );
}
