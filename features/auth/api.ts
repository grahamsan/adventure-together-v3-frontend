// api/auth.ts
import api from '@/lib/axios-config';
import type {
  RegisterDto,
  LoginDto,
  VerifyEmailDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  ChangePasswordDto,
  ConfirmPasswordChangeDto,
  AuthResponse,
  VerifyEmailResponse,
  ForgotPasswordResponse,
  ResetPasswordResponse,
  ChangePasswordResponse,
  ConfirmPasswordChangeResponse,
} from './types';

// Register a new user
export const register = async (registerData: RegisterDto): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>('/auth/register', registerData);
  return data;
};

// Login user
export const login = async (loginData: LoginDto): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>('/auth/login', loginData);
  return data;
};

// Verify email
export const verifyEmail = async (verifyData: VerifyEmailDto): Promise<VerifyEmailResponse> => {
  const { data } = await api.post<VerifyEmailResponse>('/auth/verify-email', verifyData);
  return data;
};

// Forgot password
export const forgotPassword = async (forgotData: ForgotPasswordDto): Promise<ForgotPasswordResponse> => {
  const { data } = await api.post<ForgotPasswordResponse>('/auth/forgot-password', forgotData);
  return data;
};

// Reset password
export const resetPassword = async (resetData: ResetPasswordDto): Promise<ResetPasswordResponse> => {
  const { data } = await api.post<ResetPasswordResponse>('/auth/reset-password', resetData);
  return data;
};

// Change password (requires authentication)
export const changePassword = async (changeData: ChangePasswordDto): Promise<ChangePasswordResponse> => {
  const { data } = await api.post<ChangePasswordResponse>('/auth/change-password', changeData);
  return data;
};

// Confirm password change
export const confirmPasswordChange = async (confirmData: ConfirmPasswordChangeDto): Promise<ConfirmPasswordChangeResponse> => {
  const { data } = await api.post<ConfirmPasswordChangeResponse>('/auth/confirm-password-change', confirmData);
  return data;
};

// Refresh token (si disponible)
export const refreshToken = async (): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>('/auth/refresh-token');
  return data;
};

// Logout (si disponible)
export const logout = async (): Promise<{ statusCode: number; data: { message: string } }> => {
  const { data } = await api.post('/auth/logout');
  return data;
};