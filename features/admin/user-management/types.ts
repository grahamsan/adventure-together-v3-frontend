// users-types.ts
export type UserRole = 'user' | 'admin';
export type UserStatus = 'active' | 'banned';
export type UserFilterType = 'all' | 'user' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  registrationDate: string;
  status: UserStatus;
}

export interface UserFilters {
  search: string;
  filterType: UserFilterType;
}