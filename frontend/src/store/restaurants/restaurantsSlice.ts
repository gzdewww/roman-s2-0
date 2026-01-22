import { getRestaurants } from "../../api/restaurantsApi";
import { initialRestaurantsState } from "../../constants/InitialState";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Restaurant } from "../../types/restaurant";

export const fetchRestaurants = createAsyncThunk<Restaurant[]>(
  "dishes/fetchAll",
  async () => {
    return await getRestaurants();
  },
);

export interface RestaurantsState {
  items: Restaurant[];
  loading: boolean;
  selectedRestaurant: Restaurant | null;
  isModalOpen: boolean;
}

const restaurantsSlice = createSlice({
  name: "restaurants",
  initialState: initialRestaurantsState,
  reducers: {
    selectRestaurant: (state, action) => {
      state.selectedRestaurant = action.payload;
    },
    openRestaurantModal: (state) => {
      state.isModalOpen = true;
    },
    closeRestaurantModal: (state) => {
      state.isModalOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurants.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchRestaurants.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default restaurantsSlice.reducer;

export const { selectRestaurant, openRestaurantModal, closeRestaurantModal } =
  restaurantsSlice.actions;
