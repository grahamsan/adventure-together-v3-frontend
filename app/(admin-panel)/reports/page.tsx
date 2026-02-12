"use client";

import { useEffect, useState } from "react";
import { fetchReports } from "@/features/admin/reports/api";
import { Report } from "@/features/admin/reports/types";
import { columns } from "@/components/admin-panel/reports/column";
import { DataTable } from "@/components/admin-panel/reports/data-table";
import { AlertCircle, Loader } from "lucide-react";

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    async function loadReports() {
      const data = await fetchReports();
      setReports(data);
      setLoading(false);
    }
    loadReports();
  }, []);

  // Message d'alerte pour mobile
  if (isMobile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center space-y-4">
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

  if (loading) {
    return (
    <div className="min-h-screen flex items-center justify-center bg-second-50">
        <Loader className='w-14 h-14 animate-spin text-brand-500'/>
      </div>
    );
  }

  return (
    <div className="min-h-screen  py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Gestion des signalements
          </h1>
        </div>

        <DataTable columns={columns} data={reports} />
      </div>
    </div>
  );
}
