// Auto-generated hooks
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import {
  experiencesControllerFindAll,
  experiencesControllerCreate,
  experiencesControllerFindOne,
  experiencesControllerToggleLike,
} from "./api";
import type { CreateExperienceDto, ExperienceResponse } from "./types";

// Query Hooks

export const useExperiencesControllerFindAll = (params?: {
  page?: number;
  limit?: number;
}) => {
  return useQuery<ExperienceResponse>({
    queryKey: queryKeys.experiences.list(params),
    queryFn: () => experiencesControllerFindAll(params),
  });
};

export const useExperiencesControllerFindOne = (id: string) => {
  return useQuery({
    queryKey: queryKeys.experiences.detail(id),
    queryFn: () => experiencesControllerFindOne(id),
    enabled: !!id,
  });
};

// Mutation Hooks

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
