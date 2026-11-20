import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { readImageSize } from "@/lib/image-size";

const PUBLIC_DIR = path.join(process.cwd(), "public");

// A missing image is warned about once per path (dev only), never rendered broken.
const warned = new Set<string>();

function resolveInPublic(src: string): string | null {
  if (!src.startsWith("/")) return null;
  const file = path.join(PUBLIC_DIR, src);
  // Stay inside /public (no ../ escapes).
  return file.startsWith(PUBLIC_DIR + path.sep) ? file : null;
}

interface FigureProps {
  /** Path under /public, e.g. "/work/docpilot/hero.png". */
  src: string;
  alt: string;
  caption?: string;
}

/**
 * Case-study image in a glass frame. If the file is not in /public it renders
 * nothing (and logs a warning in development), so a missing screenshot never
 * leaves a broken image or an empty frame.
 */
export default function Figure({ src, alt, caption }: FigureProps) {
  const file = resolveInPublic(src);

  if (!file || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
    if (process.env.NODE_ENV !== "production" && !warned.has(src)) {
      warned.add(src);
      console.warn(`[Figure] image not found, skipping: public${src}`);
    }
    return null;
  }

  const { width, height } = readImageSize(file) ?? { width: 1600, height: 1000 };

  return (
    <figure className="my-10">
      <div className="overflow-hidden rounded-card border border-border bg-surface p-2">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="(min-width: 768px) 720px, calc(100vw - 48px)"
          className="h-auto w-full rounded-inner"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-[14px] leading-[1.6] text-subtle">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
