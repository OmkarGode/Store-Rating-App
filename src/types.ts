export const UserRole = {
  USER: 'USER',
  ADMIN: 'ADMIN',
  OWNER: 'OWNER',
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  password?: string; // Added for auth
  address?: string; // Added per requirements
  ownedStoreId?: string; // Only for owners
}

export interface Store {
  id: string;
  name: string;
  address: string;
  description: string;
}

export interface Rating {
  id: string;
  storeId: string;
  userId: string;
  value: number; // 1-5
  comment?: string;
  timestamp: number;
}