"use client";
import LeftSideSection from "./left-side-section";
import RightSideSection from "./right-side-section";
import AddNewSection from "./layouts/add-new-section";
import VehicleCard from "../shared/vehicle-card";
import { useState } from "react";
import CreateVehicleForm from "./forms/add-car-form";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useVehiclesControllerFindAll } from "@/api/vehicles/hooks";

export default function VehiclePage() {
  const [openVehicleDialog, setOpenVehicleDialog] = useState(false);
  const { data: vehicles, isLoading } = useVehiclesControllerFindAll();

  return (
    <div className="w-full flex flex-col items-center gap-y-2 pb-2 pt-20 max-w-5xl mx-auto px-4">
      <AddNewSection userFullName="User" />
      <div className="relative flex flex-col w-full max-w-md justify-center items-center gap-y-4 pb-2">
        <div className={`${openVehicleDialog ? "block" : "hidden"}`}>
          <CreateVehicleForm
            open={openVehicleDialog}
            onClose={() => setOpenVehicleDialog(false)}
          />
        </div>
        {isLoading && <p>Chargement...</p>}
        {vehicles?.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>
    </div>
  );
}
