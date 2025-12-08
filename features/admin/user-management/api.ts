// users-api.ts
import { User } from './types';

export async function fetchUsers(): Promise<User[]> {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve([
        {
          id: 'USR-001',
          name: 'John Doe',
          email: 'john.doe@email.com',
          role: 'user',
          registrationDate: '2023-08-15',
          status: 'active',
        },
        {
          id: 'USR-002',
          name: 'Jane Smith',
          email: 'jane.smith@email.com',
          role: 'admin',
          registrationDate: '2023-07-20',
          status: 'active',
        },
        {
          id: 'USR-003',
          name: 'Emily White',
          email: 'emily.white@email.com',
          role: 'user',
          registrationDate: '2024-01-10',
          status: 'banned',
        },
        {
          id: 'USR-004',
          name: 'Michael Brown',
          email: 'michael.brown@email.com',
          role: 'user',
          registrationDate: '2023-12-05',
          status: 'active',
        },
        {
          id: 'USR-005',
          name: 'Sarah Johnson',
          email: 'sarah.johnson@email.com',
          role: 'admin',
          registrationDate: '2023-06-18',
          status: 'active',
        },
      ]);
    }, 600)
  );
}

export async function updateUserRole(userId: string, newRole: 'user' | 'admin'): Promise<void> {
  return new Promise((resolve) =>
    setTimeout(() => {
      console.log(`User ${userId} role updated to ${newRole}`);
      resolve();
    }, 500)
  );
}

export async function banUser(userId: string): Promise<void> {
  return new Promise((resolve) =>
    setTimeout(() => {
      console.log(`User ${userId} has been banned`);
      resolve();
    }, 500)
  );
}

export async function unbanUser(userId: string): Promise<void> {
  return new Promise((resolve) =>
    setTimeout(() => {
      console.log(`User ${userId} has been unbanned`);
      resolve();
    }, 500)
  );
}

export async function deleteUser(userId: string): Promise<void> {
  return new Promise((resolve) =>
    setTimeout(() => {
      console.log(`User ${userId} has been deleted`);
      resolve();
    }, 500)
  );
}