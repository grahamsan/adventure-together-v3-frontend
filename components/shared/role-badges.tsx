"use client";
import {
  Puzzle,
  Globe2,
  CarFront,
  Shield,
  User,
} from "lucide-react";

// 🔒 Rôles autorisés
type RoleType = "Participant" | "Organizer" | "Admin" | "Driver";

interface RoleBadgeProps {
  role: RoleType;
}

export default function RoleBadge({ role }: RoleBadgeProps) {
  const roleConfig = {
    Participant: {
      icon: <Globe2 className="w-5 h-5 text-green-600" />,
      bg: "bg-green-300",
      color: "text-green-600",
    },
    Organizer: {
      icon: <Puzzle className="w-5 h-5 text-purple-600" />,
      bg: "bg-purple-300",
      color: "text-purple-600",
    },
    Admin: {
      icon: <Shield className="w-5 h-5 text-blue-600" />,
      bg: "bg-blue-300",
      color: "text-blue-600",
    },
    Driver: {
      icon: <CarFront className="w-5 h-5 text-orange-600" />,
      bg: "bg-orange-300",
      color: "text-orange-600",
    },
  } satisfies Record<
    RoleType,
    { icon: React.ReactNode; bg: string; color: string }
  >;

  const current = roleConfig[role] ?? {
    icon: <User className="w-5 h-5 text-gray-600" />,
    bg: "bg-gray-300",
    color: "text-gray-600",
  };

  return (
    <div
      className={` w-8 h-8 flex items-center justify-center gap-2 rounded-lg p-1 ${current.bg}`}
    >
      {current.icon}
    </div>
  );
}
