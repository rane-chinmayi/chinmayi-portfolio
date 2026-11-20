import type { CSSProperties } from "react";
import { brand } from "@/content/brand";

const grid = brand.gridLine;
// Satori has no `transparent` keyword in gradients.
const clear = "rgba(255, 255, 255, 0)";

/**
 * Brand background shared by the share cards (home and case studies): dark
 * page colour, accent glow top-right, faint 64px line grid.
 */
export const ogBackdrop: CSSProperties = {
  backgroundColor: brand.bg,
  backgroundImage: `radial-gradient(circle at 82% 18%, ${brand.accentGlow}, rgba(46, 91, 255, 0) 55%), linear-gradient(to bottom, ${grid} 0px, ${grid} 1px, ${clear} 1px), linear-gradient(to right, ${grid} 0px, ${grid} 1px, ${clear} 1px)`,
  backgroundSize: "100% 100%, 64px 64px, 64px 64px",
};
