"use client";

import * as React from "react";
import Image from "next/image";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown } from "lucide-react";

// ---------------- MOCK COMMENTS ----------------

const MOCK_COMMENTS = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  author: {
    fullName: `Utilisateur ${i + 1}`,
    avatar: `https://api.dicebear.com/7.x/initials/png?seed=User${i + 1}`,
  },
  content: "Super événement ! Hâte d’y participer 😄",
  likes: Math.floor(Math.random() * 15),
  dislikes: Math.floor(Math.random() * 5),
}));

// ---------------- TYPES ----------------

interface EventDetailsDrawerProps {
  ownerFullName: string;
  ownerAvatarUrl: string;
  eventTitle: string;
  eventDescription: string;
  eventDate: string;
  eventLocation: string;
  eventImage: string;
  eventParticipants: string[];
  createdAt: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// ---------------- COMPONENT ----------------

export default function EventDetailsDrawer({
  ownerFullName,
  ownerAvatarUrl,
  eventTitle,
  eventDescription,
  eventDate,
  eventLocation,
  eventImage,
  eventParticipants,
  createdAt,
  open,
  onOpenChange,
}: EventDetailsDrawerProps) {
  // Participation locale
  const [isParticipating, setIsParticipating] = React.useState(false);

  // Comments state
  const [comments, setComments] = React.useState(MOCK_COMMENTS.slice(0, 5));
  const [hasMore, setHasMore] = React.useState(true);

  const commentsRef = React.useRef<HTMLDivElement | null>(null);

  // Load more when scrolling
  const handleScroll = () => {
    const div = commentsRef.current;
    if (!div || !hasMore) return;

    const bottomReached =
      div.scrollHeight - div.scrollTop - div.clientHeight < 80;

    if (bottomReached) {
      setTimeout(() => {
        setComments((prev) => {
          const nextChunk = MOCK_COMMENTS.slice(prev.length, prev.length + 5);
          if (nextChunk.length < 5) setHasMore(false);
          return [...prev, ...nextChunk];
        });
      }, 300);
    }
  };

  // Like / Dislike interactions
  const handleReact = (id: number, type: "like" | "dislike") => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              likes: c.likes + (type === "like" ? 1 : 0),
              dislikes: c.dislikes + (type === "dislike" ? 1 : 0),
            }
          : c
      )
    );
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="p-0 h-[90vh] overflow-hidden">
        <DrawerHeader className="border-b">
          <DrawerTitle className="text-xl">{eventTitle}</DrawerTitle>
        </DrawerHeader>

        <div className="p-4 space-y-6">
          <Tabs defaultValue="infos" className="flex justify-center ">
            <TabsList className="grid grid-cols-2 rounded-full bg-muted">
              <TabsTrigger value="infos" className="rounded-full">
                Infos
              </TabsTrigger>
              <TabsTrigger value="comments" className="rounded-full">
                Commentaires
              </TabsTrigger>
            </TabsList>

            <TabsContent value="infos" className="flex space-x-5 pt-4">
              <div className="w-[35%] h-[260px] flex gap-2 rounded-[12px] overflow-hidden">
                {/* Image principale gauche */}
                <div className="flex-1 relative rounded-[12px] overflow-hidden">
                  <img
                    src={eventImage}
                    alt="Event Image Main"
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
              <div className="w-[65%] space-y-4">
                {/* Location and Date */}
                <div className="flex gap-6">
                  <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="[var(--BRAND-500)]"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span className="text-sm font-medium text-gray-700">
                      {eventLocation}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="[var(--BRAND-500)]"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                      <line x1="16" x2="16" y1="2" y2="6" />
                      <line x1="8" x2="8" y1="2" y2="6" />
                      <line x1="3" x2="21" y1="10" y2="10" />
                    </svg>
                    <span className="text-sm font-medium text-gray-700">
                      {eventDate}
                    </span>
                  </div>
                </div>

                {/* Participants count */}
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg w-fit">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="[var(--BRAND-500)]"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">
                    {eventParticipants.length} / 8 participants
                  </span>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900">Description</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {eventDescription}
                  </p>
                </div>

                {/* Organisateur */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900">Organisateur</h3>
                  <div className="flex items-center gap-3">
                    <Avatar className="size-12">
                      <AvatarImage src={ownerAvatarUrl} />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-gray-900">
                        {ownerFullName}
                      </p>
                      <button className="text-sm text-[[var(--BRAND-500)]] hover:underline">
                        Voir le profil
                      </button>
                    </div>
                  </div>
                </div>

                {/* Participants */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900">
                    Participants ({eventParticipants.length})
                  </h3>
                  <div className="flex -space-x-2">
                    {eventParticipants.map((p, i) => (
                      <Avatar key={i} className="size-10 border-2 border-white">
                        <AvatarImage src={p} />
                        <AvatarFallback>P</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                  <Button
                    className="flex-1 bg-[[var(--BRAND-500)]] hover:bg-[#3d8fd9] text-white rounded-full"
                    onClick={() => setIsParticipating(!isParticipating)}
                  >
                    {isParticipating
                      ? "Annuler la réservation"
                      : "Réserver l'expérience"}
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-[[var(--BRAND-500)]] text-[[var(--BRAND-500)]] hover:bg-blue-50 rounded-full"
                  >
                    Voir les trajets associés
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* ----------------- COMMENTS ------------------- */}
            <TabsContent value="comments" className="pt-4">
              <div
                ref={commentsRef}
                onScroll={handleScroll}
                className="max-h-64 overflow-y-auto pr-2 space-y-4"
              >
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="p-3 rounded-xl bg-gray-100/60"
                  >
                    <div className="flex gap-3 items-start">
                      <Avatar>
                        <AvatarImage src={comment.author.avatar} />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>

                      <div className="w-full">
                        <p className="font-medium">{comment.author.fullName}</p>
                        <p className="text-sm text-muted-foreground">
                          {comment.content}
                        </p>

                        {/* reactions */}
                        <div className="flex gap-4 mt-2">
                          <button
                            className="flex items-center gap-1 text-sm text-gray-600"
                            onClick={() => handleReact(comment.id, "like")}
                          >
                            <ThumbsUp className="size-4" />
                            {comment.likes}
                          </button>

                          <button
                            className="flex items-center gap-1 text-sm text-gray-600"
                            onClick={() => handleReact(comment.id, "dislike")}
                          >
                            <ThumbsDown className="size-4" />
                            {comment.dislikes}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {hasMore && (
                  <p className="text-center py-2 text-sm text-muted-foreground">
                    Chargement...
                  </p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
