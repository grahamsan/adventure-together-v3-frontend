// Auto-generated validation schemas
import { z } from 'zod';
export const createExperienceDtoSchema = z.object({
  title: z.string().min(2, { message: "Too short" }),
  description: z.string().min(2, { message: "Too short" }),
  location: z.string().min(2, { message: "Too short" }),
  dateStart: z.string(),
  dateEnd: z.string(),
  type: z.enum(["road-trip", "event"]).optional().nullable(),
  image: z.string().optional().nullable(),
});

