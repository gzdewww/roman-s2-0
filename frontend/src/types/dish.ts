import type { Nutrition } from "./nutrition";

export interface Dish {
  id: number;
  name: string;
  description?: string;
  ingredients?: string[];
  weight?: number;
  nutrition: Nutrition;
  price: number;
  imageUrl?: string;
}
