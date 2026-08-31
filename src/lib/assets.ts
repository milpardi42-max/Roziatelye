/**
 * Resolve a public asset path against Vite's configured base URL.
 *
 * The app is deployed to GitHub Pages under a sub-path (e.g. `/Roziatelye/`),
 * so every asset referenced from the data layer or components must include
 * the base path. Keeping the resolution in one place means deployments can
 * move between a sub-path and a custom domain without touching the content.
 */
export function asset(path: string): string {
  // Leave absolute URLs and inline data untouched (e.g. remote og:image).
  if (/^(https?:)?\/\//i.test(path) || path.startsWith("data:")) return path;

  const base = import.meta.env.BASE_URL || "/";
  const root = base.endsWith("/") ? base : `${base}/`;
  const normalized = path.replace(/^\/+/, "");
  return `${root}${normalized}`;
}
