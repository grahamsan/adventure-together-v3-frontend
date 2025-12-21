"use client";

import { mockedTrips } from "@/utils/mock-trips";
import TripSquareCard from "../shared/trip-square-card";
import LeftSideSection from "./left-side-section";
import AddNewSection from "./layouts/add-new-section";
import RightSideSection from "./right-side-section";

export default function TripPage() {
  return (
    <div className="flex w-full justify-between min-h-screen">
      <LeftSideSection
        userRole="admin"
        userAvatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        userFullName="John Doe"
      />
      <div className="flex max-w-[50vw] justify-center items-center flex-col gap-y-2 pb-2">
        <AddNewSection userFullName="John Doe" />
        {mockedTrips.map((trip, index) => (
          <TripSquareCard
            key={index}
            from={trip.from}
            to={trip.to}
            date={trip.date}
            time={trip.time}
            description={trip.description}
            seatsConfirmed={trip.seatsConfirmed}
            seatsAvailable={trip.seatsAvailable}
            excales={trip.excales}
            ownerFullName={trip.ownerFullName}
            ownerAvatarUrl={trip.ownerAvatarUrl}
            createdAt={trip.createdAt}
            associatedEventName={trip.associatedEventName}
            status={trip.status}
            price={trip.price}
          />
        ))}
      </div>
      <RightSideSection />
    </div>
  );
}
