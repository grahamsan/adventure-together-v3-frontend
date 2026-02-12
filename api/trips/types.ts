// Auto-generated TypeScript types

export interface CreateTripDto {

  from: string;

  to: string;

  startDate: string;

  startHour: string;

  tripDescription: string;

  price: number;

  seatsAvailable: number;

  associatedEventTitle: string;

  escales: string[];

  associatedVehicle: string;
}

export interface ApplyToTripDto {

  message: string;

  requestedSeats: number;
}

