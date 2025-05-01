import axios from 'axios';
import { useAuth } from '@clerk/clerk-expo';

const API_URL = 'http://your-api-url/api';

// Create an axios instance with Clerk auth
const createApiClient = (getToken: () => Promise<string|null>) => {
  const instance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
  });

  instance.interceptors.request.use(async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return instance;
};

export default createApiClient;