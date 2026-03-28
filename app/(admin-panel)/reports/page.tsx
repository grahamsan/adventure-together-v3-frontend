"use client";

import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { fetchReports } from "@/features/admin/reports/api";
import { createReportColumns } from "@/components/admin-panel/reports/column";
import { DataTable } from "@/components/admin-panel/reports/data-table";
import { AlertCircle, Loader } from "lucide-react";

export default function ReportsPage() {
  const queryClient = useQueryClient();
  const [isMobile, setIsMobile] = useState(false);

  const { data: reports = [], isLoading, refetch, isError, error } = useQuery({
    queryKey: queryKeys.reports.list("admin-panel"),
    queryFn: fetchReports,
  });

  const columns = useMemo(
    () =>
      createReportColumns({
        onChanged: async () => {
          await refetch();
          await queryClient.invalidateQueries({
            queryKey: queryKeys.admin.users(),
          });
        },
      }),
    [refetch, queryClient],
  );

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-[1.05rem]">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-[1.4rem] text-center space-y-[0.7rem]">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100">
            <AlertCircle className="w-8 h-8 text-orange-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Écran trop petit
          </h2>
          <p className="text-gray-600">
            La gestion des signalements nécessite un écran plus large pour une meilleure expérience.
          </p>
          <p className="text-sm text-gray-500">
            Veuillez utiliser un ordinateur ou une tablette en mode paysage.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-second-50">
        <Loader className="w-14 h-14 animate-spin text-brand-500" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-second-50 px-[0.7rem]">
        <p className="text-lg font-medium text-gray-900">
          Impossible de charger les signalements
        </p>
        <p className="mt-[0.35rem] text-sm text-gray-600">
          {error instanceof Error ? error.message : "Erreur inconnue"}
        </p>
        <p className="mt-[0.7rem] text-xs text-gray-500 max-w-lg text-center">
          Si la liste est vide sans erreur : le backend ne renvoie que les entités avec au moins 10 signalements.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-[1.4rem]">
      <div className="max-w-7xl mx-auto px-[0.7rem] sm:px-[1.05rem] lg:px-[1.4rem]">
        <div className="mb-[1.4rem]">
          <h1 className="text-3xl font-bold text-gray-900">
            Gestion des signalements
          </h1>
        </div>

        <DataTable columns={columns} data={reports} />
      </div>
    </div>
  );
}
