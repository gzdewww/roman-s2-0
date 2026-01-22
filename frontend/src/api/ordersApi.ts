import { api } from "./axios";
import type { Order } from "../types/order";
import type { CreateOrderRequest } from "../types/orderRequest";

export const createOrder = async (data: CreateOrderRequest): Promise<Order> => {
  const res = await api.post<Order>("/orders", data);
  return res.data;
};

export const getMyOrders = async (): Promise<Order[]> => {
  const res = await api.get<Order[]>("/orders/my");
  return res.data;
};

export const getOrderById = async (id: number): Promise<Order> => {
  const res = await api.get<Order>(`/orders/${id}`);
  return res.data;
};
