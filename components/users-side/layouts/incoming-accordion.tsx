import { Calendar, Compass, Clock, MapPin, ChevronRight } from "lucide-react";
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
    <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
      <div className="flex flex-col items-center justify-center bg-[var(--BRAND-300)] text-white rounded-lg px-3 py-2 min-w-[60px]">
        <span className="text-2xl font-bold">{date}</span>
        <span className="text-xs uppercase">{month}</span>
      </div>

      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
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
    <div className="flex flex-col items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
      <div className="flex items-center gap-x-3 flex-1 w-full text-[15px] font-semibold">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-900">{origin}</span>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-900">{destination}</span>
        </div>
      </div>

      <div className="flex items-center gap-4 w-full">
        <div className="text-sm text-gray-600">{dateTime}</div>
        <div className="text-xs text-gray-500">{availableSeats}</div>
      </div>
    </div>
  );
}

export default function IncomingAccordion({ events = [], trips = [] }) {
  // Données par défaut pour la démo
  const defaultEvents = [
    {
      id: 1,
      date: "15",
      month: "Nov",
      title: "After Work",
      time: "18:00",
      location: "Cotonou",
    },
    {
      id: 2,
      date: "18",
      month: "Nov",
      title: "Beach Party",
      time: "14:00",
      location: "Bali",
    },
    {
      id: 3,
      date: "20",
      month: "Nov",
      title: "Concert Jazz",
      time: "20:00",
      location: "Paris",
    },
  ];

  const defaultTrips = [
    {
      id: 1,
      origin: "Cotonou",
      destination: "Porto-Novo",
      dateTime: "Aujourd'hui • 15:30",
      availableSeats: "3 places",
      isToday: true,
    },
    {
      id: 2,
      origin: "Abomey",
      destination: "Cotonou",
      dateTime: "Demain • 08:00",
      availableSeats: "2 places",
      isToday: false,
    },
  ];

  const displayEvents = events.length > 0 ? events : defaultEvents;
  const displayTrips = trips.length > 0 ? trips : defaultTrips;

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <Accordion
        type="single"
        collapsible
        defaultValue="item-1"
        className="w-full space-y-4"
      >
        <AccordionItem
          value="item-1"
          className="border rounded-2xl px-4 bg-white"
        >
          <AccordionTrigger className="hover:no-underline py-4">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <Calendar className="w-5 h-5 text-[var(--BRAND-500)]" />
              <span>Événements</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-4">
            <div className="space-y-3 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
              {displayEvents.map((event) => (
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

        <AccordionItem
          value="item-2"
          className="border rounded-2xl px-4 bg-white"
        >
          <AccordionTrigger className="hover:no-underline py-4">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <Compass className="w-5 h-5 text-[var(--BRAND-500)]" />
              <span>Trajets</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-4">
            <div className="space-y-3 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
              {displayTrips.map((trip) => (
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
      </Accordion>
    </div>
  );
}
