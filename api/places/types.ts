// Auto-generated TypeScript types

export interface CreatePlaceDto {

  title: string;

  type: 'Ville' | 'Musée' | 'Parc' | 'Hotel' | 'Monument';

  description: string;

  imageUrl?: string;

  address?: string;
}

export interface UpdatePlaceDto {

  title?: string;

  type?: 'Ville' | 'Musée' | 'Parc' | 'Hotel' | 'Monument';

  description?: string;

  imageUrl?: string;

  address?: string;
}

/** Réponse GET /places/:id */
export interface PlaceDetail {
  id: string;
  title: string;
  description: string;
  type: CreatePlaceDto["type"];
  imageUrl?: string | null;
  address?: string | null;
  latitude?: number | null;
  longitude?: number | null;
}

