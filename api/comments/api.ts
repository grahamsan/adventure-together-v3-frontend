// Auto-generated API functions
import api from "@/lib/axios";
import type { CreateCommentDto, UpdateCommentDto, Comment } from "./types";

/**
 * Poster un commentaire sur une expérience
 */
export const commentsControllerCreate = async (
  experienceId: string,
  payload: CreateCommentDto
): Promise<any> => {
  const { data } = await api.post<any>(
    `/experiences/${experienceId}/comments`,
    payload
  );
  return data;
};

/**
 * Lister les commentaires d'une expérience
 */
export const commentsControllerFindAll = async (
  experienceId: string
): Promise<Comment[]> => {
  const { data } = await api.get<Comment[]>(
    `/experiences/${experienceId}/comments`
  );
  return data;
};

/**
 * Modifier un commentaire
 */
export const commentsControllerUpdate = async (
  id: string,
  payload: UpdateCommentDto
): Promise<any> => {
  const { data } = await api.patch<any>(`/comments/${id}`, payload);
  return data;
};

/**
 * Supprimer un commentaire
 */
export const commentsControllerRemove = async (id: string): Promise<any> => {
  const { data } = await api.delete<any>(`/comments/${id}`);
  return data;
};

/**
 * Liker un commentaire
 */
export const commentsControllerLike = async (id: string): Promise<any> => {
  const { data } = await api.post<any>(`/comments/${id}/like`);
  return data;
};

/**
 * Disliker un commentaire
 */
export const commentsControllerDislike = async (id: string): Promise<any> => {
  const { data } = await api.post<any>(`/comments/${id}/dislike`);
  return data;
};

/**
 * Signaler un commentaire
 */
export const commentsControllerReport = async (id: string): Promise<any> => {
  const { data } = await api.post<any>(`/comments/${id}/report`);
  return data;
};
