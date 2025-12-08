export interface Admin {
  id: string;
  name: string;
  email: string;
  role: "super_admin" | "admin";
  createdAt: string;
  lastLogin: string;
}

export interface AddAdminData {
  name: string;
  email: string;
  role: "super_admin" | "admin";
}
