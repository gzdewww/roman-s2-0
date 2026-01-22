import { DeliveryType } from "./enums";

export interface OrderItemRequest {
  dishId: number;
  quantity: number;
}

export interface CreateOrderRequest {
  deliveryType: DeliveryType;
  deliveryAddress: string;
  items: OrderItemRequest[];
}
