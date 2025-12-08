import { House, Calendar, Compass, Mail, Bell } from "lucide-react";

export interface UsersNavValues {
  name: string;
  path: string;
  icon: React.ReactNode;
}

export const UsersNavValues: UsersNavValues[] = [
  {
    name: "Accueil",
    path: "/home",
    icon: <House />,
  },
  {
    name: "Experiences",
    path: "/experiences",
    icon: <Calendar />,
  },
  {
    name: "Messages",
    path: "/messages",
    icon: <Mail />,
  },
  {
    name: "Trajets",
    path: "/trips",
    icon: <Compass />,
  },
  {
    name: "Notifications",
    path: "/notifications",
    icon: <Bell />,
  },
];
