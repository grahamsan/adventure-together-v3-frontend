import { MoreVertical, Car, Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ImageGridPreview from "./image-grid-preview";
import { Vehicle } from "@/api/vehicles/types";

export interface VehicleCardProps {
  vehicle: Vehicle;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function VehicleCard({
  vehicle,
  onEdit,
  onDelete,
}: VehicleCardProps) {
  return (
    <div className="w-full flex flex-col max-h-[400px] gap-4 p-4 rounded-xl border bg-white">
      <ImageGridPreview images={[vehicle.imageUrl]} />

      <div className="flex-1 min-h-0 p-2">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {vehicle.brand}
            </h3>
            <p className="text-sm text-gray-500">{vehicle.model}</p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-1 hover:bg-gray-100 rounded-full transition">
                <MoreVertical className="w-5 h-5 text-gray-400" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem
                onClick={() => onEdit?.(vehicle.id)}
                className="cursor-pointer"
              >
                <Pencil className="w-4 h-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete?.(vehicle.id)}
                className="cursor-pointer text-red-600 focus:text-red-600"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="mb-4">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700`}
          >
            <Car className="w-4 h-4" />
            <span className="text-sm font-medium">{vehicle.plateNumber}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
