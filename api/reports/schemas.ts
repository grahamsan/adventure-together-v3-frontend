// Auto-generated validation schemas
import { z } from 'zod';
export const createReportDtoSchema = z.object({
  entityType: z.enum(["Expérience", "Trajet", "Utilisateur", "Lieu", "Commentaire"]),
  entityId: z.string(),
  motif: z.string(),
});

export const updateReportStatusDtoSchema = z.object({
  status: z.enum(["Nouveau", "Traité"]),
});

