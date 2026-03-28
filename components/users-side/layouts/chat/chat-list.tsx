import React, { useState, useMemo, useEffect } from "react";
import { Search, MapPin, MessageCircle, Loader2 } from "lucide-react";
import Chat from "./chat-component";
import { useConversationsControllerFindAll } from "@/api/conversations/hooks";
import { useUserControllerGetMe } from "@/api/users/hooks";
import { Conversation } from "@/api/conversations/types";
import UserAvatarComponent from "@/components/shared/user-avatar-component";

type HighlightedTextProps = {
  text: string;
  search: string;
};

type ChatCardProps = {
  chat: Conversation;
  currentUserId: string;
  searchQuery: string;
  onClick: () => void;
};

// Fonctions utilitaires
const formatMessageDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffDays = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (diffDays === 0) {
    return date.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  } else if (diffDays === 1) {
    return "Hier";
  } else if (diffDays < 7) {
    return date.toLocaleDateString("fr-FR", { weekday: "short" });
  } else {
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
    });
  }
};

const HighlightedText: React.FC<HighlightedTextProps> = ({ text, search }) => {
  if (!search.trim() || !text) return <span>{text || ""}</span>;

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

const ChatCard: React.FC<ChatCardProps> = ({
  chat,
  currentUserId,
  searchQuery,
  onClick,
}) => {
  const lastMessage = chat.lastMessage;
  const unreadCount = chat.unreadCount;

  const chatName =
    chat?.type === "user2user"
      ? chat?.destinataireName
      : chat?.name || "Conversation";

  const tripRoute = chat.trip ? `${chat.trip.from} → ${chat.trip.to}` : "";
  const avatarSeed =
    chat.type === "group" ? chat.id : chat.destinataireId || chat.id;

  return (
    <div
      onClick={onClick}
      className="flex items-start gap-4 p-4 bg-white hover:bg-gray-50 cursor-pointer 
      transition-all duration-200 border-b border-gray-100 last:border-0"
    >
      <div className="relative flex-shrink-0">
        <UserAvatarComponent size={40} avatar="" fullname={chatName} />
        {unreadCount > 0 && (
          <div className="absolute -top-1 -right-1 bg-[var(--BRAND-500)] text-white text-[10px] rounded-full min-w-[1.25rem] h-5 px-1 flex items-center justify-center font-bold border-2 border-white">
            {unreadCount}
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h3
            className={`font-semibold text-gray-900 truncate text-[15px] ${unreadCount > 0 ? "text-brand-900" : ""}`}
          >
            <HighlightedText text={chatName} search={searchQuery} />
          </h3>
          <span className="text-xs text-gray-400 flex-shrink-0 ml-2">
            {lastMessage ? formatMessageDate(lastMessage.timestamp) : ""}
          </span>
        </div>

        {tripRoute && (
          <div className="flex items-center gap-1 text-xs text-[var(--BRAND-500)] font-medium mb-1">
            <MapPin className="w-3 h-3" />
            <span className="truncate">{tripRoute}</span>
          </div>
        )}

        <p
          className={`text-sm truncate ${
            unreadCount > 0 ? "text-gray-900 font-medium" : "text-gray-500"
          }`}
        >
          {lastMessage?.senderId === currentUserId && "Vous : "}
          <HighlightedText
            text={lastMessage?.content || "Aucun message"}
            search={searchQuery}
          />
        </p>
      </div>
    </div>
  );
};

// Composant principal
export default function ChatList({
  initialConversationId = null,
  onInitialConversationConsumed,
}: {
  /** Ouvre directement cette conversation (ex. depuis une notification « nouveau message »). */
  initialConversationId?: string | null;
  onInitialConversationConsumed?: () => void;
} = {}) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedChat, setSelectedChat] = useState<{
    id: string;
    name: string;
    tripName: string;
    tripId: string;
    applyId: string;
    applyStatus: string;
  } | null>(null);

  const { data: conversations, isLoading: isLoadingConversations } =
    useConversationsControllerFindAll();
  const { data: currentUser } = useUserControllerGetMe();

  useEffect(() => {
    if (!initialConversationId) return;
    if (isLoadingConversations) return;
    if (!conversations) {
      onInitialConversationConsumed?.();
      return;
    }
    const chat = conversations.find((c) => c.id === initialConversationId);
    if (chat) {
      setSelectedChat({
        id: chat.id,
        name:
          chat.type === "user2user"
            ? chat.destinataireName ?? "Conversation"
            : chat.name || "Conversation",
        tripName: chat?.name,
        tripId: chat.tripId || "",
        applyId: chat.applyId || "",
        applyStatus: chat.applyStatus || "",
      });
    }
    onInitialConversationConsumed?.();
  }, [
    initialConversationId,
    conversations,
    isLoadingConversations,
    onInitialConversationConsumed,
  ]);

  const filteredConversations = useMemo(() => {
    if (!conversations) return [];
    if (!searchQuery.trim()) return conversations;

    const query = searchQuery.toLowerCase();

    return conversations.filter((chat) => {
      const nameMatch = chat.name?.toLowerCase().includes(query);
      const messageMatch = chat.lastMessage?.content
        .toLowerCase()
        .includes(query);
      const tripMatch = chat.trip
        ? `${chat.trip.from} ${chat.trip.to}`.toLowerCase().includes(query)
        : false;

      return nameMatch || messageMatch || tripMatch;
    });
  }, [conversations, searchQuery]);

  const totalUnread = useMemo(() => {
    if (!conversations) return 0;
    return conversations.reduce(
      (sum, chat) => sum + (chat.unreadCount || 0),
      0,
    );
  }, [conversations]);

  if (selectedChat) {
    return (
      <Chat
        chatId={selectedChat.id}
        chatName={selectedChat.name}
        onBack={() => setSelectedChat(null)}
        tripName={selectedChat.tripName}
        tripId={selectedChat.tripId}
        applyId={selectedChat.applyId}
        applyStatus={selectedChat.applyStatus}
      />
    );
  }

  return (
    <div className="h-full flex flex-col bg-white px-4 rounded-[12px]">
      <style>{`
        :root {
          --BRAND-500: #f4a261;
        }
      `}</style>

      <div className="pt-6 pb-4 pr-14 border-b border-gray-100 bg-white sticky top-0 z-10">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <span className="flex items-center h-10 w-10 bg-brand-50 text-brand-500 p-2 rounded-[10px]">
              <MessageCircle className="w-5 h-5 mx-auto" />
            </span>
            <h1 className="text-2xl font-semibold text-second-500 tracking-tight">
              Messages
            </h1>
          </div>
          {totalUnread > 0 && (
            <span className="bg-[var(--BRAND-500)] text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
              {totalUnread}
            </span>
          )}
        </div>

        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-4.5 h-4.5" />
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border-gray-100 rounded-xl text-sm 
            focus:outline-none focus:ring-2 focus:ring-[var(--BRAND-500)]/20 focus:bg-white 
            transition-all duration-200 placeholder:text-gray-400"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {isLoadingConversations ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="w-8 h-8 animate-spin text-[var(--BRAND-500)]" />
          </div>
        ) : filteredConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 p-8">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-gray-300" />
            </div>
            <p className="text-base font-medium text-gray-900">
              Aucune conversation
            </p>
            <p className="text-sm text-center mt-1 text-gray-500">
              {searchQuery
                ? "Aucun résultat pour votre recherche."
                : "Vous n'avez pas encore de message."}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {filteredConversations.map((chat) => (
              <ChatCard
                key={chat.id}
                chat={chat}
                currentUserId={currentUser?.id || ""}
                searchQuery={searchQuery}
                onClick={() =>
                  setSelectedChat({
                    id: chat.id,
                    name:
                      chat?.type === "user2user"
                        ? chat?.destinataireName
                        : chat?.name || "Conversation",
                    tripName: chat?.name,
                    tripId: chat?.tripId || "",
                    applyId: chat?.applyId || "",
                    applyStatus: chat?.applyStatus || "",
                  })
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
