import React, { useState, useMemo } from "react";
import { Search, Bell, Calendar, MapPin, Users, CheckCheck, MessageSquare, AlertCircle } from "lucide-react";

// Types
type Notification = {
  id: number;
  type: "join" | "message" | "update" | "reminder" | "cancellation";
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  avatar?: string;
  tripName?: string;
};

// Données de test
const mockNotifications: Notification[] = [
  {
    id: 1,
    type: "join",
    title: "Nouveau participant",
    message: "Marie Dubois a rejoint votre trajet Cotonou → Port-Novo",
    timestamp: "Il y a 10 min",
    isRead: false,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marie",
    tripName: "Cotonou → Port-Novo",
  },
  {
    id: 2,
    type: "message",
    title: "Nouveau message",
    message: "Jean Martin : \"Je serai là à 14h précises\"",
    timestamp: "Il y a 1h",
    isRead: false,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jean",
    tripName: "Cotonou → Ouidah",
  },
  {
    id: 3,
    type: "reminder",
    title: "Rappel de trajet",
    message: "Votre trajet Parakou → Nikki commence dans 24 heures",
    timestamp: "Il y a 2h",
    isRead: false,
    tripName: "Parakou → Nikki",
  },
  {
    id: 4,
    type: "update",
    title: "Modification du trajet",
    message: "L'heure de départ a été modifiée pour le trajet Parakou → Nikki",
    timestamp: "Hier",
    isRead: true,
    tripName: "Parakou → Nikki",
  },
  {
    id: 5,
    type: "join",
    title: "Nouveau participant",
    message: "Emma Rousseau a rejoint votre trajet Bordeaux → Toulouse",
    timestamp: "Il y a 2 jours",
    isRead: true,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    tripName: "Bordeaux → Toulouse",
  },
  {
    id: 6,
    type: "message",
    title: "Nouveau message",
    message: "Sophie Laurent : \"On peut faire une pause café ?\"",
    timestamp: "Il y a 2 jours",
    isRead: true,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie",
    tripName: "Abomey → Bohicon",
  },
  {
    id: 7,
    type: "cancellation",
    title: "Trajet annulé",
    message: "Le trajet Lomé → Accra a été annulé par le conducteur",
    timestamp: "Il y a 3 jours",
    isRead: true,
    tripName: "Lomé → Accra",
  },
  {
    id: 8,
    type: "reminder",
    title: "Évaluation en attente",
    message: "N'oubliez pas d'évaluer votre trajet Natitingou → Tanguiéta",
    timestamp: "Il y a 4 jours",
    isRead: true,
    tripName: "Natitingou → Tanguiéta",
  },
  {
    id: 9,
    type: "update",
    title: "Point de rendez-vous modifié",
    message: "Le lieu de départ a changé pour le trajet Djougou → Parakou",
    timestamp: "Il y a 5 jours",
    isRead: true,
    tripName: "Djougou → Parakou",
  },
  {
    id: 10,
    type: "message",
    title: "Nouveau message",
    message: "Paul Kouassi : \"Merci pour le trajet, c'était super !\"",
    timestamp: "Il y a 1 semaine",
    isRead: true,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Paul",
    tripName: "Porto-Novo → Cotonou",
  },
];

// Utilitaires
const getNotificationIcon = (type: Notification["type"]) => {
  const iconClass = "w-5 h-5";
  switch (type) {
    case "join":
      return <Users className={iconClass} />;
    case "message":
      return <MessageSquare className={iconClass} />;
    case "update":
      return <MapPin className={iconClass} />;
    case "reminder":
      return <Bell className={iconClass} />;
    case "cancellation":
      return <AlertCircle className={iconClass} />;
    default:
      return <Bell className={iconClass} />;
  }
};

const getNotificationColor = (type: Notification["type"]) => {
  switch (type) {
    case "join":
      return "bg-green-100 text-green-600";
    case "message":
      return "bg-blue-100 text-blue-600";
    case "update":
      return "bg-orange-100 text-orange-600";
    case "reminder":
      return "bg-purple-100 text-purple-600";
    case "cancellation":
      return "bg-red-100 text-red-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

// Composants
const HighlightedText = ({ text, search }: { text: string; search: string }) => {
  if (!search.trim()) return <span>{text}</span>;

  const regex = new RegExp(
    `(${search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
    "gi"
  );
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-yellow-300 text-gray-900 rounded px-0.5">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
};

const NotificationCard = ({
  notification,
  searchQuery,
  onClick,
}: {
  notification: Notification;
  searchQuery: string;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-start gap-3 p-4 cursor-pointer 
      transition-all duration-300 rounded-[18px] border ${
        notification.isRead
          ? "bg-white hover:bg-gray-50 border-gray-100"
          : "bg-brand-50 hover:bg-brand-100 border-brand-300"
      }`}
    >
      <div className="relative flex-shrink-0">
        {notification.avatar ? (
          <img
            src={notification.avatar}
            alt="Avatar"
            className="w-12 h-12 rounded-full"
          />
        ) : (
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${getNotificationColor(
              notification.type
            )}`}
          >
            {getNotificationIcon(notification.type)}
          </div>
        )}
        {!notification.isRead && (
          <div className="absolute -top-1 -right-1 bg-[var(--BRAND-500)] w-3 h-3 rounded-full border-2 border-white"></div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between mb-1 gap-2">
          <h3
            className={`text-[15px] ${
              notification.isRead ? "font-medium text-gray-700" : "font-semibold text-gray-900"
            }`}
          >
            <HighlightedText text={notification.title} search={searchQuery} />
          </h3>
          <span className="text-xs text-gray-500 flex-shrink-0 mt-0.5">
            {notification.timestamp}
          </span>
        </div>

        <p
          className={`text-sm mb-1 ${
            notification.isRead ? "text-gray-500" : "text-gray-700"
          }`}
        >
          <HighlightedText text={notification.message} search={searchQuery} />
        </p>

        {notification.tripName && (
          <span className="inline-flex items-center gap-1 text-xs text-gray-400 mt-1">
            <MapPin className="w-3 h-3" />
            <HighlightedText text={notification.tripName} search={searchQuery} />
          </span>
        )}
      </div>
    </div>
  );
};

// Composant principal
export default function NotificationList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState(mockNotifications);

  const filteredNotifications = useMemo(() => {
    if (!searchQuery.trim()) return notifications;

    const query = searchQuery.toLowerCase();

    return notifications.filter(
      (notif) =>
        notif.title.toLowerCase().includes(query) ||
        notif.message.toLowerCase().includes(query) ||
        notif.tripName?.toLowerCase().includes(query)
    );
  }, [notifications, searchQuery]);

  const totalUnread = notifications.filter((n) => !n.isRead).length;

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, isRead: true }))
    );
  };

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, isRead: true } : notif))
    );
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 max-w-md mx-auto">
      <style>{`
        :root {
          --BRAND-500: #f4a261;
        }
      `}</style>

      {/* Header */}
      <div className="px-4 pt-4 pb-3 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-brand-800">Notifications</h1>
          {totalUnread > 0 && (
            <span className="bg-second-500 text-white text-xs font-medium px-2.5 py-1 rounded-full">
              {totalUnread} non lu{totalUnread > 1 ? "s" : ""}
            </span>
          )}
        </div>

        {totalUnread > 0 && (
          <button
            onClick={markAllAsRead}
            className="mb-3 flex items-center gap-2 text-sm text-[var(--BRAND-500)] hover:text-[var(--BRAND-600)] font-medium transition-colors"
          >
            <CheckCheck className="w-4 h-4" />
            Tout marquer comme lu
          </button>
        )}

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Rechercher une notification"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--BRAND-500)] focus:bg-white transition-colors placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {filteredNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <Bell className="w-16 h-16 mb-4 text-gray-300" />
            <p className="text-lg font-medium">Aucune notification</p>
            <p className="text-sm text-center mt-2">
              {searchQuery
                ? "Essayez avec d'autres mots-clés"
                : "Vous êtes à jour !"}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filteredNotifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                searchQuery={searchQuery}
                onClick={() => markAsRead(notification.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}