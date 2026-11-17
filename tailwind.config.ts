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
        chip: "rgb(var(--chip-text) / <alpha-value>)",
        surface: {
          DEFAULT: "var(--surface)",
          solid: "rgb(var(--surface-solid) / <alpha-value>)",
        },
        border: {
          DEFAULT: "var(--border)",
          strong: "var(--border-strong)",
          chip: "var(--border-chip)",
        },
        fill: {
          subtle: "var(--fill-subtle)",
          chip: "var(--fill-chip)",
        },
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          text: "rgb(var(--accent-text) / <alpha-value>)",
        },
        "on-accent": "rgb(var(--on-accent) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      fontSize: {
        h2: [
          "clamp(34px, 4vw, 48px)",
          { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "700" },
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
        container: "var(--container-max)",
      },
      boxShadow: {
        glow: "0 8px 32px var(--accent-glow)",
        elevated: "0 12px 40px rgba(0, 0, 0, 0.45)",
      },
      backgroundImage: {
        "page-glow":
          "radial-gradient(ellipse 60% 50% at 70% 30%, var(--accent-glow), transparent 70%)",
      },
    },
  },
  plugins: [],
};
export default config;
