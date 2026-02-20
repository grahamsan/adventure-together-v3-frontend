import { Button } from "@/components/ui/button";
import {
  CalendarArrowDown,
  CalendarArrowUp,
  CalendarClock,
  Plus,
} from "lucide-react";
import { useGetUserRole } from "@/api/app/hooks";
import CreateTripForm from "../../forms/create-trip-form";
import { useState } from "react";

export default function TripsBanner() {
  const [open, setOpen] = useState(false);
  const { isDriver } = useGetUserRole();

  return (
    <div className="relative mt-4 h-[30vh] w-full rounded-[18px] bg-[url('/images/trip-cover.png')] bg-cover bg-center">
      <div className="absolute top-0 left-0 bg-black/50 w-full h-full rounded-[18px]" />
      <h1
        className="text-[48px] font-bold text-second-50/60 font-bold absolute top-1/2 
      left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 -mt-2"
      >
        Trajets
      </h1>
      <div className="flex gap-x-3 justify-end w-full items-center absolute bottom-2 right-2 z-50">
        <Button
          className="flex gap-x-2 bg-white rounded-[10px] hover:bg-white"
          variant="outline"
        >
          <CalendarClock className="w-4 h-4" />
          <p>Imminants</p>
        </Button>
        <Button
          className="flex gap-x-2 bg-white rounded-[10px] hover:bg-white"
          variant="outline"
        >
          <CalendarArrowDown className="w-4 h-4" />
          <p>Ce mois-ci</p>
        </Button>
        <Button
          className="flex gap-x-2 bg-white rounded-[10px] hover:bg-white"
          variant="outline"
        >
          <CalendarArrowUp className="w-4 h-4" />
          <p>Mois Prochain</p>
        </Button>
        {isDriver && (
          <Button
            className="flex gap-x-2 bg-brand-500 text-white rounded-[10px] hover:bg-brand-600"
            variant="outline"
            onClick={() => setOpen(true)}
          >
            <Plus className="w-4 h-4" />
            <p>Nouveau trajet</p>
          </Button>
        )}
        <div className={`${open ? "flex" : "hidden"}`}>
          <CreateTripForm open={open} onClose={() => setOpen(false)} />
        </div>
      </div>
    </div>
  );
}
