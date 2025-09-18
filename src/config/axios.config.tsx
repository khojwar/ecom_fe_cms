import axios, { AxiosError, type AxiosResponse } from "axios";

// Create instance
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_V1_URL, // your backend base URL
  timeout: 30000,
  timeoutErrorMessage: "Request timed out. Please try again.",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor (add auth token if exists)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // or cookies
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export interface SuccessResponse {
  data: any;
  message: string;
  status: string;
  options: any;
}

// Response Interceptor (handle errors globally)
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data as AxiosResponse;
  },
  (exception: AxiosError) => {
    if (exception.response) {
      throw exception.response?.data;
    } else {
        throw exception;
    } 
  }
);

