"use client";
import {
  InfoIcon,
  MapPin,
  Calendar1,
  Clock,
  Wallet,
  MoreVertical,
  Flag,
  UserLock,
  UserSearch,
  Pencil,
  Trash2,
  Loader2,
} from "lucide-react";
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
import ApplyToTripForm from "../users-side/forms/apply-to-trip-form";
import { formatDateOnly } from "@/utils/format-date-only";
import { useTripsControllerUpdateStatus } from "@/api/trips/hooks";
import UserAvatarComponent from "./user-avatar-component";
import TripsDetails from "./drawers/trips-details";
import { useState } from "react";
import { useGetUserRole } from "@/api/app/hooks";
import { useUserControllerGetMe } from "@/api/users/hooks";
import { useReportsControllerReportTrip } from "@/api/reports/hooks";
import { useTripsControllerRemove } from "@/api/trips/hooks";
import EditTripDialog from "./edit-trip-dialog";
import toast from "react-hot-toast";

export interface TripSquareCardProps {
  from: string;
  to: string;
  date: string;
  time: string;
  description: string;
  seatsConfirmed: number;
  seatsAvailable: number;
  ownerFullName: string;
  ownerAvatarUrl: string;
  createdAt: string;
  associatedEventName: string;
  status: "ouvert" | "complet" | "terminé" | string;
  price: number;
  tripId: string;
  hasApplied: boolean;
  vehicleBrand: string;
  vehicleModel: string;
  vehiclePlateNumber: string;
  vehicleImageUrl: string;
  ownerId: string;
  applicationsCount: number;
  escalesList: string[];
}

export default function TripSquareCard({
  from,
  to,
  date,
  time,
  description,
  seatsConfirmed,
  seatsAvailable,
  ownerFullName,
  ownerAvatarUrl,
  createdAt,
  associatedEventName,
  status,
  price,
  tripId,
  hasApplied,
  vehicleBrand,
  vehicleModel,
  vehiclePlateNumber,
  vehicleImageUrl,
  ownerId,
  applicationsCount,
  escalesList,
}: TripSquareCardProps) {
  const [openDetails, setOpenDetails] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [reportMotif, setReportMotif] = useState("");
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [markDoneOpen, setMarkDoneOpen] = useState(false);

  const { isParticipant, isAdmin } = useGetUserRole();
  const { data: me } = useUserControllerGetMe();
  const myId = me?.id ?? "";
  const sameId = (a: string, b: string) =>
    Boolean(a && b && a.trim().toLowerCase() === b.trim().toLowerCase());
  const isOwner = sameId(ownerId, myId);
  const canOwnerEdit = isOwner && applicationsCount === 0;
  const showReport = Boolean(myId) && !isAdmin && !isOwner;
  const showApply = isParticipant;

  const reportMutation = useReportsControllerReportTrip();
  const removeMutation = useTripsControllerRemove();
  const updateStatusMutation = useTripsControllerUpdateStatus();

  const tripDone =
    typeof status === "string" &&
    (status.toLowerCase() === "done" ||
      status.toLowerCase() === "terminé");
  const startDateTime = date ? new Date(date) : null;
  const canMarkDoneByDate =
    startDateTime != null &&
    !Number.isNaN(startDateTime.getTime()) &&
    startDateTime.getTime() <= Date.now();

  const submitReport = () => {
    reportMutation.mutate(
      { id: tripId, motif: reportMotif },
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

  const submitMarkDone = () => {
    updateStatusMutation.mutate(
      { id: tripId, status: "done" },
      {
        onSuccess: () => {
          toast.success("Trajet marqué comme terminé.");
          setMarkDoneOpen(false);
        },
        onError: () => {
          toast.error(
            "Impossible de marquer le trajet comme terminé (date de départ non atteinte ou droits insuffisants).",
          );
        },
      },
    );
  };

  const confirmDelete = () => {
    removeMutation.mutate(
      { id: tripId },
      {
        onSuccess: () => {
          toast.success("Trajet supprimé.");
          setDeleteOpen(false);
        },
        onError: () => {
          toast.error(
            "Suppression impossible (candidatures déjà reçues ou erreur).",
          );
        },
      },
    );
  };

  const hasMenuActions = canOwnerEdit || showReport;

  return (
    <div className="flex w-full lg:flex-1 gap-6 p-4 rounded-xl border-[0.5px] border-gray-200 bg-white relative">
      {hasMenuActions && (
      <div className="absolute top-3 right-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-8 h-8 p-0 rounded-full bg-gray-100 hover:bg-gray-200"
            >
              <MoreVertical className="w-4 h-4 text-gray-700" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {canOwnerEdit && (
              <>
                <DropdownMenuItem onClick={() => setEditOpen(true)}>
                  <Pencil className="w-4 h-4 mr-2 text-gray-700" />
                  Modifier le trajet
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-600 focus:text-red-600"
                  onClick={() => setDeleteOpen(true)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Supprimer le trajet
                </DropdownMenuItem>
              </>
            )}
            {showReport && (
              <DropdownMenuItem onClick={() => setReportOpen(true)}>
                <Flag className="w-4 h-4 mr-2 text-red-600" />
                Signaler le trajet
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      )}

      <div className="flex flex-col gap-y-2">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2889.566626521466!2d2.3522219156565656!3d48.856614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x2803d863b367d66!2sEiffel%20Tower!5e0!3m2!1sen!2sfr!4v1699999999999!5m2!1sen!2sfr"
          className="rounded-lg w-48 h-48 border"
          loading="lazy"
          title="Carte"
        />
        <div className="flex items-center gap-3 mt-4">
          <UserAvatarComponent
            fullname={ownerFullName}
            avatar={ownerAvatarUrl}
            size={40}
          />
          <div>
            <p className="font-semibold text-sm text-gray-900 flex items-center gap-1">
              {ownerFullName}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between flex-1">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 font-semibold text-gray-900 text-base">
            <MapPin className="w-4 h-4 text-gray-700" /> {from} → {to}
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Calendar1 className="w-4 h-4 text-gray-700" />{" "}
            {date ? formatDateOnly(date) : "—"}
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Clock className="w-4 h-4 text-gray-700" /> {time}
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-700">
            <UserLock className="w-4 h-4 text-gray-700" /> Sièges confirmés :
            <strong>{seatsConfirmed}</strong>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <UserSearch className="w-4 h-4 text-gray-700" /> Sièges restants :
            <strong>{seatsAvailable}</strong>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div className="flex items-center gap-2 text-sm text-orange-500 bg-orange-50 rounded-lg px-2 py-1">
              <Wallet className="w-4 h-4 text-orange-500" /> {price} FCFA /
              place
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-4 flex-wrap">
          <Button
            onClick={() => setOpenDetails(true)}
            variant="outline"
            className="mt-1 text-brand-500 flex items-center gap-2 flex-1 min-w-[140px] rounded-full bg-white hover:bg-brand-400 hover:text-white"
          >
            <InfoIcon className="w-5 h-5 " />
            <span className="font-semibold">Voir les détails</span>
          </Button>

          {isOwner && !tripDone ? (
            <Button
              type="button"
              variant="outline"
              className="mt-1 flex-1 min-w-[140px] rounded-full border-brand-500 text-brand-600 hover:bg-brand-50 disabled:opacity-50"
              disabled={!canMarkDoneByDate || updateStatusMutation.isPending}
              title={
                !canMarkDoneByDate
                  ? "Disponible après la date et l’heure de départ du trajet"
                  : undefined
              }
              onClick={() => setMarkDoneOpen(true)}
            >
              {updateStatusMutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : null}
              Marquer comme terminé
            </Button>
          ) : showApply && !isOwner ? (
            <ApplyToTripForm
              tripId={tripId}
              hasApplied={hasApplied}
              seatsAvailable={seatsAvailable}
            />
          ) : null}
          <TripsDetails
            open={openDetails}
            onOpenChange={setOpenDetails}
            from={from}
            to={to}
            date={date}
            time={time}
            description={description}
            seatsConfirmed={seatsConfirmed}
            seatsAvailable={seatsAvailable}
            excales={escalesList}
            ownerFullName={ownerFullName}
            ownerAvatarUrl={ownerAvatarUrl}
            createdAt={createdAt}
            associatedEventName={associatedEventName}
            status={status as "ouvert" | "complet" | "terminé"}
            price={price}
            tripId={tripId}
            hasApplied={hasApplied}
            vehicleBrand={vehicleBrand}
            vehicleModel={vehicleModel}
            vehiclePlateNumber={vehiclePlateNumber}
            vehicleImageUrl={vehicleImageUrl}
          />
        </div>
      </div>

      <Dialog open={markDoneOpen} onOpenChange={setMarkDoneOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Marquer ce trajet comme terminé ?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Cela indique que le voyage a bien eu lieu. Les personnes ayant
            postulé seront notifiées.
          </p>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setMarkDoneOpen(false)}>
              Non
            </Button>
            <Button
              className="bg-brand-500 hover:bg-brand-600"
              onClick={submitMarkDone}
              disabled={updateStatusMutation.isPending || !canMarkDoneByDate}
            >
              {updateStatusMutation.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Oui
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={reportOpen} onOpenChange={setReportOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Signaler ce trajet</DialogTitle>
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
              {reportMutation.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Envoyer
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Supprimer ce trajet ?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Cette action est définitive. Elle n’est possible que s’il n’y a
            aucune candidature.
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
              {removeMutation.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Supprimer
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <EditTripDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        tripId={tripId}
        initial={{
          from,
          to,
          date: date ? date.split("T")[0] : "",
          time,
          description,
          price: Number(price),
          seatsAvailable,
          escales: escalesList,
        }}
      />
    </div>
  );
}
