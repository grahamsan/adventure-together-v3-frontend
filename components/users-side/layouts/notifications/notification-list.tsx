"use client";

import React, { useMemo, useState } from "react";
import {
  Search,
  Bell,
  MapPin,
  Users,
  CheckCheck,
  MessageSquare,
  AlertCircle,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { formatTimestamp } from "@/utils/format-timestamp";
import {
  useNotificationsControllerFindAll,
  useNotificationsControllerMarkAsRead,
  useNotificationsControllerMarkAllAsRead,
} from "@/api/notifications/hooks";
import { useTripsControllerAcknowledgeTripCompletion } from "@/api/trips/hooks";
import { useReportsControllerReportTrip } from "@/api/reports/hooks";
import type { NotificationDto } from "@/api/notifications/types";
import { queryKeys } from "@/lib/query-keys";
import { cn } from "@/lib/utils";

type DisplayType =
  | "join"
  | "message"
  | "update"
  | "reminder"
  | "cancellation";

function mapToDisplayType(n: NotificationDto): DisplayType {
  if (n.meta?.kind === "trip_marked_done") return "update";
  if (n.type === "message") return "message";
  if (n.type === "reminder") return "reminder";
  if (n.type === "trip") return "join";
  return "update";
}

const getNotificationIcon = (type: DisplayType) => {
  const iconClass = "w-5 h-5";
  switch (type) {
    case "join":
      return <Users className={iconClass} />;
    case "message":
      return <MessageSquare className={iconClass} />;
    case "update":
      return <MapPin className={iconClass} />;
    case "reminder":
      return <Bell className={iconClass} />;
    case "cancellation":
      return <AlertCircle className={iconClass} />;
    default:
      return <Bell className={iconClass} />;
  }
};

const getNotificationColor = (type: DisplayType) => {
  switch (type) {
    case "join":
      return "bg-green-100 text-green-600";
    case "message":
      return "bg-blue-100 text-blue-600";
    case "update":
      return "bg-orange-100 text-orange-600";
    case "reminder":
      return "bg-purple-100 text-purple-600";
    case "cancellation":
      return "bg-red-100 text-red-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

const HighlightedText = ({
  text,
  search,
}: {
  text: string;
  search: string;
}) => {
  if (!search.trim()) return <span>{text}</span>;

  const regex = new RegExp(
    `(${search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
    "gi",
  );
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-yellow-300 text-gray-900 rounded px-0.5">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </span>
  );
};

const NotificationCard = ({
  notification,
  searchQuery,
  onOpen,
  tripDoneActions,
}: {
  notification: NotificationDto;
  searchQuery: string;
  onOpen: () => void;
  tripDoneActions?: React.ReactNode;
}) => {
  const displayType = mapToDisplayType(notification);
  const timeLabel = formatTimestamp(notification.timestamp);

  return (
    <div
      onClick={onOpen}
      className={`flex items-start gap-3 p-4 cursor-pointer 
      transition-all duration-300 rounded-[18px] border ${
        notification.isRead
          ? "bg-white hover:bg-gray-50 border-gray-100"
          : "bg-brand-50 hover:bg-brand-100 border-brand-300"
      }`}
    >
      <div className="relative flex-shrink-0">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center ${getNotificationColor(
            displayType,
          )}`}
        >
          {getNotificationIcon(displayType)}
        </div>
        {!notification.isRead && (
          <div className="absolute -top-1 -right-1 bg-[var(--BRAND-500)] w-3 h-3 rounded-full border-2 border-white" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between mb-1 gap-2">
          <h3
            className={`text-[15px] ${
              notification.isRead
                ? "font-medium text-gray-700"
                : "font-semibold text-gray-900"
            }`}
          >
            <HighlightedText text={notification.title} search={searchQuery} />
          </h3>
          <span className="text-xs text-gray-500 flex-shrink-0 mt-0.5">
            {timeLabel}
          </span>
        </div>

        {notification.description && (
          <p
            className={`text-sm mb-1 ${
              notification.isRead ? "text-gray-500" : "text-gray-700"
            }`}
          >
            <HighlightedText
              text={notification.description}
              search={searchQuery}
            />
          </p>
        )}

        {tripDoneActions}
      </div>
    </div>
  );
};

export default function NotificationList({
  variant = "default",
}: {
  variant?: "default" | "sheet";
}) {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [reportTripId, setReportTripId] = useState<string | null>(null);
  const [reportMotif, setReportMotif] = useState("");

  const { data, isLoading, isError, refetch } =
    useNotificationsControllerFindAll({ page: 1, limit: 50 });
  const markAsReadMutation = useNotificationsControllerMarkAsRead();
  const markAllAsReadMutation = useNotificationsControllerMarkAllAsRead();
  const ackMutation = useTripsControllerAcknowledgeTripCompletion();
  const reportMutation = useReportsControllerReportTrip();

  const notifications = data?.data ?? [];

  const filteredNotifications = useMemo(() => {
    if (!searchQuery.trim()) return notifications;

    const query = searchQuery.toLowerCase();

    return notifications.filter(
      (notif) =>
        notif.title.toLowerCase().includes(query) ||
        (notif.description?.toLowerCase().includes(query) ?? false),
    );
  }, [notifications, searchQuery]);

  const totalUnread = notifications.filter((n) => !n.isRead).length;

  const markAllAsRead = () => {
    markAllAsReadMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Toutes les notifications sont marquées comme lues.");
      },
      onError: () => {
        toast.error("Impossible de tout marquer comme lu.");
      },
    });
  };

  const markAsRead = (id: string) => {
    markAsReadMutation.mutate(id, {
      onError: () => {
        toast.error("Impossible de marquer comme lu.");
      },
    });
  };

  const handleCardOpen = (n: NotificationDto) => {
    if (!n.isRead) {
      markAsRead(n.id);
    }
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

  const isSheet = variant === "sheet";

  return (
    <div
      className={cn(
        "flex flex-col min-h-0",
        isSheet
          ? "flex-1 h-full bg-white px-4 rounded-[12px]"
          : "h-screen max-w-md mx-auto bg-gray-50",
      )}
    >
      <style>{`
        :root {
          --BRAND-500: #f4a261;
        }
      `}</style>

      {isSheet ? (
        <div className="pt-6 pb-4 pr-14 border-b border-gray-100 bg-white sticky top-0 z-10">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <span className="flex items-center h-10 w-10 bg-brand-50 text-brand-500 p-2 rounded-[10px]">
                <Bell className="w-5 h-5 mx-auto" />
              </span>
              <h1 className="text-2xl font-semibold text-second-500 tracking-tight">
                Notifications
              </h1>
            </div>
            {totalUnread > 0 && (
              <span className="bg-[var(--BRAND-500)] text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                {totalUnread}
              </span>
            )}
          </div>

          {totalUnread > 0 && (
            <button
              type="button"
              onClick={markAllAsRead}
              disabled={markAllAsReadMutation.isPending}
              className="mb-4 flex items-center gap-2 text-sm text-[var(--BRAND-500)] hover:text-[var(--BRAND-600)] font-medium transition-colors disabled:opacity-50"
            >
              {markAllAsReadMutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <CheckCheck className="w-4 h-4" />
              )}
              Tout marquer comme lu
            </button>
          )}

          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-4.5 h-4.5" />
            <input
              type="text"
              placeholder="Rechercher…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border-gray-100 rounded-xl text-sm 
            focus:outline-none focus:ring-2 focus:ring-[var(--BRAND-500)]/20 focus:bg-white 
            transition-all duration-200 placeholder:text-gray-400"
            />
          </div>
        </div>
      ) : (
        <div className="px-4 pt-4 pb-3 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-brand-800">Notifications</h1>
            {totalUnread > 0 && (
              <span className="bg-second-500 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                {totalUnread} non lu{totalUnread > 1 ? "s" : ""}
              </span>
            )}
          </div>

          {totalUnread > 0 && (
            <button
              type="button"
              onClick={markAllAsRead}
              disabled={markAllAsReadMutation.isPending}
              className="mb-3 flex items-center gap-2 text-sm text-[var(--BRAND-500)] hover:text-[var(--BRAND-600)] font-medium transition-colors disabled:opacity-50"
            >
              {markAllAsReadMutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <CheckCheck className="w-4 h-4" />
              )}
              Tout marquer comme lu
            </button>
          )}

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Rechercher une notification"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--BRAND-500)] focus:bg-white transition-colors placeholder:text-gray-400"
            />
          </div>
        </div>
      )}

      <div
        className={cn(
          "flex-1 overflow-y-auto min-h-0",
          isSheet ? "py-2" : "p-4",
        )}
      >
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-2">
            <Loader2 className="w-10 h-10 animate-spin text-[var(--BRAND-500)]" />
            <p className="text-sm">Chargement…</p>
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-3 px-4 text-center">
            <AlertCircle className="w-12 h-12 text-red-400" />
            <p className="text-sm">Impossible de charger les notifications.</p>
            <Button variant="outline" size="sm" onClick={() => refetch()}>
              Réessayer
            </Button>
          </div>
        ) : filteredNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <Bell className="w-16 h-16 mb-4 text-gray-300" />
            <p className="text-lg font-medium">Aucune notification</p>
            <p className="text-sm text-center mt-2">
              {searchQuery
                ? "Essayez avec d'autres mots-clés"
                : "Vous êtes à jour !"}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filteredNotifications.map((notification) => {
              const isTripDone =
                notification.meta?.kind === "trip_marked_done" &&
                notification.meta?.tripId;

              const tripDoneActions = isTripDone ? (
                <div
                  className="flex flex-wrap gap-2 mt-3"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="rounded-full"
                    disabled={
                      ackMutation.isPending &&
                      ackMutation.variables === notification.meta?.tripId
                    }
                    onClick={() =>
                      confirmTripDone(notification.meta!.tripId as string)
                    }
                  >
                    {ackMutation.isPending &&
                    ackMutation.variables === notification.meta?.tripId ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : null}
                    Confirmer
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="rounded-full text-red-600 border-red-200 hover:bg-red-50"
                    onClick={() =>
                      setReportTripId(notification.meta!.tripId as string)
                    }
                  >
                    Signaler
                  </Button>
                </div>
              ) : null;

              return (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                  searchQuery={searchQuery}
                  onOpen={() => handleCardOpen(notification)}
                  tripDoneActions={tripDoneActions}
                />
              );
            })}
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
