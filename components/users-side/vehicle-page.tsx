"use client";
import LeftSideSection from "./left-side-section";
import RightSideSection from "./right-side-section";
import AddNewSection from "./layouts/add-new-section";
import { mockedVehicles } from "@/utils/mocked-vehicles";
import VehicleCard from "../shared/vehicle-card";

export default function VehiclePage() {
  return (
    <div className="flex w-full justify-between min-h-screen">
          <LeftSideSection
            userRole="admin"
            userAvatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            userFullName="John Doe"
          />
          <div className="flex flex-col max-w-[50vw] justify-center items-center  gap-y-4 pb-2">
            <AddNewSection userFullName="John Doe" />
            {mockedVehicles.map((vehicle, index) => (
              <VehicleCard
                key={index}
                brand={vehicle.brand}
                model={vehicle.model}
                images={vehicle.images}
                plateNumber={vehicle.plateNumber}
                isElectric={vehicle.isElectric}
                status={vehicle.status}
                onEdit={vehicle.onEdit}
                onDelete={vehicle.onDelete}
              />
            ))}
          </div>
          <RightSideSection />
        </div>
  );
}