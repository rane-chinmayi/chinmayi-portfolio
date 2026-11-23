/**
 * Brand colours as plain values, for the places CSS variables cannot reach:
 * generated images (Open Graph, icons) and browser chrome.
 *
 * KEEP IN SYNC with the tokens in app/globals.css. Changing the brand colour
 * means editing --accent / --accent-2 / --accent-text / --accent-glow /
 * --on-accent there AND the matching values here.
 */
const accent = "#8B5CF6"; // --accent
const accent2 = "#A855F7"; // --accent-2

export const brand = {
  bg: "#08080B",
  text: "#F8FAFC",
  textMuted: "#B6BAC8",
  accent,
  accent2,
  accentText: "#A78BFA",
  // Text/icons placed ON accent fills (the "C" icon, the share-card pills).
  onAccent: "#110A19",
  accentGlow: "rgba(139, 92, 246, 0.35)",
  // Same colour as accentGlow at alpha 0: the end of a radial glow (Satori has
  // no `transparent` keyword in gradients).
  accentGlowClear: "rgba(139, 92, 246, 0)",
  // Same gradient as `bg-accent-gradient` (buttons): left to right.
  accentGradient: `linear-gradient(90deg, ${accent}, ${accent2})`,
  // Diagonal version for square icons.
  accentGradientDiagonal: `linear-gradient(135deg, ${accent}, ${accent2})`,
  gridLine: "rgba(255, 255, 255, 0.04)",
} as const;
