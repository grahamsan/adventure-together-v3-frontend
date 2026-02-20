"use client";
import {
  InfoIcon,
  MapPin,
  Calendar,
  Calendar1,
  Clock,
  Waypoints,
  Wallet,
  MoreVertical,
  Flag,
  EyeOff,
  LinkIcon,
  Share,
  UserLock,
  UserSearch,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./trip-status-badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import ApplyToTripForm from "../users-side/forms/apply-to-trip-form";
import { formatTimestamp } from "@/utils/format-timestamp";
import UserAvatarComponent from "./user-avatar-component";
import TripsDetails from "./drawers/trips-details";
import { useState } from "react";

export interface TripSquareCardProps {
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

export default function TripSquareCard({
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
}: TripSquareCardProps) {
  const [openDetails, setOpenDetails] = useState(false);
  return (
    <div className="flex w-full lg:flex-1 gap-6 p-4 rounded-xl border-[0.5px] border-gray-200 bg-white relative">
      {/* Dropdown actions */}
      <div className="absolute top-3 right-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-8 h-8 p-0 rounded-full bg-gray-100 hover:bg-gray-200"
            >
              <MoreVertical className="w-4 h-4 text-gray-700" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>
              <EyeOff className="w-4 h-4 mr-2 text-gray-600 whitespace-nowrap" />{" "}
              Je ne veux pas voir ça
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Flag className="w-4 h-4 mr-2 text-red-600" /> Signaler le trajet
            </DropdownMenuItem>

            <DropdownMenuItem>
              <LinkIcon className="w-4 h-4 mr-2 text-gray-600" /> Copier le lien
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Share className="w-4 h-4 mr-2 text-blue-600" /> Partager
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex flex-col gap-y-2">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2889.566626521466!2d2.3522219156565656!3d48.856614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x2803d863b367d66!2sEiffel%20Tower!5e0!3m2!1sen!2sfr!4v1699999999999!5m2!1sen!2sfr"
          className="rounded-lg w-48 h-48 border"
          loading="lazy"
        />
        <div className="flex items-center gap-3 mt-4">
          <UserAvatarComponent
            fullname={ownerFullName}
            avatar={ownerAvatarUrl}
            size={40}
          />
          <div>
            <p className="font-semibold text-sm text-gray-900 flex items-center gap-1">
              {ownerFullName}
            </p>
            {/* <p className="text-xs text-gray-500">{createdAt}</p> */}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between flex-1">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 font-semibold text-gray-900 text-base">
            <MapPin className="w-4 h-4 text-gray-700" /> {from} → {to}
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Calendar1 className="w-4 h-4 text-gray-700" />{" "}
            {formatTimestamp(date)}
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Clock className="w-4 h-4 text-gray-700" /> {time}
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-700">
            <UserLock className="w-4 h-4 text-gray-700" /> Sièges confirmés :
            <strong>{seatsConfirmed}</strong>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <UserSearch className="w-4 h-4 text-gray-700" /> Sièges restants :
            <strong>{seatsAvailable}</strong>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div className="flex items-center gap-2 text-sm text-orange-500 bg-orange-50 rounded-lg px-2 py-1">
              <Wallet className="w-4 h-4 text-orange-500" /> {price} FCFA /
              place
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          <Button
            onClick={() => setOpenDetails(true)}
            variant="outline"
            className="mt-1 text-brand-500 flex items-center gap-2 flex-1 rounded-full bg-white hover:bg-brand-400 hover:text-white"
          >
            <InfoIcon className="w-5 h-5 " />
            <span className="font-semibold">Voir les détails</span>
          </Button>

          <ApplyToTripForm
            tripId={tripId}
            hasApplied={hasApplied}
            seatsAvailable={seatsAvailable}
          />
          <TripsDetails
            open={openDetails}
            onOpenChange={setOpenDetails}
            from={from}
            to={to}
            date={date}
            time={time}
            description={description}
            seatsConfirmed={seatsConfirmed}
            seatsAvailable={seatsAvailable}
            excales={excales}
            ownerFullName={ownerFullName}
            ownerAvatarUrl={ownerAvatarUrl}
            createdAt={createdAt}
            associatedEventName={associatedEventName}
            status={status}
            price={price}
            tripId={tripId}
            hasApplied={hasApplied}
            vehicleBrand={vehicleBrand}
            vehicleModel={vehicleModel}
            vehiclePlateNumber={vehiclePlateNumber}
            vehicleImageUrl={vehicleImageUrl}
          />
        </div>
      </div>
    </div>
  );
}
