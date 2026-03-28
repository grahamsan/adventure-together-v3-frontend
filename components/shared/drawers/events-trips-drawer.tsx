import { useMemo, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Compass } from "lucide-react";
import { useTripsByExperience } from "@/api/experiences/hooks";
import { useGetUserRole } from "@/api/app/hooks";
import TripSquareCard from "../trip-square-card";
import CreateTripForm from "@/components/users-side/forms/create-trip-form";

export interface EventTripsDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  experienceId: string;
  eventTitle: string;
  /** Lieu affiché pour l’expérience (arrivée du trajet proposé). */
  eventLocation: string;
  /** Date de début d’événement (ISO) — borne max du calendrier trajet. */
  eventDateIso: string;
}

export default function EventTripsDrawer({
  open,
  onOpenChange,
  experienceId,
  eventTitle,
  eventLocation,
  eventDateIso,
}: EventTripsDrawerProps) {
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
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="my-auto mr-4 flex h-[98vh] w-[40vw] flex-col rounded-[12px] [&>button]:hidden">
          <SheetHeader className="space-y-0">
            <div className="flex items-start justify-between gap-3 pr-2">
              <SheetTitle className="text-second-500 flex flex-1 items-center gap-2 text-lg font-semibold">
                <span className="bg-brand-50 text-brand-500 flex h-10 w-10 items-center rounded-[10px] p-2">
                  <Compass className="mx-auto h-5 w-5" />
                </span>
                <span className="min-w-0 text-left leading-tight">
                  Trajets liés à {eventTitle}
                </span>
              </SheetTitle>
              {isDriver && (
                <Button
                  type="button"
                  size="sm"
                  className="bg-brand-500 hover:bg-brand-600 shrink-0 text-white"
                  onClick={() => setCreateTripOpen(true)}
                >
                  Proposer un trajet
                </Button>
              )}
            </div>
          </SheetHeader>
          <div className="scrollbar-custom flex flex-col overflow-y-auto px-4 gap-y-2">
            {trips?.map((trip: any, index: number) => (
              <div key={trip.id || index} className="">
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
              <div className="mx-auto mt-10 text-gray-500">
                Aucun trajet lié à cette expérience pour le moment.
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>

      <CreateTripForm
        open={createTripOpen}
        onClose={() => setCreateTripOpen(false)}
        hideTrigger
        experienceContext={experienceContext}
      />
    </>
  );
}
