// types.ts

export interface CreateCommentDto {
  content: string;
  parentId?: string;
}

export interface UpdateCommentDto {
  content: string;
}

export interface User {
  id: string;
  email: string;
  isEmailVerified: boolean;
  role: "Organizer" | "User" | "Admin";
  organizerType: "Company" | "Individual" | null;
  status: "active" | "inactive" | "banned";
  firstName: string | null;
  lastName: string | null;
  name: string | null;
  avatarUrl: string | null;
  bio: string | null;
  phoneNumber: string | null;
  dateOfBirth: string | null;
  driverLicenseNumber: string | null;
  companyName: string | null;
  companyType: string | null;
  contactEmail: string | null;
  companyAddress: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Reply {
  id: string;
  content: string;
  user: User;
  replies: Reply[];
  likesCount: number;
  dislikesCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  content: string;
  user: User;
  replies: Reply[];
  likesCount: number;
  dislikesCount: number;
  createdAt: string;
  updatedAt: string;
}
