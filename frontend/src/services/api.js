import axios from 'axios';

const ADMIN_STORAGE_KEY = 'developershub_admin';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Add a request interceptor to attach JWT token
API.interceptors.request.use((config) => {
  const storedAdmin = localStorage.getItem(ADMIN_STORAGE_KEY);
  const parsedAdmin = storedAdmin ? JSON.parse(storedAdmin) : null;
  const token = parsedAdmin?.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
export { ADMIN_STORAGE_KEY };
