// Auto-generated API functions
import api from "@/lib/axios";
import type {
  CreateTripDto,
  ApplyToTripDto,
  Trip,
  ApplyDecisionDto,
  FindAllQueryParams,
  TripStatus,
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
 * Trajets créés par l'utilisateur connecté (avec isPassed)
 */
export const tripsControllerFindMine = async (): Promise<Trip[]> => {
  const { data } = await api.get<Trip[]>("/trips/me");
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
 * Accuser réception du voyage marqué comme effectué (candidat)
 */
export const tripsControllerAcknowledgeTripCompletion = async (
  tripId: string,
): Promise<{ ok: boolean }> => {
  const { data } = await api.post<{ statusCode?: number; data?: { ok: boolean } }>(
    `/trips/${tripId}/ack-completion`,
  );
  const body = data as { statusCode?: number; data?: { ok: boolean }; ok?: boolean };
  return (body?.data ?? body) as { ok: boolean };
};

/**
 * Get trip details
 */
export const tripsControllerFindOne = async (id: string): Promise<Trip> => {
  const { data } = await api.get<Trip>(`/trips/${id}`);
  return data;
};

/**
 * Update a trip (Owner only, no applications yet)
 */
export const tripsControllerUpdate = async (
  id: string,
  payload: Partial<CreateTripDto>,
): Promise<Trip> => {
  const { data } = await api.patch<Trip>(`/trips/${id}`, payload);
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
export const tripsControllerUpdateStatus = async (
  id: string,
  status: TripStatus,
): Promise<any> => {
  const { data } = await api.patch<any>(`/trips/${id}/status`, { status });
  return data;
};
