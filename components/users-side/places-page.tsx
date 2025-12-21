"use client";

import LeftSideSection from "./left-side-section";
import AddNewSection from "./layouts/add-new-section";
import RightSideSection from "./right-side-section";
import PlaceSquareCard from "../shared/place-square-card";
import { MockedPlaces } from "../../utils/mock-places";

export default function PlacesPage() {
  return (
    <div className="flex w-full justify-between min-h-screen">
      <LeftSideSection
        userRole="admin"
        userAvatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        userFullName="John Doe"
      />
      <div className="flex max-w-[50vw] justify-center items-center flex-col gap-y-4 pb-2">
        <AddNewSection userFullName="John Doe" />
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
      <RightSideSection />
    </div>
  );
}
