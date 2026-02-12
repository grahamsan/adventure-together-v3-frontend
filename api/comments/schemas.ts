// Auto-generated validation schemas
import { z } from 'zod';
export const createCommentDtoSchema = z.object({
  content: z.string(),
  parentId: z.string().optional().nullable(),
});

export const updateCommentDtoSchema = z.object({
  content: z.string(),
});

