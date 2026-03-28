import {
  adminControllerFindAll,
  adminControllerUpdateRole,
  adminControllerUpdateStatus,
  adminControllerDeleteUser,
} from "@/api/admin/api";
import type { AdminUserRow } from "./types";

export function mapUserDto(u: {
  id: string;
  fullName: string;
  email: string;
  role: string;
  status: string;
}): AdminUserRow {
  return {
    id: u.id,
    name: u.fullName ?? "",
    email: u.email,
    role: u.role,
    registrationDate: "—",
    status: u.status === "disabled" ? "disabled" : "active",
  };
}

export function mapAdminUsersFromApi(rows: unknown): AdminUserRow[] {
  const list = Array.isArray(rows) ? rows : [];
  return list.map((u) =>
    mapUserDto(
      u as {
        id: string;
        fullName: string;
        email: string;
        role: string;
        status: string;
      },
    ),
  );
}

export async function fetchUsers(): Promise<AdminUserRow[]> {
  const rows = await adminControllerFindAll();
  return mapAdminUsersFromApi(rows);
}

export async function updateUserRole(
  userId: string,
  newRole: "Participant" | "Admin",
): Promise<void> {
  await adminControllerUpdateRole(userId, { role: newRole });
}

export async function banUser(userId: string): Promise<void> {
  await adminControllerUpdateStatus(userId, { status: "suspended" });
}

export async function unbanUser(userId: string): Promise<void> {
  await adminControllerUpdateStatus(userId, { status: "active" });
}

export async function deleteUser(userId: string): Promise<void> {
  await adminControllerDeleteUser(userId);
}
