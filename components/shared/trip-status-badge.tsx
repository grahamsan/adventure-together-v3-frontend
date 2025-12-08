import React from "react";

interface StatusBadgeProps {
  status: "ouvert" | "complet" | "terminé";
}

const statusStyles: Record<StatusBadgeProps["status"], string> = {
  complet: "text-yellow-600 bg-yellow-100",
  ouvert: "text-green-600 bg-green-100",
  terminé: "text-stone-600 bg-stone-100",
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`rounded-full p-2 w-fit text-xs font-medium ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}
