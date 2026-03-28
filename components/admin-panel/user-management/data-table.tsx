"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import type { AdminUserRow } from "@/features/admin/user-management/types";

interface UsersDataTableProps<TData extends AdminUserRow, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function UsersDataTable<TData extends AdminUserRow, TValue>({
  columns,
  data,
}: UsersDataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [filterType, setFilterType] = React.useState<string>("all");
  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  });

  // Filtrer par type (rôle)
  React.useEffect(() => {
    if (filterType === "all") {
      table.getColumn("role")?.setFilterValue(undefined);
    } else {
      table.getColumn("role")?.setFilterValue(filterType);
    }
  }, [filterType, table]);

  return (
    <div className="space-y-[0.7rem]">
      {/* Barre de recherche et filtres */}
      <div className="flex items-center justify-between gap-[0.7rem]">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Rechercher par ID, nom, email..."
            value={globalFilter}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="pl-10 h-11 border-gray-200 focus:ring-2 focus:ring-brand-500 bg-white"
          />
        </div>

        <div className="flex items-center gap-[0.35rem]">
          <span className="text-sm text-gray-600 font-medium">
            Filtrer par rôle:
          </span>
          <div className="flex gap-[0.35rem]">
            {[
              { value: "all", label: "Tout" },
              { value: "user", label: "Utilisateur" },
              { value: "admin", label: "Administrateur" },
            ].map((filter) => (
              <Button
                key={filter.value}
                variant="outline"
                size="sm"
                onClick={() => setFilterType(filter.value)}
                className={`
                  rounded-full px-4 transition-all border
                  ${
                    filterType === filter.value
                      ? "bg-brand-100 text-brand-600 border-brand-300 font-medium"
                      : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                  }
                `}
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-b border-gray-200 bg-gray-50"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="py-[0.7rem] px-[0.7rem]">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-[0.7rem] px-[0.7rem]">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <div className="text-gray-500">Aucun résultat trouvé.</div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-[0.35rem]">
        <div className="text-sm text-gray-600">
          Page {table.getState().pagination.pageIndex + 1} sur{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center gap-[0.35rem]">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="rounded-lg"
          >
            Précédent
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="rounded-lg"
          >
            Suivant
          </Button>
        </div>
      </div>
    </div>
  );
}
