import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Compass, MapPin, Clock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import EventDetailsDrawer from "./drawers/event-details-drawer";
import { Experience } from "@/api/experiences/types";
import { formatTimestamp } from "@/utils/format-timestamp";
import { formatRelativeDate } from "@/utils/format-relative-date";
import ImageGridPreview from "./image-grid-preview";

export default function EventSquareCard({
  experience,
}: {
  experience: Experience;
}) {
  const [isDetailsDrawerOpen, setIsDetailsDrawerOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const { owner, stats, ...event } = experience;

  const truncatedDescription =
    event.description.length > 150
      ? event.description.slice(0, 150) + "..."
      : event.description;

  const hasLongDescription = event.description.length > 150;

  return (
    <>
      <div className="w-full lg:w-auto lg:max-w-[40vw] h-auto bg-white border-[0.5px] border-gray-200 rounded-[18px]">
        {/* HEADER */}
        <div className="flex items-center gap-3 p-4 pb-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={owner.avatarUrl} />
            <AvatarFallback>{owner.fullName[0]}</AvatarFallback>
          </Avatar>

          <div>
            <p className="font-semibold text-sm text-gray-900">
              {owner.fullName}
            </p>
            <p className="text-xs text-gray-500">
              {formatTimestamp(event.date)}
            </p>
          </div>
        </div>

        {/* IMAGES */}
        <div className="w-[95%] mx-auto  flex gap-2 rounded-[12px] overflow-hidden">
          <ImageGridPreview images={[event.image]} />
        </div>

        {/* CONTENT */}
        <div className="p-4 space-y-3">
          {/* TITRE + BADGES LIEU/HEURE */}
          <div className="space-y-1">
            <h2 className="text-gray-900 font-bold text-[22px] leading-snug">
              {event.title}
            </h2>
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-700">
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-gray-100">
                <MapPin className="w-4 h-4 text-gray-600" />
                <span className="font-medium">{event.location}</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-gray-100">
                <Clock className="w-4 h-4 text-gray-600" />
                <span className="font-medium">
                  {formatRelativeDate(new Date(event.date))}
                </span>
              </span>
            </div>
          </div>

          {/* DESCRIPTION + VOIR PLUS */}
          <div className="text-gray-700 text-[15px] leading-relaxed">
            {expanded ? event.description : truncatedDescription}

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
              <span className="text-gray-500 text-sm">({stats.interests})</span>
            </Button>

            <Button
              variant="ghost"
              onClick={() => setIsDetailsDrawerOpen(true)}
              className="flex-1 rounded-none hover:bg-gray-100 text-gray-600 font-medium h-10 flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Commentaires</span>
              <span className="text-gray-500 text-sm">({stats.comments})</span>
            </Button>

            <Button
              variant="ghost"
              className="flex-1 rounded-none hover:bg-gray-100 text-gray-600 font-medium h-10 flex items-center justify-center gap-2"
            >
              <Compass className="w-5 h-5" />
              <span>Trajets</span>
              <span className="text-gray-500 text-sm">({stats.trips})</span>
            </Button>
          </div>
        </div>
      </div>

      {/* DRAWER */}
      <EventDetailsDrawer
      experienceId={experience.id}
      eventTitle={experience.title}
      open={isDetailsDrawerOpen}
      onOpenChange={setIsDetailsDrawerOpen}
      />
    </>
  );
}
