"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MapPin, Loader2, CalendarRange } from "lucide-react";
import { usePlacesControllerFindOne } from "@/api/places/hooks";
import type { CreatePlaceDto } from "@/api/places/types";

const TYPE_LABEL: Record<CreatePlaceDto["type"], string> = {
  Ville: "Ville",
  Monument: "Monument",
  Musée: "Musée",
  Parc: "Parc & loisirs",
  Hotel: "Hôtels & restauration",
};

const FALLBACK_IMG = "/images/hills-1.jpg";

export default function PlaceDetailsSheet({
  open,
  onOpenChange,
  placeId,
  onShowAssociatedEvents,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  placeId: string | null;
  onShowAssociatedEvents: () => void;
}) {
  const { data: place, isLoading, isError } = usePlacesControllerFindOne(
    placeId ?? "",
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        className={
          "max-md:mr-0 max-md:h-full max-md:min-h-0 max-md:w-full max-md:max-w-full max-md:rounded-none " +
          "my-auto flex min-h-0 flex-col rounded-[12px] p-0 md:mr-4 md:h-[98vh] md:w-[min(100%,32rem)] md:[&>button]:hidden"
        }
      >
        {open && placeId && isLoading ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8">
            <Loader2 className="h-10 w-10 animate-spin text-brand-500" />
            <p className="text-sm text-gray-600">Chargement du lieu…</p>
          </div>
        ) : open && placeId && (isError || !place) ? (
          <div className="flex flex-1 items-center justify-center p-8 text-center text-red-500">
            Impossible de charger ce lieu.
          </div>
        ) : open && placeId && place ? (
          <>
            <div className="relative h-44 w-full shrink-0 overflow-hidden md:h-52">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={place.imageUrl?.trim() || FALLBACK_IMG}
                alt=""
                className="size-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <SheetHeader className="absolute bottom-0 left-0 right-0 p-4 pb-3 text-left max-md:pr-14">
                <span className="mb-2 inline-block rounded-full border border-white/40 bg-black/30 px-2.5 py-0.5 text-[10px] uppercase tracking-widest text-white">
                  {TYPE_LABEL[place.type]}
                </span>
                <SheetTitle className="text-xl font-bold text-white md:text-2xl">
                  {place.title}
                </SheetTitle>
              </SheetHeader>
            </div>

            <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-4 py-4">
              {place.address ? (
                <p className="flex items-start gap-2 text-sm text-gray-700">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                  <span>{place.address}</span>
                </p>
              ) : null}

              {place.latitude != null && place.longitude != null ? (
                <p className="flex items-center gap-2 text-xs text-gray-500">
                  <CalendarRange className="h-3.5 w-3.5" />
                  {place.latitude.toFixed(4)}, {place.longitude.toFixed(4)}
                </p>
              ) : null}

              <div className="prose prose-sm max-w-none text-gray-700">
                <p className="whitespace-pre-wrap leading-relaxed">
                  {place.description}
                </p>
              </div>
            </div>

            <div className="shrink-0 border-t border-gray-100 p-4">
              <Button
                type="button"
                className="w-full bg-brand-500 text-white hover:bg-brand-600"
                onClick={() => {
                  onShowAssociatedEvents();
                }}
              >
                Voir les événements associés
              </Button>
            </div>
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
