import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Notification } from "../../types/notification";

const initialState: Notification[] = [];

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Omit<Notification, "id">>) => {
      const { message, type, duration = 3000 } = action.payload;
      state.push({
        id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        message,
        type,
        duration,
      });
    },

    // Только для завершения — вызывается после анимации
    removeNotification: (state, action: PayloadAction<string>) => {
      return state.filter((n) => n.id !== action.payload);
    },
  },
});

export const { addNotification, removeNotification } = notificationsSlice.actions;
export default notificationsSlice.reducer;