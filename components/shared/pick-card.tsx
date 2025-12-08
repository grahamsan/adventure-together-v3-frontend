"use client";

import * as React from "react";
import { cn } from "@/lib/utils"; // utilitaire shadcn pour fusionner les classes optionnelles

export interface PickCardProps {
  handleClick: () => void;
  title: string;
  description: string;
  icon: React.ReactNode;
  isSelected?: boolean;
}

/**
 * Composant de carte sélectionnable pour choisir un rôle ou une option
 */
export default function PickCard({
  handleClick,
  title,
  description,
  icon,
  isSelected = false,
}: PickCardProps) {
  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "lg:max-w-[500px] w-full bg-white/80 cursor-pointer border-2 p-4 rounded-[18px] flex flex-col gap-y-2 transition-all duration-300",
        "hover:scale-105 active:scale-100 hover:shadow-sm text-left",
        isSelected
          ? "bg-[var(--BRAND-500)] border-[var(--BRAND-500)] text-white"
          : "border-[var(--BRAND-500)] hover:bg-[var(--BRAND-500)]/60 hover:text-white"
      )}
    >
      <span>{icon}</span>
      <span
        className={cn(
          "font-semibold text-[18px]",
          isSelected ? "text-white" : "text-gray-700"
        )}
      >
        {title}
      </span>
      <p
        className={cn(
          "text-[14px]",
          isSelected ? "text-white/90" : "text-gray-500"
        )}
      >
        {description}
      </p>
    </button>
  );
}
