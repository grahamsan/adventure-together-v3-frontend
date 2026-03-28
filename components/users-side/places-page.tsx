"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { usePlacesControllerFindAll } from "@/api/places/hooks";
import PlacesBanner from "./layouts/banners/places-banner";
import PlaceBentoCard from "../shared/place-bento-card";
import type { PlacesCategoryFilter } from "@/lib/place-filters";
import { placesFilterToQuery } from "@/lib/place-filters";
import { Loader2 } from "lucide-react";
import type { CreatePlaceDto } from "@/api/places/types";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  BENTO_GRID_COLUMNS,
  computeBentoPlacements,
} from "@/lib/bento-grid-layout";

const BANNER_TRANSITION = {
  duration: 0.85,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

export default function PlacesPage() {
  const [categoryFilter, setCategoryFilter] =
    useState<PlacesCategoryFilter>("all");
  const isMd = useMediaQuery("(min-width: 768px)");

  const queryParams = useMemo(
    () => placesFilterToQuery(categoryFilter),
    [categoryFilter],
  );

  const { data: places, isLoading, isError } =
    usePlacesControllerFindAll(queryParams);

  const list = useMemo(() => {
    if (!Array.isArray(places)) return [];
    return places.map((p) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      type: p.type as CreatePlaceDto["type"],
      imageUrl: p.imageUrl,
    }));
  }, [places]);

  const gridPlacements = useMemo(
    () => computeBentoPlacements(list.length, BENTO_GRID_COLUMNS),
    [list.length],
  );

  return (
    <div className="flex h-screen w-full flex-1 flex-col gap-2 overflow-hidden px-2 md:min-h-0 md:flex-row md:gap-3 md:px-4">
      <motion.aside
        className="flex shrink-0 flex-col overflow-hidden md:h-full md:min-h-0"
        initial={{ width: "100%" }}
        animate={{ width: isMd ? "30%" : "100%" }}
        transition={BANNER_TRANSITION}
        style={{ minWidth: 0 }}
      >
        <div className="flex h-[min(40vh,380px)] w-full min-h-0 flex-1 flex-col md:h-full md:min-h-0">
          <PlacesBanner
            categoryFilter={categoryFilter}
            onCategoryFilterChange={setCategoryFilter}
          />
        </div>
      </motion.aside>

      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        {isLoading ? (
          <div className="flex flex-1 flex-col items-center justify-center py-12">
            <Loader2 className="h-10 w-10 animate-spin text-[var(--BRAND-500)]" />
            <p className="mt-4 font-medium text-zinc-600">
              Chargement des lieux…
            </p>
          </div>
        ) : (
          <div className="scrollbar-custom flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden py-2 md:py-0">
            {isError ? (
              <p className="w-full py-8 text-center text-red-500">
                Impossible de charger les lieux.
              </p>
            ) : list.length === 0 ? (
              <p className="w-full py-16 text-center text-zinc-500">
                Aucun lieu pour ce filtre. Ajoutez le premier !
              </p>
            ) : (
              <div
                className="grid min-h-full w-full grid-cols-1 content-start gap-4 p-4 md:grid-cols-12 md:gap-4 md:auto-rows-[minmax(160px,auto)]"
              >
                {list.map((place, index) => (
                  <PlaceBentoCard
                    key={place.id}
                    place={place}
                    gridStyle={isMd ? gridPlacements[index] : undefined}
                    motionIndex={index}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
