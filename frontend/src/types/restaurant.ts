import type { Address } from "./address";

export interface ManagerShort {
  id: number;
  name: string;
}

export interface Restaurant {
  id: number;
  name: string;
  address: Address;
  seatsCount: number;
  imageUrl?: string;
  manager?: ManagerShort;
}
