"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Report } from "@/features/admin/reports/types";
import { banUser, deleteExperience, deleteTrip, ignoreReport } from "@/features/admin/reports/api";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<Report>[] = [
  {
    accessorKey: "id",
    header: () => (
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
        ID du<br />Signalement
      </div>
    ),
    cell: ({ row }) => (
      <div className="font-medium text-gray-900 text-sm">{row.getValue("id")}</div>
    ),
  },
  {
    accessorKey: "date",
    header: () => (
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
        Date
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-sm text-gray-700">{row.getValue("date")}</div>
    ),
  },
  {
    accessorKey: "reportedEntity",
    header: () => (
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
        Entité<br />Signalée
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-sm text-gray-900 font-medium">
        {row.getValue("reportedEntity")}
      </div>
    ),
  },
  {
    accessorKey: "reportedBy",
    header: () => (
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
        Signalé<br />Par
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-sm text-gray-900">{row.getValue("reportedBy")}</div>
    ),
  },
  {
    accessorKey: "reason",
    header: () => (
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
        Motif
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-sm text-gray-600 max-w-xs truncate">
        {row.getValue("reason")}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: () => (
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
        Status
      </div>
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge
          variant="secondary"
          className={`
            ${status === "new" 
              ? "bg-blue-100 text-blue-700 hover:bg-blue-100" 
              : "bg-green-100 text-green-700 hover:bg-green-100"
            }
            font-medium
          `}
        >
          {status === "new" ? "Nouveau" : "Traité"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: () => (
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
        Actions
      </div>
    ),
    cell: ({ row }) => {
      const report = row.original;
      const entityType = report.entityType;

      const handleBanUser = async () => {
        await banUser(report.id);
        // Rafraîchir la table ou afficher une notification
      };

      const handleDeleteEntity = async () => {
        if (entityType === 'experience') {
          await deleteExperience(report.id);
        } else if (entityType === 'trip') {
          await deleteTrip(report.id);
        } else if (entityType === 'user') {
          await banUser(report.id);
        }
        // Rafraîchir la table ou afficher une notification
      };

      const handleIgnore = async () => {
        await ignoreReport(report.id);
        // Rafraîchir la table ou afficher une notification
      };

      return (
        <div className="flex items-center gap-2 text-sm">
          {entityType === 'user' && (
            <button
              onClick={handleBanUser}
              className="text-red-600 hover:text-red-700 font-medium transition-colors"
            >
              Bannir l'utilisateur
            </button>
          )}
          {entityType === 'experience' && (
            <button
              onClick={handleDeleteEntity}
              className="text-red-600 hover:text-red-700 font-medium transition-colors"
            >
              Supprimer l'expérience
            </button>
          )}
          {entityType === 'trip' && (
            <button
              onClick={handleDeleteEntity}
              className="text-red-600 hover:text-red-700 font-medium transition-colors"
            >
              Supprimer le trajet
            </button>
          )}
          <span className="text-gray-300">|</span>
          <button
            onClick={handleIgnore}
            className="text-gray-600 hover:text-gray-700 font-medium transition-colors"
          >
            Ignorer
          </button>
        </div>
      );
    },
  },
];
