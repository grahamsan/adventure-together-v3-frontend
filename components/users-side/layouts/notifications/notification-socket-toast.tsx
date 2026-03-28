"use client";

import { useEffect, useRef } from "react";
import type { Socket } from "socket.io-client";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Bell } from "lucide-react";
import { queryKeys } from "@/lib/query-keys";
import { cn } from "@/lib/utils";

const BELL_SOUND_SRC = "/sounds/bell-sound.mp3";

type PushPayload = {
  title?: string;
  description?: string;
};

function playBellSound() {
  try {
    const audio = new Audio(BELL_SOUND_SRC);
    audio.volume = 0.45;
    void audio.play().catch(() => {
      /* autoplay policy or missing file */
    });
  } catch {
    /* ignore */
  }
}

/**
 * Écoute le socket notifications : son, toast centré en haut, invalidation du cache React Query,
 * secousse du trigger (callback parent).
 */
export function NotificationSocketToast({
  notifSocket,
  onShakeBell,
}: {
  notifSocket: Socket | null;
  onShakeBell: () => void;
}) {
  const queryClient = useQueryClient();
  const onShakeRef = useRef(onShakeBell);
  onShakeRef.current = onShakeBell;

  useEffect(() => {
    if (!notifSocket) return;

    const handler = (notification: PushPayload) => {
      playBellSound();
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications.all });
      onShakeRef.current();

      const title = notification.title || "Nouvelle notification";
      const description = notification.description;

      toast.custom(
        (t) => (
          <div
            className={cn(
              "pointer-events-auto flex max-w-md w-[min(100vw-2rem,28rem)] flex-col gap-1 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-lg",
              t.visible ? "opacity-100" : "opacity-0",
            )}
            style={{
              position: "fixed",
              top: "1rem",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 9999,
            }}
          >
            <div className="flex items-start gap-2 text-sm font-semibold text-gray-900">
              <Bell className="h-4 w-4 text-brand-500 shrink-0 mt-0.5" />
              <span className="leading-snug">{title}</span>
            </div>
            {description ? (
              <p className="text-xs text-gray-600 leading-snug pl-6 line-clamp-3">
                {description}
              </p>
            ) : null}
          </div>
        ),
        { duration: 5000 },
      );
    };

    notifSocket.on("notification", handler);
    return () => {
      notifSocket.off("notification", handler);
    };
  }, [notifSocket, queryClient]);

  return null;
}
