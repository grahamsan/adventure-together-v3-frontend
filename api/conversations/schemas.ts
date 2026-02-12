// Auto-generated validation schemas
import { z } from 'zod';
export const createMessageDtoSchema = z.object({
  text: z.string(),
  attachments: z.array(z.string()).optional().nullable(),
});

export const updateMessageDtoSchema = z.object({
  text: z.string(),
});

