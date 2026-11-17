/** @type {import('next').NextConfig} */
const nextConfig = {
  // Lets a second dev server or a build use its own output folder, so it can't
  // clobber a running `next dev`'s .next (they share files and break each other).
  // e.g.  NEXT_DIST_DIR=.next-preview npx next dev -p 3002
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

export default nextConfig;
