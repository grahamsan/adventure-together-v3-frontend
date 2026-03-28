// Auto-generated hooks
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import {
  experiencesControllerFindAll,
  experiencesControllerCreate,
  experiencesControllerFindOne,
  experiencesControllerToggleLike,
  findTripsByExperience,
  experiencesControllerUpdate,
  experiencesControllerRemove,
} from "./api";
import type {
  CreateExperienceDto,
  ExperienceResponse,
  GetExperiencesQueryParams,
  UpdateExperienceDto,
} from "./types";

// Query Hooks

export const useExperiencesControllerFindAll = (
  params?: Partial<GetExperiencesQueryParams>,
) => {
  const cleanedParams = Object.fromEntries(
    Object.entries(params ?? {}).filter(
      ([, value]) => value !== undefined && value !== false && value !== "",
    ),
  ) as Partial<GetExperiencesQueryParams>;

  return useQuery<ExperienceResponse>({
    queryKey: queryKeys.experiences.list(cleanedParams),
    queryFn: () => experiencesControllerFindAll(cleanedParams),
  });
};

export const useExperiencesControllerFindOne = (id: string) => {
  return useQuery({
    queryKey: queryKeys.experiences.detail(id),
    queryFn: () => experiencesControllerFindOne(id),
    enabled: !!id,
  });
};

export const useExperiencesControllerCreate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateExperienceDto) =>
      experiencesControllerCreate(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.experiences.all });
    },
  });
};

export const useExperiencesControllerToggleLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vars: { id: string }) =>
      experiencesControllerToggleLike(vars.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.experiences.all });
    },
  });
};

export const useTripsByExperience = (id: string) => {
  return useQuery({
    queryKey: queryKeys.experiences.trip(id),
    queryFn: () => findTripsByExperience(id),
    enabled: !!id,
  });
};

export const useExperiencesControllerUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vars: { id: string; payload: UpdateExperienceDto }) =>
      experiencesControllerUpdate(vars.id, vars.payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.experiences.all });
    },
  });
};

export const useExperiencesControllerRemove = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => experiencesControllerRemove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.experiences.all });
    },
  });
};
