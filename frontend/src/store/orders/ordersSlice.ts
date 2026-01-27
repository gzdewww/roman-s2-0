import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createOrder, getMyOrders, getOrders } from "../../api/ordersApi";
import type { Order } from "../../types/order";
import type { CreateOrderRequest } from "../../types/orderRequest";
import { initialOrdersState } from "../../constants/InitialState";

export const createOrderThunk = createAsyncThunk<Order, CreateOrderRequest>(
  "orders/create",
  async (data) => {
    return await createOrder(data);
  },
);

export const fetchMyOrders = createAsyncThunk<Order[]>(
  "orders/fetchMy",
  async () => {
    return await getMyOrders();
  },
);

export const fetchAllOrders = createAsyncThunk<Order[]>(
  "orders/fetchAll",
  async () => {
    return await getOrders();
  },
);

export interface OrdersState {
  items: Order[];
  loading: boolean;
}

const ordersSlice = createSlice({
  name: "orders",
  initialState: initialOrdersState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(createOrderThunk.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      });

    builder
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      });
  },
});

export default ordersSlice.reducer;
