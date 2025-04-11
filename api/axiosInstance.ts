import axios from 'axios';
import { useAuthStore } from '@/stores/auth';

const instance = axios.create({
  baseURL: useRuntimeConfig().public.BASE_URL
});

instance.interceptors.request.use((config) => {
  const authStore = useAuthStore();
  if (authStore.auth?.token) {
    config.headers.Authorization = `Bearer ${authStore.auth.token}`;
  }
  return config;
});

export default instance;
