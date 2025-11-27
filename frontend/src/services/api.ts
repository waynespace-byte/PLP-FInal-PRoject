import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api/v1';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access');  // Fix: Use 'access' to match backend
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const refreshToken = localStorage.getItem('refresh');  // Fix: Use 'refresh' to match backend
      if (refreshToken) {
        try {
          const response = await axios.post(`${API_BASE_URL}/auth/token/refresh/`, {
            refresh: refreshToken,  // Fix: Use 'refresh' key for payload
          });
          
          localStorage.setItem('access', response.data.access);  // Fix: Store as 'access'
          originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
          
          return api(originalRequest);
        } catch (refreshError) {
          // Clear tokens and redirect on refresh failure
          localStorage.removeItem('access');
          localStorage.removeItem('refresh');
          window.location.href = '/auth';
          return Promise.reject(refreshError);
        }
      }
    }
    
    return Promise.reject(error);
  }
);

// Modular API exports for easy use in components
export const authAPI = {
  login: (data: { email: string; password: string }) => api.post('/auth/login/', data),
  register: (data: unknown) => api.post('/auth/register/', data),
  profile: () => api.get('/auth/profile/'),
};

export const farmAPI = {
  getFarms: () => api.get('/farms/'),
  createFarm: (data: unknown) => api.post('/farms/', data),
};

export const aiAPI = {
  getWeather: (location: string) => api.get(`/ai/weather/?location=${location}`),
  cropAdvisor: (data: unknown) => api.post('/ai/crop-advisor/', data),
  diseaseDetection: (formData: FormData) => api.post('/ai/disease-detection/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
};

export const marketplaceAPI = {
  getProducts: () => api.get('/marketplace/products/'),
};

export const paymentAPI = {
  initiateMpesa: (data: unknown) => api.post('/payments/mpesa/initiate/', data),
  checkMpesaStatus: (requestId: string) => api.get(`/payments/mpesa/status/${requestId}/`),
};

export default api;
