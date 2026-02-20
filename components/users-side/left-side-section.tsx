"use client";

import { ReactNode } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Compass, Map, Activity, Car } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useGetUserRole } from "@/api/app/hooks";
import UserAvatarComponent from "../shared/user-avatar-component";

interface NavigationItem {
  label: string;
  icon: ReactNode;
  path: string;
  roles?: string[]; // optional list of roles allowed
}

// 🔥 Fonction que tu modifieras pour gérer l'affichage dynamique selon le rôle
const userHasAccess = (item: NavigationItem, role: string) => {
  if (!item.roles) return true; // aucune restriction
  return item.roles.includes(role);
};

const navigationItems: NavigationItem[] = [
  {
    label: "Expériences",
    icon: <Calendar className="w-5 h-5" />,
    path: "/home",
  },
  {
    label: "Trajets",
    icon: <Compass className="w-5 h-5" />,
    path: "/trips",
  },
  {
    label: "Lieux",
    icon: <Map className="w-5 h-5" />,
    path: "/places",
  },
  {
    label: "Statistiques",
    icon: <Activity className="w-5 h-5" />,
    path: "/stats",
    roles: ["admin"], // exemple : visible uniquement pour admin
  },
  {
    label: "Véhicules",
    icon: <Car className="w-5 h-5" />,
    path: "/vehicles",
  },
];

interface SidebarProps {
  userRole: string;
  userAvatar: string;
  userFullName: string;
}

export default function LeftSideSection({
  userRole, // Keeping props for backward compatibility or initial load if needed, but we'll prioritize the hook
  userAvatar,
  userFullName,
}: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isDriver, isAdmin, role: hookRole } = useGetUserRole();

  // Use role from hook if available, otherwise prop
  const currentRole = hookRole || userRole;

  return (
    <div
      className="mt-4 ml-4 bg-white sticky top-0 left-0 h-[95vh] w-[15vw] max-w-[25vw] bg-transparent 
    border-r border-gray-200 flex flex-col justify-between rounded-[24px]"
    >
      {/* Logo */}
      <div className="flex itzms-center w-full justify-center p-2">
        <img src="/at.png" alt="logo" className="w-52 h-20" />
      </div>

      {/* Navigation */}
      <nav className="flex flex-col px-4 gap-1">
        {navigationItems
          .filter((item) => {
            // Special check for Vehicles: only drivers
            if (item.label === "Véhicules" && !isDriver) return false;

            // General role check using the helper
            return userHasAccess(item, currentRole);
          })
          .map((item) => (
            <button
              key={item.label}
              onClick={() => router.push(item.path)}
              className={` cursor-pointer flex items-center gap-3 py-2 px-3 rounded-lg transition
    ${
      pathname === item.path || pathname.startsWith(item.path)
        ? "bg-brand-500 text-white"
        : "text-gray-700 hover:bg-gray-100"
    }
  `}
            >
              <span
                className={
                  pathname === item.path || pathname.startsWith(item.path)
                    ? "text-white"
                    : "text-brand-600"
                }
              >
                {item.icon}
              </span>

              <span className="font-medium text-sm">{item.label}</span>
            </button>
          ))}
      </nav>

      {/* Profil */}
      <div className="p-4 border-t border-gray-200 flex items-center gap-3">
        <UserAvatarComponent
          fullname={userFullName}
          avatar={userAvatar}
          size={40}
        />
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-gray-900">
            {userFullName}
          </span>
          <span className="text-xs text-green-600">En ligne</span>
        </div>
      </div>
    </div>
  );
}
