import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Heart,
  MessageCircle,
  Compass,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import EventDetailsDrawer from "./drawers/event-details-drawer";

export interface EventSquareCardProps {
  ownerFullName: string;
  ownerAvatarUrl: string;
  eventTitle: string;
  eventDescription: string;
  eventDate: string;
  eventLocation: string;
  eventImage: string;
  eventParticipants: string[];
  createdAt: string;
  interestsCount: number;
  commentsCount: number;
  tripsCount: number;
}

export default function EventSquareCard({
  ownerFullName,
  ownerAvatarUrl,
  eventTitle,
  eventDescription,
  eventDate,
  eventLocation,
  eventImage,
  eventParticipants,
  createdAt,
  interestsCount,
  commentsCount,
  tripsCount,
}: EventSquareCardProps) {
  const [isDetailsDrawerOpen, setIsDetailsDrawerOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const truncatedDescription =
    eventDescription.length > 150
      ? eventDescription.slice(0, 150) + "..."
      : eventDescription;

  const hasLongDescription = eventDescription.length > 150;

  return (
    <>
      <div className="w-full lg:w-auto lg:max-w-[40vw] h-auto bg-white border-[0.5px] border-gray-200 rounded-[18px]">
        
        {/* HEADER */}
        <div className="flex items-center gap-3 p-4 pb-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={ownerAvatarUrl} />
            <AvatarFallback>{ownerFullName[0]}</AvatarFallback>
          </Avatar>

          <div>
            <p className="font-semibold text-sm text-gray-900">
              {ownerFullName}
            </p>
            <p className="text-xs text-gray-500">{createdAt}</p>
          </div>
        </div>

        {/* IMAGES */}
        <div className="w-[95%] mx-auto h-[260px] flex gap-2 rounded-[12px] overflow-hidden">
          <div className="flex-1 relative rounded-[12px] overflow-hidden">
            <img
              src={eventImage}
              alt={eventTitle}
              width={500}
              height={500}
              className="object-cover"
            />
          </div>

          <div className="w-[35%] flex flex-col gap-2">
            <div className="relative flex-1 rounded-[12px] overflow-hidden">
              <img
                src={eventImage}
                alt="Sub 1"
                width={500}
                height={500}
                className="object-cover"
              />
            </div>

            <div className="relative flex-1 rounded-[12px] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
                alt="Sub 2"
                width={500}
                height={500}
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-4 space-y-3">

          {/* TITRE + LOCALISATION + DATE */}
          <h2 className="text-gray-900 font-bold text-[22px] leading-snug">
            {eventTitle}
            <span className="text-sm text-gray-600 font-normal">
              {" "}
              — {eventLocation}, {eventDate}
            </span>
          </h2>

          {/* DESCRIPTION + VOIR PLUS */}
          <div className="text-gray-700 text-[15px] leading-relaxed">
            {expanded ? eventDescription : truncatedDescription}

            {hasLongDescription && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-blue-600 text-sm font-medium ml-1 hover:underline"
              >
                {expanded ? "Voir moins" : "Voir plus"}
              </button>
            )}
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex border-t border-gray-200 py-1 -mx-4">
            <Button
              variant="ghost"
              className="flex-1 rounded-none hover:bg-gray-100 text-gray-600 font-medium h-10 flex items-center justify-center gap-2"
            >
              <Heart className="w-5 h-5" />
              <span>Intéressés</span>
              <span className="text-gray-500 text-sm">({interestsCount})</span>
            </Button>

            <Button
              variant="ghost"
              onClick={() => setIsDetailsDrawerOpen(true)}
              className="flex-1 rounded-none hover:bg-gray-100 text-gray-600 font-medium h-10 flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Commentaires</span>
              <span className="text-gray-500 text-sm">({commentsCount})</span>
            </Button>

            <Button
              variant="ghost"
              className="flex-1 rounded-none hover:bg-gray-100 text-gray-600 font-medium h-10 flex items-center justify-center gap-2"
            >
              <Compass className="w-5 h-5" />
              <span>Trajets</span>
              <span className="text-gray-500 text-sm">({tripsCount})</span>
            </Button>
          </div>
        </div>
      </div>

      {/* DRAWER */}
      <EventDetailsDrawer
        open={isDetailsDrawerOpen}
        onOpenChange={setIsDetailsDrawerOpen}
        ownerFullName={ownerFullName}
        ownerAvatarUrl={ownerAvatarUrl}
        eventTitle={eventTitle}
        eventDescription={eventDescription}
        eventDate={eventDate}
        eventLocation={eventLocation}
        eventImage={eventImage}
        eventParticipants={eventParticipants}
        createdAt={createdAt}
      />
    </>
  );
}
