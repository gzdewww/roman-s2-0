import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import bookingsReducer from "./bookings/bookingsSlice";
import cartReducer from "./cart/cartSlice";
import dishesReducer from "./dishes/dishesSlice";
import ordersReducer from "./orders/ordersSlice";
import restaurantsReducer from "./restaurants/restaurantsSlice";
import usersReducer from "./users/usersSlice";
import notificationsReducer from "./notification/notificationsSlice";
import couriersReducer from "./couriers/couriersSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dishes: dishesReducer,
    orders: ordersReducer,
    bookings: bookingsReducer,
    cart: cartReducer,
    restaurants: restaurantsReducer,
    users: usersReducer,
    notifications: notificationsReducer,
    couriers: couriersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
