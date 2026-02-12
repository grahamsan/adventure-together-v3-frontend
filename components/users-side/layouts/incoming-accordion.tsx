import React, { useState } from "react";
import {
  Calendar,
  Compass,
  Clock,
  MapPin,
  ChevronRight,
  Plus,
  Filter,
  Search,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface IncomingEventCardProps {
  date: string;
  month: string;
  title: string;
  time: string;
  location: string;
}

function IncomingEventCard({
  date,
  month,
  title,
  time,
  location,
}: IncomingEventCardProps) {
  return (
    <div className="flex items-center gap-4 p-4 bg-second-300 hover:bg-second-100 rounded-[18px] transition-all duration-500 cursor-pointer">
      <div className="flex flex-col items-center justify-center bg-[var(--BRAND-500)] text-white rounded-xl px-3 py-2 min-w-[60px]">
        <span className="text-2xl font-bold">{date}</span>
        <span className="text-xs uppercase font-medium">{month}</span>
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 mb-1 text-[15px]">
          {title}
        </h3>
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            <span className="truncate">{location}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export interface IncomingTripCardProps {
  origin: string;
  destination: string;
  dateTime: string;
  availableSeats: string;
  isToday: boolean;
}

function IncomingTripCard({
  origin,
  destination,
  dateTime,
  availableSeats,
  isToday,
}: IncomingTripCardProps) {
  return (
    <div className="flex flex-col gap-3 p-4 bg-second-300 hover:bg-second-100 rounded-[18px] transition-all duration-500 cursor-pointer">
      <div className="flex items-center gap-2 text-[15px] font-semibold">
        <span className="text-gray-900">{origin}</span>
        <ChevronRight className="w-4 h-4 text-[var(--BRAND-500)]" />
        <span className="text-gray-900">{destination}</span>
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-1 text-gray-600">
          <Clock className="w-3.5 h-3.5" />
          <span>{dateTime}</span>
        </div>
        <div className="flex items-center gap-1 text-gray-500">
          <Compass className="w-3.5 h-3.5" />
          <span>{availableSeats}</span>
        </div>
      </div>
    </div>
  );
}

export default function IncomingAccordion({ events = [], trips = [] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [openItems, setOpenItems] = useState<string[]>(["events", "trips"]);

  // Données par défaut pour la démo
  const defaultEvents = [
    {
      id: 1,
      date: "15",
      month: "Déc",
      title: "After Work Networking",
      time: "18:00",
      location: "Cotonou",
    },
    {
      id: 2,
      date: "18",
      month: "Déc",
      title: "Beach Party",
      time: "14:00",
      location: "Fidjrossè",
    },
    {
      id: 3,
      date: "20",
      month: "Déc",
      title: "Concert Jazz",
      time: "20:00",
      location: "Institut Français",
    },
    {
      id: 4,
      date: "22",
      month: "Déc",
      title: "Marathon de Cotonou",
      time: "07:00",
      location: "Stade de l'Amitié",
    },
  ];

  const defaultTrips = [
    {
      id: 1,
      origin: "Cotonou",
      destination: "Porto-Novo",
      dateTime: "Aujourd'hui • 15:30",
      availableSeats: "3 places disponibles",
      isToday: true,
    },
    {
      id: 2,
      origin: "Abomey",
      destination: "Cotonou",
      dateTime: "Demain • 08:00",
      availableSeats: "2 places disponibles",
      isToday: false,
    },
    {
      id: 3,
      origin: "Parakou",
      destination: "Cotonou",
      dateTime: "23 Déc • 10:00",
      availableSeats: "4 places disponibles",
      isToday: false,
    },
  ];

  const displayEvents = events.length > 0 ? events : defaultEvents;
  const displayTrips = trips.length > 0 ? trips : defaultTrips;

  // Filtrage
  const filteredEvents = displayEvents.filter((event) =>
    searchQuery
      ? event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase())
      : true
  );

  const filteredTrips = displayTrips.filter((trip) =>
    searchQuery
      ? trip.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trip.destination.toLowerCase().includes(searchQuery.toLowerCase())
      : true
  );

  const totalItems = displayEvents.length + displayTrips.length;

  return (
    <div className="h-screen flex flex-col bg-white max-w-md mx-auto">
      <style>{`
        :root {
          --BRAND-500: #f4a261;
          --BRAND-300: #f4a261;
        }
        [data-state="open"] > button {
          background-color: transparent;
        }
      `}</style>

      {/* Header */}
      <div className="px-4 pt-4 pb-3 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-brand-800">À venir</h1>
          <span className="bg-second-500 text-white text-xs font-medium px-2.5 py-1 rounded-full">
            {totalItems} {totalItems > 1 ? "éléments" : "élément"}
          </span>
        </div>
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Rechercher un événement ou trajet"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--BRAND-500)] focus:bg-white transition-colors placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {filteredEvents.length === 0 && filteredTrips.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 p-8">
            <Calendar className="w-16 h-16 mb-4 text-gray-300" />
            <p className="text-lg font-medium">Aucun résultat</p>
            <p className="text-sm text-center mt-2">
              {searchQuery
                ? "Essayez avec d'autres mots-clés"
                : "Aucun événement ou trajet à venir"}
            </p>
          </div>
        ) : (
          <Accordion
            type="multiple"
            value={openItems}
            onValueChange={setOpenItems}
            className="w-full"
          >
            {/* Événements */}
            {filteredEvents.length > 0 && (
              <AccordionItem
                value="events"
                className="border-b border-gray-100"
              >
                <AccordionTrigger className="p-0 hover:no-underline [&[data-state=open]]:bg-transparent">
                  <div className="flex items-center justify-between w-full px-4 py-3 hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="bg-purple-100 p-2.5 rounded-lg mt-0.5">
                        <Calendar className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="flex-1 text-left">
                        <h2 className="font-semibold text-gray-900 text-[15px] mb-1">
                          Événements
                        </h2>
                        <p className="text-xs text-gray-500">
                          Prochains événements à ne pas manquer
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 ml-3">
                      <span className="text-xs text-gray-600 font-normal whitespace-nowrap">
                        {filteredEvents.length} événement
                        {filteredEvents.length > 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-0 pt-0">
                  <div className="bg-second-50 rounded-[12px] p-[3%] flex flex-col gap-y-2">
                    {filteredEvents.map((event) => (
                      <IncomingEventCard
                        key={event.id}
                        date={event.date}
                        month={event.month}
                        title={event.title}
                        time={event.time}
                        location={event.location}
                      />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}

            {/* Trajets */}
            {filteredTrips.length > 0 && (
              <AccordionItem value="trips" className="border-b border-gray-100">
                <AccordionTrigger className="p-0 hover:no-underline [&[data-state=open]]:bg-transparent">
                  <div className="flex items-center justify-between w-full px-4 py-3 hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="bg-[#fde6d4] p-2.5 rounded-lg mt-0.5">
                        <Compass className="w-5 h-5 text-[var(--BRAND-500)]" />
                      </div>
                      <div className="flex-1 text-left">
                        <h2 className="font-semibold text-gray-900 text-[15px] mb-1">
                          Trajets
                        </h2>
                        <p className="text-xs text-gray-500">
                          Vos prochains voyages planifiés
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 ml-3">
                      <span className="text-xs text-gray-600 font-normal whitespace-nowrap">
                        {filteredTrips.length} trajet
                        {filteredTrips.length > 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-0 pt-0">
                  <div className="bg-second-50 rounded-[12px] p-[3%] flex flex-col gap-y-2">
                    {filteredTrips.map((trip) => (
                      <IncomingTripCard
                        key={trip.id}
                        origin={trip.origin}
                        destination={trip.destination}
                        dateTime={trip.dateTime}
                        availableSeats={trip.availableSeats}
                        isToday={trip.isToday}
                      />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>
        )}
      </div>
    </div>
  );
}
