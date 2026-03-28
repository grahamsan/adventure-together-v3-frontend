"use client";

import { Experience } from "@/api/experiences/types";
import { formatTimestamp } from "@/utils/format-timestamp";
import { formatRelativeDate } from "@/utils/format-relative-date";
import { MapPin, Clock, Heart, MessageCircle, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EventMiniCard({
  experience,
  onLearnMore,
}: {
  experience: Experience;
  onLearnMore: () => void;
}) {
  const { owner, stats, ...event } = experience;

  return (
    <div className="flex gap-3 overflow-hidden rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
      <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-lg bg-gray-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={event.image || "/images/hills-1.jpg"}
          alt=""
          className="size-full object-cover"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-between gap-2">
        <div>
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-gray-900">
            {event.title}
          </h3>
          <p className="mt-0.5 line-clamp-1 text-xs text-gray-500">
            Par {owner.fullName}
          </p>
          <div className="mt-1 flex flex-wrap gap-1.5 text-[11px] text-gray-600">
            <span className="inline-flex items-center gap-0.5">
              <MapPin className="h-3 w-3 shrink-0" />
              <span className="truncate">{event.location}</span>
            </span>
            <span className="inline-flex items-center gap-0.5">
              <Clock className="h-3 w-3 shrink-0" />
              {formatRelativeDate(new Date(event.date))}
            </span>
          </div>
          <p className="mt-1 text-[10px] text-gray-400">
            {formatTimestamp(event.date)}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-[10px] text-gray-500">
          <span className="inline-flex items-center gap-0.5">
            <Heart className="h-3 w-3" aria-hidden />
            {stats.likes}
          </span>
          <span className="inline-flex items-center gap-0.5">
            <MessageCircle className="h-3 w-3" aria-hidden />
            {stats.comments}
          </span>
          <span className="inline-flex items-center gap-0.5">
            <Compass className="h-3 w-3" aria-hidden />
            {stats.trips}
          </span>
        </div>
        <Button
          type="button"
          size="sm"
          className="h-8 w-full bg-brand-500 text-xs text-white hover:bg-brand-600"
          onClick={onLearnMore}
        >
          En savoir plus
        </Button>
      </div>
    </div>
  );
}
