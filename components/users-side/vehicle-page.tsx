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
    <div className="flex w-full justify-between min-h-screen">
      <LeftSideSection
        userRole="admin"
        userAvatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        userFullName="John Doe"
      />
      <div className="relative flex flex-col max-w-[50vw] justify-center items-center  gap-y-4 pb-2">
        <AddNewSection userFullName="John Doe" />
        <div className={`${openVehicleDialog ? "block" : "hidden"}`}>
          <CreateVehicleForm
            open={openVehicleDialog}
            onClose={() => setOpenVehicleDialog(false)}
          />
        </div>
        {isLoading && <p>Loading...</p>}
        {vehicles?.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>
      <RightSideSection />
    </div>
  );
}
