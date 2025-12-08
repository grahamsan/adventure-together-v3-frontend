"use client";
import { Card } from "@/components/ui/card";
import { Calendar, Clock, MapPin } from "lucide-react";
import { ChevronRight } from "lucide-react";

export default function UpcomingEventsWidget() {
  const events = [
    { id: 1, title: "After Work", date: "15 Nov", time: "18:00", location: "Cotonou" },
    { id: 2, title: "Beach Party", date: "18 Nov", time: "14:00", location: "Bali" },
    { id: 3, title: "Concert Jazz", date: "20 Nov", time: "20:00", location: "Paris" },
  ];

  return (
    <Card className="p-4 shadow-md">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-sm">Événements à venir</h3>
        </div>
        <ChevronRight className="w-4 h-4 text-gray-400" />
      </div>
      <div className="space-y-2">
        {events.map((event) => (
          <div key={event.id} className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex flex-col items-center justify-center">
              <span className="text-xs font-semibold text-blue-600">{event.date.split(' ')[0]}</span>
              <span className="text-xs text-blue-600">{event.date.split(' ')[1]}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm text-gray-900 truncate">{event.title}</p>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                <span>{event.time}</span>
                <span className="mx-1">•</span>
                <MapPin className="w-3 h-3" />
                <span className="truncate">{event.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
