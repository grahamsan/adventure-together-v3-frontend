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
  associatedEventTitle: z.string().optional(),
  escales: z.array(z.string()).optional(),
  associatedVehicle: z.string().optional(),
  experienceId: z.string().uuid().optional(),
  placeId: z.string().uuid().optional(),
});

export const applyToTripDtoSchema = z.object({
  message: z.string().optional(),
  requestedSeats: z.number(),
});

