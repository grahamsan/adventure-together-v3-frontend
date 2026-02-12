"use client";

import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/features/admin/user-management/types";
import {
  updateUserRole,
  banUser,
  unbanUser,
  deleteUser,
} from "@/features/admin/user-management/api";
import { Badge } from "@/components/ui/badge";
import { Ban, Handshake, Trash } from "lucide-react";

export const usersColumns: ColumnDef<User>[] = [
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
        <div className="text-sm text-gray-900">
          {role === "admin" ? "Administrateur" : "Utilisateur"}
        </div>
      );
    },
  },
  {
    accessorKey: "registrationDate",
    header: () => (
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
        Date
        <br />
        d'inscription
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
          {status === "active" ? "Actif" : "Banni"}
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
      const isAdmin = user.role === "admin";

      const handleModifyRole = async () => {
        const newRole = isAdmin ? "user" : "admin";
        await updateUserRole(user.id, newRole);
        // Rafraîchir la table
      };

      const handleBanUnban = async () => {
        if (isActive) {
          await banUser(user.id);
        } else {
          await unbanUser(user.id);
        }
        // Rafraîchir la table
      };

      const handleDelete = async () => {
        await deleteUser(user.id);
        // Rafraîchir la table
      };

      return (
        <div className="flex items-center gap-2 text-sm flex-wrap">
          <button
            onClick={handleBanUnban}
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
            onClick={handleDelete}
            className="text-red-600 hover:text-red-700 font-medium transition-colors whitespace-nowrap"
          >
            <Trash className="w-5 h-5 text-red-500" />
          </button>
        </div>
      );
    },
  },
];
