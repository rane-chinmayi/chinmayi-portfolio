import localFont from "next/font/local";

/*
 * Noto Color Emoji, subset to the 7 emoji the Contact section uses (see
 * app/fonts/README.md). Three tiny files (~7 KB in all) instead of the ~1.2 MB
 * of unicode-range chunks that next/font/google would download for the same
 * emoji. Each file holds a few of the glyphs; the font-family stack in
 * tailwind.config.ts lists all three, so the browser takes each emoji from the
 * file that has it.
 *
 * next/font needs its options as literals at each call, so no shared object.
 */
export const emojiA = localFont({
  src: "./fonts/noto-emoji-a.woff2",
  weight: "400",
  style: "normal",
  display: "swap",
  preload: false,
  variable: "--font-emoji-a",
});

export const emojiB = localFont({
  src: "./fonts/noto-emoji-b.woff2",
  weight: "400",
  style: "normal",
  display: "swap",
  preload: false,
  variable: "--font-emoji-b",
});

export const emojiC = localFont({
  src: "./fonts/noto-emoji-c.woff2",
  weight: "400",
  style: "normal",
  display: "swap",
  preload: false,
  variable: "--font-emoji-c",
});

/** Class names that define the three CSS variables; put them on <html>. */
export const emojiFontVariables = `${emojiA.variable} ${emojiB.variable} ${emojiC.variable}`;
