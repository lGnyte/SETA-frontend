import axios, { AxiosError } from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 🔁 Request Interceptor (optional)
api.interceptors.request.use(
  (config) => {
    console.log(`[Request] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('[Request Error]', error);
    return Promise.reject(error);
  }
);

// ✅ Response Interceptor with Error Handling
api.interceptors.response.use(
  (response) => {
    console.log(`[Response]`, response.status, response.config.url);
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      // Server responded with a status outside 2xx
      console.error(`[API Error] ${error.response.status}: ${error.response.data}`);
    } else if (error.request) {
      // Request was made but no response
      console.error('[Network Error] No response received:', error.message);
    } else {
      // Something else went wrong
      console.error('[Config/Error] Axios config error:', error.message);
    }

    return Promise.reject(error);
  }
);

export default api;
