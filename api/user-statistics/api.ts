// Auto-generated API functions
import api from '@/lib/axios';
/**
 * Récupérer mes statistiques personnalisées
 */
export const usersStatsControllerGetStats = async (params?: { period?: string }): Promise<any> => {
  const { data } = await api.get<any>(`/users-stats/me`, { params });
  return data;
};

