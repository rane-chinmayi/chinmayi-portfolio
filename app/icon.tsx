import { ImageResponse } from "next/og";
import { brand } from "@/content/brand";
import { loadPoppins } from "@/lib/og-font";

// next/og on the Node runtime fails on Windows (invalid bundled-font URL); edge works everywhere.
export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Favicon: accent-gradient rounded square with a dark (on-accent) Poppins "C". */
export default async function Icon() {
  const fonts = await loadPoppins([700]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 8,
          backgroundImage: brand.accentGradientDiagonal,
          color: brand.onAccent,
          fontFamily: "Poppins",
          fontSize: 23,
          fontWeight: 700,
          lineHeight: 1,
          paddingBottom: 1,
        }}
      >
        C
      </div>
    ),
    { ...size, fonts },
  );
}
