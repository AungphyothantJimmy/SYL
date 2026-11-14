/**
 * Resolve an image reference coming from the database.
 *
 * - Absolute URLs (`https://...`) and data URIs are used as-is (Supabase Storage).
 * - Paths such as `images/s1.jpg` or `/images/s1.jpg` are resolved against the
 *   Vite base URL so the site keeps working when deployed to a sub-path
 *   (e.g. GitHub Pages project sites).
 */
export function resolveImage(
  url: string | null | undefined,
  fallback: string,
): string {
  if (!url) return fallback;
  if (/^(https?:)?\/\//i.test(url) || url.startsWith("data:")) return url;

  const base = import.meta.env.BASE_URL || "/";
  const clean = url.replace(/^(\.?\/)+/, "");
  return `${base}${clean}`;
}
