import type { NotificationDto } from "@/api/notifications/types";

/** Alias aligné sur le DTO backend */
export type Notification = NotificationDto;

export type NotificationBackendType = "trip" | "message" | "reminder";

export interface NotificationFilters {
  type: NotificationBackendType | null;
  experience: string;
  trip: string;
}
