import React, { createContext, useContext, useState, type ReactNode, useCallback } from 'react';
import { type User, type Store, type Rating, UserRole } from '../types';
import { INITIAL_STORES, INITIAL_USERS, INITIAL_RATINGS } from '../services/mockData';

interface AppContextType {
  currentUser: User | null;
  users: User[];
  stores: Store[];
  ratings: Rating[];
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  signup: (user: Omit<User, 'id'>) => Promise<boolean>;
  logout: () => void;
  submitRating: (storeId: string, value: number) => void;
  getStoreAverageRating: (storeId: string) => number;
  getStoreRatingCount: (storeId: string) => number;
  getUserRatingForStore: (storeId: string) => number | null;
  updateUserProfile: (updated: Partial<User> & { id: string }) => void;

  addUser: (user: Omit<User, 'id'> & { role: UserRole, storeName?: string, storeAddress?: string }) => void;
  removeUser: (userId: string) => void;
  removeStore: (storeId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [stores, setStores] = useState<Store[]>(INITIAL_STORES);
  const [ratings, setRatings] = useState<Rating[]>(INITIAL_RATINGS);

  const updateUserProfile = (updated: Partial<User> & { id: string }) => {
    setUsers(prev => prev.map(u => u.id === updated.id ? { ...u, ...updated } : u));
  };

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.role === role);
    if (user && user.password === password) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const signup = async (userData: Omit<User, 'id'>): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const existingUser = users.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
    if (existingUser) return false;
    const newUser: User = { ...userData, id: `u-${Date.now()}` };
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    return true;
  };

  const addUser = (userData: Omit<User, 'id'> & { role: UserRole, storeName?: string, storeAddress?: string }) => {
    const newUserId = `u-${Date.now()}`;
    let ownedStoreId: string | undefined;

    if (userData.role === UserRole.OWNER && userData.storeName && userData.storeAddress) {
      const newStore: Store = { id: `s-${Date.now()}`, name: userData.storeName, address: userData.storeAddress };
      setStores(prev => [...prev, newStore]);
      ownedStoreId = newStore.id;
    }

    const newUser: User = { ...userData, id: newUserId, ownedStoreId };
    setUsers(prev => [...prev, newUser]);
  };

  // Remove user
  const removeUser = (userId: string) => {
    setUsers(prev => prev.filter(u => u.id !== userId));
    
    setRatings(prev => prev.filter(r => r.userId !== userId));
    
    const ownedStore = stores.find(s => users.find(u => u.ownedStoreId === s.id && u.id === userId));
    if (ownedStore) removeStore(ownedStore.id);
  };

  // Remove store
  const removeStore = (storeId: string) => {
    setStores(prev => prev.filter(s => s.id !== storeId));
    
    setRatings(prev => prev.filter(r => r.storeId !== storeId));

    setUsers(prev => prev.map(u => u.ownedStoreId === storeId ? { ...u, ownedStoreId: undefined } : u));
  };

  const logout = () => setCurrentUser(null);

  const submitRating = useCallback((storeId: string, value: number) => {
    if (!currentUser) return;
    setRatings(prev => {
      const index = prev.findIndex(r => r.storeId === storeId && r.userId === currentUser.id);
      if (index >= 0) {
        const updated = [...prev];
        updated[index] = { ...updated[index], value, timestamp: Date.now() };
        return updated;
      }
      return [...prev, { id: `r-${Date.now()}`, storeId, userId: currentUser.id, value, timestamp: Date.now() }];
    });
  }, [currentUser]);

  const getStoreAverageRating = useCallback((storeId: string) => {
    const storeRatings = ratings.filter(r => r.storeId === storeId);
    if (!storeRatings.length) return 0;
    const sum = storeRatings.reduce((acc, curr) => acc + curr.value, 0);
    return parseFloat((sum / storeRatings.length).toFixed(1));
  }, [ratings]);

  const getStoreRatingCount = useCallback((storeId: string) => ratings.filter(r => r.storeId === storeId).length, [ratings]);

  const getUserRatingForStore = useCallback((storeId: string) => {
    if (!currentUser) return null;
    const rating = ratings.find(r => r.storeId === storeId && r.userId === currentUser.id);
    return rating ? rating.value : null;
  }, [currentUser, ratings]);

  return (
    <AppContext.Provider value={{
      currentUser,
      users,
      stores,
      ratings,
      login,
      signup,
      logout,
      submitRating,
      getStoreAverageRating,
      getStoreRatingCount,
      getUserRatingForStore,
      updateUserProfile,
      addUser,
      removeUser,
      removeStore
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
