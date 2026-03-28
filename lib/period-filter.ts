/**
 * Filtre de période (boutons bannières) → query API exclusive (un booléen à la fois).
 */
export type PeriodFilter = "none" | "imminent" | "month" | "nextMonth";

export function periodToQuery(period: PeriodFilter): {
  imminent?: boolean;
  month?: boolean;
  nextMonth?: boolean;
} {
  switch (period) {
    case "imminent":
      return { imminent: true };
    case "month":
      return { month: true };
    case "nextMonth":
      return { nextMonth: true };
    default:
      return {};
  }
}

/** Clic sur un bouton : applique le filtre, ou désactive si déjà actif. */
export function togglePeriodFilter(
  current: PeriodFilter,
  selected: Exclude<PeriodFilter, "none">,
): PeriodFilter {
  return current === selected ? "none" : selected;
}
