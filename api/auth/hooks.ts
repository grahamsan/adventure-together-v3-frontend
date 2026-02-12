// Auto-generated hooks
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import {
  authControllerRegister,
  authControllerLogin,
  authControllerGetProfile,
  authControllerSendVerification,
  authControllerVerifyEmail,
  authControllerRequestReset,
  authControllerResetPassword,
  authControllerChangePassword,
  authControllerConfirmPasswordChange
} from './api';
import type { RegisterDto, LoginDto, VerifyEmailDto, RequestResetDto, ResetPasswordDto, ChangePasswordDto, ConfirmPasswordChangeDto } from './types';

// Query Hooks

export const useAuthControllerGetProfile = () => {
  return useQuery({
    queryKey: queryKeys.auth.lists(),
    queryFn: authControllerGetProfile,
  });
};


// Mutation Hooks

export const useAuthControllerRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: RegisterDto) => authControllerRegister(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.all });
    },
  });
};

export const useAuthControllerLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: LoginDto) => authControllerLogin(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.all });
    },
  });
};

export const useAuthControllerSendVerification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authControllerSendVerification(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.all });
    },
  });
};

export const useAuthControllerVerifyEmail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: VerifyEmailDto) => authControllerVerifyEmail(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.all });
    },
  });
};

export const useAuthControllerRequestReset = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: RequestResetDto) => authControllerRequestReset(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.all });
    },
  });
};

export const useAuthControllerResetPassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ResetPasswordDto) => authControllerResetPassword(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.all });
    },
  });
};

export const useAuthControllerChangePassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ChangePasswordDto) => authControllerChangePassword(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.all });
    },
  });
};

export const useAuthControllerConfirmPasswordChange = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ConfirmPasswordChangeDto) => authControllerConfirmPasswordChange(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.all });
    },
  });
};

