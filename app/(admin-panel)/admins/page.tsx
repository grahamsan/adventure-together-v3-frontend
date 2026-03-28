"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { fetchAdmins } from "@/features/admin/admin-management/api";
import { createAdminsColumns } from "@/components/admin-panel/admin-management/column";
import { AdminsDataTable } from "@/components/admin-panel/admin-management/data-table";
import { Loader } from "lucide-react";

export default function AdminsPage() {
  const { data: admins = [], isLoading, refetch, isError, error } = useQuery({
    queryKey: [...queryKeys.admin.all, "admins-list"],
    queryFn: fetchAdmins,
  });

  const columns = useMemo(
    () =>
      createAdminsColumns({
        onChanged: () => {
          void refetch();
        },
      }),
    [refetch],
  );

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
          Impossible de charger les administrateurs
        </p>
        <p className="mt-[0.35rem] text-sm text-gray-600">
          {error instanceof Error ? error.message : "Erreur inconnue"}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-[1.4rem]">
      <div className="max-w-7xl mx-auto px-[0.7rem] sm:px-[1.05rem] lg:px-[1.4rem]">
        <div className="mb-[1.4rem]">
          <h1 className="text-3xl font-bold text-gray-900">
            Administrateurs
          </h1>
          <p className="text-gray-600 mt-[0.35rem] max-w-2xl">
            Comptes avec le rôle administrateur. Pour promouvoir un utilisateur, passez par
            la gestion des utilisateurs.
          </p>
        </div>

        <AdminsDataTable columns={columns} data={admins} />
      </div>
    </div>
  );
}
