import React, { useState, useMemo } from "react";
import { Search, MapPin, Calendar, Users } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Chat from "./chat-component";

// Types
type Chat = {
  id: number;
  tripId: string;
  tripName: string;
  tripDate: Date;
  participants: number;
  userName: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  avatar: string;
};

type Trip = {
  tripName: string;
  tripDate: Date;
  participants: number;
  chats: Chat[];
};

type HighlightedTextProps = {
  text: string;
  search: string;
};

type ChatCardProps = {
  chat: Chat;
  searchQuery: string;
  onClick: () => void;
};

type CustomAccordionTriggerProps = {
  children: React.ReactNode;
  isOpen: boolean;
  tripCount: number;
};

// Données de test
const mockChats: Chat[] = [
  {
    id: 1,
    tripId: "trip1",
    tripName: "Coronou → Port-Novo",
    tripDate: new Date(2025, 11, 8),
    participants: 3,
    userName: "Marie Dubois",
    lastMessage: "Je serai à la gare à 14h précises. N'oublie pas...",
    timestamp: "10:30",
    unread: 2,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marie",
  },
  {
    id: 2,
    tripId: "trip1",
    tripName: "Cotonou → Ouidah",
    tripDate: new Date(2025, 11, 8),
    participants: 3,
    userName: "Jean Martin",
    lastMessage: "Parfait! Je prends mon sac de voyage cl...",
    timestamp: "09:15",
    unread: 0,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jean",
  },
  {
    id: 3,
    tripId: "trip2",
    tripName: "Parakou → Nikki",
    tripDate: new Date(2025, 11, 9),
    participants: 2,
    userName: "Sophie Laurent",
    lastMessage: "On peut faire une pause café à mi-chemin...",
    timestamp: "Hier",
    unread: 1,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie",
  },
  {
    id: 4,
    tripId: "trip3",
    tripName: "Bordeaux → Toulouse",
    tripDate: new Date(2025, 11, 23),
    participants: 4,
    userName: "Emma Rousseau",
    lastMessage: "Le départ est toujours prévu pour 8h ...",
    timestamp: "2 jours",
    unread: 0,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
  },
];

// Fonctions utilitaires
const formatRelativeDate = (date: Date): string => {
  const today = new Date(2025, 11, 8);
  const diffTime = date.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Aujourd'hui";
  if (diffDays === 1) return "Demain";
  if (diffDays === 2) return "Après-demain";
  if (diffDays >= 3 && diffDays <= 7) return `Dans ${diffDays} jours`;
  if (diffDays > 7 && diffDays <= 14) return "Dans une semaine";
  if (diffDays > 14 && diffDays <= 21) return "Dans deux semaines";
  if (diffDays > 21 && diffDays <= 30) return "Dans trois semaines";

  return date.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
};

const HighlightedText: React.FC<HighlightedTextProps> = ({ text, search }) => {
  if (!search.trim()) return <span>{text}</span>;

  const regex = new RegExp(
    `(${search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
    "gi"
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
        )
      )}
    </span>
  );
};

const ChatCard: React.FC<ChatCardProps> = ({ chat, searchQuery, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex items-start gap-3 p-4 hover:bg-gray-50 cursor-pointer transition-colors"
    >
      <div className="relative flex-shrink-0">
        <img
          src={chat.avatar}
          alt={chat.userName}
          className="w-12 h-12 rounded-full"
        />
        {chat.unread > 0 && (
          <div className="absolute -top-1 -right-1 bg-[var(--BRAND-500)] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
            {chat.unread}
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold text-gray-900 truncate text-[15px]">
            <HighlightedText text={chat.userName} search={searchQuery} />
          </h3>
          <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
            {chat.timestamp}
          </span>
        </div>

        <p
          className={`text-sm truncate ${
            chat.unread > 0 ? "text-gray-900 font-normal" : "text-gray-500"
          }`}
        >
          <HighlightedText text={chat.lastMessage} search={searchQuery} />
        </p>
      </div>
    </div>
  );
};

const CustomAccordionTrigger: React.FC<CustomAccordionTriggerProps> = ({
  children,
  isOpen,
  tripCount,
}) => {
  return (
    <div className="flex items-center justify-between w-full px-4 py-3 hover:bg-gray-50 cursor-pointer">
      <div className="flex items-start gap-3 flex-1">
        <div className="bg-[#fde6d4] p-2.5 rounded-lg mt-0.5">
          <MapPin className="w-5 h-5 text-[var(--BRAND-500)]" />
        </div>
        {children}
      </div>
      <div className="flex items-center gap-3 ml-3">
        <span className="text-xs text-gray-600 font-normal whitespace-nowrap">
          {tripCount} chat{tripCount > 1 ? "s" : ""}
        </span>
      </div>
    </div>
  );
};

// Composant principal
export default function ChatList() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [selectedChat, setSelectedChat] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const chatsByTrip: [string, Trip][] = useMemo(() => {
    const grouped: Record<string, Trip> = {};

    mockChats.forEach((chat) => {
      if (!grouped[chat.tripId]) {
        grouped[chat.tripId] = {
          tripName: chat.tripName,
          tripDate: chat.tripDate,
          participants: chat.participants,
          chats: [],
        };
      }
      grouped[chat.tripId].chats.push(chat);
    });

    return Object.entries(grouped);
  }, []);

  const filteredTrips: [string, Trip][] = useMemo(() => {
    if (!searchQuery.trim()) return chatsByTrip;

    const query = searchQuery.toLowerCase();

    return chatsByTrip
      .map(([tripId, trip]) => {
        const filteredChats = trip.chats.filter(
          (chat) =>
            chat.userName.toLowerCase().includes(query) ||
            chat.lastMessage.toLowerCase().includes(query) ||
            chat.tripName.toLowerCase().includes(query)
        );
        return filteredChats.length > 0
          ? [tripId, { ...trip, chats: filteredChats }]
          : null;
      })
      .filter(Boolean) as [string, Trip][];
  }, [chatsByTrip, searchQuery]);

  const totalUnread: number = mockChats.reduce(
    (sum, chat) => sum + chat.unread,
    0
  );

  if (selectedChat) {
    return (
      <Chat
        chatId={selectedChat.id}
        chatName={selectedChat.name}
        onBack={() => setSelectedChat(null)}
      />
    );
  }

  return (
    <div className="h-screen flex flex-col bg-white max-w-md mx-auto">
      <style>{`
        :root {
          --BRAND-500: #f4a261;
        }
        [data-state="open"] > button {
          background-color: transparent;
        }
      `}</style>

      <div className="px-4 pt-4 pb-3 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          {totalUnread > 0 && (
            <span className="bg-[var(--BRAND-500)] text-white text-xs font-medium px-2.5 py-1 rounded-full">
              {totalUnread} nouveau{totalUnread > 1 ? "x" : ""}
            </span>
          )}
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Rechercher un message ou un voyage"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--BRAND-500)] focus:bg-white transition-colors placeholder:text-gray-400"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredTrips.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 p-8">
            <Search className="w-16 h-16 mb-4 text-gray-300" />
            <p className="text-lg font-medium">Aucun résultat</p>
            <p className="text-sm text-center mt-2">
              Essayez avec d'autres mots-clés
            </p>
          </div>
        ) : (
          <Accordion
            type="multiple"
            value={openItems}
            onValueChange={setOpenItems}
            defaultValue={filteredTrips.map(([id]) => id)}
            className="w-full"
          >
            {filteredTrips.map(([tripId, trip]) => {
              const isOpen = openItems.includes(tripId);
              return (
                <AccordionItem
                  key={tripId}
                  value={tripId}
                  className="border-b border-gray-100"
                >
                  <AccordionTrigger className="p-0 hover:no-underline [&[data-state=open]]:bg-transparent">
                    <CustomAccordionTrigger
                      isOpen={isOpen}
                      tripCount={trip.chats.length}
                    >
                      <div className="flex-1 text-left">
                        <h2 className="font-semibold text-gray-900 text-[15px] mb-1">
                          <HighlightedText
                            text={trip.tripName}
                            search={searchQuery}
                          />
                        </h2>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {formatRelativeDate(trip.tripDate)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3.5 h-3.5" />
                            {trip.participants} part
                            {trip.participants > 1 ? "s" : ""}.
                          </span>
                        </div>
                      </div>
                    </CustomAccordionTrigger>
                  </AccordionTrigger>
                  <AccordionContent className="pb-0 pt-0">
                    <div className="bg-[#fcf1e8] rounded-[12px] mx-[5%]">
                      {trip.chats.map((chat) => (
                        <ChatCard
                          key={chat.id}
                          chat={chat}
                          searchQuery={searchQuery}
                          onClick={() =>
                            setSelectedChat({
                              id: chat.tripId,
                              name: chat.tripName,
                            })
                          }
                        />
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        )}
      </div>
    </div>
  );
}
