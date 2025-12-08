'use client';

import { useState, useEffect } from 'react';
import { Notification, NotificationFilters } from '@/features/notifications/types';
import { fetchNotifications, markAsRead, markAllAsRead } from '@/features/notifications/api';
import { NotificationItem } from './notif-item';
import { NotificationEmptyState } from './empty-state';
import { Check } from 'lucide-react';

interface NotificationListProps {
  filters: NotificationFilters;
}

export function NotificationList({ filters }: NotificationListProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    setLoading(true);
    const data = await fetchNotifications();
    setNotifications(data);
    setLoading(false);
  };

  const handleMarkAsRead = async (id: string) => {
    await markAsRead(id);
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const handleMarkAllAsRead = async () => {
    await markAllAsRead();
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
  };

  // Filtrer les notifications
  const filteredNotifications = notifications.filter((notification) => {
    if (filters.type && notification.type !== filters.type) return false;
    
    if (filters.experience && !notification.title.toLowerCase().includes(filters.experience.toLowerCase())) {
      return false;
    }
    
    if (filters.trip && notification.tripId && !notification.tripId.includes(filters.trip)) {
      return false;
    }
    
    return true;
  });

  const unreadCount = filteredNotifications.filter((n) => !n.isRead).length;

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-50 max-h-screen overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4 flex items-center justify-between flex-shrink-0">
        <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllAsRead}
            className="text-blue-500 text-sm font-medium hover:text-blue-600 transition-colors flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
           Tout marquer comme lu
          </button>
        )}
      </div>

      {/* Liste */}
      <div  className="flex-1 overflow-y-auto p-4 pb-25 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {filteredNotifications.length === 0 ? (
          <NotificationEmptyState />
        ) : (
          <div className="p-6 space-y-3">
            {filteredNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onClick={() => handleMarkAsRead(notification.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
