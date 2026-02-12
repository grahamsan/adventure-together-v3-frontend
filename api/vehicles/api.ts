// Auto-generated API functions
import api from "@/lib/axios";
import type { CreateVehicleDto, UpdateVehicleDto, Vehicle } from "./types";

/**
 * Add a new vehicle
 */
export const vehiclesControllerCreate = async (
  payload: CreateVehicleDto
): Promise<any> => {
  const { data } = await api.post<any>(`/vehicles`, payload);
  return data;
};

/**
 * Get current user's vehicles
 */
export const vehiclesControllerFindAll = async (): Promise<Vehicle[]> => {
  const { data } = await api.get<Vehicle[]>(`/vehicles`);
  return data;
};

/**
 * Get vehicle details
 */
export const vehiclesControllerFindOne = async (id: string): Promise<any> => {
  const { data } = await api.get<any>(`/vehicles/${id}`);
  return data;
};

/**
 * Update a vehicle
 */
export const vehiclesControllerUpdate = async (
  id: string,
  payload: UpdateVehicleDto
): Promise<any> => {
  const { data } = await api.patch<any>(`/vehicles/${id}`, payload);
  return data;
};

/**
 * Delete a vehicle
 */
export const vehiclesControllerRemove = async (id: string): Promise<any> => {
  const { data } = await api.delete<any>(`/vehicles/${id}`);
  return data;
};
