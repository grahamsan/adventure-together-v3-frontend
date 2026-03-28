"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Menu, LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useGetUserRole } from "@/api/app/hooks";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import UserAvatarComponent from "../shared/user-avatar-component";
import {
  APP_NAV_ITEMS,
  filterVisibleNavItems,
  isNavItemActive,
} from "./app-core-nav-items";

type AppCoreMobileNavProps = {
  userRole: string;
  userAvatar: string;
  userFullName: string;
};

export function AppCoreMobileNav({
  userRole,
  userAvatar,
  userFullName,
}: AppCoreMobileNavProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const { isDriver, role: hookRole } = useGetUserRole();
  const currentRole = hookRole || userRole;

  const visible = filterVisibleNavItems(APP_NAV_ITEMS, {
    role: currentRole,
    isDriver,
  });

  const navigate = (path: string) => {
    router.push(path);
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("REFRESH_TOKEN");
    queryClient.clear();
    setOpen(false);
    router.push("/login");
  };

  return (
    <>
      <header className="md:hidden shrink-0 flex h-14 items-center justify-between gap-2 border-b border-gray-200 bg-white/95 px-3 backdrop-blur supports-[backdrop-filter]:bg-white/80 z-30">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-11 w-11 shrink-0"
          aria-label="Ouvrir le menu"
          onClick={() => setOpen(true)}
        >
          <Menu className="h-6 w-6 text-gray-800" />
        </Button>
        <img
          src="/at.png"
          alt="Adventure Together"
          className="h-10 w-auto object-contain max-w-[140px]"
        />
        <div className="w-11 shrink-0" aria-hidden />
      </header>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="left"
          className="w-[min(100%,20rem)] max-md:w-full p-0 flex flex-col gap-0"
        >
          <SheetHeader className="border-b border-gray-100 p-4 pr-14 text-left space-y-1">
            <SheetTitle className="text-base font-semibold">Menu</SheetTitle>
            <p className="text-xs text-gray-500 font-normal">
              Navigation principale
            </p>
          </SheetHeader>

          <nav className="flex flex-col gap-1 p-3 flex-1 overflow-y-auto">
            {visible.map((item) => {
              const active = isNavItemActive(pathname, item.path);
              const Icon = item.Icon;
              return (
                <button
                  key={item.path}
                  type="button"
                  onClick={() => navigate(item.path)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-medium transition min-h-[44px] ${
                    active
                      ? "bg-brand-500 text-white"
                      : "text-gray-800 hover:bg-gray-100"
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 shrink-0 ${active ? "text-white" : "text-brand-600"}`}
                  />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="border-t border-gray-200 p-3 space-y-2">
            <div className="flex items-center gap-3 px-2 py-2">
              <UserAvatarComponent
                fullname={userFullName}
                avatar={userAvatar}
                size={40}
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {userFullName}
                </p>
                <p className="text-xs text-green-600">En ligne</p>
              </div>
            </div>
            <Button
              type="button"
              variant="outline"
              className="w-full justify-start gap-2 text-red-600 border-red-200 hover:bg-red-50 min-h-[44px]"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Déconnexion
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
