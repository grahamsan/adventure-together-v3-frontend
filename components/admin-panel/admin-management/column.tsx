"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Admin } from "@/features/admin/admin-management/types";
import { deleteAdmin } from "@/features/admin/admin-management/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function createAdminsColumns(opts: {
  onChanged: () => void | Promise<void>;
}): ColumnDef<Admin>[] {
  return [
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
      cell: () => (
        <Badge
          variant="secondary"
          className="bg-blue-100 text-blue-700 hover:bg-blue-200"
        >
          Admin
        </Badge>
      ),
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
            await opts.onChanged();
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
                    type="button"
                    onClick={() => void handleDelete()}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash className="w-5 h-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-brand-800">
                  <p>Supprimer le compte</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        );
      },
    },
  ];
}
