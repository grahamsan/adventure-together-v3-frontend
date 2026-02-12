// Auto-generated TypeScript types

export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  plateNumber: string;
  seats: number;
  imageUrl: string;
}

export interface CreateVehicleDto {
  brand: string;

  model: string;

  plateNumber?: string;

  seats: number;

  imageUrl?: string;
}

export interface UpdateVehicleDto {
  brand?: string;

  model?: string;

  plateNumber?: string;

  seats?: number;

  imageUrl?: string;
}
