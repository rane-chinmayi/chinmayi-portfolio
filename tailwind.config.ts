import type { Config } from "tailwindcss";

/*
 * Maps the CSS variables in app/globals.css to Tailwind names.
 * Solid colours use the `<alpha-value>` form so `/xx` opacity works.
 * Translucent tokens (surface, border*, fill*) carry their own alpha: use as-is.
 */
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--bg) / <alpha-value>)",
        foreground: "rgb(var(--text) / <alpha-value>)",
        muted: "rgb(var(--text-muted) / <alpha-value>)",
        subtle: "rgb(var(--text-subtle) / <alpha-value>)",
        soft: "rgb(var(--text-soft) / <alpha-value>)",
        chip: "rgb(var(--chip-text) / <alpha-value>)",
        surface: {
          DEFAULT: "var(--surface)",
          solid: "rgb(var(--surface-solid) / <alpha-value>)",
        },
        media: "rgb(var(--media-bg) / <alpha-value>)",
        field: "rgb(var(--field-bg) / <alpha-value>)",
        marker: "rgb(var(--marker-bg) / <alpha-value>)",
        border: {
          DEFAULT: "var(--border)",
          soft: "var(--border-soft)",
          strong: "var(--border-strong)",
          chip: "var(--border-chip)",
          field: "var(--border-field)",
        },
        fill: {
          subtle: "var(--fill-subtle)",
          chip: "var(--fill-chip)",
          soft: "var(--fill-soft)",
        },
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          text: "rgb(var(--accent-text) / <alpha-value>)",
        },
        "on-accent": "rgb(var(--on-accent) / <alpha-value>)",
        error: "rgb(var(--error) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      // No line-height here on purpose: it inherits `normal` from <body>,
      // matching the reference.
      fontSize: {
        display: [
          "clamp(48px, 6vw, 76px)",
          { lineHeight: "1.05", letterSpacing: "-0.03em", fontWeight: "800" },
        ],
        tagline: ["clamp(24px, 3vw, 34px)", { fontWeight: "700" }],
        "h2-xl": [
          "clamp(36px, 5vw, 56px)",
          { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
        h2: [
          "clamp(34px, 4vw, 48px)",
          { letterSpacing: "-0.02em", fontWeight: "700" },
        ],
      },
      letterSpacing: {
        eyebrow: "0.16em",
      },
      borderRadius: {
        card: "var(--radius-card)",
        inner: "var(--radius-inner)",
        pill: "var(--radius-pill)",
      },
      maxWidth: {
        // `container` = content width + the 2×24px gutters (Container is border-box),
        // so content is exactly --container-max wide, as in the reference.
        container: "calc(var(--container-max) + 3rem)",
        // `content` = the bare content width (header pill).
        content: "var(--container-max)",
        // Narrower page widths, same content-width + gutters convention.
        timeline: "calc(var(--container-timeline) + 3rem)",
        narrow: "calc(var(--container-narrow) + 3rem)",
      },
      boxShadow: {
        glow: "0 8px 32px var(--accent-glow)",
        elevated: "0 12px 40px rgba(0, 0, 0, 0.45)",
        // 4px ring in the page colour: separates timeline dots from the line.
        dot: "0 0 0 4px rgb(var(--bg))",
      },
      backgroundImage: {
        "band-glow":
          "radial-gradient(ellipse at 0% 0%, var(--accent-glow), transparent 60%)",
        "page-glow":
          "radial-gradient(ellipse 60% 50% at 70% 30%, var(--accent-glow), transparent 70%)",
      },
    },
  },
  plugins: [],
};
export default config;
