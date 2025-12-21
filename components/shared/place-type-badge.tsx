import {
  Building2,
  Landmark,
  Leaf,
  Hotel,
  Building,
} from "lucide-react";

type PlaceType = "Ville" | "Musée" | "Parc" | "Hotel" | "Monument";

interface PlaceTypeBadgeProps {
  type: PlaceType;
}

const typeConfig: Record<
  PlaceType,
  {
    label: string;
    icon: React.ReactNode;
    classes: string;
  }
> = {
  Ville: {
    label: "Ville",
    icon: <Building2 className="w-4 h-4" />,
    classes: "bg-green-100 text-green-600 border-green-600",
  },
  Musée: {
    label: "Musée",
    icon: <Landmark className="w-4 h-4" />,
    classes: "bg-yellow-100 text-yellow-600 border-yellow-600",
  },
  Parc: {
    label: "Parc",
    icon: <Leaf className="w-4 h-4" />,
    classes: "bg-emerald-100 text-emerald-600 border-emerald-600",
  },
  Hotel: {
    label: "Hôtel",
    icon: <Hotel className="w-4 h-4" />,
    classes: "bg-blue-100 text-blue-600 border-blue-600",
  },
  Monument: {
    label: "Monument",
    icon: <Building className="w-4 h-4" />,
    classes: "bg-purple-100 text-purple-600 border-purple-600",
  },
};

export default function PlaceTypeBadge({ type }: PlaceTypeBadgeProps) {
  const config = typeConfig[type];

  return (
    <span
      className={`inline-flex items-center gap-x-2 px-3 py-1 text-xs font-medium border rounded-full ${config.classes}`}
    >
      {config.icon}
      {config.label}
    </span>
  );
}
