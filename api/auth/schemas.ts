// Auto-generated validation schemas
import { z } from 'zod';
export const registerDtoSchema = z.object({
  role: z.enum(["Participant", "Organizer", "Driver", "Admin", "user", "promoter"]),
  organizerType: z.enum(["Individual", "Company"]).optional().nullable(),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  phoneNumber: z.string().optional().nullable(),
  dateOfBirth: z.string().optional().nullable(),
  driverLicenseNumber: z.string().optional().nullable(),
  companyName: z.string().optional().nullable(),
  companyType: z.string().optional().nullable(),
  contactEmail: z.string().optional().nullable(),
  companyAddress: z.string().optional().nullable(),
  email: z.string(),
  password: z.string().min(6, { message: "Too short" }),
});

export const loginDtoSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const verifyEmailDtoSchema = z.object({
  email: z.string(),
  code: z.string(),
});

export const requestResetDtoSchema = z.object({
  email: z.string(),
});

export const resetPasswordDtoSchema = z.object({
  email: z.string(),
  code: z.string(),
  newPassword: z.string(),
});

export const changePasswordDtoSchema = z.object({
  oldPassword: z.string(),
  newPassword: z.string().min(6, { message: "Too short" }),
});

export const confirmPasswordChangeDtoSchema = z.object({
  code: z.string(),
  newPassword: z.string(),
});

