import api from "@/lib/axios";
import type { PaginatedNotificationsDto } from "./types";

export const notificationsControllerFindAll = async (params?: {
  page?: number;
  limit?: number;
}): Promise<PaginatedNotificationsDto> => {
  const { data } = await api.get<PaginatedNotificationsDto>("/notifications", {
    params,
  });
  return data;
};

export const notificationsControllerMarkAsRead = async (
  id: string,
): Promise<void> => {
  await api.patch(`/notifications/${id}/read`);
};

export const notificationsControllerMarkAllAsRead = async (): Promise<void> => {
  await api.patch("/notifications/read-all");
};
