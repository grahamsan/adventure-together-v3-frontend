"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CalendarHeart, Loader2 } from "lucide-react";
import { usePlacesControllerFindExperiencesByPlaceId } from "@/api/places/hooks";
import type { Experience } from "@/api/experiences/types";
import { EventMiniCard } from "../event-mini-card";

export default function PlaceEventsSheet({
  open,
  onOpenChange,
  placeId,
  placeTitle,
  onOpenExperienceDetail,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  placeId: string | null;
  placeTitle: string;
  onOpenExperienceDetail: (exp: Experience) => void;
}) {
  const { data: experiences, isLoading, isError } =
    usePlacesControllerFindExperiencesByPlaceId(placeId ?? "");

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        className={
          "max-md:mr-0 max-md:h-full max-md:min-h-0 max-md:w-full max-md:max-w-full max-md:rounded-none " +
          "my-auto flex min-h-0 flex-col rounded-[12px] p-0 md:mr-4 md:h-[98vh] md:w-[min(100%,28rem)] md:[&>button]:hidden"
        }
      >
        <SheetHeader className="shrink-0 border-b border-gray-100 px-4 py-4 text-left max-md:pr-14">
          <SheetTitle className="flex items-center gap-2 text-lg font-semibold text-second-500">
            <span className="flex h-10 w-10 items-center rounded-[10px] bg-brand-50 p-2 text-brand-500">
              <CalendarHeart className="h-5 w-5" />
            </span>
            <span className="min-w-0 leading-tight">
              Événements à {placeTitle}
            </span>
          </SheetTitle>
        </SheetHeader>

        <div className="scrollbar-custom flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-4 py-4">
          {open && placeId && isLoading ? (
            <div className="flex flex-col items-center gap-2 py-12">
              <Loader2 className="h-8 w-8 animate-spin text-brand-500" />
              <p className="text-sm text-gray-600">Chargement…</p>
            </div>
          ) : open && placeId && isError ? (
            <p className="text-center text-red-500">
              Impossible de charger les événements.
            </p>
          ) : open &&
            placeId &&
            !isLoading &&
            !isError &&
            experiences &&
            experiences.length === 0 ? (
            <p className="text-center text-gray-500">
              Aucun événement associé à ce lieu pour le moment.
            </p>
          ) : open && placeId && experiences && experiences.length > 0 ? (
            experiences.map((exp) => (
              <EventMiniCard
                key={exp.id}
                experience={exp}
                onLearnMore={() => onOpenExperienceDetail(exp)}
              />
            ))
          ) : null}
        </div>
      </SheetContent>
    </Sheet>
  );
}
