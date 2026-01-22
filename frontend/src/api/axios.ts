import axios from "axios";
import { logout, openAuthModal } from "../store/auth/authSlice";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  async (resp) => resp,
  async (error) => {
    const { store } = await import("../store/store");
    const status = error?.response?.status;
    if (status === 401) {
      // session expired / invalid token
      localStorage.removeItem("token"); // safety
      store.dispatch(logout());
      store.dispatch(openAuthModal("login"));
    }
    return Promise.reject(error);
  },
);
