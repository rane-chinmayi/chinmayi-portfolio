import { site } from "@/content/site";
import { ogCardSize, renderOgCard } from "@/lib/og-card";
import { getWorkCard } from "@/lib/work-cards";

// next/og on the Node runtime fails on Windows (invalid bundled-font URL), so
// this runs on the edge runtime. Edge has no fs: titles come from
// lib/work-cards.ts (inlined from content/work by next.config.mjs).
export const runtime = "edge";
export const alt = "Case study by Chinmayi Rane";
export const size = ogCardSize;
export const contentType = "image/png";

/** Share card for /work/[slug]: the case-study title and category. */
export default async function CaseStudyImage({ params }: { params: { slug: string } }) {
  const card = getWorkCard(params.slug);
  if (!card) return new Response("Not found", { status: 404 });

  return renderOgCard({
    category: card.category,
    title: card.title,
    footer: site.work.ogFooter,
  });
}
