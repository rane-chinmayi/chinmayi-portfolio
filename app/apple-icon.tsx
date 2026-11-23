import { ImageResponse } from "next/og";
import { brand } from "@/content/brand";
import { loadPoppins } from "@/lib/og-font";

// next/og on the Node runtime fails on Windows (invalid bundled-font URL); edge works everywhere.
export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Home-screen icon. Full-bleed square: iOS applies its own rounded mask. */
export default async function AppleIcon() {
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
          backgroundImage: brand.accentGradientDiagonal,
          color: brand.onAccent,
          fontFamily: "Poppins",
          fontSize: 128,
          fontWeight: 700,
          lineHeight: 1,
          paddingBottom: 6,
        }}
      >
        C
      </div>
    ),
    { ...size, fonts },
  );
}
