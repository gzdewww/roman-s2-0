import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "../../types/cart";

const LOCAL_KEY = "romans_cart";

export interface CartState {
  items: CartItem[];
  sum: number;
}

const load = (): CartState => {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (!raw) return { items: [], sum: 0 };
    return JSON.parse(raw) as CartState;
  } catch {
    return { items: [], sum: 0 };
  }
};

const save = (state: CartState) => {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
};

const initialState: CartState = load() || { items: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(
      state,
      action: PayloadAction<{ dish: CartItem["dish"]; quantity?: number }>,
    ) {
      const { dish, quantity = 1 } = action.payload;
      const index = state.items.findIndex((item) => item.dish.id === dish.id);
      if (index >= 0) {
        state.items[index].quantity += quantity;
      } else {
        state.items.push({ dish, quantity });
      }
      save(state);
    },
    setQuantity(
      state,
      action: PayloadAction<{ dishId: number; quantity: number }>,
    ) {
      const { dishId, quantity } = action.payload;
      const index = state.items.findIndex((item) => item.dish.id === dishId);
      if (index >= 0) {
        if (quantity <= 0) state.items.splice(index, 1);
        else state.items[index].quantity = quantity;
      }
      save(state);
    },
    removeItem(state, action: PayloadAction<{ dishId: number }>) {
      const { dishId } = action.payload;
      const index = state.items.findIndex((item) => item.dish.id === dishId);
      if (index >= 0) state.items.splice(index, 1);
      save(state);
    },
    clearCart(state) {
      state.items = [];
      save(state);
    },
    replaceCart(state, action: PayloadAction<CartState>) {
      state.items = action.payload.items;
      save(state);
    },
  },
});

export const { addItem, setQuantity, removeItem, clearCart, replaceCart } =
  cartSlice.actions;
export default cartSlice.reducer;
