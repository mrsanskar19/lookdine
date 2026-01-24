import { User } from "./types/auth";


const TOKEN_KEY = 'jwt_token';
const USER_KEY = 'auth_user';

// --- Token Management ---
export const getAuthToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const setAuthToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

// --- User Management ---
export const getAuthUser = (): User | null => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const setAuthUser = (user: User): void => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

// --- Combined Auth State ---
export const clearAuth = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};


export const saveToStorage = <T>(key: string, value: T): void => {
  try {
    const serializedValue = typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error(`Error saving ${key} to localStorage`, error);
  }
};

export const getFromStorage = <T>(key: string): T | null => {
  try {
    const item = localStorage.getItem(key);
    if (!item) return null;
    
    // Check if the item is a stringified object/array
    if (item.startsWith('{') || item.startsWith('[')) {
      return JSON.parse(item) as T;
    }
    return item as unknown as T;
  } catch {
    return null;
  }
};