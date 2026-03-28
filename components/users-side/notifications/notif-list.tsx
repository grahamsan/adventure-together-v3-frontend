"use client";

import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { NotificationFilters } from "@/features/notifications/types";
import {
  useNotificationsControllerFindAll,
  useNotificationsControllerMarkAsRead,
  useNotificationsControllerMarkAllAsRead,
} from "@/api/notifications/hooks";
import { useTripsControllerAcknowledgeTripCompletion } from "@/api/trips/hooks";
import { useReportsControllerReportTrip } from "@/api/reports/hooks";
import { queryKeys } from "@/lib/query-keys";
import { NotificationItem } from "./notif-item";
import { NotificationEmptyState } from "./empty-state";

interface NotificationListProps {
  filters: NotificationFilters;
}

export function NotificationList({ filters }: NotificationListProps) {
  const queryClient = useQueryClient();
  const [reportTripId, setReportTripId] = useState<string | null>(null);
  const [reportMotif, setReportMotif] = useState("");

  const { data, isLoading, isError, refetch } =
    useNotificationsControllerFindAll({ page: 1, limit: 100 });
  const markAsReadMutation = useNotificationsControllerMarkAsRead();
  const markAllAsReadMutation = useNotificationsControllerMarkAllAsRead();
  const ackMutation = useTripsControllerAcknowledgeTripCompletion();
  const reportMutation = useReportsControllerReportTrip();

  const notifications = data?.data ?? [];

  const filteredNotifications = useMemo(() => {
    return notifications.filter((notification) => {
      if (filters.type && notification.type !== filters.type) {
        return false;
      }

      if (
        filters.experience &&
        !`${notification.title} ${notification.description ?? ""}`
          .toLowerCase()
          .includes(filters.experience.toLowerCase())
      ) {
        return false;
      }

      if (filters.trip) {
        const q = filters.trip.trim().toLowerCase();
        const inMeta =
          notification.meta?.tripId &&
          notification.meta.tripId.toLowerCase().includes(q);
        const inText = `${notification.title} ${notification.description ?? ""}`
          .toLowerCase()
          .includes(q);
        if (!inMeta && !inText) return false;
      }

      return true;
    });
  }, [notifications, filters]);

  const unreadCount = filteredNotifications.filter((n) => !n.isRead).length;

  const handleMarkAsRead = (id: string) => {
    markAsReadMutation.mutate(id, {
      onError: () => {
        toast.error("Impossible de marquer comme lu.");
      },
    });
  };

  const handleMarkAllAsRead = () => {
    markAllAsReadMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Toutes les notifications sont marquées comme lues.");
      },
      onError: () => {
        toast.error("Impossible de tout marquer comme lu.");
      },
    });
  };

  const confirmTripDone = (tripId: string) => {
    ackMutation.mutate(tripId, {
      onSuccess: () => {
        toast.success("Merci, votre confirmation a bien été enregistrée.");
      },
      onError: () => {
        toast.error("Impossible d’enregistrer la confirmation.");
      },
    });
  };

  const submitReport = () => {
    if (!reportTripId) return;
    reportMutation.mutate(
      { id: reportTripId, motif: reportMotif },
      {
        onSuccess: () => {
          toast.success("Signalement envoyé.");
          setReportTripId(null);
          setReportMotif("");
          queryClient.invalidateQueries({
            queryKey: queryKeys.notifications.all,
          });
        },
        onError: () => {
          toast.error("Impossible d’envoyer le signalement.");
        },
      },
    );
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-3 p-6 text-center text-gray-600">
        <p>Impossible de charger les notifications.</p>
        <Button variant="outline" size="sm" onClick={() => refetch()}>
          Réessayer
        </Button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-50 max-h-screen overflow-hidden">
      <div className="bg-white border-b px-6 py-4 flex items-center justify-between flex-shrink-0">
        <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
        {unreadCount > 0 && (
          <button
            type="button"
            onClick={handleMarkAllAsRead}
            disabled={markAllAsReadMutation.isPending}
            className="text-blue-500 text-sm font-medium hover:text-blue-600 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {markAllAsReadMutation.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Check className="w-4 h-4" />
            )}
            Tout marquer comme lu
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 pb-25 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {filteredNotifications.length === 0 ? (
          <NotificationEmptyState />
        ) : (
          <div className="p-6 space-y-3">
            {filteredNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onClick={() => {
                  if (!notification.isRead) {
                    handleMarkAsRead(notification.id);
                  }
                }}
                onConfirmTripDone={confirmTripDone}
                onOpenReport={setReportTripId}
                isAckPendingForTrip={
                  ackMutation.isPending &&
                  ackMutation.variables === notification.meta?.tripId
                }
              />
            ))}
          </div>
        )}
      </div>

      <Dialog
        open={Boolean(reportTripId)}
        onOpenChange={(open) => {
          if (!open) {
            setReportTripId(null);
            setReportMotif("");
          }
        }}
      >
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
            <Button variant="outline" onClick={() => setReportTripId(null)}>
              Annuler
            </Button>
            <Button
              onClick={submitReport}
              disabled={reportMutation.isPending}
              className="bg-red-600 hover:bg-red-700"
            >
              {reportMutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Envoyer"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
