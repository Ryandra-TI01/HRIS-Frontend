import axios from "axios";

// const url = "http://127.0.0.1:8000";
const url = "https://backend-kelompokfwd7-sibm3.karyakreasi.id";

const API = axios.create({
  baseURL: `${url}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // if error at login page do not redirect
    const currentPath = window.location.pathname;

    if (error.response && error.response.status === 401 && currentPath !== "/login") {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);
export default API;