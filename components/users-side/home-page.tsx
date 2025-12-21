"use client";
import EventSquareCard from "../shared/event-square-card";
import { mockedEvents } from "@/utils/mock-events";
import RightSideSection from "./right-side-section";
import LeftSideSection from "./left-side-section";
import AddNewSection from "./layouts/add-new-section";

export default function HomePage() {
  return (
    <div className="flex w-full justify-between min-h-screen">
      <LeftSideSection
        userRole="admin"
        userAvatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        userFullName="John Doe"
      />
      <div className="flex max-w-[50vw] justify-center items-center flex-col gap-y-2 pb-2">
        <AddNewSection userFullName="John Doe" />
        {mockedEvents.map((event, index) => (
          <EventSquareCard
            key={index}
            ownerFullName={event.ownerFullName}
            ownerAvatarUrl={event.ownerAvatarUrl}
            eventTitle={event.eventTitle}
            eventDescription={event.eventDescription}
            eventDate={event.eventDate}
            eventLocation={event.eventLocation}
            eventImage={event.eventImage}
            eventParticipants={event.eventParticipants}
            createdAt={event.createdAt}
            interestsCount={124}
            commentsCount={24}
            tripsCount={12}
          />
        ))}
      </div>
      <RightSideSection />
    </div>
  );
}
