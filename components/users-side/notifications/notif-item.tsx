"use client";

import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { NotificationDto } from "@/api/notifications/types";
import { formatTimestamp } from "@/utils/format-timestamp";

type UiTypeKey = "trip" | "message" | "reminder" | "other";

function uiTypeKey(n: NotificationDto): UiTypeKey {
  const t = n.type;
  if (t === "trip" || t === "message" || t === "reminder") return t;
  return "other";
}

const typeColors: Record<UiTypeKey, string> = {
  trip: "bg-emerald-400",
  message: "bg-blue-400",
  reminder: "bg-violet-400",
  other: "bg-gray-400",
};

const typeBgColors: Record<UiTypeKey, string> = {
  trip: "bg-emerald-50",
  message: "bg-blue-50",
  reminder: "bg-violet-50",
  other: "bg-gray-50",
};

interface NotificationItemProps {
  notification: NotificationDto;
  onClick?: () => void;
  onConfirmTripDone?: (tripId: string) => void;
  onOpenReport?: (tripId: string) => void;
  isAckPendingForTrip?: boolean;
}

export function NotificationItem({
  notification,
  onClick,
  onConfirmTripDone,
  onOpenReport,
  isAckPendingForTrip,
}: NotificationItemProps) {
  const key = uiTypeKey(notification);
  const isTripDone = notification.meta?.kind === "trip_marked_done";
  const tripId = notification.meta?.tripId;

  return (
    <div
      onClick={onClick}
      className={`flex gap-3 p-4 rounded-xl border transition-all cursor-pointer hover:shadow-md ${
        notification.isRead
          ? "bg-white border-gray-100"
          : `${typeBgColors[key]} border-transparent`
      }`}
    >
      <div className="flex-shrink-0 flex items-start pt-1">
        <div className={`w-2 h-2 rounded-full ${typeColors[key]}`} />
      </div>

      <div className="flex-1 min-w-0">
        <p
          className={`text-sm ${
            notification.isRead
              ? "text-gray-700"
              : "text-gray-900 font-medium"
          }`}
        >
          {notification.title}
        </p>
        {notification.description && (
          <p className="text-xs text-gray-500 mt-1">{notification.description}</p>
        )}
        <p className="text-xs text-gray-400 mt-1">
          {formatTimestamp(notification.timestamp)}
        </p>

        {isTripDone && tripId && onConfirmTripDone && onOpenReport && (
          <div
            className="flex flex-wrap gap-2 mt-3"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="rounded-full"
              disabled={isAckPendingForTrip}
              onClick={() => onConfirmTripDone(tripId)}
            >
              {isAckPendingForTrip ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : null}
              Confirmer
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="rounded-full text-red-600 border-red-200 hover:bg-red-50"
              onClick={() => onOpenReport(tripId)}
            >
              Signaler
            </Button>
          </div>
        )}
      </div>

      {!notification.isRead && (
        <div className="flex-shrink-0">
          <div className="w-2 h-2 rounded-full bg-blue-500" />
        </div>
      )}
    </div>
  );
}
