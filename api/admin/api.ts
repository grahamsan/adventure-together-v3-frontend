// Auto-generated API functions
import api from '@/lib/axios';
import type { UpdateUserRoleDto, UpdateUserStatusDto } from './types';

/**
 * Get overall app statistics
 */
export const adminControllerGetStats = async (): Promise<any> => {
  const { data } = await api.get<any>(`/admin/stats`);
  return data;
};

/**
 * Get all users
 */
export const adminControllerFindAll = async (): Promise<any> => {
  const { data } = await api.get<any>(`/admin/users`);
  return data;
};

/**
 * Update user role
 */
export const adminControllerUpdateRole = async (id: string, payload: UpdateUserRoleDto): Promise<any> => {
  const { data } = await api.patch<any>(`/admin/users/${id}/role`, payload);
  return data;
};

/**
 * Update user status (activate/suspend)
 */
export const adminControllerUpdateStatus = async (id: string, payload: UpdateUserStatusDto): Promise<any> => {
  const { data } = await api.patch<any>(`/admin/users/${id}/status`, payload);
  return data;
};

/**
 * Delete user
 */
export const adminControllerDeleteUser = async (id: string): Promise<any> => {
  const { data } = await api.delete<any>(`/admin/users/${id}`);
  return data;
};

