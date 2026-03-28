import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryOptions,
} from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import {
  notificationsControllerFindAll,
  notificationsControllerMarkAsRead,
  notificationsControllerMarkAllAsRead,
} from "./api";
import type { PaginatedNotificationsDto } from "./types";

export const useNotificationsControllerFindAll = (
  params?: {
    page?: number;
    limit?: number;
  },
  options?: Omit<
    UseQueryOptions<PaginatedNotificationsDto>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery({
    queryKey: queryKeys.notifications.list(params),
    queryFn: () => notificationsControllerFindAll(params),
    ...options,
  });
};

export const useNotificationsControllerMarkAsRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => notificationsControllerMarkAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications.all });
    },
  });
};

export const useNotificationsControllerMarkAllAsRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => notificationsControllerMarkAllAsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications.all });
    },
  });
};
