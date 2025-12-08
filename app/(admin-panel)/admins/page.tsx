"use client";

import { useEffect, useState } from "react";
import { fetchAdmins } from "@/features/admin/admin-management/api";
import { Admin } from "@/features/admin/admin-management/types";
import { adminsColumns } from "@/components/admin-panel/admin-management/column";
import { AdminsDataTable } from "@/components/admin-panel/admin-management/data-table";
import AddAdminDialog from "@/components/admin-panel/admin-management/add-admin-dialog";

export default function AdminsPage() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);

  const loadAdmins = async () => {
    setLoading(true);
    const data = await fetchAdmins();
    setAdmins(data);
    setLoading(false);
  };

  useEffect(() => {
    loadAdmins();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Gestion des administrateurs
            </h1>
            <p className="text-gray-600 mt-2">
              Gérez les comptes administrateurs de la plateforme
            </p>
          </div>
          <AddAdminDialog onAdminAdded={loadAdmins} />
        </div>

        {/* Table */}
        <AdminsDataTable columns={adminsColumns} data={admins} />
      </div>
    </div>
  );
}
