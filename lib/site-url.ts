/**
 * Public origin of the site, used for canonical URLs, Open Graph, the sitemap
 * and structured data. Set NEXT_PUBLIC_SITE_URL in the deployment environment
 * (see .env.example); it falls back to the local dev server.
 */
const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000";

export const siteUrl = raw.replace(/\/+$/, "");
