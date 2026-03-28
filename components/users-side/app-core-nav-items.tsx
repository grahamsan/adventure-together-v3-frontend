import {
  Calendar,
  Compass,
  Map,
  Activity,
  Car,
  type LucideIcon,
} from "lucide-react";

export type AppNavItem = {
  label: string;
  path: string;
  Icon: LucideIcon;
  /** Rôles autorisés (ex. Admin). Si absent, tout le monde voit l’entrée. */
  roles?: string[];
};

export const APP_NAV_ITEMS: AppNavItem[] = [
  { label: "Expériences", path: "/home", Icon: Calendar },
  { label: "Trajets", path: "/trips", Icon: Compass },
  { label: "Lieux", path: "/places", Icon: Map },
  { label: "Statistiques", path: "/stats", Icon: Activity, roles: ["Admin"] },
  { label: "Véhicules", path: "/vehicles", Icon: Car },
];

function isAdminRole(role: string): boolean {
  return role === "Admin" || role === "admin";
}

export function userHasAccessToNavItem(
  item: AppNavItem,
  userRole: string,
): boolean {
  if (!item.roles?.length) return true;
  return item.roles.some((required) => {
    if (required === "Admin") return isAdminRole(userRole);
    return userRole === required;
  });
}

export function filterVisibleNavItems(
  items: AppNavItem[],
  context: { role: string; isDriver: boolean },
): AppNavItem[] {
  return items.filter((item) => {
    if (item.label === "Véhicules" && !context.isDriver) return false;
    return userHasAccessToNavItem(item, context.role);
  });
}

export function isNavItemActive(pathname: string, itemPath: string): boolean {
  if (pathname === itemPath) return true;
  if (itemPath === "/home" && pathname === "/") return true;
  return pathname.startsWith(`${itemPath}/`);
}
