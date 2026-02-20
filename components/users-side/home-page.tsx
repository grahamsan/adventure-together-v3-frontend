"use client";
import EventSquareCard from "../shared/event-square-card";
import { useExperiencesControllerFindAll } from "@/api/experiences/hooks";
import { CalendarSearch } from "lucide-react";
import { motion } from "framer-motion";
import EventsPageBanner from "./layouts/banners/events-page-banner";

export default function HomePage() {
  const { data: experiencesResponse, isLoading } =
    useExperiencesControllerFindAll();

  return (
    <div className="w-full h-screen flex flex-1 flex-col items-center gap-y-2 px-4">
      <EventsPageBanner />
      {isLoading ? (
        <div className="flex flex-col items-center gap-y-2 items-center justify-center w-full h-full">
          <CalendarSearch className="w-32 h-32 animate-pulse text-zinc-200" />
          <p className="text-zinc-600 font-semibold text-[18px]">
            Chargement des experiences...
          </p>
        </div>
      ) : (
        <div
          className="overflow-y-auto overflow-x-hidden scrollbar-custom 
          flex flex-1 w-full justify-center items-center flex-col md:grid md:grid-cols-2
       gap-2 px-20 pb-2"
        >
          {experiencesResponse?.data.map((experience, index) => (
            <motion.div
              key={experience.id}
              layout
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{
                layout: {
                  type: "spring",
                  stiffness: 350,
                  damping: 30,
                },
                opacity: { duration: 0.3, delay: index * 0.05 },
                x: { duration: 0.3, delay: index * 0.05 },
              }}
              className="flex-1"
            >
              <EventSquareCard key={experience.id} experience={experience} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
