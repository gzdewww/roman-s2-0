import { DeliveryType, OrderStatus } from "./enums";
import type { Dish } from "./dish";
import type { User } from "./user";

export interface OrderItem {
  id: number;
  priceAtMoment: number;
  quantity: number;
  dish: Dish;
}

export interface Order {
  id: number;
  createdAt: string;
  deliveredAt?: string;
  deliveryAddress: string;
  deliveryType: DeliveryType;
  totalPrice: number;
  status: OrderStatus;
  client: Pick<User, "id" | "name">;
  courier?: Pick<User, "id" | "name">;
  items: OrderItem[];
}
