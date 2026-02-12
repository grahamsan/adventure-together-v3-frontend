// Auto-generated API functions
import api from '@/lib/axios';
export const appControllerGetHello = async (): Promise<any> => {
  const { data } = await api.get<any>(`/`);
  return data;
};

