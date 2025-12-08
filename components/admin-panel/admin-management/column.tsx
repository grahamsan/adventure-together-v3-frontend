"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Admin } from "@/features/admin/admin-management/types";
import { deleteAdmin } from "@/features/admin/admin-management/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const adminsColumns: ColumnDef<Admin>[] = [
  {
    accessorKey: "id",
    header: () => (
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
        ID
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-sm text-gray-900 font-medium">
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
      <div className="text-sm text-gray-600">{row.getValue("email")}</div>
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
        <Badge
          variant={role === "super_admin" ? "default" : "secondary"}
          className={
            role === "super_admin"
              ? "bg-purple-100 text-purple-700 hover:bg-purple-200"
              : "bg-blue-100 text-blue-700 hover:bg-blue-200"
          }
        >
          {role === "super_admin" ? "Super Admin" : "Admin"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: () => (
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
        Créé le
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-sm text-gray-600">{row.getValue("createdAt")}</div>
    ),
  },
  {
    accessorKey: "lastLogin",
    header: () => (
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
        Dernière connexion
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-sm text-gray-600">{row.getValue("lastLogin")}</div>
    ),
  },
  {
    id: "actions",
    header: () => (
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide text-right">
        Actions
      </div>
    ),
    cell: ({ row }) => {
      const admin = row.original;

      const handleDelete = async () => {
        if (
          window.confirm(`Êtes-vous sûr de vouloir supprimer ${admin.name} ?`)
        ) {
          await deleteAdmin(admin.id);
          window.location.reload(); // Refresh the page
        }
      };

      return (
        <div className="flex justify-end gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleDelete}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Supprimer l'administrateur</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
  },
];
