import type { Address } from "../types/address";
import type { User } from "../types/user";
import { api } from "./axios";

// frontend/src/api/userApi.ts

export const getProfile = async (): Promise<User> => {
  const user = await api.get<User>("/users/me");
  const addresses = await api.get<Address[]>("/users/me/addresses");
  console.log({
    ...user.data,
    addresses: addresses.data,
  });
  return {
    ...user.data,
    addresses: addresses.data,
  };
};

// Обновление профиля пользователя (без адресов)
export const updateProfile = async (
  data: Partial<Omit<User, "addresses">>,
): Promise<User> => {
  const res = await api.put<User>("/users/me", data);
  return res.data;
};

export const getProfileById = async (id: number): Promise<User> => {
  const res = await api.get<User>(`/users/${id}`);
  return res.data;
};

export const addAddress = async (data: Address): Promise<Address> => {
  const res = await api.post<Address>("/users/me/addresses", data);
  return res.data;
};

export const getAddresses = async (): Promise<Address[]> => {
  const res = await api.get<Address[]>("/users/me/addresses");
  return res.data;
};

export const getCouriers = async (): Promise<User[]> => {
  const res = await api.get<User[]>("/users?role=COURIER");
  return res.data;
};