"use client";

import { useMemo, useState } from "react";
import { useTripsControllerFindAll } from "@/api/trips/hooks";
import { Loader2 } from "lucide-react";
import TripSquareCard from "../shared/trip-square-card";
import TripsBanner from "./layouts/banners/trips-banner";
import { periodToQuery, type PeriodFilter } from "@/lib/period-filter";

export default function TripPage() {
  const [periodFilter, setPeriodFilter] = useState<PeriodFilter>("none");

  const queryParams = useMemo(
    () => ({
      ...periodToQuery(periodFilter),
    }),
    [periodFilter],
  );

  const { data: trips, isLoading, isError } =
    useTripsControllerFindAll(queryParams);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] flex-1 pt-20">
        <Loader2 className="h-8 w-8 animate-spin text-[var(--BRAND-500)]" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] flex-1 pt-20 text-red-500">
        Une erreur est survenue lors du chargement des trajets.
      </div>
    );
  }

  return (
    <div className="w-full min-h-0 flex-1 flex flex-col items-center gap-y-2 px-3 sm:px-4 md:px-6">
      <TripsBanner
        periodFilter={periodFilter}
        onPeriodFilterChange={setPeriodFilter}
      />
      <div
        className="relative overflow-y-auto overflow-x-hidden scrollbar-custom 
          flex flex-1 w-full justify-center items-center flex-col md:grid md:grid-cols-2
       gap-2 px-3 sm:px-6 md:px-12 lg:px-20 pb-2"
      >
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any -- DTO API vs Trip type */}
        {trips?.map((trip: any, index: number) => (
          <div key={trip.id || index} className="flex-1">
            <TripSquareCard
              tripId={trip.id}
              from={trip.from}
              to={trip.to}
              date={
                trip.date
                  ? `${String(trip.date).split("T")[0]}T12:00:00`
                  : ""
              }
              time={trip.time}
              description={trip.description ?? ""}
              seatsConfirmed={trip.seatsConfirmed}
              seatsAvailable={trip.seatsAvailable}
              ownerFullName={trip?.driverName || "Inconnu"}
              ownerAvatarUrl={trip.creator?.avatarUrl ?? ""}
              createdAt={
                trip.createdAt
                  ? new Date(trip.createdAt).toISOString()
                  : ""
              }
              associatedEventName={trip.relatedExpName ?? ""}
              status={trip.status || "PLANIFIED"}
              price={Number(trip.price)}
              hasApplied={trip.hasApplied}
              vehicleBrand={trip.vehicle.brand}
              vehicleModel={trip.vehicle.model}
              vehiclePlateNumber={trip.vehicle.plateNumber}
              vehicleImageUrl={trip.vehicle.imageUrl}
              ownerId={trip.ownerId ?? ""}
              applicationsCount={trip.applicationsCount ?? 0}
              escalesList={Array.isArray(trip.escales) ? trip.escales : []}
            />
          </div>
        ))}
        {(!trips || trips.length === 0) && (
          <div className="text-gray-500 mt-10 mx-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            Aucun trajet disponible pour le moment.
          </div>
        )}
      </div>
    </div>
  );
}
