"use client";

import { useUserControllerGetMe } from "@/api/users/hooks";
import LeftSideSection from "@/components/users-side/left-side-section";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { ReactNode, useEffect } from "react";
import { useWebSockets } from "@/hooks/use-websockets";
import { toast } from "react-hot-toast";
import ChatList from "@/components/users-side/layouts/chat/chat-list";
import { useState } from "react";
import { SheetContent, Sheet } from "@/components/ui/sheet";

export default function LayoutContent({ children }: { children: ReactNode }) {
  const { data: user, isLoading } = useUserControllerGetMe();
  const [isChatOpen, setIsChatOpen] = useState(false);

  const userRole = user?.role || "user";
  const userAvatar = user?.avatarUrl || "";
  const userFullName = user
    ? `${user.firstName || ""} ${user.lastName || ""}`.trim() || "Utilisateur"
    : "Utilisateur";

  // Notification WebSocket Integration
  const { notifSocket } = useWebSockets(user?.id, {
    enableChat: false,
    enableNotif: true,
  });

  useEffect(() => {
    if (notifSocket) {
      notifSocket.on("notification", (notification: any) => {
        console.log("Notification received:", notification);
        toast(notification.title || "Nouvelle notification", {
          icon: "🔔",
          duration: 5000,
        });
      });

      return () => {
        notifSocket.off("notification");
      };
    }
  }, [notifSocket]);

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

        <div className="fixed bottom-4 right-2 z-50">
          <Button
            size="icon"
            className="rounded-full h-12 w-12 shadow-lg bg-brand-500 hover:bg-brand-600 text-white"
            onClick={() => setIsChatOpen(true)}
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        </div>
        <Sheet open={isChatOpen} onOpenChange={setIsChatOpen}>
          <SheetContent
            className="p-0  w-full 
            md:w-[50vw] lg:w-[40vw] h-[98vh] my-auto mr-4 rounded-[24px]"
          >
            <ChatList />
          </SheetContent>
        </Sheet>
      </main>
    </div>
  );
}
