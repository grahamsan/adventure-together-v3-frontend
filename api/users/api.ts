// Auto-generated API functions
import api from '@/lib/axios';
import type { CreateUserDto, UpdateUserDto } from './types';

/**
 * Create a new user (Admin only)
 */
export const userControllerCreate = async (payload: CreateUserDto): Promise<any> => {
  const { data } = await api.post<any>(`/users`, payload);
  return data;
};

/**
 * List all users (Admin only)
 */
export const userControllerFindAll = async (): Promise<any> => {
  const { data } = await api.get<any>(`/users`);
  return data;
};

/**
 * Get current user profile
 */
export const userControllerGetMe = async (): Promise<any> => {
  const { data } = await api.get<any>(`/users/me`);
  return data;
};

/**
 * Get user by ID (Admin only)
 */
export const userControllerFindOne = async (id: string): Promise<any> => {
  const { data } = await api.get<any>(`/users/${id}`);
  return data;
};

/**
 * Update user
 */
export const userControllerUpdate = async (id: string, payload: UpdateUserDto): Promise<any> => {
  const { data } = await api.put<any>(`/users/${id}`, payload);
  return data;
};

/**
 * Delete user (Admin only)
 */
export const userControllerRemove = async (id: string): Promise<any> => {
  const { data } = await api.delete<any>(`/users/${id}`);
  return data;
};

