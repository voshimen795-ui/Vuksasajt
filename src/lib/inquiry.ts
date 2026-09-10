import { site } from "@/config/site";

/**
 * Bez backenda upit se prosleđuje kroz mail klijent korisnika.
 * Kada se doda API ruta (npr. /api/upit), zameniti ovu funkciju POST pozivom.
 */
export function buildMailto(subject: string, fields: Record<string, string | undefined>) {
  const body = Object.entries(fields)
    .filter(([, value]) => value && value.trim().length > 0)
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");

  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
