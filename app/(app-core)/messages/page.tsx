"use client";

import { useRouter } from "next/navigation";
import { ChatSidebar } from "@/components/users-side/chat/chat-list";
import { EmptyState } from "@/components/users-side/chat/layouts/empty-state";
import { useMediaQuery } from "@/hooks/use-media-query";

export default function MessagesPage() {
  const router = useRouter();
  const isMdUp = useMediaQuery("(min-width: 768px)");

  const handleSelectChat = (chatId: string, _userName: string) => {
    router.push(`/messages/${chatId}`);
  };

  return (
    <div className="min-h-0 flex-1 flex overflow-hidden bg-gray-50">
      <ChatSidebar onSelectChat={handleSelectChat} selectedChatId={null} />
      {isMdUp && <EmptyState />}
    </div>
  );
}
