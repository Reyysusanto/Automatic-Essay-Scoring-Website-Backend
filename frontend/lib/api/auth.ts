/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { API_URL } from '@/utils/env';
import { useAuthStore } from '@/store/useStore';
import { RefreshTokenResponse } from '@/types/auth.type';

declare module 'axios' {
  export interface AxiosRequestConfig {
    _retry?: boolean;
  }
}

const axiosAdminConfig = axios.create({
  baseURL: API_URL,
});

// Refresh token queue
let isRefreshing = false;
type FailedQueueItem = {
  resolve: (token: string) => void;
  reject: (error: any) => void;
};

let failedQueue: FailedQueueItem[] = [];

const processQueue = (error?: any, token?: string) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Request Interceptor: set Authorization header
axiosAdminConfig.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().refreshToken;
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: handle 401 & refresh token
axiosAdminConfig.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig | undefined;
    if (!originalRequest) return Promise.reject(error);

    const status = error.response?.status;

    if (status === 401) {
      const { refreshToken, setTokens, clearAuth } = useAuthStore.getState();

      if (!refreshToken) {
        clearAuth();
        return Promise.reject(error);
      }

      // Queue requests if refreshing
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              if (!originalRequest.headers) originalRequest.headers = {};
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(axiosAdminConfig(originalRequest));
            },
            reject,
          });
        });
      }

      // Start refresh token process
      (originalRequest as any)._retry = true;
      isRefreshing = true;

      try {
        const response = await axios.get(`${API_URL}/auth/refreshtoken`, {
          headers: { 'Content-Type': 'application/json' },
        });

        const data = response.data as RefreshTokenResponse;

        if (!data || !data.data?.access_token) {
          throw new Error('Failed to refresh token');
        }

        const newAccessToken = data.data.access_token;

        // Save new token to store
        setTokens(newAccessToken, refreshToken);

        // Process queued requests
        processQueue(null, newAccessToken);

        if (!originalRequest.headers) originalRequest.headers = {};
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosAdminConfig(originalRequest);
      } catch (err) {
        processQueue(err, undefined);
        clearAuth();
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosAdminConfig;
