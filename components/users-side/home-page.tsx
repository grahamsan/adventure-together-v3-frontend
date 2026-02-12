"use client";
import EventSquareCard from "../shared/event-square-card";
import RightSideSection from "./right-side-section";
import LeftSideSection from "./left-side-section";
import AddNewSection from "./layouts/add-new-section";
import { useExperiencesControllerFindAll } from "@/api/experiences/hooks";
import { CalendarSearch } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function HomePage() {
  const { data: experiencesResponse, isLoading } =
    useExperiencesControllerFindAll();

  return (
    <div className="relative flex w-full justify-between min-h-screen">
      <LeftSideSection
        userRole="admin"
        userAvatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        userFullName="John Doe"
      />
      <AddNewSection userFullName="John Doe" />
      <div className="flex max-w-[50vw] justify-center items-center flex-col gap-y-2 pb-2 pt-20">
        {isLoading && (
          <div className="flex flex-col items-center gap-y-2">
            <CalendarSearch className="w-32 h-32 animate-pulse text-zinc-200" />
            <p className="text-zinc-600 font-semibold text-[18px]">
              Chargement des experiences...
            </p>
          </div>
        )}
        {!isLoading &&
          experiencesResponse?.data.map((experience, index) => (
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
            >
              <EventSquareCard key={experience.id} experience={experience} />
            </motion.div>
          ))}
      </div>
      <RightSideSection />
    </div>
  );
}
