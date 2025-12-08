import { Admin, AddAdminData } from "./types";

// Mock data for development
const mockAdmins: Admin[] = [
  {
    id: "1",
    name: "Super Admin",
    email: "super@admin.com",
    role: "super_admin",
    createdAt: "2024-01-15",
    lastLogin: "2024-11-26",
  },
  {
    id: "2",
    name: "John Doe",
    email: "john@admin.com",
    role: "admin",
    createdAt: "2024-03-20",
    lastLogin: "2024-11-25",
  },
  {
    id: "3",
    name: "Jane Smith",
    email: "jane@admin.com",
    role: "admin",
    createdAt: "2024-05-10",
    lastLogin: "2024-11-24",
  },
];

export async function fetchAdmins(): Promise<Admin[]> {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(mockAdmins);
    }, 600)
  );
}

export async function addAdmin(data: AddAdminData): Promise<Admin> {
  return new Promise((resolve) =>
    setTimeout(() => {
      const newAdmin: Admin = {
        id: `${mockAdmins.length + 1}`,
        ...data,
        createdAt: new Date().toISOString().split("T")[0],
        lastLogin: "Never",
      };
      mockAdmins.push(newAdmin);
      resolve(newAdmin);
    }, 500)
  );
}

export async function deleteAdmin(adminId: string): Promise<void> {
  return new Promise((resolve) =>
    setTimeout(() => {
      const index = mockAdmins.findIndex((a) => a.id === adminId);
      if (index > -1) {
        mockAdmins.splice(index, 1);
      }
      resolve();
    }, 500)
  );
}
