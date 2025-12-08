"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  AlertCircle,
  Shield,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  {
    name: "Tableau de bord",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Utilisateurs",
    path: "/user-management",
    icon: Users,
  },
  {
    name: "Rapports",
    path: "/reports",
    icon: AlertCircle,
  },
  {
    name: "Admins",
    path: "/admins",
    icon: Shield,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = () => {
    // TODO: Implement actual logout logic
    console.log("Logging out...");
    window.location.href = "/admin-login";
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
      >
        {isMobileOpen ? (
          <X className="w-6 h-6 text-gray-700" />
        ) : (
          <Menu className="w-6 h-6 text-gray-700" />
        )}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-screen bg-white border-r border-gray-200 transition-all duration-300 z-40 w-24",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-center">
            <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              const Icon = item.icon;

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    "flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg transition-all duration-200",
                    isActive
                      ? "bg-blue-500 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  )}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="text-[10px] font-medium text-center leading-tight">
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-2 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full flex flex-col items-center justify-center gap-1 px-2 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all"
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              <span className="text-[10px] font-medium">Déconnexion</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
