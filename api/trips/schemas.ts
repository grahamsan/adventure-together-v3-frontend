// Auto-generated validation schemas
import { z } from 'zod';
export const createTripDtoSchema = z.object({
  from: z.string(),
  to: z.string(),
  startDate: z.string(),
  startHour: z.string(),
  tripDescription: z.string(),
  price: z.number(),
  seatsAvailable: z.number(),
  associatedEventTitle: z.string(),
  escales: z.array(z.string()),
  associatedVehicle: z.string(),
});

export const applyToTripDtoSchema = z.object({
  message: z.string(),
  requestedSeats: z.number(),
});

