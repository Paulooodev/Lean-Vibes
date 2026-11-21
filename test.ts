/** Build an optimized Unsplash URL. Replace with your CDN/asset paths later. */
export function unsplash(id: string, width = 1200, height?: number) {
  const h = height ? `&h=${height}` : "";
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}${h}&q=80`;
}

/** Pad a number with leading zeros (e.g. pad(5) → "05") */
export const pad = (n: number, length = 2) => String(n).padStart(length, "0");

/** Check if a link is external (http, https, mailto, or tel) */
export const isExternalHref = (href: string) =>
  /^https?:\/\//.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");