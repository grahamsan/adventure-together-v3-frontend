// notification-types.ts
export type NotificationType = 'alerte' | 'rappel' | 'info';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
  tripId?: string;
  experienceId?: string;
}

export interface NotificationFilters {
  type: NotificationType | null;
  experience: string;
  trip: string;
}