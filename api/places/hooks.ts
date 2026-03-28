// Auto-generated hooks
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import {
  placesControllerCreate,
  placesControllerFindAll,
  placesControllerGetFavorites,
  placesControllerFindExperiencesByPlaceId,
  placesControllerFindOne,
  placesControllerUpdate,
  placesControllerRemove,
  placesControllerToggleFavorite,
  placesControllerReport
} from './api';
import type { CreatePlaceDto, UpdatePlaceDto } from './types';

// Query Hooks

export const usePlacesControllerFindAll = (params?: { search?: string; type?: 'Ville' | 'Musée' | 'Parc' | 'Hotel' | 'Monument' }) => {
  return useQuery({
    queryKey: queryKeys.places.list(params),
    queryFn: () => placesControllerFindAll(params),
  });
};

export const usePlacesControllerGetFavorites = () => {
  return useQuery({
    queryKey: queryKeys.places.lists(),
    queryFn: placesControllerGetFavorites,
  });
};

export const usePlacesControllerFindOne = (id: string) => {
  return useQuery({
    queryKey: queryKeys.places.detail(id),
    queryFn: () => placesControllerFindOne(id),
    enabled: !!(id),
  });
};

export const usePlacesControllerFindExperiencesByPlaceId = (placeId: string) => {
  return useQuery({
    queryKey: queryKeys.places.experiences(placeId),
    queryFn: () => placesControllerFindExperiencesByPlaceId(placeId),
    enabled: Boolean(placeId),
  });
};


// Mutation Hooks

export const usePlacesControllerCreate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreatePlaceDto) => placesControllerCreate(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.places.all });
    },
  });
};

export const usePlacesControllerUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vars: UpdatePlaceDto & { id: string }) => placesControllerUpdate(vars.id, vars),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.places.all });
    },
  });
};

export const usePlacesControllerRemove = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vars: { id: string }) => placesControllerRemove(vars.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.places.all });
    },
  });
};

export const usePlacesControllerToggleFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vars: { id: string }) => placesControllerToggleFavorite(vars.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.places.all });
    },
  });
};

export const usePlacesControllerReport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vars: { id: string }) => placesControllerReport(vars.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.places.all });
    },
  });
};

