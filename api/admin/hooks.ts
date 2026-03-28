// Auto-generated hooks
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import {
  adminControllerGetStats,
  adminControllerFindAll,
  adminControllerUpdateRole,
  adminControllerUpdateStatus,
  adminControllerDeleteUser
} from './api';
import type { UpdateUserRoleDto, UpdateUserStatusDto } from './types';

// Query Hooks

export const useAdminControllerGetStats = () => {
  return useQuery({
    queryKey: queryKeys.admin.stats(),
    queryFn: adminControllerGetStats,
  });
};

export const useAdminControllerFindAll = () => {
  return useQuery({
    queryKey: queryKeys.admin.users(),
    queryFn: adminControllerFindAll,
  });
};


// Mutation Hooks

export const useAdminControllerUpdateRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vars: UpdateUserRoleDto & { id: string }) =>
      adminControllerUpdateRole(vars.id, { role: vars.role }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.users() });
    },
  });
};

export const useAdminControllerUpdateStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vars: UpdateUserStatusDto & { id: string }) =>
      adminControllerUpdateStatus(vars.id, { status: vars.status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.users() });
    },
  });
};

export const useAdminControllerDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vars: { id: string }) => adminControllerDeleteUser(vars.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.users() });
    },
  });
};

