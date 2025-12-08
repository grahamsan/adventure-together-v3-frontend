"use client";

import { useState, useEffect } from "react";
import { fetchTrips } from "@/features/messages/api";
import { Trip } from "@/features/messages/types";

interface ChatSidebarProps {
  onSelectChat: (chatId: string, userName: string) => void;
  selectedChatId: string | null;
}

export function ChatSidebar({
  onSelectChat,
  selectedChatId,
}: ChatSidebarProps) {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [expandedTrip, setExpandedTrip] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const data = await fetchTrips();
      setTrips(data);
      setLoading(false);
      if (data.length > 0) {
        setExpandedTrip(data[0].id);
      }
    }
    load();
  }, []);

  const filteredTrips = trips
    .map((trip) => {
      const chats = trip.chats.filter((c) => {
        const q = search.toLowerCase();
        return (
          trip.title.toLowerCase().includes(q) ||
          c.user.name.toLowerCase().includes(q) ||
          c.lastMessage.toLowerCase().includes(q)
        );
      });
      return chats.length ? { ...trip, chats } : null;
    })
    .filter(Boolean) as Trip[];

  if (loading) {
    return (
      <div className="w-full lg:w-80 xl:w-96 p-4 space-y-3 bg-white border-r">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="w-full lg:w-80 xl:w-96 h-full flex flex-col bg-white border-r overflow-hidden p-4">
      <div className="p-4 border-b space-y-4 flex-shrink-0">
        <h2 className="font-bold text-[var(--BRAND-500)] text-2xl">Messages</h2>
        <input
          placeholder="Rechercher..."
          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--BRAND-500)] focus:border-transparent transition-all"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex-1 overflow-y-auto py-6 space-y-3">
        {filteredTrips.map((trip) => (
          <div
            key={trip.id}
            className="border rounded-xl overflow-hidden bg-white shadow-sm"
          >
            <button
              onClick={() =>
                setExpandedTrip(expandedTrip === trip.id ? null : trip.id)
              }
              className="w-full px-4 py-3 flex justify-between items-center hover:bg-gray-50 transition-colors"
            >
              <div className="text-left">
                <p className="font-semibold text-gray-900 text-sm">
                  {trip.title}
                </p>
                <p className="text-xs text-gray-500">{trip.date}</p>
              </div>
              <svg
                className={`w-5 h-5 text-gray-400 transition-transform ${
                  expandedTrip === trip.id ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {expandedTrip === trip.id && (
              <div className="border-t bg-gray-50/50 p-2 space-y-2">
                {trip.chats.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => onSelectChat(chat.id, chat.user.name)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all hover:bg-white ${
                      selectedChatId === chat.id
                        ? "bg-blue-50 border border-[[var(--BRAND-500)]]"
                        : "hover:shadow-sm"
                    }`}
                  >
                    <div className="relative">
                      <img
                        src={chat.user.avatar}
                        alt={chat.user.name}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                      {chat.unread > 0 && (
                        <span className="absolute -top-1 -right-1 bg-[[var(--BRAND-500)]] text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                          {chat.unread}
                        </span>
                      )}
                    </div>

                    <div className="flex-1 text-left overflow-hidden">
                      <p className="font-medium text-gray-900 text-sm truncate">
                        {chat.user.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {chat.lastMessage}
                      </p>
                    </div>

                    <span className="text-[10px] text-gray-400 flex-shrink-0">
                      {chat.timestamp}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
