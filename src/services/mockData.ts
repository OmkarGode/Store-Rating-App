import { type Store, type User, UserRole, type Rating } from '../types';

export const INITIAL_STORES: Store[] = [
  {
    id: 's1',
    name: 'Laxmi Cloth House',
    address: '15, Laxmi Road, Pune, Maharashtra',
    description: 'Stylish and comfortable clothing for men, women, and kids.',
  },
  {
    id: 's2',
    name: 'Green Leaf Grocers',
    address: '45 Market St, kolhapur, TX',
    description: 'Organic produce and local goods.',
  },
  {
    id: 's3',
    name: 'The Goodluck Corner Bookshop',
    address: '88 Reading Ln, punee',
    description: 'Rare books and excellent coffee.',
  },
  {
    id: 's4',
    name: 'ElectroThreads Solutions',
    address: '15, Tilak Road, Nashik, Maharashtra',
    description: 'Repair and maintenance of electronic devices.',
  },
];

// Updated Mock Users to satisfy validation rules:
// Name: Min 20 chars
// Password: 8-16 chars, 1 Upper, 1 Special
const DEFAULT_PASS = "Pass@123"; 

export const INITIAL_USERS: User[] = [
  { 
    id: 'u1', 
    name: 'Rajhans Book World', 
    email: 'user@gmail.com', 
    role: UserRole.USER,
    password: DEFAULT_PASS,
    address: 'maharshtara pune'
  },
  { 
    id: 'u2', 
    name: 'sham  The Local Reviewer', 
    email: 'sham@example.com', 
    role: UserRole.USER,
    password: DEFAULT_PASS,
    address: '123 Main St, Mumbai, Maharashtra'
  },
  { 
    id: 'admin1', 
    name: 'System Administrator Account', 
    email: 'admin@gmail.com', 
    role: UserRole.ADMIN,
    password: DEFAULT_PASS,
    address: 'Headquarters, Building A'
  },
  { 
    id: 'owner1', 
    name: 'Owner of tech head ', 
    email: 'owner@gmail.com', 
    role: UserRole.OWNER, 
    ownedStoreId: 's1',
    password: DEFAULT_PASS,
    address: 'bibwewadi pune'
  },
];

export const INITIAL_RATINGS: Rating[] = [
  { id: 'r1', storeId: 's1', userId: 'u1', value: 4, timestamp: Date.now() },
  { id: 'r2', storeId: 's1', userId: 'u2', value: 5, timestamp: Date.now() - 10000 },
  { id: 'r3', storeId: 's2', userId: 'u1', value: 3, timestamp: Date.now() - 20000 },
];