import { Filter, RefreshCw, Scale, ShieldCheck, Target, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Emoji from "@/components/ui/Emoji";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import { cn } from "@/lib/cn";
import { reveal } from "@/lib/reveal";
import { site } from "@/content/site";
import type { PrincipleIcon } from "@/content/types";

const icons: Record<PrincipleIcon, LucideIcon> = {
  target: Target,
  "trending-up": TrendingUp,
  refresh: RefreshCw,
  shield: ShieldCheck,
  scale: Scale,
  filter: Filter,
};

/**
 * "How I Think": a numbered timeline. Each <li> is one scroll-reveal unit (see
 * `.tl-node` / `.tl-card` in globals.css and RevealObserver). md+: a centred line with the nodes on it,
 * text alternating left (odd) and right (even). Phones: the line is on the left
 * and all text sits to the right of the nodes.
 */
export default function HowIThink() {
  const { toolkit } = site;

  return (
    <Section id="how-i-think">
      <SectionHeader id="how-i-think" {...site.sections.howIThink} />

      {/* overflow-x-clip: the side slide-in offset must never cause horizontal scroll. */}
      <ol className="relative mt-14 flex flex-col gap-12 overflow-x-clip md:mt-16 md:gap-[72px]">
        {/* The line: through the node centres (28px from the left on phones). */}
        <span
          aria-hidden="true"
          className="absolute bottom-7 left-7 top-7 w-px -translate-x-1/2 bg-border-soft md:left-1/2"
        />

        {site.howIThink.items.map((item, index) => {
          const Icon = icons[item.icon];
          const odd = index % 2 === 0; // 01, 03, 05: text on the left from md up

          return (
            <li
              key={item.title}
              className="relative grid grid-cols-[56px_1fr] gap-x-5 md:grid-cols-[1fr_56px_1fr] md:gap-x-10"
              {...reveal()}
              data-reveal-kind="timeline"
              data-tl-side={odd ? "left" : "right"}
            >
              {/* Node on the line: icon + number badge, both decorative. */}
              <div
                aria-hidden="true"
                className="tl-node row-start-1 col-start-1 md:col-start-2"
              >
                <div className="node-glow relative flex size-14 items-center justify-center rounded-pill border border-border-chip bg-surface-solid transition-colors duration-200 hover:border-border-strong">
                  <Icon className="size-5 text-accent-text" />
                  <span className="absolute -right-[3px] -top-[3px] flex size-[22px] items-center justify-center rounded-pill bg-accent bg-accent-gradient text-[11px] font-bold leading-none text-on-accent">
                    {item.number}
                  </span>
                </div>
              </div>

              <div
                className={cn(
                  "tl-card row-start-1 col-start-2 mt-1 min-w-0 md:max-w-[360px]",
                  odd
                    ? "md:col-start-1 md:justify-self-end md:text-right"
                    : "md:col-start-3 md:justify-self-start md:text-left",
                )}
              >
                <h3 className="font-heading text-[18px] font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-[15px] leading-[1.65] text-muted">
                  {item.description}
                </p>
              </div>
            </li>
          );
        })}
      </ol>

      {/* My Toolkit: same container as the timeline, 80px below it. */}
      <section id="toolkit" aria-labelledby="toolkit-title" className="mt-20">
        <h3
          id="toolkit-title"
          className="text-center text-[14px] font-semibold uppercase tracking-[0.16em] text-muted"
          {...reveal()}
        >
          {toolkit.label}
        </h3>

        <ul className="mt-10 grid grid-cols-1 gap-8 min-[360px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {toolkit.categories.map((category, index) => (
            <li key={category.name} {...reveal(index, 5)}>
              <h4 className="flex items-center gap-2 font-heading text-[15px] font-semibold text-foreground">
                <Emoji>{category.emoji}</Emoji>
                {category.name}
              </h4>
              {/* Labels, not links: no pointer cursor, hover only brightens. */}
              <ul className="mt-4 flex flex-wrap gap-2.5">
                {category.tools.map((tool) => (
                  <li
                    key={tool}
                    className="cursor-default rounded-pill border border-accent/35 bg-accent/15 px-4 py-2 text-[14px] font-medium text-accent-text transition-colors duration-200 hover:border-accent/60 hover:bg-accent/25 motion-reduce:transition-none"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>
    </Section>
  );
}
