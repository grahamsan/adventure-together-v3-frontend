"use client";
import { Card } from "@/components/ui/card";
import { Bell } from "lucide-react";

export default function QuickNotificationsWidget() {
  const notifications = [
    { id: 1, type: "event", message: "Nouvel événement près de vous", time: "Il y a 2h", unread: true },
    { id: 2, type: "trip", message: "Votre trajet est confirmé", time: "Il y a 5h", unread: true },
    { id: 3, type: "message", message: "3 nouveaux messages", time: "Hier", unread: false },
  ];

  return (
    <Card className="p-4 shadow-md">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-orange-600" />
          <h3 className="font-semibold text-sm">Notifications</h3>
        </div>
        <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">2</span>
      </div>
      <div className="space-y-2">
        {notifications.map((notif) => (
          <div key={notif.id} className={`p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer ${notif.unread ? 'bg-blue-50' : ''}`}>
            <div className="flex items-start gap-2">
              {notif.unread && <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 truncate">{notif.message}</p>
                <span className="text-xs text-gray-500">{notif.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
