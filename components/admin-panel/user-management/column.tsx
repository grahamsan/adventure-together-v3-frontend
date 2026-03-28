"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { AdminUserRow } from "@/features/admin/user-management/types";
import {
  updateUserRole,
  banUser,
  unbanUser,
  deleteUser,
} from "@/features/admin/user-management/api";
import { Badge } from "@/components/ui/badge";
import { Ban, Handshake, Shield, Trash } from "lucide-react";

const ROLE_LABELS: Record<string, string> = {
  Admin: "Administrateur",
  Participant: "Participant",
  Organizer: "Organisateur",
  Driver: "Conducteur",
  user: "Participant",
  promoter: "Organisateur",
};

function roleLabel(role: string): string {
  return ROLE_LABELS[role] ?? role;
}

export function createUsersColumns(opts: {
  onChanged: () => void | Promise<void>;
}): ColumnDef<AdminUserRow>[] {
  return [
    {
      accessorKey: "id",
      header: () => (
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          ID
          <br />
          Utilisateur
        </div>
      ),
      cell: ({ row }) => (
        <div className="font-medium text-gray-900 text-sm">
          {row.getValue("id")}
        </div>
      ),
    },
    {
      accessorKey: "name",
      header: () => (
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Nom
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-sm text-gray-900 font-medium">
          {row.getValue("name")}
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: () => (
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Email
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-sm text-gray-700">{row.getValue("email")}</div>
      ),
    },
    {
      accessorKey: "role",
      header: () => (
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Rôle
        </div>
      ),
      cell: ({ row }) => {
        const role = row.getValue("role") as string;
        return (
          <div className="text-sm text-gray-900">{roleLabel(role)}</div>
        );
      },
      filterFn: (row, _columnId, filterValue) => {
        const v = filterValue as string;
        if (!v || v === "all") return true;
        const role = row.getValue("role") as string;
        if (v === "admin") return role === "Admin";
        if (v === "user") return role !== "Admin";
        return true;
      },
    },
    {
      accessorKey: "registrationDate",
      header: () => (
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Date
          <br />
          d&apos;inscription
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-sm text-gray-700">
          {row.getValue("registrationDate")}
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
              status === "active"
                ? "bg-green-100 text-green-700 hover:bg-green-100"
                : "bg-red-100 text-red-700 hover:bg-red-100"
            }
            font-medium
          `}
          >
            {status === "active" ? "Actif" : "Suspendu"}
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
        const user = row.original;
        const isActive = user.status === "active";
        const isAdmin = user.role === "Admin";

        const handleModifyRole = async () => {
          const newRole = isAdmin ? "Participant" : "Admin";
          await updateUserRole(user.id, newRole);
          await opts.onChanged();
        };

        const handleBanUnban = async () => {
          if (isActive) {
            await banUser(user.id);
          } else {
            await unbanUser(user.id);
          }
          await opts.onChanged();
        };

        const handleDelete = async () => {
          if (
            window.confirm(
              `Supprimer définitivement le compte ${user.email} ?`,
            )
          ) {
            await deleteUser(user.id);
            await opts.onChanged();
          }
        };

        return (
          <div className="flex items-center gap-2 text-sm flex-wrap">
            <button
              type="button"
              onClick={() => void handleModifyRole()}
              className="text-brand-800 hover:text-brand-950 font-medium transition-colors"
              title={isAdmin ? "Rétrograder en participant" : "Promouvoir admin"}
            >
              <Shield className="w-5 h-5" />
            </button>
            <span className="text-gray-300">|</span>
            <button
              type="button"
              onClick={() => void handleBanUnban()}
              className={`font-medium transition-colors whitespace-nowrap ${
                isActive
                  ? "text-red-600 hover:text-red-700"
                  : "text-orange-600 hover:text-orange-700"
              }`}
            >
              {isActive ? (
                <Ban className="w-5 h-5 text-brand-800" />
              ) : (
                <Handshake className="w-5 h-5 text-brand-800" />
              )}
            </button>
            <span className="text-gray-300">|</span>
            <button
              type="button"
              onClick={() => void handleDelete()}
              className="text-red-600 hover:text-red-700 font-medium transition-colors whitespace-nowrap"
            >
              <Trash className="w-5 h-5 text-red-500" />
            </button>
          </div>
        );
      },
    },
  ];
}
