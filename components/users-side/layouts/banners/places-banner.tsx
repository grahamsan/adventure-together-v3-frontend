"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import CreatePlaceForm from "../../forms/create-place-form";
import type { PlacesCategoryFilter } from "@/lib/place-filters";
import { PLACES_FILTER_CHIPS } from "@/lib/place-filters";
import { cn } from "@/lib/utils";

type PlacesBannerProps = {
  categoryFilter: PlacesCategoryFilter;
  onCategoryFilterChange: (next: PlacesCategoryFilter) => void;
};

export default function PlacesBanner({
  categoryFilter,
  onCategoryFilterChange,
}: PlacesBannerProps) {
  const [openCreate, setOpenCreate] = useState(false);

  return (
    <div className="flex h-full min-h-0 w-full flex-col my-4">
      <div
        className="relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl bg-cover bg-center shadow-sm ring-1 ring-black/5"
        style={{
          backgroundImage:
            "linear-gradient(165deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.42) 45%, rgba(0,0,0,0.72) 100%), url('/images/hills-1.jpg')",
        }}
      >
        {/* Bloc principal : titre + accroche + CTA */}
        <div className="relative z-10 flex min-h-0 flex-1 flex-col items-center justify-center px-5 py-8 text-center sm:px-8 sm:py-10 md:px-10">
          <div className="flex max-w-md flex-col items-center">
            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/75 sm:text-[11px]">
              L&apos;âme de l&apos;Afrique de l&apos;Ouest
            </p>
            <h1 className="mt-3 text-balance text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl md:text-[2rem]">
              Découvrez le Bénin
            </h1>
            <p className="mt-4 max-w-[17rem] text-sm leading-relaxed text-white/80 sm:max-w-none sm:text-[0.9375rem]">
              Partagez vos lieux préférés et inspirez d&apos;autres voyageurs.
            </p>
            <Button
              type="button"
              onClick={() => setOpenCreate(true)}
              className="mt-6 h-10 rounded-full border-0 bg-[var(--BRAND-500)] px-5 text-sm font-medium text-white shadow-md shadow-black/20 transition hover:bg-[var(--BRAND-500)]/92"
            >
              <Plus className="mr-1.5 h-4 w-4" strokeWidth={2.5} />
              Nouveau lieu
            </Button>
          </div>
        </div>

        {/* Filtres : bandeau discret, style verre */}
        <div className="relative z-10 border-t border-white/10 bg-black/25 px-3 py-3 backdrop-blur-md md:px-4 md:py-3.5">
          <p className="mb-2 text-center text-[10px] font-medium uppercase tracking-wider text-white/50 md:mb-2.5 md:text-left">
            Filtrer
          </p>
          <div className="flex flex-wrap justify-center gap-1.5 md:justify-start md:gap-2">
            {PLACES_FILTER_CHIPS.map(({ id, label }) => {
              const active = categoryFilter === id;
              return (
                <Button
                  key={id}
                  type="button"
                  size="sm"
                  variant="ghost"
                  className={cn(
                    "h-8 rounded-full px-3 text-xs font-medium md:px-3.5",
                    active
                      ? "bg-white text-zinc-900 shadow-sm hover:bg-white hover:text-zinc-900"
                      : "border border-white/25 bg-white/10 text-white hover:bg-white/15 hover:text-white",
                  )}
                  onClick={() => onCategoryFilterChange(id)}
                >
                  {label}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
      <CreatePlaceForm open={openCreate} onClose={() => setOpenCreate(false)} />
    </div>
  );
}
