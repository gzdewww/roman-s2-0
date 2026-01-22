import { api } from "./axios";
import type { Dish } from "../types/dish";

export const getDishes = async (): Promise<Dish[]> => {
  const res = await api.get<Dish[]>("/dishes");
  return res.data;
};

export const getDishById = async (id: number): Promise<Dish> => {
  const res = await api.get<Dish>(`/dishes/${id}`);
  return res.data;
};
