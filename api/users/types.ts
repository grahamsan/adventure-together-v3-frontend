// Auto-generated TypeScript types

export interface CreateUserDto {}

export interface UpdateUserDto {}

export interface User {
  id: string;
  email: string;
  isEmailVerified: boolean;
  role: "Organizer" | "Driver" | "Participant" | "Admin";
  organizerType: "Individual" | "Company" | string;
  status: "active" | "inactive" | string;
  firstName: string;
  lastName: string;
  name: string;
  avatarUrl: string | null;
  bio: string | null;
  phoneNumber: string;
  dateOfBirth: string; // ISO date (YYYY-MM-DD)
  driverLicenseNumber: string | null;
  companyName: string | null;
  companyType: string | null;
  contactEmail: string | null;
  companyAddress: string | null;
  createdAt: string; // ISO datetime
  updatedAt: string; // ISO datetime
}
