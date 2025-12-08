export interface RegisterDto {
  email: string;
  password: string;
  role: string;
  phoneNumber?: string | null;
  firstName: string | null;
  lastName: string | null;
  dateOfBirth?: string | null;
  driverLicenseNumber?: string | null;
  name?: string | null;
  companyName?: string | null;
  companyType?: string | null;
  contactEmail?: string | null;
  companyAddress?: string | null;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface VerifyEmailDto {
  email: string;
  code: string;
}

export interface ForgotPasswordDto {
  email: string;
}

export interface ResetPasswordDto {
  email: string;
  code: string;
  newPassword: string;
}

export interface ChangePasswordDto {
  oldPassword: string;
  newPassword: string;
}

export interface ConfirmPasswordChangeDto {
  code: string;
  newPassword: string;
}

export interface AuthResponse {
  statusCode: number;
  data: {
    accessToken: string;
    refreshToken?: string;
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      role: string;
      // Ajouter d'autres champs utilisateur si nécessaire
    };
  };
}

export interface VerifyEmailResponse {
  statusCode: number;
  data: {
    message: string;
    verified: boolean;
  };
}

export interface ForgotPasswordResponse {
  statusCode: number;
  data: {
    message: string;
  };
}

export interface ResetPasswordResponse {
  statusCode: number;
  data: {
    message: string;
  };
}

export interface ChangePasswordResponse {
  statusCode: number;
  data: {
    message: string;
  };
}

export interface ConfirmPasswordChangeResponse {
  statusCode: number;
  data: {
    message: string;
  };
}
