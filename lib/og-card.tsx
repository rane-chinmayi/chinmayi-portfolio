import { ImageResponse } from "next/og";
import { brand } from "@/content/brand";
import { site } from "@/content/site";
import { loadPoppins } from "./og-font";
import { ogBackdrop } from "./og-style";

export const ogCardSize = { width: 1200, height: 630 };

/** Smaller type for longer titles, so three lines at most fit the card. */
function titleSize(title: string): number {
  if (title.length <= 28) return 88;
  if (title.length <= 44) return 72;
  return 60;
}

interface OgCardProps {
  /** Pill text, top-left. */
  category: string;
  /** Large heading. */
  title: string;
  /** Muted text after the name, bottom row. */
  footer: string;
}

/**
 * Share card for the work pages (1200×630, brand style): category pill,
 * Poppins title, name + footer line. Used by /work and /work/[slug].
 */
export async function renderOgCard({ category, title, footer }: OgCardProps) {
  const fonts = await loadPoppins([600, 700, 800]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 92px",
          fontFamily: "Poppins",
          color: brand.text,
          ...ogBackdrop,
        }}
      >
        {/* Category pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            alignSelf: "flex-start",
            gap: 12,
            padding: "11px 24px",
            borderRadius: 999,
            backgroundImage: brand.accentGradient,
            color: brand.onAccent,
            fontSize: 26,
            fontWeight: 700,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              backgroundColor: brand.onAccent,
            }}
          />
          {category}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: titleSize(title),
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: -2,
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 30,
            fontWeight: 600,
            color: brand.textMuted,
          }}
        >
          <span style={{ color: brand.text, fontWeight: 700 }}>{`${site.name}.`}</span>
          <span style={{ color: brand.accentText }}>·</span>
          <span>{footer}</span>
        </div>
      </div>
    ),
    { ...ogCardSize, fonts },
  );
}
