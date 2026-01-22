import { getDishes } from "../../api/dishesApi";
import { initialDishesState } from "../../constants/InitialState";
import type { Dish } from "../../types/dish";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchDishes = createAsyncThunk<Dish[]>(
  "dishes/fetchAll",
  async () => {
    return await getDishes();
  },
);

export interface DishesState {
  items: Dish[];
  loading: boolean;
}

const dishesSlice = createSlice({
  name: "dishes",
  initialState: initialDishesState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDishes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDishes.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchDishes.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default dishesSlice.reducer;
