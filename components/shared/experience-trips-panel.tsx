"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Compass } from "lucide-react";
import { useTripsByExperience } from "@/api/experiences/hooks";
import { useGetUserRole } from "@/api/app/hooks";
import TripSquareCard from "./trip-square-card";
import CreateTripForm from "@/components/users-side/forms/create-trip-form";
import { cn } from "@/lib/utils";

export interface ExperienceTripsPanelProps {
  experienceId: string;
  eventTitle: string;
  eventLocation: string;
  eventDateIso: string;
  /** Affiche la barre titre + icône (sheet) ; faux dans un onglet Dialog */
  showSheetStyleHeader?: boolean;
  /** Dans le dialogue détail expérience : hauteur bornée */
  embedded?: boolean;
  className?: string;
}

export function ExperienceTripsPanel({
  experienceId,
  eventTitle,
  eventLocation,
  eventDateIso,
  showSheetStyleHeader = true,
  embedded = false,
  className,
}: ExperienceTripsPanelProps) {
  const { data: trips } = useTripsByExperience(experienceId);
  const { isDriver } = useGetUserRole();
  const [createTripOpen, setCreateTripOpen] = useState(false);

  const experienceContext = useMemo(
    () => ({
      experienceId,
      eventLocation,
      eventStartAt: new Date(eventDateIso),
    }),
    [experienceId, eventLocation, eventDateIso],
  );

  return (
    <div
      className={cn(
        "flex min-h-0 flex-1 flex-col",
        embedded && "max-h-[min(65vh,480px)]",
        className,
      )}
    >
      {showSheetStyleHeader ? (
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-gray-100 px-4 pb-3 pt-1 max-md:pr-14">
          <div className="flex min-w-0 flex-1 items-center gap-2 text-lg font-semibold text-second-500">
            <span className="flex h-10 w-10 shrink-0 items-center rounded-[10px] bg-brand-50 p-2 text-brand-500">
              <Compass className="mx-auto h-5 w-5" />
            </span>
            <span className="min-w-0 text-left leading-tight">
              Trajets liés à {eventTitle}
            </span>
          </div>
          {isDriver && (
            <Button
              type="button"
              size="sm"
              className="shrink-0 bg-brand-500 text-white hover:bg-brand-600"
              onClick={() => setCreateTripOpen(true)}
            >
              Proposer un trajet
            </Button>
          )}
        </div>
      ) : (
        isDriver && (
          <div className="mb-3 flex justify-end">
            <Button
              type="button"
              size="sm"
              className="bg-brand-500 text-white hover:bg-brand-600"
              onClick={() => setCreateTripOpen(true)}
            >
              Proposer un trajet
            </Button>
          </div>
        )
      )}

      <div className="scrollbar-custom flex min-h-0 flex-1 flex-col gap-y-2 overflow-y-auto px-4 py-2">
        {trips?.map((trip: any, index: number) => (
          <div key={trip.id || index} className="">
            <TripSquareCard
              tripId={trip.id}
              from={trip.from}
              to={trip.to}
              date={
                trip.date ? `${String(trip.date).split("T")[0]}T12:00:00` : ""
              }
              time={trip.time}
              description={trip.description ?? ""}
              seatsConfirmed={trip.seatsConfirmed}
              seatsAvailable={trip.seatsAvailable}
              ownerFullName={trip?.driverName || "Inconnu"}
              ownerAvatarUrl={trip.creator?.avatarUrl ?? ""}
              createdAt={
                trip.createdAt ? new Date(trip.createdAt).toISOString() : ""
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
          <div className="mx-auto mt-6 text-center text-gray-500">
            Aucun trajet lié à cette expérience pour le moment.
          </div>
        )}
      </div>

      <CreateTripForm
        open={createTripOpen}
        onClose={() => setCreateTripOpen(false)}
        hideTrigger
        experienceContext={experienceContext}
      />
    </div>
  );
}
