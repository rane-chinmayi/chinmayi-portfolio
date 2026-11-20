import { site } from "@/content/site";
import { ogCardSize, renderOgCard } from "@/lib/og-card";

// Edge runtime: next/og fails on Windows under Node (see ../opengraph-image.tsx).
export const runtime = "edge";
export const alt = "Case studies by Chinmayi Rane";
export const size = ogCardSize;
export const contentType = "image/png";

/** Share card for /work. (A page-level openGraph replaces the root one, so it needs its own.) */
export default async function WorkIndexImage() {
  return renderOgCard({
    category: site.work.index.eyebrow,
    title: site.work.index.title,
    footer: site.tagline,
  });
}
