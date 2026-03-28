"use client";

import type { CSSProperties } from "react";
import type { CreatePlaceDto } from "@/api/places/types";
import { motion } from "framer-motion";
import { Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";

const TYPE_LABEL: Record<CreatePlaceDto["type"], string> = {
  Ville: "Ville",
  Monument: "Monument",
  Musée: "Musée",
  Parc: "Parc & loisirs",
  Hotel: "Hôtels & restauration",
};

export type PlaceListItem = {
  id: string;
  title: string;
  description: string;
  type: CreatePlaceDto["type"];
  imageUrl?: string | null;
};

type PlaceBentoCardProps = {
  place: PlaceListItem;
  /** Desktop : placement calculé (grille 12 col). */
  gridStyle?: CSSProperties;
  /** Délai d’apparition en cascade. */
  motionIndex?: number;
};

const FALLBACK_IMG = "/images/hills-1.jpg";

export default function PlaceBentoCard({
  place,
  gridStyle,
  motionIndex = 0,
}: PlaceBentoCardProps) {
  const src = place.imageUrl?.trim() || FALLBACK_IMG;

  return (
    <motion.article
      className={cn(
        "group relative w-full min-h-0 cursor-pointer",
        "max-md:min-h-[min(58vh,392px)]",
      )}
      style={gridStyle}
      initial={{ opacity: 0, y: 22, scale: 0.98, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      transition={{
        type: "spring",
        damping: 28,
        stiffness: 320,
        mass: 0.85,
        delay: motionIndex * 0.055,
      }}
    >
      {/* Anneau « liquid glass » animé */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-[2px] z-0 rounded-2xl"
        style={{
          background:
            "linear-gradient(125deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.12) 35%, rgba(255,255,255,0.08) 55%, rgba(255,255,255,0.45) 100%)",
          backgroundSize: "220% 220%",
        }}
        animate={{
          backgroundPosition: ["0% 40%", "100% 60%", "0% 40%"],
          opacity: [0.55, 0.9, 0.55],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <div className="absolute inset-px z-[1] rounded-2xl bg-muted/90 backdrop-blur-[2px] dark:bg-zinc-800/90" />
      <div className="relative z-[2] flex h-full min-h-0 flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] sm:rounded-2xl">
        {/* eslint-disable-next-line @next/next/no-img-element -- URLs dynamiques */}
        <img
          src={src}
          alt=""
          className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
        <button
          type="button"
          className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 backdrop-blur-md transition hover:bg-white/25 md:right-4 md:top-4"
          aria-label="Favori"
        >
          <Bookmark className="h-5 w-5 text-white" />
        </button>
        <div className="relative mt-auto p-4 text-white md:p-6">
          <span className="mb-2 inline-block rounded-full border border-white/40 bg-black/20 px-2.5 py-0.5 text-[10px] uppercase tracking-widest text-white/95 backdrop-blur-sm md:text-xs">
            {TYPE_LABEL[place.type]}
          </span>
          <h3 className="text-lg font-bold leading-tight line-clamp-2 md:text-2xl">
            {place.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-white/85 md:text-base">
            {place.description}
          </p>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-px z-[3] rounded-2xl shadow-sm ring-1 ring-black/5 ring-inset dark:ring-white/15" />
    </motion.article>
  );
}
