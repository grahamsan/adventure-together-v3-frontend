"use client";
import { Card } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";
import { ChevronRight } from "lucide-react";

export default function QuickMessagesWidget() {
  const messages = [
    { id: 1, name: "Marie Dubois", message: "Merci pour le trajet !", time: "10:30", avatar: "https://i.pravatar.cc/150?img=1", unread: true },
    { id: 2, name: "Jean Martin", message: "À quelle heure on part ?", time: "Hier", avatar: "https://i.pravatar.cc/150?img=2", unread: false },
  ];

  return (
    <Card className="p-4 shadow-md">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-purple-600" />
          <h3 className="font-semibold text-sm">Messages</h3>
        </div>
        <ChevronRight className="w-4 h-4 text-gray-400" />
      </div>
      <div className="space-y-2">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer ${msg.unread ? 'bg-purple-50' : ''}`}>
            <div className="relative flex-shrink-0">
              <img src={msg.avatar} alt={msg.name} className="w-10 h-10 rounded-full" />
              {msg.unread && <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 border-2 border-white rounded-full"></div>}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm text-gray-900 truncate">{msg.name}</p>
              <p className="text-xs text-gray-500 truncate">{msg.message}</p>
            </div>
            <span className="text-xs text-gray-400 flex-shrink-0">{msg.time}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
