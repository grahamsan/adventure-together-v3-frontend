"use client";

import {
  NotificationBackendType,
  NotificationFilters,
} from "@/features/notifications/types";

interface NotificationFiltersSidebarProps {
  filters: NotificationFilters;
  onFiltersChange: (filters: NotificationFilters) => void;
  onApply: () => void;
  onReset: () => void;
}

const TYPE_OPTIONS: { value: NotificationBackendType; label: string }[] = [
  { value: "trip", label: "Trajet" },
  { value: "message", label: "Message" },
  { value: "reminder", label: "Rappel" },
];

export function NotificationFiltersSidebar({
  filters,
  onFiltersChange,
  onApply,
  onReset,
}: NotificationFiltersSidebarProps) {
  const handleTypeChange = (type: NotificationBackendType) => {
    onFiltersChange({
      ...filters,
      type: filters.type === type ? null : type,
    });
  };

  return (
    <div className="w-full lg:w-[20vw] bg-white border-r h-full overflow-y-auto p-6 flex flex-col">
      <h3 className="font-semibold text-gray-900 text-lg mb-6">Filtrer par</h3>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Type
        </label>
        <div className="flex flex-wrap gap-2">
          {TYPE_OPTIONS.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => handleTypeChange(value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filters.type === value
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Expérience
        </label>
        <input
          type="text"
          placeholder="Filtrer par une expérience…"
          value={filters.experience}
          onChange={(e) =>
            onFiltersChange({ ...filters, experience: e.target.value })
          }
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
        />
      </div>

      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Trajet
        </label>
        <input
          type="text"
          placeholder="Filtrer par un trajet (texte ou id)…"
          value={filters.trip}
          onChange={(e) =>
            onFiltersChange({ ...filters, trip: e.target.value })
          }
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
        />
      </div>

      <div className="mt-auto space-y-3">
        <button
          type="button"
          onClick={onApply}
          className="w-full py-3 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600 transition-colors"
        >
          Appliquer les filtres
        </button>
        <button
          type="button"
          onClick={onReset}
          className="w-full py-3 text-gray-600 font-medium hover:text-gray-900 transition-colors"
        >
          Réinitialiser les filtres
        </button>
      </div>
    </div>
  );
}
