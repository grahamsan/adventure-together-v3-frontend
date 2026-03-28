/**
 * Affiche une date locale (sans heure), pour éviter la redondance avec une ligne « heure » à part.
 */
export function formatDateOnly(isoOrDate: string): string {
  if (!isoOrDate?.trim()) return "—";
  const d = new Date(isoOrDate);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
