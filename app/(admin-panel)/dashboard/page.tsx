"use client";

import { useMemo, useState } from "react";
import { useAdminControllerGetStats } from "@/api/admin/hooks";
import { mapAdminStatsToStatsData } from "@/features/admin/stats/map-from-api";
import { exportStatsReport } from "@/features/admin/stats/api";
import type { StatsPeriod } from "@/features/admin/stats/types";
import { StatCard } from "@/components/admin-panel/dashboard/stats-card";
import { BarChart } from "@/components/admin-panel/dashboard/bar-chart";
import { LineChart } from "@/components/admin-panel/dashboard/line-chart";
import { Sparkles, Car, MessageSquare, AlertCircle, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

export default function StatsPage() {
  const { data: rawStats, isLoading, isError, error } = useAdminControllerGetStats();
  const [period, setPeriod] = useState<StatsPeriod>("30days");
  const [exporting, setExporting] = useState(false);

  const stats = useMemo(
    () =>
      mapAdminStatsToStatsData(
        rawStats as Record<string, unknown> | null | undefined,
        period,
      ),
    [rawStats, period],
  );

  const handleExport = async () => {
    setExporting(true);
    try {
      await exportStatsReport(period, rawStats as Record<string, unknown>);
    } finally {
      setExporting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-second-50">
        <Loader className="w-14 h-14 animate-spin text-brand-500" />
      </div>
    );
  }

  if (isError || !stats) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-second-50 px-[0.7rem] text-center">
        <p className="text-lg font-medium text-gray-900">Impossible de charger les statistiques</p>
        <p className="mt-[0.35rem] text-sm text-gray-600">
          {error instanceof Error ? error.message : "Erreur inconnue"}
        </p>
      </div>
    );
  }

  const statCards = [
    {
      id: "experiences",
      title: "Expériences (total)",
      icon: <Sparkles className="w-5 h-5" />,
      value: stats.experiencesCreated,
      change: stats.experiencesChange,
      changeLabel: "tendance N/A",
    },
    {
      id: "trips",
      title:
        period === "30days"
          ? "Trajets (30 j)"
          : period === "90days"
            ? "Trajets (90 j)"
            : "Trajets (total)",
      icon: <Car className="w-5 h-5" />,
      value: stats.tripsCreated,
      change: stats.tripsChange,
      changeLabel: "selon période",
    },
    {
      id: "comments",
      title: "Messages (total)",
      icon: <MessageSquare className="w-5 h-5" />,
      value: stats.commentsPosted,
      change: stats.commentsChange,
      changeLabel: "tendance N/A",
    },
    {
      id: "reports",
      title: "Signalements (total)",
      icon: <AlertCircle className="w-5 h-5" />,
      value: stats.reportsSubmitted,
      change: stats.reportsChange,
      changeLabel: "tendance N/A",
    },
  ];

  return (
    <div className="min-h-screen py-[1.4rem]">
      <div className="max-w-7xl mx-auto px-[0.7rem] sm:px-[1.05rem] lg:px-[1.4rem]">
        <div className="mb-[1.4rem] sticky top-5 bg-second-50 py-[0.35rem]">
          <h1 className="text-3xl font-bold text-gray-900 mb-[0.35rem]">
            Tableau de bord des statistiques
          </h1>
          <p className="text-gray-600">
            Vue d&apos;ensemble des performances de la plateforme.
          </p>
        </div>

        <div className="flex items-center justify-between mb-[1.05rem] flex-wrap gap-[0.7rem]">
          <div className="flex gap-[0.35rem]">
            {[
              { value: "30days" as const, label: "30 derniers jours" },
              { value: "90days" as const, label: "90 derniers jours" },
              { value: "all" as const, label: "Tous confondus" },
            ].map((filter) => (
              <Button
                key={filter.value}
                variant="outline"
                size="sm"
                type="button"
                onClick={() => setPeriod(filter.value)}
                className={`
                  rounded-lg px-4 transition-all border
                  ${
                    period === filter.value
                      ? "bg-brand-800 text-white border-gray-900 hover:bg-brand-600 hover:text-white"
                      : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                  }
                `}
              >
                {filter.label}
              </Button>
            ))}
          </div>

          <Button
            type="button"
            onClick={() => void handleExport()}
            disabled={exporting}
            className="bg-brand-500 hover:bg-brand-600 text-white rounded-lg px-4 py-2 flex items-center gap-[0.35rem]"
          >
            <Upload className="w-4 h-4" />
            {exporting ? "Export..." : "Exporter JSON"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1.05rem] mb-[1.4rem]">
          {statCards.map((card) => (
            <StatCard key={card.id} {...card} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[1.05rem]">
          <BarChart
            title="Top expériences par likes"
            subtitle="Classement par nombre de likes"
            data={stats.newUsersVsExperiences}
          />

          <LineChart
            title="Trajets créés par fenêtre"
            subtitle="Comparaison 30 / 60 / 90 jours"
            data={stats.tripsCreatedWeekly}
          />
        </div>
      </div>
    </div>
  );
}
