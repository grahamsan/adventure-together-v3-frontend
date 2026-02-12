// Auto-generated hooks
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import {
  reportsControllerCreate,
  reportsControllerReportExperience,
  reportsControllerReportTrip,
  reportsControllerReportUser,
  reportsControllerFindAll,
  reportsControllerUpdateStatus
} from './api';
import type { CreateReportDto, UpdateReportStatusDto } from './types';

// Query Hooks

export const useReportsControllerFindAll = (params?: { search?: string; type?: 'Expérience' | 'Trajet' | 'Utilisateur' | 'Lieu' | 'Commentaire' }) => {
  return useQuery({
    queryKey: queryKeys.reports.list(params),
    queryFn: () => reportsControllerFindAll(params),
  });
};


// Mutation Hooks

export const useReportsControllerCreate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateReportDto) => reportsControllerCreate(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.reports.all });
    },
  });
};

export const useReportsControllerReportExperience = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vars: { id: string }) => reportsControllerReportExperience(vars.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.reports.all });
    },
  });
};

export const useReportsControllerReportTrip = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vars: { id: string }) => reportsControllerReportTrip(vars.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.reports.all });
    },
  });
};

export const useReportsControllerReportUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vars: { id: string }) => reportsControllerReportUser(vars.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.reports.all });
    },
  });
};

export const useReportsControllerUpdateStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vars: UpdateReportStatusDto & { id: string }) => reportsControllerUpdateStatus(vars.id, vars),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.reports.all });
    },
  });
};

