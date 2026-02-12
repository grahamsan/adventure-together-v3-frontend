// Auto-generated hooks
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import {
  tripsControllerFindAll,
  tripsControllerCreate,
  tripsControllerApply,
  tripsControllerFindOne,
  tripsControllerUpdate,
  tripsControllerRemove,
  tripsControllerUpdateApply,
  tripsControllerDeleteApply,
  tripsControllerFindAllApplies,
  tripsControllerDecision,
  tripsControllerUpdateStatus
} from './api';
import type { CreateTripDto, ApplyToTripDto } from './types';

// Query Hooks

export const useTripsControllerFindAll = () => {
  return useQuery({
    queryKey: queryKeys.trips.lists(),
    queryFn: tripsControllerFindAll,
  });
};

export const useTripsControllerFindOne = (id: string) => {
  return useQuery({
    queryKey: queryKeys.trips.detail(id),
    queryFn: () => tripsControllerFindOne(id),
    enabled: !!(id),
  });
};

export const useTripsControllerFindAllApplies = (id: string) => {
  return useQuery({
    queryKey: queryKeys.trips.detail(id),
    queryFn: () => tripsControllerFindAllApplies(id),
    enabled: !!(id),
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
    mutationFn: (vars: ApplyToTripDto & { id: string }) => tripsControllerApply(vars.id, vars),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.trips.all });
    },
  });
};

export const useTripsControllerUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vars: { id: string }) => tripsControllerUpdate(vars.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.trips.all });
    },
  });
};

export const useTripsControllerRemove = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vars: { id: string }) => tripsControllerRemove(vars.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.trips.all });
    },
  });
};

export const useTripsControllerUpdateApply = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vars: ApplyToTripDto & { id: string }) => tripsControllerUpdateApply(vars.id, vars),
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
    mutationFn: (vars: { id: string; applyId: string }) => tripsControllerDecision(vars.id, vars.applyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.trips.all });
    },
  });
};

export const useTripsControllerUpdateStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vars: { id: string }) => tripsControllerUpdateStatus(vars.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.trips.all });
    },
  });
};

