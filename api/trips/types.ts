// Auto-generated TypeScript types

export interface CreateTripDto {
  from: string;

  to: string;

  startDate: string;

  startHour: string;

  tripDescription: string;

  price: number;

  seatsAvailable: number;

  associatedEventTitle?: string;

  escales?: string[];

  associatedVehicle?: string;

  experienceId?: string;

  placeId?: string;
}

export interface ApplyToTripDto {
  /** Optionnel : le serveur génère un texte par défaut dans le 1er message de conversation. */
  message?: string;

  requestedSeats: number;
}
export interface Trip {
  id: string;
  from: string;
  to: string;
  date: string; // ou Date si transformé côté client
  time: string; // format "HH:mm"
  description: string;
  seatsAvailable: number;
  seatsConfirmed: number;
  price: string; // string car renvoyé comme "500.00"
  escales: string[];
  status: TripStatus;
  relatedExpName: string;
  relatedPlaceName: string;
  hasApplied: boolean;
  ownerId: string;
  applicationsCount: number;
  /** Présent sur GET /trips/me */
  isPassed?: boolean;
  driverName: string;
  vehicleModel: string;
  creator: TripCreator;
  vehicle: Vehicle;
}
export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  plateNumber: string;
  imageUrl: string;
}

export interface TripCreator {
  firstName: string;
  lastName: string;
  avatarUrl: string | null;
  bio: string | null;
  phoneNumber: string;
  dateOfBirth: string; // ou Date si transformé
}
export type TripStatus = "filling" | "upcoming" | "done";

export interface ApplyDecisionDto {
  status: "accepted" | "rejected";
  applyId: string;
  id: string;
}

export interface FindAllQueryParams {
  search?: string;
  date?: string;
  from?: string;
  to?: string;
  experienceId?: string;
  imminent?: boolean;
  month?: boolean;
  nextMonth?: boolean;
  page?: number;
  limit?: number;
}
