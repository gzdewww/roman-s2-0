import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import bookingsReducer from "./bookings/bookingsSlice";
import cartReducer from "./cart/cartSlice";
import dishesReducer from "./dishes/dishesSlice";
import ordersReducer from "./orders/ordersSlice";
import restaurantsReducer from "./restaurants/restaurantsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dishes: dishesReducer,
    orders: ordersReducer,
    bookings: bookingsReducer,
    cart: cartReducer,
    restaurants: restaurantsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
