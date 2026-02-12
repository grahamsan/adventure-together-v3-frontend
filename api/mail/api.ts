// Auto-generated API functions
import api from '@/lib/axios';
export const mailControllerTestVerification = async (params?: { email?: string }): Promise<any> => {
  const { data } = await api.get<any>(`/mail/test/verification`, { params });
  return data;
};

export const mailControllerTestPasswordReset = async (params?: { email?: string }): Promise<any> => {
  const { data } = await api.get<any>(`/mail/test/password-reset`, { params });
  return data;
};

export const mailControllerTestPasswordChange = async (params?: { email?: string }): Promise<any> => {
  const { data } = await api.get<any>(`/mail/test/password-change`, { params });
  return data;
};

export const mailControllerTestConfirmation = async (params?: { email?: string }): Promise<any> => {
  const { data } = await api.get<any>(`/mail/test/confirmation`, { params });
  return data;
};

export const mailControllerTestWelcome = async (params?: { email?: string }): Promise<any> => {
  const { data } = await api.get<any>(`/mail/test/welcome`, { params });
  return data;
};

