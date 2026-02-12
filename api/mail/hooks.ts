// Auto-generated hooks
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import {
  mailControllerTestVerification,
  mailControllerTestPasswordReset,
  mailControllerTestPasswordChange,
  mailControllerTestConfirmation,
  mailControllerTestWelcome
} from './api';

// Query Hooks

export const useMailControllerTestVerification = (params?: { email?: string }) => {
  return useQuery({
    queryKey: queryKeys.mail.list(params),
    queryFn: () => mailControllerTestVerification(params),
  });
};

export const useMailControllerTestPasswordReset = (params?: { email?: string }) => {
  return useQuery({
    queryKey: queryKeys.mail.list(params),
    queryFn: () => mailControllerTestPasswordReset(params),
  });
};

export const useMailControllerTestPasswordChange = (params?: { email?: string }) => {
  return useQuery({
    queryKey: queryKeys.mail.list(params),
    queryFn: () => mailControllerTestPasswordChange(params),
  });
};

export const useMailControllerTestConfirmation = (params?: { email?: string }) => {
  return useQuery({
    queryKey: queryKeys.mail.list(params),
    queryFn: () => mailControllerTestConfirmation(params),
  });
};

export const useMailControllerTestWelcome = (params?: { email?: string }) => {
  return useQuery({
    queryKey: queryKeys.mail.list(params),
    queryFn: () => mailControllerTestWelcome(params),
  });
};


// Mutation Hooks

