import { ImageResponse } from "next/og";
import { brand } from "@/content/brand";
import { site } from "@/content/site";
import { loadPoppins } from "@/lib/og-font";
import { ogBackdrop } from "@/lib/og-style";

export const alt =
  "Chinmayi Rane. AI × Product, made simple. AI Product Manager, Mumbai, India.";
// next/og on the Node runtime fails on Windows (invalid bundled-font URL); edge works everywhere.
export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social share card (LinkedIn, X, etc.): 1200×630, brand style. */
export default async function OpenGraphImage() {
  const fonts = await loadPoppins([500, 600, 700, 800]);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 92px",
          fontFamily: "Poppins",
          color: brand.text,
          ...ogBackdrop,
        }}
      >
        {/* Accent pill */}
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
            fontSize: 24,
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
          {site.hero.chips[0]}
        </div>

        <div
          style={{
            marginTop: 40,
            fontSize: 112,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: -3,
            whiteSpace: "nowrap",
          }}
        >
          {`${site.name}.`}
        </div>

        <div
          style={{
            marginTop: 16,
            fontSize: 50,
            fontWeight: 700,
            color: brand.accentText,
          }}
        >
          {site.tagline}
        </div>

        <div
          style={{
            marginTop: 44,
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 30,
            fontWeight: 500,
            color: brand.textMuted,
          }}
        >
          <span>AI Product Manager</span>
          <span style={{ color: brand.accentText }}>·</span>
          <span>Mumbai, India</span>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
