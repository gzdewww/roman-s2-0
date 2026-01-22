import { Role } from "./enums";

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role: Role;
  addresses: string[];
}
