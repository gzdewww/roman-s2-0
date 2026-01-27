import type { Address } from "./address";
import { Role } from "./enums";

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  roles: Role[];
  addresses: Address[];
  createdAt: any;
}
