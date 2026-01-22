import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, register } from "../../api/authApi";
import { initialAuthState } from "../../constants/InitialState";
import type { LoginRequest, RegisterRequest } from "../../types/auth";
import type { User } from "../../types/user";
import { getProfile } from "../../api/userApi";

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  modalOpen: boolean;
  modalType: "login" | "register";
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

export const getProfileThunk = createAsyncThunk(
  "auth/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      return await getProfile();
    } catch (e: any) {
      return rejectWithValue(e.response.data.message ?? e.message);
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
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
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Login error";
      })

      .addCase(registerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Register error";
      })
      .addCase(getProfileThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfileThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Fetch user error";
      });
  },
});

export const { logout, openAuthModal, closeAuthModal, switchAuthModalType } =
  authSlice.actions;
export default authSlice.reducer;
