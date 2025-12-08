"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ChatSidebar } from "@/components/users-side/chat/chat-list";
import { ChatView } from "@/components/users-side/chat/chat-component";
import { fetchTrips } from "@/features/messages/api";

export default function MessagePage() {
  const router = useRouter();
  const params = useParams();
  const chatId = params.id as string;

  const [isMobile, setIsMobile] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    async function loadUserName() {
      const trips = await fetchTrips();
      for (const trip of trips) {
        const chat = trip.chats.find((c) => c.id === chatId);
        if (chat) {
          setUserName(chat.user.name);
          break;
        }
      }
    }
    loadUserName();
  }, [chatId]);

  const handleSelectChat = (newChatId: string, newUserName: string) => {
    router.push(`/messages/${newChatId}`);
  };

  const handleBack = () => {
    router.push("/messages");
  };

  // Mobile: afficher seulement le chat
  if (isMobile) {
    return (
      <div className="flex-1 flex overflow-hidden">
        <ChatView chatId={chatId} userName={userName} onBack={handleBack} />
      </div>
    );
  }

  // Desktop: afficher sidebar + chat
  return (
    <div className="flex-1 flex overflow-hidden">
      <ChatSidebar onSelectChat={handleSelectChat} selectedChatId={chatId} />
      <ChatView chatId={chatId} userName={userName} />
    </div>
  );
}
