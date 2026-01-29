// frontend/src/store/couriers/couriersSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCouriers } from "../../api/userApi";
import type { User } from "../../types/user";

interface CouriersState {
  items: User[];
  loading: boolean;
  error: string | null;
}

export const fetchCouriers = createAsyncThunk("couriers/fetchAll", async () => {
  return await getCouriers();
});

const couriersSlice = createSlice({
  name: "couriers",
  initialState: {
    items: [],
    loading: false,
    error: null,
  } as CouriersState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCouriers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCouriers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCouriers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Не удалось загрузить курьеров";
      });
  },
});

export default couriersSlice.reducer;
