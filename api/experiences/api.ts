// Auto-generated API functions
import api from "@/lib/axios";
import type { CreateExperienceDto, ExperienceResponse } from "./types";

/**
 * Get experiences feed
 */
export const experiencesControllerFindAll = async (params?: {
  page?: number;
  limit?: number;
}): Promise<ExperienceResponse> => {
  const { data } = await api.get<ExperienceResponse>(`/experiences`, {
    params,
  });
  return data;
};

/**
 * Create a new experience (Organizer only)
 */
export const experiencesControllerCreate = async (
  payload: CreateExperienceDto
): Promise<any> => {
  const { data } = await api.post<any>(`/experiences`, payload);
  return data;
};

/**
 * Get experience details
 */
export const experiencesControllerFindOne = async (
  id: string
): Promise<any> => {
  const { data } = await api.get<any>(`/experiences/${id}`);
  return data;
};

/**
 * Like/Unlike an experience
 */
export const experiencesControllerToggleLike = async (
  id: string
): Promise<any> => {
  const { data } = await api.post<any>(`/experiences/${id}/like`);
  return data;
};
