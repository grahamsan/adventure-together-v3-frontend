// Auto-generated API functions
import api from '@/lib/axios';
import type { CreateReportDto, UpdateReportStatusDto } from './types';

/**
 * Create a report (Generic)
 */
export const reportsControllerCreate = async (payload: CreateReportDto): Promise<any> => {
  const { data } = await api.post<any>(`/reports`, payload);
  return data;
};

/**
 * Report an experience
 */
export const reportsControllerReportExperience = async (id: string): Promise<any> => {
  const { data } = await api.post<any>(`/experiences/${id}/report`);
  return data;
};

/**
 * Report a trip
 */
export const reportsControllerReportTrip = async (id: string): Promise<any> => {
  const { data } = await api.post<any>(`/trips/${id}/report`);
  return data;
};

/**
 * Report a user
 */
export const reportsControllerReportUser = async (id: string): Promise<any> => {
  const { data } = await api.post<any>(`/users/${id}/report`);
  return data;
};

/**
 * Get all reports (min 10 reports per entity)
 */
export const reportsControllerFindAll = async (params?: { search?: string; type?: 'Expérience' | 'Trajet' | 'Utilisateur' | 'Lieu' | 'Commentaire' }): Promise<any> => {
  const { data } = await api.get<any>(`/admin/reports`, { params });
  return data;
};

/**
 * Update report status
 */
export const reportsControllerUpdateStatus = async (id: string, payload: UpdateReportStatusDto): Promise<any> => {
  const { data } = await api.patch<any>(`/admin/reports/${id}/status`, payload);
  return data;
};

