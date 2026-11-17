export type OgFont = {
  name: string;
  data: ArrayBuffer;
  weight: 500 | 600 | 700 | 800;
  style: "normal";
};

/**
 * Poppins as TrueType for next/og (Satori cannot read woff2). Fetched from the
 * Google Fonts API, the same source next/font uses. If the request fails (no
 * network) this returns [] and next/og falls back to its built-in font, so the
 * images still render.
 */
export async function loadPoppins(weights: Array<500 | 600 | 700 | 800>): Promise<OgFont[]> {
  try {
    const cssRes = await fetch(
      `https://fonts.googleapis.com/css2?family=Poppins:wght@${weights.join(";")}`,
    );
    if (!cssRes.ok) return [];
    const css = await cssRes.text();

    const fonts: OgFont[] = [];
    for (const block of css.split("@font-face").slice(1)) {
      const weight = Number(/font-weight:\s*(\d+)/.exec(block)?.[1]);
      const url = /src:\s*url\(([^)]+)\)\s*format\('(?:truetype|opentype)'\)/.exec(block)?.[1];
      if (!url || !weights.includes(weight as 500 | 600 | 700 | 800)) continue;
      const fontRes = await fetch(url);
      if (!fontRes.ok) continue;
      fonts.push({
        name: "Poppins",
        data: await fontRes.arrayBuffer(),
        weight: weight as OgFont["weight"],
        style: "normal",
      });
    }
    return fonts;
  } catch {
    return [];
  }
}
