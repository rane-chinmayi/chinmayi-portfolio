/**
 * Brand colours as plain values, for the places CSS variables cannot reach:
 * generated images (Open Graph, icons) and browser chrome.
 *
 * KEEP IN SYNC with the tokens in app/globals.css. Changing the brand colour
 * means editing --accent / --accent-text / --accent-glow there AND the matching
 * values here.
 */
export const brand = {
  bg: "#08080B",
  text: "#F8FAFC",
  textMuted: "#B6BAC8",
  accent: "#2E5BFF",
  accentText: "#8FA8FF",
  onAccent: "#FFFFFF",
  accentGlow: "rgba(46, 91, 255, 0.28)",
  accentTint: "rgba(46, 91, 255, 0.16)",
  accentBorder: "rgba(143, 168, 255, 0.35)",
  gridLine: "rgba(255, 255, 255, 0.04)",
} as const;
