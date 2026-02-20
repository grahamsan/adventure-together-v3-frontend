export interface GetNotificationsParams {
  page?: number;
  limit?: number;
}

export type NotificationType = "message" | "trip" | "reminder";
export type NotificationPriority = "low" | "normal" | "high";

export interface NotificationAction {
  params: Record<string, string>;
  targetRoute: string;
}

export interface NotificationMeta {
  senderId?: string;
  conversationId?: string;
  tripId?: string;
  applicantId?: string;
  accepted?: boolean;
  reminderKey?: string;
  daysBeforeTrip?: number;
}

export interface Notification {
  id: string;
  title: string;
  description: string;
  type: NotificationType;
  priority: NotificationPriority;
  isRead: boolean;
  timestamp: string; // ISO string
  action: NotificationAction;
  meta: NotificationMeta;
}

export interface PaginatedNotificationsResponse {
  data: Notification[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
