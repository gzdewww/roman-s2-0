export interface CreateBookingRequest {
  restaurantId: number;
  bookingTime: string;
  guestsCount: number;
  comment?: string;
}