// Auto-generated API functions
import api from '@/lib/axios';
import type { CreatePlaceDto, UpdatePlaceDto } from './types';

/**
 * Créer un nouveau lieu
 */
export const placesControllerCreate = async (payload: CreatePlaceDto): Promise<any> => {
  const { data } = await api.post<any>(`/places`, payload);
  return data;
};

/**
 * Lister et rechercher des lieux
 */
export const placesControllerFindAll = async (params?: { search?: string; type?: 'Ville' | 'Musée' | 'Parc' | 'Hotel' | 'Monument' }): Promise<any> => {
  const { data } = await api.get<any>(`/places`, { params });
  return data;
};

/**
 * Récupérer mes lieux favoris
 */
export const placesControllerGetFavorites = async (): Promise<any> => {
  const { data } = await api.get<any>(`/places/favorites`);
  return data;
};

/**
 * Détails d'un lieu
 */
export const placesControllerFindOne = async (id: string): Promise<any> => {
  const { data } = await api.get<any>(`/places/${id}`);
  return data;
};

/**
 * Modifier un lieu (Admin uniquement)
 */
export const placesControllerUpdate = async (id: string, payload: UpdatePlaceDto): Promise<any> => {
  const { data } = await api.patch<any>(`/places/${id}`, payload);
  return data;
};

/**
 * Supprimer un lieu (Admin uniquement)
 */
export const placesControllerRemove = async (id: string): Promise<any> => {
  const { data } = await api.delete<any>(`/places/${id}`);
  return data;
};

/**
 * Ajouter/Retirer des favoris
 */
export const placesControllerToggleFavorite = async (id: string): Promise<any> => {
  const { data } = await api.post<any>(`/places/${id}/favorite`);
  return data;
};

/**
 * Signaler un lieu
 */
export const placesControllerReport = async (id: string): Promise<any> => {
  const { data } = await api.post<any>(`/places/${id}/report`);
  return data;
};

