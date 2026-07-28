"use client";

import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Expertise", href: "#expertise" },
  { label: "How I Think", href: "#how-i-think" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Work", href: "#work" },
  { label: "Advisory", href: "#advisory" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <div className="relative mx-auto max-w-6xl">
        <div
          className={`flex items-center justify-between rounded-full border px-6 py-3 backdrop-blur-md transition-all duration-300 ${
            isScrolled
              ? "border-border bg-card/80 shadow-lg shadow-black/20"
              : "border-white/5 bg-card/40"
          }`}
        >
          <a
            href="#top"
            className="text-lg font-semibold tracking-tight text-foreground"
          >
            Chinmayi<span className="text-accent">.</span>
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <a
              href="#"
              className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-white transition-all duration-200 hover:scale-[1.03] hover:bg-accent-hover hover:shadow-glow"
            >
              Resume
            </a>
          </div>

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="flex items-center justify-center text-2xl leading-none text-foreground lg:hidden"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        <div
          className={`absolute left-0 right-0 top-full mt-2 overflow-hidden rounded-2xl border bg-card/95 backdrop-blur-md transition-all duration-300 ease-in-out lg:hidden ${
            isMenuOpen
              ? "max-h-96 border-border opacity-100 shadow-lg shadow-black/20"
              : "max-h-0 border-transparent opacity-0"
          }`}
        >
          <nav className="flex flex-col gap-1 p-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-md px-2 py-3 text-base text-muted transition-colors hover:bg-white/5 hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#"
              onClick={() => setIsMenuOpen(false)}
              className="mt-2 rounded-full bg-accent px-5 py-3 text-center text-sm font-medium text-white transition-all duration-200 hover:bg-accent-hover"
            >
              Resume
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
