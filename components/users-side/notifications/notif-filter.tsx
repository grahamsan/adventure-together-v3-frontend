"use client";

import {
  NotificationType,
  NotificationFilters,
} from "@/features/notifications/types";

interface NotificationFiltersSidebarProps {
  filters: NotificationFilters;
  onFiltersChange: (filters: NotificationFilters) => void;
  onApply: () => void;
  onReset: () => void;
}

export function NotificationFiltersSidebar({
  filters,
  onFiltersChange,
  onApply,
  onReset,
}: NotificationFiltersSidebarProps) {
  const handleTypeChange = (type: NotificationType) => {
    onFiltersChange({
      ...filters,
      type: filters.type === type ? null : type,
    });
  };

  return (
    <div className="w-full lg:w-[20vw] bg-white border-r h-full overflow-y-auto p-6 flex flex-col">
      <h3 className="font-semibold text-gray-900 text-lg mb-6">Filtrer par</h3>

      {/* Type */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Type
        </label>
        <div className="flex flex-wrap gap-2">
          {(["alerte", "rappel", "info"] as NotificationType[]).map((type) => (
            <button
              key={type}
              onClick={() => handleTypeChange(type)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filters.type === type
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Experience
        </label>
        <input
          type="text"
          placeholder="Filter par une experience..."
          value={filters.experience}
          onChange={(e) =>
            onFiltersChange({ ...filters, experience: e.target.value })
          }
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
        />
      </div>

      {/* Trip */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Trajet
        </label>
        <input
          type="text"
          placeholder="Filtrer par un trajet..."
          value={filters.trip}
          onChange={(e) =>
            onFiltersChange({ ...filters, trip: e.target.value })
          }
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
        />
      </div>

      {/* Buttons */}
      <div className="mt-auto space-y-3">
        <button
          onClick={onApply}
          className="w-full py-3 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600 transition-colors"
        >
          Appliquer les filtres
        </button>
        <button
          onClick={onReset}
          className="w-full py-3 text-gray-600 font-medium hover:text-gray-900 transition-colors"
        >
          Réinitialiser les filtres
        </button>
      </div>
    </div>
  );
}
