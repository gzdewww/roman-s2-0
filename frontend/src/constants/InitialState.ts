import type { AuthState } from "../store/auth/authSlice";
import type { BookingsState } from "../store/bookings/bookingsSlice";
import type { DishesState } from "../store/dishes/dishesSlice";
import type { OrdersState } from "../store/orders/ordersSlice";
import type { RestaurantsState } from "../store/restaurants/restaurantsSlice";
import type { UserState } from "../store/users/usersSlice";

export const initialAuthState: AuthState = {
  token: localStorage.getItem("token"),
  loading: false,
  error: null,
  initialized: false,
  modalOpen: false,
  modalType: "login",
} as const;

export const initialDishesState: DishesState = {
  items: [],
  loading: false,
} as const;

export const initialRestaurantsState: RestaurantsState = {
  items: [],
  loading: false,
  selectedRestaurant: null,
  isModalOpen: false,
} as const;

export const initialBookingsState: BookingsState = {
  items: [],
  loading: false,
  selectedBookingId: null,
  isModalOpen: false,
} as const;

export const initialOrdersState: OrdersState = {
  items: [],
  loading: false,
} as const;



export const initialUsersState: UserState = {
  user: null,
  loading: false,
  error: null,
};
