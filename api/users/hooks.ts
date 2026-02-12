// Auto-generated hooks
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import {
  userControllerCreate,
  userControllerFindAll,
  userControllerGetMe,
  userControllerFindOne,
  userControllerUpdate,
  userControllerRemove
} from './api';
import type { CreateUserDto, UpdateUserDto } from './types';

// Query Hooks

export const useUserControllerFindAll = () => {
  return useQuery({
    queryKey: queryKeys.users.lists(),
    queryFn: userControllerFindAll,
  });
};

export const useUserControllerGetMe = () => {
  return useQuery({
    queryKey: queryKeys.users.lists(),
    queryFn: userControllerGetMe,
  });
};

export const useUserControllerFindOne = (id: string) => {
  return useQuery({
    queryKey: queryKeys.users.detail(id),
    queryFn: () => userControllerFindOne(id),
    enabled: !!(id),
  });
};


// Mutation Hooks

export const useUserControllerCreate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateUserDto) => userControllerCreate(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
    },
  });
};

export const useUserControllerUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vars: UpdateUserDto & { id: string }) => userControllerUpdate(vars.id, vars),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
    },
  });
};

export const useUserControllerRemove = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vars: { id: string }) => userControllerRemove(vars.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
    },
  });
};

