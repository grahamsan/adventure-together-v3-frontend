// Auto-generated hooks
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import {
  commentsControllerCreate,
  commentsControllerFindAll,
  commentsControllerUpdate,
  commentsControllerRemove,
  commentsControllerLike,
  commentsControllerDislike,
  commentsControllerReport,
} from "./api";
import type { CreateCommentDto, UpdateCommentDto, Comment } from "./types";

// Query Hooks

export const useCommentsControllerFindAll = (experienceId: string) => {
  return useQuery<Comment[]>({
    queryKey: queryKeys.comments.detail(experienceId),
    queryFn: () => commentsControllerFindAll(experienceId),
    enabled: !!experienceId,
  });
};

// Mutation Hooks

export const useCommentsControllerCreate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vars: CreateCommentDto & { experienceId: string }) => {
      const { experienceId, ...payload } = vars;
      return commentsControllerCreate(experienceId, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.comments.all });
    },
  });
};

export const useCommentsControllerUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vars: UpdateCommentDto & { id: string }) =>
      commentsControllerUpdate(vars.id, vars),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.comments.all });
    },
  });
};

export const useCommentsControllerRemove = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vars: { id: string }) => commentsControllerRemove(vars.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.comments.all });
    },
  });
};

export const useCommentsControllerLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vars: { id: string }) => commentsControllerLike(vars.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.comments.all });
    },
  });
};

export const useCommentsControllerDislike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vars: { id: string }) => commentsControllerDislike(vars.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.comments.all });
    },
  });
};

export const useCommentsControllerReport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vars: { id: string }) => commentsControllerReport(vars.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.comments.all });
    },
  });
};
