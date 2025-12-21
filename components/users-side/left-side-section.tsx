"use client";

import { ReactNode } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Compass, Map, Activity, Car } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

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
    label: "Événements",
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
  userRole,
  userAvatar,
  userFullName,
}: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="sticky top-0 left-0 h-screen w-[20vw] max-w-[25vw] bg-transparent border-r border-gray-200 flex flex-col justify-between">
      {/* Logo */}
      <div className="px-6 py-5">
        <h1 className="text-xl font-bold" style={{ color: "var(--BRAND-500)" }}>
          AdventureTogether
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col px-4 gap-1">
        {navigationItems
          .filter((item) => userHasAccess(item, userRole))
          .map((item) => (
            <button
              key={item.label}
              onClick={() => router.push(item.path)}
              className={`flex items-center gap-3 py-2 px-3 rounded-lg transition
    ${
      pathname === item.path || pathname.startsWith(item.path)
        ? "bg-[var(--BRAND-500)] text-white"
        : "text-gray-700 hover:bg-gray-100"
    }
  `}
            >
              <span
                className={
                  pathname === item.path || pathname.startsWith(item.path)
                    ? "text-white"
                    : "text-[var(--BRAND-500)]"
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
        <Avatar className="w-10 h-10">
          <AvatarImage src={userAvatar} />
          <AvatarFallback>{userFullName?.[0] || "?"}</AvatarFallback>
        </Avatar>

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
