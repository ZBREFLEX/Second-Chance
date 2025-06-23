// api/api.js
import axios from 'axios';

const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL      // let prod/staging override
      || 'http://localhost:3000/api', // dev default
  withCredentials: false,             // keep cookies off; we use JWT
});

// ─── attach the token automatically ────────────────────────────
API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }



  return config;
});

// ─── optional: centralised error → toast / log ─────────────────
API.interceptors.response.use(
  res => res,
  err => {
    console.error(err);
    // you can add a toast here if you use one
    return Promise.reject(err);
  }
);

export default API;
