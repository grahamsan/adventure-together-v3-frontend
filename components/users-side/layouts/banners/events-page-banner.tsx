"use client";
import { Button } from "@/components/ui/button";
import {
  CalendarArrowDown,
  CalendarArrowUp,
  CalendarClock,
  Plus,
} from "lucide-react";
import CreateEventForm from "../../forms/create-event-form";
import { useState } from "react";
import { useGetUserRole } from "@/api/app/hooks";
import type { PeriodFilter } from "@/lib/period-filter";
import { togglePeriodFilter } from "@/lib/period-filter";
import { cn } from "@/lib/utils";

type EventsPageBannerProps = {
  periodFilter?: PeriodFilter;
  onPeriodFilterChange?: (next: PeriodFilter) => void;
};

export default function EventsPageBanner({
  periodFilter = "none",
  onPeriodFilterChange,
}: EventsPageBannerProps) {
  const [open, setOpen] = useState(false);
  const { isOrganizer } = useGetUserRole();

  const periodBtnClass = (active: boolean) =>
    cn(
      "flex gap-x-2 rounded-[10px]",
      active
        ? ""
        : "bg-white hover:bg-white border-stone-200 text-foreground",
    );

  return (
    <div className="relative mt-4 min-h-[min(30vh,220px)] md:h-[30vh] w-full rounded-[18px] bg-[url('/images/event-cover.png')] bg-cover bg-center">
      <div className="absolute top-0 left-0 bg-black/50 w-full h-full rounded-[18px]" />
      <h1
        className="text-2xl sm:text-3xl md:text-[48px] font-bold text-second-50/60 absolute top-1/2 
      left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 px-4 text-center max-w-[min(100%,28rem)] md:max-w-none md:-mt-2"
      >
        Expériences Touristiques
      </h1>
      <div className="flex gap-2 sm:gap-x-3 justify-start md:justify-end w-full items-center absolute bottom-2 left-2 right-2 md:left-auto md:right-2 z-50 flex-wrap overflow-x-auto pb-0.5 md:overflow-visible [scrollbar-width:thin]">
        <Button
          type="button"
          className={periodBtnClass(periodFilter === "imminent")}
          variant={periodFilter === "imminent" ? "default" : "outline"}
          onClick={() =>
            onPeriodFilterChange?.(
              togglePeriodFilter(periodFilter, "imminent"),
            )
          }
        >
          <CalendarClock className="w-4 h-4" />
          <p>Imminantes</p>
        </Button>
        <Button
          type="button"
          className={periodBtnClass(periodFilter === "month")}
          variant={periodFilter === "month" ? "default" : "outline"}
          onClick={() =>
            onPeriodFilterChange?.(togglePeriodFilter(periodFilter, "month"))
          }
        >
          <CalendarArrowDown className="w-4 h-4" />
          <p>Ce mois-ci</p>
        </Button>
        <Button
          type="button"
          className={periodBtnClass(periodFilter === "nextMonth")}
          variant={periodFilter === "nextMonth" ? "default" : "outline"}
          onClick={() =>
            onPeriodFilterChange?.(
              togglePeriodFilter(periodFilter, "nextMonth"),
            )
          }
        >
          <CalendarArrowUp className="w-4 h-4" />
          <p>Mois Prochain</p>
        </Button>
        {isOrganizer && (
          <Button
            className="flex gap-x-2 bg-brand-500 text-white rounded-[10px] hover:bg-brand-600"
            variant="outline"
            onClick={() => setOpen(true)}
          >
            <Plus className="w-4 h-4" />
            <p>Nouvelle expérience</p>
          </Button>
        )}
        <CreateEventForm open={open} onClose={() => setOpen(false)} />
      </div>
    </div>
  );
}
