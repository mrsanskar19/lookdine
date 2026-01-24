
  /** * CTO Standard: Define all Auth-related interfaces here.
 * This ensures consistency between the Frontend and Backend.
 */

export type UserRole = "user" | "hotel_owner" | "admin" | "super_admin";

export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  role: UserRole;
  avatar?: string;
  dob?: string;
  phone?: string;
  interests?: string[];
  createdAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: any;
}

// 1. Login Type
export interface LoginCredentials {
  username?: string; 
  email?:string;
  password: string;
}

// 2. Step-wise Signup Type
export interface SignupData {
  // Step 1: Personal
  name: string;
  dob: string;
  // Step 2: Contact
  email: string;
  phone: string;
  // Step 3: Identity
  username: string;
  avatar?: string;
  // Step 4: Interests
  interests: string[];
  // Security
  password?: string; 
}

// 3. Password Management Types
export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  newPassword: string;
}