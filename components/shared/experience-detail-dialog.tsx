"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Experience } from "@/api/experiences/types";
import { formatTimestamp } from "@/utils/format-timestamp";
import { formatRelativeDate } from "@/utils/format-relative-date";
import { MapPin, Clock, Heart, MessageCircle, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import UserAvatarComponent from "./user-avatar-component";
import { useExperiencesControllerToggleLike } from "@/api/experiences/hooks";
import { ExperienceCommentsPanel } from "./experience-comments-panel";
import { ExperienceTripsPanel } from "./experience-trips-panel";

export default function ExperienceDetailDialog({
  experience,
  open,
  onOpenChange,
}: {
  experience: Experience | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { mutateAsync: toggleLike } = useExperiencesControllerToggleLike();

  if (!experience) return null;

  const { owner, stats, ...event } = experience;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton
        className="flex max-h-[92vh] max-w-2xl flex-col gap-0 overflow-hidden p-0"
      >
        <DialogHeader className="shrink-0 border-b border-gray-100 px-4 py-3 pr-12 text-left">
          <DialogTitle className="line-clamp-2 text-lg font-semibold leading-snug">
            {event.title}
          </DialogTitle>
        </DialogHeader>

        <Tabs
          key={experience.id}
          defaultValue="info"
          className="flex min-h-0 flex-1 flex-col gap-0"
        >
          <TabsList className="mx-4 mt-1 grid h-auto w-auto shrink-0 grid-cols-3 gap-1 rounded-lg bg-muted p-1">
            <TabsTrigger value="info" className="text-xs sm:text-sm">
              Informations
            </TabsTrigger>
            <TabsTrigger value="comments" className="text-xs sm:text-sm">
              Commentaires
            </TabsTrigger>
            <TabsTrigger value="trips" className="text-xs sm:text-sm">
              Trajets
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="info"
            className="mt-0 min-h-0 flex-1 overflow-y-auto px-4 pb-4 data-[state=inactive]:hidden"
          >
            <div className="space-y-4 pt-2">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={event.image || "/images/hills-1.jpg"}
                  alt=""
                  className="size-full object-cover"
                />
              </div>

              <div className="flex items-center gap-3">
                <UserAvatarComponent
                  fullname={owner.fullName}
                  avatar={owner.avatarUrl}
                  size={44}
                />
                <div>
                  <p className="font-semibold text-gray-900">{owner.fullName}</p>
                  <p className="text-xs text-gray-500">
                    {formatTimestamp(event.date)}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                <span className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-2 py-1">
                  <MapPin className="h-4 w-4" />
                  {event.location}
                </span>
                <span className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-2 py-1">
                  <Clock className="h-4 w-4" />
                  {formatRelativeDate(new Date(event.date))}
                </span>
              </div>

              <p className="whitespace-pre-wrap text-[15px] leading-relaxed text-gray-800">
                {event.description}
              </p>

              <div className="flex flex-wrap gap-2 border-t border-gray-100 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="gap-2"
                  onClick={() => toggleLike({ id: event.id })}
                >
                  <Heart className="h-4 w-4" />
                  Intéressé ({stats.likes})
                </Button>
                <span className="inline-flex items-center gap-1 rounded-md border px-3 py-2 text-sm text-gray-600">
                  <MessageCircle className="h-4 w-4" />
                  {stats.comments} commentaire(s)
                </span>
                <span className="inline-flex items-center gap-1 rounded-md border px-3 py-2 text-sm text-gray-600">
                  <Compass className="h-4 w-4" />
                  {stats.trips} trajet(s)
                </span>
              </div>
            </div>
          </TabsContent>

          <TabsContent
            value="comments"
            className="mt-0 min-h-0 flex-1 overflow-hidden data-[state=inactive]:hidden"
          >
            <ExperienceCommentsPanel
              experienceId={experience.id}
              eventTitle={event.title}
              embedded
              className="max-h-[min(65vh,520px)]"
            />
          </TabsContent>

          <TabsContent
            value="trips"
            className="mt-0 min-h-0 flex-1 overflow-hidden data-[state=inactive]:hidden"
          >
            <ExperienceTripsPanel
              experienceId={experience.id}
              eventTitle={event.title}
              eventLocation={event.location}
              eventDateIso={event.date}
              showSheetStyleHeader={false}
              embedded
              className="px-4 pb-4"
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
