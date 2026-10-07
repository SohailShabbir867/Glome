import axios from 'axios';
import { store } from '@/app/store';
import { selectAccessToken } from '@/features/auth/authSlice';

// One configured axios instance for the whole app.
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api/v1',
  withCredentials: true, // sends the refresh-token cookie
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const token = selectAccessToken(store.getState());
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// TODO (auth module): on 401, call /auth/refresh once, then retry the original request.

// Turns any axios error into a readable message for toasts/forms.
export const getErrorMessage = (error) =>
  error?.response?.data?.message || error?.message || 'Something went wrong';
