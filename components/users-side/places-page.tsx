"use client";

import LeftSideSection from "./left-side-section";
import AddNewSection from "./layouts/add-new-section";
import RightSideSection from "./right-side-section";
import PlaceSquareCard from "../shared/place-square-card";
import { MockedPlaces } from "../../utils/mock-places";

export default function PlacesPage() {
  return (
    <div className="w-full h-screen flex flex-1 flex-col items-center gap-y-8 px-4">
      <AddNewSection userFullName="User" />
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full justify-center items-center overflow-y-auto 
      overflow-x-hidden scrollbar-custom gap-y-4 pb-2"
      >
        {MockedPlaces.map((place, index) => (
          <PlaceSquareCard
            key={index}
            imageUrl={place.imageUrl}
            title={place.title}
            description={place.description}
            duration={place.duration}
            type={place.type}
            pickupAvailable={place.pickupAvailable}
          />
        ))}
      </div>
    </div>
  );
}
