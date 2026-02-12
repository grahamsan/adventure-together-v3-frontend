// Auto-generated API functions
import api from '@/lib/axios';
import type { RegisterDto, LoginDto, VerifyEmailDto, RequestResetDto, ResetPasswordDto, ChangePasswordDto, ConfirmPasswordChangeDto } from './types';

export const authControllerRegister = async (payload: RegisterDto): Promise<any> => {
  const { data } = await api.post<any>(`/auth/register`, payload);
  return data;
};

export const authControllerLogin = async (payload: LoginDto): Promise<any> => {
  const { data } = await api.post<any>(`/auth/login`, payload);
  return data;
};

export const authControllerGetProfile = async (): Promise<any> => {
  const { data } = await api.get<any>(`/auth/profile`);
  return data;
};

export const authControllerSendVerification = async (): Promise<any> => {
  const { data } = await api.post<any>(`/auth/send-verification`);
  return data;
};

export const authControllerVerifyEmail = async (payload: VerifyEmailDto): Promise<any> => {
  const { data } = await api.post<any>(`/auth/verify-email`, payload);
  return data;
};

export const authControllerRequestReset = async (payload: RequestResetDto): Promise<any> => {
  const { data } = await api.post<any>(`/auth/forgot-password`, payload);
  return data;
};

export const authControllerResetPassword = async (payload: ResetPasswordDto): Promise<any> => {
  const { data } = await api.post<any>(`/auth/reset-password`, payload);
  return data;
};

export const authControllerChangePassword = async (payload: ChangePasswordDto): Promise<any> => {
  const { data } = await api.post<any>(`/auth/change-password`, payload);
  return data;
};

export const authControllerConfirmPasswordChange = async (payload: ConfirmPasswordChangeDto): Promise<any> => {
  const { data } = await api.post<any>(`/auth/confirm-password-change`, payload);
  return data;
};

