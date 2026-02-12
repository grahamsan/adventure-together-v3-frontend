// Auto-generated validation schemas
import { z } from 'zod';
export const updateUserRoleDtoSchema = z.object({
  role: z.enum(["Participant", "Organizer", "Driver", "Admin", "user", "promoter"]),
});

export const updateUserStatusDtoSchema = z.object({
  status: z.enum(["active", "suspended"]),
});

