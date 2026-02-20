// Auto-generated API functions
import api from "@/lib/axios";
import type {
  CreateTripDto,
  ApplyToTripDto,
  Trip,
  ApplyDecisionDto,
  FindAllQueryParams,
} from "./types";

/**
 * Get available trips
 */
export const tripsControllerFindAll = async (
  params?: Partial<FindAllQueryParams>,
): Promise<Trip[]> => {
  const { data } = await api.get<Trip[]>("/trips", {
    params,
  });

  return data;
};

/**
 * Create a trip (Driver only)
 */
export const tripsControllerCreate = async (
  payload: CreateTripDto,
): Promise<Trip> => {
  const { data } = await api.post<Trip>(`/trips`, payload);
  return data;
};

/**
 * Apply to join a trip
 */
export const tripsControllerApply = async (
  id: string,
  payload: ApplyToTripDto,
): Promise<any> => {
  const { data } = await api.post<any>(`/trips/${id}/apply`, payload);
  return data;
};

/**
 * Get trip details
 */
export const tripsControllerFindOne = async (id: string): Promise<Trip> => {
  const { data } = await api.get<Trip>(`/trips/${id}`);
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
export const tripsControllerUpdateApply = async (
  id: string,
  payload: ApplyToTripDto,
): Promise<any> => {
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
export const tripsControllerFindAllApplies = async (
  id: string,
): Promise<any> => {
  const { data } = await api.get<any>(`/trips/${id}/applies`);
  return data;
};

/**
 * Accept or refuse an application (Driver only)
 */
export const tripsControllerDecision = async (
  payload: ApplyDecisionDto,
): Promise<any> => {
  const { data } = await api.post<any>(
    `/trips/${payload.id}/applies/${payload.applyId}/decision`,
    { status: payload.status }, // ✅ Body avec le status
  );
  return data;
};

/**
 * Update trip status (Driver only)
 */
export const tripsControllerUpdateStatus = async (id: string): Promise<any> => {
  const { data } = await api.patch<any>(`/trips/${id}/status`);
  return data;
};
