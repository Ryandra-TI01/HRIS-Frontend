import axios from "axios";

const url = "http://localhost:8000"

const API = axios.create({
    baseURL: `${url}/api`,
    headers: {
        "Content-Type": "application/json"
    }
})

// Request Interceptor
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
)

// Response Interceptor
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("accessToken");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
)
export default API