export type BackendNotificationType =
  | "trip"
  | "message"
  | "reminder"
  | string;

export type NotificationPriority = "low" | "normal" | "high" | string;

export interface NotificationAction {
  targetRoute?: string;
  params?: Record<string, string>;
}

export interface NotificationMeta {
  kind?: string;
  tripId?: string;
  ownerId?: string;
  tripStatus?: string;
  accepted?: boolean;
  [key: string]: unknown;
}

export interface NotificationDto {
  id: string;
  title: string;
  description?: string;
  type: BackendNotificationType;
  priority: NotificationPriority;
  isRead: boolean;
  timestamp: string;
  action?: NotificationAction;
  meta?: NotificationMeta;
}

export interface PaginatedNotificationsDto {
  data: NotificationDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
