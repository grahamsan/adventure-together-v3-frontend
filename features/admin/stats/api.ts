import { adminControllerGetStats } from "@/api/admin/api";
import type { StatsData, StatsPeriod } from "./types";
import { mapAdminStatsToStatsData } from "./map-from-api";

export async function fetchStats(period: StatsPeriod = "30days"): Promise<StatsData | null> {
  const raw = await adminControllerGetStats();
  return mapAdminStatsToStatsData(raw as Record<string, unknown>, period);
}

export async function exportStatsReport(
  period: StatsPeriod,
  rawStats?: Record<string, unknown> | null,
): Promise<void> {
  const payload = {
    exportedAt: new Date().toISOString(),
    period,
    stats: rawStats ?? {},
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `stats-admin-${period}-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}
