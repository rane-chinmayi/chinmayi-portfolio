import Image from "next/image";
import TypewriterText from "./TypewriterText";

const HERO_SENTENCES = [
  "I drive product strategy.",
  "I grow products with data.",
  "I build 0→1 products.",
  "I build AI products.",
  "I turn ideas into products.",
  "I launch products that matter.",
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pb-16 pt-28 lg:pt-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute left-[8%] top-[15%] h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute right-[8%] top-[45%] h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-[8%] left-[35%] h-64 w-64 rounded-full bg-accent-hover/10 blur-3xl" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl gap-16 lg:grid-cols-2 lg:items-center lg:gap-12">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-accent">
            ✦ WELCOME TO MY PORTFOLIO
          </span>

          <p className="mt-6 text-lg font-medium text-muted">Hi, I&apos;m</p>
          <h1 className="mt-1 text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Chinmayi Rane.
          </h1>
          <div className="mt-4 min-h-[3.5rem] text-xl font-semibold text-accent sm:min-h-[4rem] sm:text-2xl">
            <TypewriterText texts={HERO_SENTENCES} />
          </div>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
            Product Manager with 1+ years of experience building SaaS and AI
            products. I partner with users, designers, engineers, and
            stakeholders to take products from discovery through launch and
            continuous product growth.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a href="#work" className="btn-primary">
              View My Work
            </a>
            <a href="#contact" className="btn-secondary">
              Get In Touch
            </a>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="badge">
              <span className="text-accent">✓</span> Available for Product
              Management Opportunities
            </span>
            <span className="badge">
              <span className="text-accent">✓</span> Product Advisory &
              Mentorship
            </span>
          </div>

          <div className="mt-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted">
              Connect
            </p>
            <div className="mt-3 flex items-center gap-4">
              <a
                href="https://www.linkedin.com/in/chinmayi-rane/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-muted transition-all duration-200 hover:scale-105 hover:border-accent hover:text-accent"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.446-2.136 2.94v5.666H9.351V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.114 20.452H3.558V9h3.556v11.452z" />
                </svg>
              </a>
              <a
                href="mailto:chinmayi.m.rane@gmail.com"
                aria-label="Email"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-muted transition-all duration-200 hover:scale-105 hover:border-accent hover:text-accent"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 6-10 7L2 6" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative">
            <div className="relative aspect-[4/5] w-56 overflow-hidden rounded-3xl border border-border bg-card sm:w-64 lg:w-72">
              <Image
                src="/photo.jpg"
                alt="Chinmayi Rane"
                fill
                sizes="(min-width: 1024px) 288px, (min-width: 640px) 256px, 224px"
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute -left-6 top-[80%] flex -translate-y-1/2 flex-col items-center">
              <div className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-card-elevated px-4 py-3 shadow-xl shadow-black/30">
                <span className="text-3xl font-bold leading-none text-accent">
                  1+
                </span>
                <div className="flex flex-col leading-tight">
                  <span className="text-sm font-bold text-foreground">
                    Years
                  </span>
                  <span className="text-xs font-normal text-muted">
                    Experience
                  </span>
                </div>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mt-1.5 h-4 w-4 text-muted/40"
                aria-hidden="true"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
