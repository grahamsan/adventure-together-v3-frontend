'use client';

import { Notification, NotificationType } from '@/features/notifications/types';

interface NotificationItemProps {
  notification: Notification;
  onClick?: () => void;
}

const typeColors: Record<NotificationType, string> = {
  alerte: 'bg-orange-400',
  rappel: 'bg-blue-400',
  info: 'bg-green-400',
};

const typeBgColors: Record<NotificationType, string> = {
  alerte: 'bg-orange-50',
  rappel: 'bg-blue-50',
  info: 'bg-green-50',
};

const typeIcons: Record<NotificationType, string> = {
  alerte: '⚠️',
  rappel: '⏰',
  info: 'ℹ️',
};

export function NotificationItem({ notification, onClick }: NotificationItemProps) {
  return (
    <div
      onClick={onClick}
      className={`flex gap-3 p-4 rounded-xl border transition-all cursor-pointer hover:shadow-md ${
        notification.isRead ? 'bg-white border-gray-100' : `${typeBgColors[notification.type]} border-transparent`
      }`}
    >
      {/* Dot indicateur */}
      <div className="flex-shrink-0 flex items-start pt-1">
        <div className={`w-2 h-2 rounded-full ${typeColors[notification.type]}`} />
      </div>

      {/* Contenu */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm ${notification.isRead ? 'text-gray-700' : 'text-gray-900 font-medium'}`}>
          {notification.title}
        </p>
        {notification.description && (
          <p className="text-xs text-gray-500 mt-1">{notification.description}</p>
        )}
        <p className="text-xs text-gray-400 mt-1">{notification.timestamp}</p>
      </div>

      {/* Badge non lu */}
      {!notification.isRead && (
        <div className="flex-shrink-0">
          <div className="w-2 h-2 rounded-full bg-blue-500" />
        </div>
      )}
    </div>
  );
}
