"use client";

import { authService } from "@/services/api/auth";
import { getAuthToken, getAuthUser, setAuthUser, clearAuth } from "@/services/localStorage";
import { LoginCredentials, SignupData, User } from "@/services/types/auth";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";



interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    const storedToken = getAuthToken();
    const storedUser = getAuthUser();

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true)
    const res = await authService.login(credentials);
    if (res) {
      const apiToken = getAuthToken() || "";
      setToken(apiToken);
      setUser(res);
      setAuthUser(res.user);
      // router.push("/dashboard");
    }
    setIsLoading(false)
  };

  const signup = async (data: SignupData) => {
    const res = await authService.signup(data);
    if (res.success) {
      // router.push("/login");
    }
  };

  const logout = () => {
    clearAuth();
    setUser(null);
    setToken(null);
    // router.push("/login");
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    setAuthUser(updatedUser);
  };

  const value = {
    user,
    token,
    isAuthenticated: !!token,
    isLoading,
    login,
    signup,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}