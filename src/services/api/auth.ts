// import { api } from '../api-handler/api';
// import { LoginCredentials, SignupData, ForgotPasswordData, ResetPasswordData } from '@/types/auth';

import { getAuthToken, setAuthToken } from "../localStorage";
import { ForgotPasswordData, LoginCredentials, ResetPasswordData, SignupData } from "../types/auth";
import { api } from "./api";


export const authService = {
  
  login: async (credentials: LoginCredentials) => {
    const res = await api.post<{ data: any; token: string }>('/auth/login', credentials,true);
    if (res?.data?.token) {
      setAuthToken(res?.data?.token)
    }
    return res?.data;
  },

  me:async ()=>{
    const res = await api.get<{data:any,message:string}>('/auth/me');
    return res?.data;
  },
  
  signup: async (userData: SignupData) => {
    const res = await api.post<{ success: boolean; data: any }>('/auth/signup', userData, true);
    return res;
  },

  
  forgotPassword: async (data: ForgotPasswordData) => {
    return await api.post('/auth/forgot-password', data, true);
  },


  resetPassword: async (data: ResetPasswordData) => {
    return await api.post('/auth/reset-password', data, true);
  },

  
  verifyOTP: async (email: string, otp: string) => {
    return await api.post('/auth/verify-otp', { email, otp }, true);
  }
};