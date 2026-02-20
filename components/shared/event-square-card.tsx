import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Compass, MapPin, Clock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import EventDetailsSheet from "./drawers/event-details-drawer";
import { Experience } from "@/api/experiences/types";
import { formatTimestamp } from "@/utils/format-timestamp";
import { formatRelativeDate } from "@/utils/format-relative-date";
import ImageGridPreview from "./image-grid-preview";
import { useExperiencesControllerToggleLike } from "@/api/experiences/hooks";
import UserAvatarComponent from "./user-avatar-component";

export default function EventSquareCard({
  experience,
}: {
  experience: Experience;
}) {
  const { mutateAsync: toggleLike } = useExperiencesControllerToggleLike();
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
      <div className="flex flex-col relative w-full h-[500px] justify-around bg-white border-[0.5px] border-gray-200 rounded-[8px]">
        <div className="flex items-center gap-3 p-4 pb-3">
          <UserAvatarComponent
            fullname={owner.fullName}
            avatar={owner.avatarUrl}
            size={40}
          />

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
        <div className="w-[95%] h-[300px] mx-auto  flex gap-2 rounded-[12px] overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
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
          <div className="flex border-t border-gray-200 py-1 -mx-4 mt-auto">
            <button
              onClick={() => toggleLike({ id: event.id })}
              className="cursor-pointer flex-1 hover:text-brand-500 text-gray-600 font-medium h-10 flex items-center justify-center gap-2"
            >
              <Heart className="w-5 h-5" />
              <span className="hidden lg:flex">Intéressés</span>
              <span className="text-gray-500 text-sm">({stats.likes})</span>
            </button>

            <button
              onClick={() => setIsDetailsDrawerOpen(true)}
              className="cursor-pointer flex-1 hover:text-brand-500 text-gray-600 font-medium h-10 flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="hidden lg:flex">Commentaires</span>
              <span className="text-gray-500 text-sm">({stats.comments})</span>
            </button>

            <button
              onClick={() => setIsDetailsDrawerOpen(true)}
              className="cursor-pointer flex-1 hover:text-brand-500 text-gray-600 font-medium h-10 flex items-center justify-center gap-2"
            >
              <Compass className="w-5 h-5" />
              <span className="hidden lg:flex">Trajets</span>
              <span className="text-gray-500 text-sm">({stats.trips})</span>
            </button>
          </div>
        </div>
      </div>

      <EventDetailsSheet
        experienceId={experience.id}
        eventTitle={experience.title}
        open={isDetailsDrawerOpen}
        onOpenChange={setIsDetailsDrawerOpen}
      />
    </>
  );
}
