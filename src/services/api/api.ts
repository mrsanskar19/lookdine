import { toast } from 'sonner';
import { clearAuth, getAuthToken } from '../localStorage';

const API_BASE_URL = 'https://foodslinkx-backend.vercel.app/api/';

// 1. Unified Error Handling Logic
const handleGlobalError = (status: number, message: string) => {
  switch (status) {
    case 401:
      toast.error('Session Expired', { description: 'Redirecting to login...' });
      clearAuth();
      setTimeout(() => (window.location.href = '/login'), 1500);
      break;
    case 403:
      toast.error('Access Denied', { description: "You don't have permission for this." });
      break;
    case 429:
      toast.error('Too Many Requests', { description: 'Please slow down.' });
      break;
    case 500:
      toast.error('Server Error', { description: 'Our engineers are on it.' });
      break;
    default:
      toast.error('API Error', { description: message });
  }
};

// 2. Main Request Engine
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint.slice(1) : endpoint}`;

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  try {
    const response = await fetch(url, { ...options, headers });

    // Auto-handle non-OK responses
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const message = errorData.message || `Error ${response.status}`;
      
      handleGlobalError(response.status, message);
      
      const error = new Error(message);
      (error as any).status = response.status;
      throw error;
    }

    // Success: Parse JSON
    return await response.json();
  } catch (error: any) {
    if (error.name === 'TypeError') {
      toast.error('Connection Failed', { description: 'Please check your internet.' });
    }
    throw error;
  }
};

// 3. Sorted API Methods
export const api = {
  get: <T>(url: string) => apiRequest(url, { method: 'GET' }) as Promise<T>,
  
  post: <T>(url: string, data: any, showToast = false) => {
    const req = apiRequest(url, { method: 'POST', body: JSON.stringify(data) });
    if (showToast) toast.promise(req, { loading: 'Saving...', success: 'Done!', error: 'Failed' });
    return req as Promise<T>;
  },

  put: <T>(url: string, data: any) => 
    apiRequest(url, { method: 'PUT', body: JSON.stringify(data) }) as Promise<T>,

  delete: <T>(url: string) => 
    apiRequest(url, { method: 'DELETE' }) as Promise<T>,

  // Useful for file uploads (Form Data)
  upload: <T>(url: string, formData: FormData) => {
    return apiRequest(url, {
      method: 'POST',
      body: formData,
      headers: {}, // Let browser set boundary
    }) as Promise<T>;
  }
};