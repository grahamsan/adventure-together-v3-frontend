import type { StatsData, StatsPeriod } from "./types";

/** Réponse `GET /admin/stats` (AdminDashboardStatsDto) */
export function mapAdminStatsToStatsData(
  raw: Record<string, unknown> | null | undefined,
  period: StatsPeriod,
): StatsData | null {
  if (!raw || typeof raw !== "object") return null;

  const totalExperiences = Number(raw.totalExperiences ?? 0);
  const totalTrips = Number(raw.totalTrips ?? 0);
  const totalComments = Number(raw.totalComments ?? 0);
  const totalReports = Number(raw.totalReports ?? 0);

  const tripStats = raw.tripStats as
    | { last30Days?: number; last60Days?: number; last90Days?: number }
    | undefined;

  const t30 = Number(tripStats?.last30Days ?? 0);
  const t60 = Number(tripStats?.last60Days ?? 0);
  const t90 = Number(tripStats?.last90Days ?? 0);

  const tripsForPeriod =
    period === "30days" ? t30 : period === "90days" ? t90 : totalTrips;

  const likesRaw = raw.likesPerExperience as
    | { title?: string; likes?: number }[]
    | undefined;
  const likesChart = (likesRaw ?? []).slice(0, 8).map((x) => ({
    label: (x.title ?? "—").slice(0, 18),
    value: Number(x.likes ?? 0),
  }));

  const tripLine = [
    { label: "30 j", value: t30 },
    { label: "60 j", value: t60 },
    { label: "90 j", value: t90 },
  ];

  return {
    experiencesCreated: totalExperiences,
    experiencesChange: 0,
    tripsCreated: tripsForPeriod,
    tripsChange: 0,
    commentsPosted: totalComments,
    commentsChange: 0,
    reportsSubmitted: totalReports,
    reportsChange: 0,
    newUsersVsExperiences:
      likesChart.length > 0 ? likesChart : [{ label: "—", value: 0 }],
    tripsCreatedWeekly: tripLine,
  };
}
