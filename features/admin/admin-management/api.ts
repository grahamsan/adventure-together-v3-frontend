import { adminControllerFindAll, adminControllerDeleteUser } from "@/api/admin/api";
import type { Admin } from "./types";

export async function fetchAdmins(): Promise<Admin[]> {
  const rows = await adminControllerFindAll();
  const list = Array.isArray(rows) ? rows : [];
  return list
    .filter((u: { role?: string }) => u.role === "Admin")
    .map(
      (u: { id: string; fullName: string; email: string }) =>
        ({
          id: u.id,
          name: u.fullName,
          email: u.email,
          role: "admin",
          createdAt: "—",
          lastLogin: "—",
        }) as Admin,
    );
}

export async function deleteAdmin(adminId: string): Promise<void> {
  await adminControllerDeleteUser(adminId);
}
