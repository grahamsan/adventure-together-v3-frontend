"use client";

import { useTripsControllerFindAll } from "@/api/trips/hooks";
import { Loader2 } from "lucide-react";
import TripSquareCard from "../shared/trip-square-card";
import TripsBanner from "./layouts/banners/trips-banner";

export default function TripPage() {
  const { data: trips, isLoading, isError } = useTripsControllerFindAll();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen pt-20">
        <Loader2 className="h-8 w-8 animate-spin text-[var(--BRAND-500)]" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen pt-20 text-red-500">
        Une erreur est survenue lors du chargement des trajets.
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex flex-1 flex-col items-center gap-y-2 px-4">
      <TripsBanner />
      <div
        className="overflow-y-auto overflow-x-hidden scrollbar-custom 
          flex flex-1 w-full justify-center items-center flex-col md:grid md:grid-cols-2
       gap-2 px-20 pb-2"
      >
        {trips?.map((trip: any, index: number) => (
          <div key={trip.id || index} className="flex-1">
            <TripSquareCard
              tripId={trip.id}
              from={trip.from}
              to={trip.to}
              date={
                trip.startDate
                  ? new Date(trip.startDate).toISOString()
                  : new Date().toISOString()
              } // formatted as string if Card expects string
              time={trip.time}
              description={trip.tripDescription}
              seatsConfirmed={trip.seatsConfirmed}
              seatsAvailable={trip.seatsAvailable}
              excales={trip.escales?.join(", ") || "Aucune escale"}
              ownerFullName={trip?.driverName || "Inconnu"} // mapping nested object
              ownerAvatarUrl={trip.owner?.avatarUrl}
              createdAt={
                trip.createdAt
                  ? new Date(trip.createdAt).toISOString()
                  : new Date().toISOString()
              }
              associatedEventName={trip.associatedEventTitle}
              status={trip.status || "PLANIFIED"}
              price={trip.price}
              hasApplied={trip.hasApplied}
              vehicleBrand={trip.vehicle.brand}
              vehicleModel={trip.vehicle.model}
              vehiclePlateNumber={trip.vehicle.plateNumber}
              vehicleImageUrl={trip.vehicle.imageUrl}
            />
          </div>
        ))}
        {(!trips || trips.length === 0) && (
          <div className="text-gray-500 mt-10">
            Aucun trajet disponible pour le moment.
          </div>
        )}
      </div>
    </div>
  );
}
