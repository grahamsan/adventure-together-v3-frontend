"use client";

import { Sheet, SheetContent } from "@/components/ui/sheet";
import { ExperienceTripsPanel } from "../experience-trips-panel";

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
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="max-md:w-full max-md:max-w-full max-md:rounded-none max-md:mr-0 my-auto md:mr-4 flex min-h-0 max-md:h-full md:h-[98vh] md:w-[40vw] flex-col rounded-[12px] p-0 md:[&>button]:hidden">
        <ExperienceTripsPanel
          experienceId={experienceId}
          eventTitle={eventTitle}
          eventLocation={eventLocation}
          eventDateIso={eventDateIso}
          showSheetStyleHeader
          className="px-0 pt-2"
        />
      </SheetContent>
    </Sheet>
  );
}
