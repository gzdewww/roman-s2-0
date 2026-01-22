import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from "../types/auth";
import { api } from "./axios";

export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  const res = await api.post<AuthResponse>("/auth/login", data);
  return res.data;
};

export const register = async (
  data: RegisterRequest,
): Promise<AuthResponse> => {
  const res = await api.post<AuthResponse>("/auth/register", data);
  console.log(res)
  return res.data;
};