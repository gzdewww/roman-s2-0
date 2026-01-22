import type { Restaurant } from "../types/restaurant";
import { api } from "./axios";

export const getRestaurants = async (): Promise<Restaurant[]> => {
  const res = await api.get<Restaurant[]>("/restaurants");
  return res.data;
};

export const getRestaurantById = async (id: number): Promise<Restaurant> => {
  const res = await api.get<Restaurant>(`/restaurants/${id}`);
  return res.data;
};
