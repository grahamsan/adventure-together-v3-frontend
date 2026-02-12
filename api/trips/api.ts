// Auto-generated API functions
import api from '@/lib/axios';
import type { CreateTripDto, ApplyToTripDto } from './types';

/**
 * Get available trips
 */
export const tripsControllerFindAll = async (): Promise<any> => {
  const { data } = await api.get<any>(`/trips`);
  return data;
};

/**
 * Create a trip (Driver only)
 */
export const tripsControllerCreate = async (payload: CreateTripDto): Promise<any> => {
  const { data } = await api.post<any>(`/trips`, payload);
  return data;
};

/**
 * Apply to join a trip
 */
export const tripsControllerApply = async (id: string, payload: ApplyToTripDto): Promise<any> => {
  const { data } = await api.post<any>(`/trips/${id}/apply`, payload);
  return data;
};

/**
 * Get trip details
 */
export const tripsControllerFindOne = async (id: string): Promise<any> => {
  const { data } = await api.get<any>(`/trips/${id}`);
  return data;
};

/**
 * Update a trip (Owner only)
 */
export const tripsControllerUpdate = async (id: string): Promise<any> => {
  const { data } = await api.patch<any>(`/trips/${id}`);
  return data;
};

/**
 * Delete a trip (Owner only)
 */
export const tripsControllerRemove = async (id: string): Promise<any> => {
  const { data } = await api.delete<any>(`/trips/${id}`);
  return data;
};

/**
 * Update an application (Author only)
 */
export const tripsControllerUpdateApply = async (id: string, payload: ApplyToTripDto): Promise<any> => {
  const { data } = await api.patch<any>(`/trips/applies/${id}`, payload);
  return data;
};

/**
 * Delete an application (Author only)
 */
export const tripsControllerDeleteApply = async (id: string): Promise<any> => {
  const { data } = await api.delete<any>(`/trips/applies/${id}`);
  return data;
};

/**
 * Get all applications for a trip (Driver only)
 */
export const tripsControllerFindAllApplies = async (id: string): Promise<any> => {
  const { data } = await api.get<any>(`/trips/${id}/applies`);
  return data;
};

/**
 * Accept or refuse an application (Driver only)
 */
export const tripsControllerDecision = async (id: string, applyId: string): Promise<any> => {
  const { data } = await api.post<any>(`/trips/${id}/applies/${applyId}/decision`);
  return data;
};

/**
 * Update trip status (Driver only)
 */
export const tripsControllerUpdateStatus = async (id: string): Promise<any> => {
  const { data } = await api.patch<any>(`/trips/${id}/status`);
  return data;
};

