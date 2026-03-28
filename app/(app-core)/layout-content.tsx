"use client";

import { useUserControllerGetMe } from "@/api/users/hooks";
import {
  useNotificationsControllerFindAll,
} from "@/api/notifications/hooks";
import LeftSideSection from "@/components/users-side/left-side-section";
import { Button } from "@/components/ui/button";
import { Bell, MessageCircle } from "lucide-react";
import { ReactNode, useCallback, useState } from "react";
import { useWebSockets } from "@/hooks/use-websockets";
import ChatList from "@/components/users-side/layouts/chat/chat-list";
import NotificationList from "@/components/users-side/layouts/notifications/notification-list";
import { NotificationSocketToast } from "@/components/users-side/layouts/notifications/notification-socket-toast";
import { SheetContent, Sheet } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export default function LayoutContent({ children }: { children: ReactNode }) {
  const { data: user } = useUserControllerGetMe();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [bellShake, setBellShake] = useState(false);

  const { data: notifPage } = useNotificationsControllerFindAll(
    { page: 1, limit: 100 },
    { enabled: Boolean(user?.id) },
  );
  const notifUnread =
    notifPage?.data?.filter((n) => !n.isRead).length ?? 0;

  const userRole = user?.role || "user";
  const userAvatar = user?.avatarUrl || "";
  const userFullName = user
    ? `${user.firstName || ""} ${user.lastName || ""}`.trim() || "Utilisateur"
    : "Utilisateur";

  const { notifSocket } = useWebSockets(user?.id, {
    enableChat: false,
    enableNotif: true,
  });

  const triggerBellShake = useCallback(() => {
    setBellShake(true);
    window.setTimeout(() => setBellShake(false), 650);
  }, []);

  return (
    <div className="flex overflow-hidden h-screen bg-second-50">
      <div className="hidden md:flex">
        <LeftSideSection
          userRole={userRole}
          userAvatar={userAvatar}
          userFullName={userFullName}
        />
      </div>

      <main className="flex-1 w-full relative">
        {children}

        <NotificationSocketToast
          notifSocket={notifSocket}
          onShakeBell={triggerBellShake}
        />

        <div className="fixed bottom-4 right-2 z-50 flex flex-col gap-2 items-end">
          <div className="relative">
            <Button
              size="icon"
              aria-label="Ouvrir les notifications"
              className={cn(
                "rounded-full h-12 w-12 shadow-lg bg-brand-500 hover:bg-brand-600 text-white relative",
                bellShake && "animate-bell-shake",
              )}
              onClick={() => setIsNotifOpen(true)}
            >
              <Bell className="h-6 w-6" />
            </Button>
            {notifUnread > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[1.125rem] h-[1.125rem] px-1 flex items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white border-2 border-white">
                {notifUnread > 99 ? "99+" : notifUnread}
              </span>
            )}
          </div>
          <Button
            size="icon"
            aria-label="Ouvrir les messages"
            className="rounded-full h-12 w-12 shadow-lg bg-brand-500 hover:bg-brand-600 text-white"
            onClick={() => setIsChatOpen(true)}
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        </div>

        <Sheet open={isNotifOpen} onOpenChange={setIsNotifOpen}>
          <SheetContent
            className="p-0 w-full md:w-[50vw] lg:w-[40vw] h-[98vh] my-auto mr-4 rounded-[24px] flex flex-col min-h-0"
          >
            <NotificationList variant="sheet" />
          </SheetContent>
        </Sheet>

        <Sheet open={isChatOpen} onOpenChange={setIsChatOpen}>
          <SheetContent
            className="p-0  w-full 
            md:w-[50vw] lg:w-[40vw] h-[98vh] my-auto mr-4 rounded-[24px] flex flex-col min-h-0"
          >
            <ChatList />
          </SheetContent>
        </Sheet>
      </main>
    </div>
  );
}
