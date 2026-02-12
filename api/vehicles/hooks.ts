// Auto-generated hooks
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import {
  vehiclesControllerCreate,
  vehiclesControllerFindAll,
  vehiclesControllerFindOne,
  vehiclesControllerUpdate,
  vehiclesControllerRemove,
} from "./api";
import type { CreateVehicleDto, UpdateVehicleDto, Vehicle } from "./types";

// Query Hooks

export const useVehiclesControllerFindAll = () => {
  return useQuery<Vehicle[]>({
    queryKey: queryKeys.vehicles.lists(),
    queryFn: vehiclesControllerFindAll,
  });
};

export const useVehiclesControllerFindOne = (id: string) => {
  return useQuery({
    queryKey: queryKeys.vehicles.detail(id),
    queryFn: () => vehiclesControllerFindOne(id),
    enabled: !!id,
  });
};

// Mutation Hooks

export const useVehiclesControllerCreate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateVehicleDto) =>
      vehiclesControllerCreate(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.vehicles.all });
    },
  });
};

export const useVehiclesControllerUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vars: UpdateVehicleDto & { id: string }) =>
      vehiclesControllerUpdate(vars.id, vars),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.vehicles.all });
    },
  });
};

export const useVehiclesControllerRemove = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vars: { id: string }) => vehiclesControllerRemove(vars.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.vehicles.all });
    },
  });
};
