// Auto-generated hooks
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import {
  tripsControllerFindAll,
  tripsControllerFindMine,
  tripsControllerCreate,
  tripsControllerApply,
  tripsControllerAcknowledgeTripCompletion,
  tripsControllerFindOne,
  tripsControllerUpdate,
  tripsControllerRemove,
  tripsControllerUpdateApply,
  tripsControllerDeleteApply,
  tripsControllerFindAllApplies,
  tripsControllerDecision,
  tripsControllerUpdateStatus,
} from "./api";
import type {
  CreateTripDto,
  ApplyToTripDto,
  ApplyDecisionDto,
  FindAllQueryParams,
  TripStatus,
} from "./types";

// Query Hooks

export const useTripsControllerFindAll = (
  params?: Partial<FindAllQueryParams>,
) => {
  const cleanedParams = Object.fromEntries(
    Object.entries(params ?? {}).filter(
      ([, value]) => value !== undefined && value !== false && value !== "",
    ),
  ) as Partial<FindAllQueryParams>;

  return useQuery({
    queryKey: queryKeys.trips.list(cleanedParams),
    queryFn: () => tripsControllerFindAll(cleanedParams),
  });
};

export const useTripsControllerFindMine = () => {
  return useQuery({
    queryKey: queryKeys.trips.mine(),
    queryFn: () => tripsControllerFindMine(),
  });
};

export const useTripsControllerFindOne = (id: string) => {
  return useQuery({
    queryKey: queryKeys.trips.detail(id),
    queryFn: () => tripsControllerFindOne(id),
    enabled: !!id,
  });
};

export const useTripsControllerFindAllApplies = (id: string) => {
  return useQuery({
    queryKey: queryKeys.trips.detail(id),
    queryFn: () => tripsControllerFindAllApplies(id),
    enabled: !!id,
  });
};

// Mutation Hooks

export const useTripsControllerCreate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateTripDto) => tripsControllerCreate(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.trips.all });
    },
  });
};

export const useTripsControllerApply = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...payload }: ApplyToTripDto & { id: string }) =>
      tripsControllerApply(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.trips.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.conversations.all });
    },
  });
};

export const useTripsControllerAcknowledgeTripCompletion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (tripId: string) =>
      tripsControllerAcknowledgeTripCompletion(tripId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.trips.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.conversations.all });
    },
  });
};

export const useTripsControllerUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vars: {
      id: string;
      payload: Partial<CreateTripDto>;
    }) => tripsControllerUpdate(vars.id, vars.payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.trips.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.experiences.all });
    },
  });
};

export const useTripsControllerRemove = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vars: { id: string }) => tripsControllerRemove(vars.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.trips.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.experiences.all });
    },
  });
};

export const useTripsControllerUpdateApply = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vars: ApplyToTripDto & { id: string }) =>
      tripsControllerUpdateApply(vars.id, vars),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.trips.all });
    },
  });
};

export const useTripsControllerDeleteApply = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vars: { id: string }) => tripsControllerDeleteApply(vars.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.trips.all });
    },
  });
};

export const useTripsControllerDecision = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vars: ApplyDecisionDto) => tripsControllerDecision(vars),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.trips.all });
    },
  });
};

export const useTripsControllerUpdateStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vars: { id: string; status: TripStatus }) =>
      tripsControllerUpdateStatus(vars.id, vars.status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.trips.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.experiences.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.conversations.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications.all });
    },
  });
};
