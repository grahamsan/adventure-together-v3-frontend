"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { AdminReportRow } from "@/features/admin/reports/types";
import {
  markReportProcessed,
  suspendReportedUser,
} from "@/features/admin/reports/api";
import { Badge } from "@/components/ui/badge";
import { Ban, EyeClosed } from "lucide-react";

export function createReportColumns(opts: {
  onChanged: () => void | Promise<void>;
}): ColumnDef<AdminReportRow>[] {
  return [
    {
      accessorKey: "id",
      header: () => (
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          ID du
          <br />
          Signalement
        </div>
      ),
      cell: ({ row }) => (
        <div className="font-medium text-gray-900 text-sm">
          {row.getValue("id")}
        </div>
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
          Entité
          <br />
          Signalée
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
          Signalé
          <br />
          Par
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
            ${
              status === "new"
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

        const handleSuspendUser = async () => {
          await suspendReportedUser(report.entityId);
          await opts.onChanged();
        };

        const handleMarkProcessed = async () => {
          await markReportProcessed(report.id);
          await opts.onChanged();
        };

        return (
          <div className="flex items-center gap-2 text-sm">
            {entityType === "user" && (
              <button
                type="button"
                onClick={() => void handleSuspendUser()}
                className="text-red-600 hover:text-red-700 font-medium transition-colors"
                title="Suspendre le compte signalé"
              >
                <Ban className="h-5 w-5 text-brand-800" />
              </button>
            )}
            {entityType === "user" && (
              <span className="text-gray-300">|</span>
            )}
            <button
              type="button"
              onClick={() => void handleMarkProcessed()}
              className="text-gray-600 hover:text-gray-700 font-medium transition-colors"
              title="Marquer comme traité"
              disabled={report.status === "processed"}
            >
              <EyeClosed className="h-5 w-5 text-green-600" />
            </button>
          </div>
        );
      },
    },
  ];
}
