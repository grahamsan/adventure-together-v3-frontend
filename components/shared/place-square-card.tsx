import { Clock, MapPin, Bookmark } from "lucide-react";
import PlaceTypeBadge from "@/components/shared/place-type-badge";

export interface PlaceCardProps {
  imageUrl: string;
  title: string;
  description: string;
  type: "Ville" | "Musée" | "Parc" | "Hotel" | "Monument";
  pickupAvailable: boolean;
  duration: string;
}

export default function PlaceCard({
  imageUrl,
  title,
  description,
  duration,
  type,
  pickupAvailable,
}: PlaceCardProps) {
  return (
    <div className="relative w-full h-[450px] rounded-[24px] overflow-hidden shadow-lg group cursor-pointer">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-300"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      <button className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex 
      items-center justify-center hover:bg-white/30 transition">
        <Bookmark className="w-5 h-5 text-white" />
      </button>
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-sm text-gray-200 mb-4 line-clamp-3">{description}</p>

        <div className="flex items-center gap-4 text-sm">
          {/* <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>{duration}</span>
          </div> */}

          <div className="flex items-center">
            <PlaceTypeBadge type={type} />
          </div>

          {/* {pickupAvailable && (
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              <span>Pick up</span>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}
