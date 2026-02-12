// Auto-generated validation schemas
import { z } from 'zod';
export const createVehicleDtoSchema = z.object({
  brand: z.string(),
  model: z.string(),
  plateNumber: z.string().optional().nullable(),
  seats: z.number(),
  imageUrl: z.string().optional().nullable(),
});

export const updateVehicleDtoSchema = z.object({
  brand: z.string().optional().nullable(),
  model: z.string().optional().nullable(),
  plateNumber: z.string().optional().nullable(),
  seats: z.number().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
});

