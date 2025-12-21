import { MoreVertical, Car, Zap, Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ImageGridPreview from "./image-grid-preview";

export interface VehicleCardProps {
  brand: string;
  model: string;
  images: string[];
  plateNumber: string;
  isElectric?: boolean;
  status: "Active" | "Inactive";
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function VehicleCard({
  brand,
  model,
  images,
  plateNumber,
  isElectric = false,
  status,
  onEdit,
  onDelete,
}: VehicleCardProps) {
  const remainingImages = images.length - 2;

  return (
    <div className="w-full flex flex-col max-h-[400px] gap-4 p-4 rounded-xl border bg-white">
      <ImageGridPreview images={images} />

      <div className="flex-1 min-h-0 p-2">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{brand}</h3>
            <p className="text-sm text-gray-500">{model}</p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-1 hover:bg-gray-100 rounded-full transition">
                <MoreVertical className="w-5 h-5 text-gray-400" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem onClick={onEdit} className="cursor-pointer">
                <Pencil className="w-4 h-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={onDelete}
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
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg ${
              isElectric
                ? "bg-blue-50 text-blue-700"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {isElectric ? (
              <Zap className="w-4 h-4" />
            ) : (
              <Car className="w-4 h-4" />
            )}
            <span className="text-sm font-medium">{plateNumber}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
