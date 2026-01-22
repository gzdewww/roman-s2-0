import type { User } from "../types/user";
import { api } from "./axios";

export const getProfile = async (): Promise<User> => {
  const res = await api.get<User>("/users/me");
  return res.data;
};

export const addAddress = async (data: string): Promise<string> => {
  const res = await api.post<string>("/users/me/address", data);
  return res.data;
};
