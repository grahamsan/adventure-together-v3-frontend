"use client";
import { Card } from "@/components/ui/card";
import { Car } from "lucide-react";
import { ChevronRight } from "lucide-react";

export default function UpcomingTripsWidget() {
  const trips = [
    { id: 1, from: "Cotonou", to: "Porto-Novo", date: "Aujourd'hui", time: "15:30", seats: 3 },
    { id: 2, from: "Abomey", to: "Cotonou", date: "Demain", time: "08:00", seats: 2 },
  ];

  return (
    <Card className="p-4 shadow-md">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Car className="w-5 h-5 text-green-600" />
          <h3 className="font-semibold text-sm">Trajets à venir</h3>
        </div>
        <ChevronRight className="w-4 h-4 text-gray-400" />
      </div>
      <div className="space-y-2">
        {trips.map((trip) => (
          <div key={trip.id} className="p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-semibold text-gray-900">{trip.from}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-900">{trip.to}</span>
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-600">
              <span>{trip.date} • {trip.time}</span>
              <span className="bg-white px-2 py-1 rounded-full font-medium">{trip.seats} places</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
