// Auto-generated hooks
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { appControllerGetHello } from "./api";

// Query Hooks

export const useAppControllerGetHello = () => {
  return useQuery({
    queryKey: queryKeys.app.lists(),
    queryFn: appControllerGetHello,
  });
};

import { useUserControllerGetMe } from "../users/hooks";

export const useGetUserRole = () => {
  const { data: user, isLoading, isError } = useUserControllerGetMe();

  const role = user?.role;

  return {
    isParticipant: role === "Participant",
    isAdmin: role === "Admin",
    isOrganizer: role === "Organizer",
    isDriver: role === "Driver",
    isLoading,
    isError,
    role,
  };
};
