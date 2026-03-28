export type AdminUserStatus = "active" | "disabled";

/** Aligné sur `UserManagementResponseDto` du backend */
export interface AdminUserRow {
  id: string;
  name: string;
  email: string;
  role: string;
  registrationDate: string;
  status: AdminUserStatus;
}

export type UserFilterType = "all" | "user" | "admin";
