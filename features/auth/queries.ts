// hooks/useAuth.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  register,
  login,
  verifyEmail,
  forgotPassword,
  resetPassword,
  changePassword,
  confirmPasswordChange,
  logout,
} from './api';
import type {
  RegisterDto,
  LoginDto,
  VerifyEmailDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  ChangePasswordDto,
  ConfirmPasswordChangeDto,
} from './types';
import { queryKeys } from '@/lib/query-key';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

// Mutation Hooks

export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (registerData: RegisterDto) => register(registerData),
    
    onMutate: () => {
      toast.loading('Creating your account...');
    },
    
    onSuccess: (data) => {
      toast.dismiss();
      toast.success('Account created successfully! Please check your email for verification.');
      
      // Stocker le token si nécessaire
      if (data.data.accessToken) {
        localStorage.setItem('ACCESS_TOKEN', data.data.accessToken);
      }
      
      // Rediriger vers la page de vérification email ou dashboard
      router.push('/verify-email');
    },
    
    onError: (error: any) => {
      toast.dismiss();
      const errorMessage = error.response?.data?.message || error.message || 'Registration failed';
      toast.error(`Registration failed: ${errorMessage}`);
    },
    
    onSettled: () => {
      toast.dismiss();
    },
  });
};

export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (loginData: LoginDto) => login(loginData),
    
    onMutate: () => {
      toast.loading('Signing you in...');
    },
    
    onSuccess: (data) => {
      toast.dismiss();
      toast.success('Welcome back!');
      
      // Stocker le token
      if (data.data.accessToken) {
        localStorage.setItem('ACCESS_TOKEN', data.data.accessToken);
      }
      
      // Invalider les queries existantes et rafraîchir les données utilisateur
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.me() });
      
      // Rediriger vers le dashboard
      router.push('/dashboard');
    },
    
    onError: (error: any) => {
      toast.dismiss();
      const errorMessage = error.response?.data?.message || error.message || 'Login failed';
      toast.error(`Login failed: ${errorMessage}`);
    },
    
    onSettled: () => {
      toast.dismiss();
    },
  });
};

export const useVerifyEmail = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (verifyData: VerifyEmailDto) => verifyEmail(verifyData),
    
    onMutate: () => {
      toast.loading('Verifying your email...');
    },
    
    onSuccess: (data) => {
      toast.dismiss();
      toast.success('Email verified successfully!');
      
      // Rediriger vers la page de connexion ou dashboard
      router.push('/login');
    },
    
    onError: (error: any) => {
      toast.dismiss();
      const errorMessage = error.response?.data?.message || error.message || 'Email verification failed';
      toast.error(`Verification failed: ${errorMessage}`);
    },
    
    onSettled: () => {
      toast.dismiss();
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (forgotData: ForgotPasswordDto) => forgotPassword(forgotData),
    
    onMutate: () => {
      toast.loading('Sending reset instructions...');
    },
    
    onSuccess: (data) => {
      toast.dismiss();
      toast.success('Password reset instructions sent to your email!');
    },
    
    onError: (error: any) => {
      toast.dismiss();
      const errorMessage = error.response?.data?.message || error.message || 'Failed to send reset instructions';
      toast.error(`Failed: ${errorMessage}`);
    },
    
    onSettled: () => {
      toast.dismiss();
    },
  });
};

export const useResetPassword = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (resetData: ResetPasswordDto) => resetPassword(resetData),
    
    onMutate: () => {
      toast.loading('Resetting your password...');
    },
    
    onSuccess: (data) => {
      toast.dismiss();
      toast.success('Password reset successfully!');
      
      // Rediriger vers la page de connexion
      router.push('/login');
    },
    
    onError: (error: any) => {
      toast.dismiss();
      const errorMessage = error.response?.data?.message || error.message || 'Password reset failed';
      toast.error(`Reset failed: ${errorMessage}`);
    },
    
    onSettled: () => {
      toast.dismiss();
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (changeData: ChangePasswordDto) => changePassword(changeData),
    
    onMutate: () => {
      toast.loading('Changing your password...');
    },
    
    onSuccess: (data) => {
      toast.dismiss();
      toast.success('Password changed successfully!');
    },
    
    onError: (error: any) => {
      toast.dismiss();
      const errorMessage = error.response?.data?.message || error.message || 'Password change failed';
      toast.error(`Change failed: ${errorMessage}`);
    },
    
    onSettled: () => {
      toast.dismiss();
    },
  });
};

export const useConfirmPasswordChange = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (confirmData: ConfirmPasswordChangeDto) => confirmPasswordChange(confirmData),
    
    onMutate: () => {
      toast.loading('Confirming password change...');
    },
    
    onSuccess: (data) => {
      toast.dismiss();
      toast.success('Password change confirmed!');
      
      // Rediriger vers la page de connexion
      router.push('/login');
    },
    
    onError: (error: any) => {
      toast.dismiss();
      const errorMessage = error.response?.data?.message || error.message || 'Confirmation failed';
      toast.error(`Confirmation failed: ${errorMessage}`);
    },
    
    onSettled: () => {
      toast.dismiss();
    },
  });
};

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    
    onMutate: () => {
      toast.loading('Logging out...');
    },
    
    onSuccess: () => {
      // Supprimer le token
      localStorage.removeItem('ACCESS_TOKEN');
      
      // Invalider toutes les queries
      queryClient.clear();
      
      toast.dismiss();
      toast.success('Logged out successfully!');
      
      // Rediriger vers la page de connexion
      router.push('/login');
    },
    
    onError: (error: any) => {
      toast.dismiss();
      // Même en cas d'erreur, on déconnecte localement
      localStorage.removeItem('ACCESS_TOKEN');
      queryClient.clear();
      router.push('/login');
    },
    
    onSettled: () => {
      toast.dismiss();
    },
  });
};