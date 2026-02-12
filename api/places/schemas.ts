// Auto-generated validation schemas
import { z } from 'zod';
export const createPlaceDtoSchema = z.object({
  title: z.string(),
  type: z.enum(["Ville", "Musée", "Parc", "Hotel", "Monument"]),
  description: z.string(),
  imageUrl: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
});

export const updatePlaceDtoSchema = z.object({
  title: z.string().optional().nullable(),
  type: z.enum(["Ville", "Musée", "Parc", "Hotel", "Monument"]).optional().nullable(),
  description: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
});

