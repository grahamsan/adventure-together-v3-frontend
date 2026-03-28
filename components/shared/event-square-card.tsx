"use client";

import { useState } from "react";
import {
  Heart,
  MessageCircle,
  Compass,
  MapPin,
  Clock,
  MoreVertical,
  Flag,
  Pencil,
  Trash2,
  Loader2,
} from "lucide-react";
import EventDetailsSheet from "./drawers/event-details-drawer";
import { Experience } from "@/api/experiences/types";
import { formatTimestamp } from "@/utils/format-timestamp";
import { formatRelativeDate } from "@/utils/format-relative-date";
import {
  useExperiencesControllerToggleLike,
  useExperiencesControllerRemove,
} from "@/api/experiences/hooks";
import { useReportsControllerReportExperience } from "@/api/reports/hooks";
import { useUserControllerGetMe } from "@/api/users/hooks";
import { useGetUserRole } from "@/api/app/hooks";
import UserAvatarComponent from "./user-avatar-component";
import EventsTripsDrawer from "./drawers/events-trips-drawer";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import EditExperienceDialog from "./edit-experience-dialog";
import toast from "react-hot-toast";

export default function EventSquareCard({
  experience,
}: {
  experience: Experience;
}) {
  const { mutateAsync: toggleLike } = useExperiencesControllerToggleLike();
  const [isDetailsDrawerOpen, setIsDetailsDrawerOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [isTripsDrawerOpen, setIsTripsDrawerOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [reportMotif, setReportMotif] = useState("");
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const { data: me } = useUserControllerGetMe();
  const { isAdmin } = useGetUserRole();
  const removeMutation = useExperiencesControllerRemove();
  const reportMutation = useReportsControllerReportExperience();

  const { owner, stats, ...event } = experience;

  const myId = me?.id ?? "";
  const sameId = (a: string, b: string) =>
    Boolean(a && b && a.trim().toLowerCase() === b.trim().toLowerCase());
  const isOwner = owner.id ? sameId(owner.id, myId) : false;
  const showReport = Boolean(myId) && !isAdmin && !isOwner;

  const truncatedDescription =
    event.description.length > 150
      ? event.description.slice(0, 150) + "..."
      : event.description;

  const hasLongDescription = event.description.length > 150;

  const hasMenuActions = isOwner || showReport;

  const submitReport = () => {
    reportMutation.mutate(
      { id: event.id, motif: reportMotif },
      {
        onSuccess: () => {
          toast.success("Signalement envoyé.");
          setReportOpen(false);
          setReportMotif("");
        },
        onError: () => {
          toast.error("Impossible d’envoyer le signalement.");
        },
      },
    );
  };

  const confirmDelete = () => {
    removeMutation.mutate(event.id, {
      onSuccess: () => {
        toast.success("Événement supprimé.");
        setDeleteOpen(false);
      },
      onError: () => {
        toast.error("Impossible de supprimer cet événement.");
      },
    });
  };

  return (
    <>
      <div className="flex flex-col relative w-full h-[500px] justify-around bg-white border-[0.5px] border-gray-200 rounded-[8px]">
        {hasMenuActions && (
          <div className="absolute top-3 right-3 z-10">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  className="h-9 w-9 p-0 rounded-full bg-white/90 shadow-sm border border-gray-200 hover:bg-gray-50"
                  aria-label="Menu événement"
                >
                  <MoreVertical className="h-4 w-4 text-gray-700" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {isOwner && (
                  <>
                    <DropdownMenuItem onClick={() => setEditOpen(true)}>
                      <Pencil className="w-4 h-4 mr-2 text-gray-700" />
                      Modifier
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600 focus:text-red-600"
                      onClick={() => setDeleteOpen(true)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Supprimer
                    </DropdownMenuItem>
                  </>
                )}
                {showReport && (
                  <DropdownMenuItem onClick={() => setReportOpen(true)}>
                    <Flag className="w-4 h-4 mr-2 text-red-600" />
                    Signaler
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

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
                type="button"
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
              type="button"
              onClick={() => toggleLike({ id: event.id })}
              className="cursor-pointer flex-1 hover:text-brand-500 text-gray-600 font-medium h-10 flex items-center justify-center gap-2"
            >
              <Heart className="w-5 h-5" />
              <span className="hidden lg:flex">Intéressés</span>
              <span className="text-gray-500 text-sm">({stats.likes})</span>
            </button>

            <button
              type="button"
              onClick={() => setIsDetailsDrawerOpen(true)}
              className="cursor-pointer flex-1 hover:text-brand-500 text-gray-600 font-medium h-10 flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="hidden lg:flex">Commentaires</span>
              <span className="text-gray-500 text-sm">({stats.comments})</span>
            </button>

            <button
              type="button"
              onClick={() => setIsTripsDrawerOpen(true)}
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

      <EventsTripsDrawer
        open={isTripsDrawerOpen}
        onOpenChange={setIsTripsDrawerOpen}
        experienceId={experience.id}
        eventTitle={experience.title}
        eventLocation={experience.location}
        eventDateIso={experience.date}
      />

      <EditExperienceDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        experience={experience}
      />

      <Dialog open={reportOpen} onOpenChange={setReportOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Signaler cet événement</DialogTitle>
          </DialogHeader>
          <Textarea
            placeholder="Décrivez le motif du signalement (optionnel)"
            value={reportMotif}
            onChange={(e) => setReportMotif(e.target.value)}
            className="min-h-24"
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setReportOpen(false)}>
              Annuler
            </Button>
            <Button
              onClick={submitReport}
              disabled={reportMutation.isPending}
              className="bg-red-600 hover:bg-red-700"
            >
              {reportMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Envoyer"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Supprimer cet événement ?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Cette action est définitive.
          </p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setDeleteOpen(false)}>
              Annuler
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={removeMutation.isPending}
            >
              {removeMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Supprimer"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
