// frontend/src/store/auth/authSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, register } from "../../api/authApi";
import type { LoginRequest, RegisterRequest } from "../../types/auth";
import { initialAuthState } from "../../constants/InitialState";

export interface AuthState {
  token: string | null;
  loading: boolean;
  error: string | null;
  modalOpen: boolean;
  modalType: "login" | "register";
  initialized: boolean; // ← новый флаг
}

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (data: LoginRequest) => {
    const res = await login(data);
    localStorage.setItem("token", res.token);
    return res.token;
  },
);

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (data: RegisterRequest) => {
    const res = await register(data);
    localStorage.setItem("token", res.token);
    return res.token;
  },
);

// Thunk для инициализации сессии при старте приложения
export const initializeAuth = createAsyncThunk(
  "auth/initializeAuth",
  async (_, { dispatch }) => {
    const token = localStorage.getItem("token");
    if (token) {
      // Можно дополнительно проверить валидность токена или загрузить профиль здесь
      // Пока просто подтверждаем наличие токена
      return token;
    }
    return null;
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    logout(state) {
      state.token = null;
      state.initialized = true; // опционально: можно оставить true, чтобы не реинициализировать
      localStorage.removeItem("token");
    },
    openAuthModal(state, action) {
      state.modalOpen = true;
      state.modalType = action.payload;
    },
    closeAuthModal(state) {
      state.modalOpen = false;
    },
    switchAuthModalType(state) {
      state.modalType = state.modalType === "login" ? "register" : "login";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        state.initialized = true;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Login error";
        state.initialized = true;
      });

    builder
      .addCase(registerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        state.initialized = true;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Register error";
        state.initialized = true;
      });

    builder.addCase(initializeAuth.fulfilled, (state, action) => {
      state.token = action.payload;
      state.initialized = true;
    });
  },
});

export const { logout, openAuthModal, closeAuthModal, switchAuthModalType } =
  authSlice.actions;

export default authSlice.reducer;
