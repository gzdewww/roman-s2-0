import { api } from "./axios";
import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
} from "../types/auth";
import type { User } from "../types/user";

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

export const getProfile = async (): Promise<User> => {
  const res = await api.get<User>("/users/me");
  return res.data;
};
