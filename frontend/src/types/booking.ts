import type { Restaurant } from "./restaurant";

export interface Booking {
  id: number;
  restaurant: Restaurant;
  bookingTime: string;
  guestsCount: number;
  comment?: string;
}
