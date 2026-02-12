export function formatRelativeDate(date: Date): string {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0);

  const diffTime = targetDate.getTime() - today.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  // Heure UTC+1 (Paris/Cotonou - Bénin est aussi UTC+1)
  const timeUTC = new Date(date).toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Africa/Porto-Novo', // Fuseau horaire du Bénin (UTC+1)
  });

  // Cas simples avec heure
  if (diffDays === 0) return `Aujourd'hui à ${timeUTC}`;
  if (diffDays === 1) return `Demain à ${timeUTC}`;
  if (diffDays === -1) return `Hier à ${timeUTC}`;

  // FUTUR
  if (diffDays > 1 && diffDays < 7) {
    return `dans ${diffDays} jours`;
  }

  if (diffDays >= 7 && diffDays < 28) {
    const weeks = Math.round(diffDays / 7);
    return weeks === 1 ? 'dans 1 semaine' : `dans ${weeks} semaines`;
  }

  // PASSÉ
  if (diffDays < -1 && diffDays > -7) {
    return `il y a ${Math.abs(diffDays)} jours`;
  }

  if (diffDays <= -7 && diffDays > -28) {
    const weeks = Math.round(Math.abs(diffDays) / 7);
    return weeks === 1 ? 'il y a 1 semaine' : `il y a ${weeks} semaines`;
  }

  // Fallback
  return new Date(date).toLocaleDateString('fr-FR');
}