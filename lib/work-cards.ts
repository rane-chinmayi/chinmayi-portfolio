export interface WorkCardData {
  slug: string;
  title: string;
  category: string;
}

/**
 * Case-study titles for the share images (edge runtime: no fs, so no
 * lib/work.ts). The data is inlined from content/work by next.config.mjs.
 */
export function getWorkCards(): WorkCardData[] {
  try {
    return JSON.parse(process.env.WORK_OG_CARDS ?? "[]") as WorkCardData[];
  } catch {
    return [];
  }
}

export function getWorkCard(slug: string): WorkCardData | undefined {
  return getWorkCards().find((card) => card.slug === slug);
}
