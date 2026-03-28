import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Calendar1,
  Car,
  Clock,
  Compass,
  InfoIcon,
  MapPin,
  Pocket,
  TicketMinus,
  UserLock,
  UserSearch,
  Wallet,
  Waypoints,
} from "lucide-react";
import { formatTimestamp } from "@/utils/format-timestamp";
import { StatusBadge } from "../trip-status-badge";

export interface TripsDetailsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  from: string;
  to: string;
  date: string;
  time: string;
  description: string;
  seatsConfirmed: number;
  seatsAvailable: number;
  excales: string[];
  ownerFullName: string;
  ownerAvatarUrl: string;
  createdAt: string;
  associatedEventName: string;
  status: "ouvert" | "complet" | "terminé";
  price: number;
  tripId: string;
  hasApplied: boolean;
  vehicleBrand: string;
  vehicleModel: string;
  vehiclePlateNumber: string;
  vehicleImageUrl: string;
}

export default function TripsDetails({
  open,
  onOpenChange,
  from,
  to,
  date,
  time,
  description,
  seatsConfirmed,
  seatsAvailable,
  excales,
  ownerFullName,
  ownerAvatarUrl,
  createdAt,
  associatedEventName,
  status,
  price,
  tripId,
  hasApplied,
  vehicleBrand,
  vehicleModel,
  vehiclePlateNumber,
  vehicleImageUrl,
}: TripsDetailsProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="max-md:w-full max-md:max-w-full max-md:rounded-none max-md:mr-0 md:h-[98vh] md:w-[30vw] my-auto md:mr-4 flex flex-col rounded-[12px] md:[&>button]:hidden">
        <SheetHeader className="max-md:pr-14">
          <SheetTitle className="text-lg font-semibold flex items-center gap-2 text-second-500">
            <span className="flex items-center h-10 w-10 bg-brand-50 text-brand-500 p-2 rounded-[10px]">
              <Compass className="h-5 w-5 mx-auto" />
            </span>
            Détails du trajet : {from} → {to}
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col flex-1 overflow-y-auto scrollbar-custom">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2889.566626521466!2d2.3522219156565656!3d48.856614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x2803d863b367d66!2sEiffel%20Tower!5e0!3m2!1sen!2sfr!4v1699999999999!5m2!1sen!2sfr"
            className="rounded-lg w-[95%] mx-auto h-48 border"
            loading="lazy"
          />
          <div className="px-4 py-5 flex flex-col gap-y-6">
            {/* TRAJET PRINCIPAL */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 leading-tight">
                {from} → {to}
              </h2>

              <div className="flex items-center gap-3 mt-2 text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar1 className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {formatTimestamp(date)}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">{time}</span>
                </div>
              </div>
            </div>

            {/* PRIX + STATUT */}
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-brand-600">
                {price} FCFA
                <span className="text-sm font-medium text-gray-500 ml-1">
                  / place
                </span>
              </div>

              <StatusBadge status={status} />
            </div>

            {/* DISPONIBILITÉ */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-1">Sièges confirmés</p>
                <p className="text-lg font-semibold text-gray-900">
                  {seatsConfirmed}
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-1">Places restantes</p>
                <p className="text-lg font-semibold text-gray-900">
                  {seatsAvailable}
                </p>
              </div>
            </div>

            {/* ÉVÉNEMENT ASSOCIÉ */}
            {associatedEventName && (
              <div className="bg-blue-50 text-blue-600 rounded-xl px-4 py-3 flex items-center gap-2 text-sm font-medium">
                <Calendar className="w-4 h-4" />
                Événement : {associatedEventName}
              </div>
            )}

            {/* ESCALES */}
            {excales?.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                  Escales
                </h3>
                <div className="flex flex-wrap gap-2">
                  {excales.map((e, i) => (
                    <span
                      key={`${e}-${i}`}
                      className="rounded-md bg-gray-100 px-2 py-1 text-sm text-gray-800"
                    >
                      {e}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className="flex flex-col gap-y-2 w-full">
              <h1 className="text-sm font-semibold text-gray-700 mb-2">
                Informations sur le vehicule
              </h1>
              <div className="flex flex-col items-center gap-y-2">
                <img
                  src={vehicleImageUrl}
                  alt=""
                  className="w-[400px] h-[200px] rounded-lg"
                />
                <div className="flex items-center gap-x-2 bg-second-50 p-2 rounded-[10px]">
                  <span className="text-sm font-semibold text-gray-700 flex items-center gap-x-2">
                    <Pocket className="w-4 h-4 text-brand-500" />
                    {vehicleBrand}
                  </span>
                  -
                  <span className="text-sm font-semibold text-gray-700 flex items-center gap-x-2">
                    <Car className="w-4 h-4 text-brand-500" />
                    {vehicleModel}
                  </span>
                  -
                  <span className="text-sm font-semibold text-brand-500 flex items-center gap-x-2">
                    <TicketMinus className="w-4 h-4 text-brand-500" />
                    {vehiclePlateNumber}
                  </span>
                </div>
              </div>
            </div>

            {/* DESCRIPTION */}
            {description && (
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                  À propos du trajet
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {description}
                </p>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
