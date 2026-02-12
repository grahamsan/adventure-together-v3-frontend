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

