import { api } from "./axios";
import type { Booking } from "../types/booking";
import type { CreateBookingRequest } from "../types/bookingRequest";

export const createBooking = async (
  data: CreateBookingRequest,
): Promise<Booking> => {
  const res = await api.post<Booking>("/bookings", data);
  return res.data;
};

export const getMyBookings = async (): Promise<Booking[]> => {
  const res = await api.get<Booking[]>("/bookings/my");
  return res.data;
};
