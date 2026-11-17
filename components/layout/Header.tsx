"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

const MOBILE_NAV_ID = "mobile-nav";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const closeMenu = () => setIsOpen(false);

  // Scroll state: more opaque pill with a shadow once the page moves.
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // While the mobile menu is open: Escape and outside clicks close it.
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [isOpen]);

  // Resizing up to the desktop layout closes the mobile menu.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setIsOpen(false);
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-5 sm:px-6"
    >
      <div className="relative mx-auto max-w-content">
        <div
          className={cn(
            "flex items-center justify-between rounded-pill border bg-surface-solid/[0.78] py-3.5 pl-6 pr-3 backdrop-blur-md transition-[border-color,box-shadow] duration-300 lg:pl-7 lg:pr-[18px]",
            isScrolled
              ? "border-border-strong shadow-elevated"
              : "border-border",
          )}
        >
          <Link
            href="/#top"
            onClick={closeMenu}
            className="font-heading text-[22px] font-bold leading-none text-foreground transition-opacity hover:opacity-80 active:opacity-70"
          >
            {site.shortName}
            <span className="text-accent-text">.</span>
          </Link>

          <div className="hidden items-center gap-6 lg:flex">
            <nav aria-label={site.labels.primaryNav}>
              <ul className="flex items-center gap-6">
                {site.nav.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[14px] font-medium text-muted transition-colors hover:text-foreground active:text-muted"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <Button href={site.links.resume} newTab size="sm" glow={false}>
              {site.labels.resume}
            </Button>
          </div>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-controls={MOBILE_NAV_ID}
            aria-label={isOpen ? site.labels.closeMenu : site.labels.openMenu}
            className="inline-flex size-10 items-center justify-center rounded-pill text-foreground transition-colors hover:bg-fill-chip active:bg-fill-soft lg:hidden"
          >
            {isOpen ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* `hidden` removes the closed panel from layout, tab order and the
            accessibility tree. It sizes to its content and scrolls if the
            viewport is shorter than the menu. */}
        <div
          id={MOBILE_NAV_ID}
          hidden={!isOpen}
          className="absolute inset-x-0 top-full mt-2 max-h-[calc(100dvh-6rem)] overflow-y-auto rounded-card border border-border-strong bg-surface-solid/95 p-4 shadow-elevated backdrop-blur-md lg:hidden"
        >
          <nav aria-label={site.labels.mobileNav}>
            <ul className="flex flex-col gap-1">
              {site.nav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className="block rounded-inner px-3 py-3 text-base font-medium text-muted transition-colors hover:bg-fill-chip hover:text-foreground active:bg-fill-soft"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Button
            href={site.links.resume}
            newTab
            glow={false}
            onClick={closeMenu}
            className="mt-3 w-full"
          >
            {site.labels.resume}
          </Button>
        </div>
      </div>
    </header>
  );
}
