import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import Backdrop from "@/components/layout/Backdrop";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import RevealObserver from "@/components/ui/RevealObserver";
import { site } from "@/content/site";
import { siteUrl } from "@/lib/site-url";
import { emojiFontVariables } from "./emoji-font";
import "./globals.css";

// Inter is a variable font: one file covers every weight (400-700 are used).
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Poppins is only used for headings at 600, 700 and 800.
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: site.title,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: site.seo.keywords,
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  // Relative: each page's canonical is its own URL, resolved against metadataBase.
  alternates: { canonical: "./" },
  openGraph: {
    type: "profile",
    siteName: site.name,
    locale: site.seo.locale,
    title: site.title,
    description: site.description,
    url: "./",
    firstName: "Chinmayi",
    lastName: "Rane",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: site.seo.themeColor,
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} ${emojiFontVariables}`}>
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-pill focus:bg-accent-gradient focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-on-accent"
        >
          {site.labels.skipToContent}
        </a>
        <Backdrop />
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <RevealObserver />
      </body>
    </html>
  );
}
