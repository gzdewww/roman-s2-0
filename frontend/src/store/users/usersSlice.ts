// frontend/src/store/users/userSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProfile, updateProfile } from "../../api/userApi"; // предполагаем, что updateProfile тоже есть
import type { User } from "../../types/user";
import { initialUsersState } from "../../constants/InitialState";

export interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export const fetchProfileThunk = createAsyncThunk(
  "user/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      return await getProfile();
    } catch (e: any) {
      return rejectWithValue(e.response.data.message ?? e.message);
    }
  },
);

export const updateUserProfileThunk = createAsyncThunk(
  "user/updateProfile",
  async (userData: Partial<User>, { rejectWithValue }) => {
    try {
      return await updateProfile(userData);
    } catch (e: any) {
      return rejectWithValue(e.response.data.message ?? e.message);
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState: initialUsersState,
  reducers: {
    clearUserProfile(state) {
      state.user = null;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfileThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Failed to fetch profile";
      })
      .addCase(updateUserProfileThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfileThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUserProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Failed to update profile";
      });
  },
});

export const { clearUserProfile, setUser } = userSlice.actions;
export default userSlice.reducer;
