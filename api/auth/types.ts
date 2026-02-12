// Auto-generated TypeScript types

export interface RegisterDto {

  /** User role: Participant, Organizer, or Driver */
  role: 'Participant' | 'Organizer' | 'Driver' | 'Admin' | 'user' | 'promoter';

  /** Required for Organizer role: Individual or Company */
  organizerType?: 'Individual' | 'Company';

  firstName?: string;

  lastName?: string;

  phoneNumber?: string;

  dateOfBirth?: string;

  driverLicenseNumber?: string;

  companyName?: string;

  /** Company type: Restaurant, Hotel, etc. */
  companyType?: string;

  contactEmail?: string;

  companyAddress?: string;

  email: string;

  password: string;
}

export interface LoginDto {

  email: string;

  password: string;
}

export interface VerifyEmailDto {

  email: string;

  code: string;
}

export interface RequestResetDto {

  email: string;
}

export interface ResetPasswordDto {

  email: string;

  code: string;

  newPassword: string;
}

export interface ChangePasswordDto {

  /** Mot de passe actuel */
  oldPassword: string;

  /** Nouveau mot de passe (min 6 caractères) */
  newPassword: string;
}

export interface ConfirmPasswordChangeDto {

  code: string;

  newPassword: string;
}

