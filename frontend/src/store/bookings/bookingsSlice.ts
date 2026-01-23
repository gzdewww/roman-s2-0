// bookingsSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createBooking, getMyBookings } from "../../api/bookingsApi";
import type { Booking } from "../../types/booking";
import type { CreateBookingRequest } from "../../types/bookingRequest";
import { initialBookingsState } from "../../constants/InitialState";

export const createBookingThunk = createAsyncThunk<
  Booking,
  CreateBookingRequest
>("bookings/create", async (data) => {
  return await createBooking(data);
});

export const fetchMyBookings = createAsyncThunk<Booking[]>(
  "bookings/fetchMy",
  async () => {
    return await getMyBookings();
  },
);

export interface BookingsState {
  items: Booking[];
  loading: boolean;
  selectedBookingId: number | null; // Изменено с selectedBooking на selectedBookingId
  isModalOpen: boolean;
}

const bookingsSlice = createSlice({
  name: "bookings",
  initialState: initialBookingsState,
  reducers: {
    openBookingModal: (state, action: { payload: number }) => { // Указываем тип payload
      state.selectedBookingId = action.payload; // Сохраняем ID, а не весь объект
      state.isModalOpen = true;
    },
    closeBookingModal: (state) => {
      state.selectedBookingId = null;
      state.isModalOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyBookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(createBookingThunk.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      });
  },
});

export default bookingsSlice.reducer;
export const { openBookingModal, closeBookingModal } = bookingsSlice.actions;