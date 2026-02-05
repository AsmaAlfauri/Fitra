import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { login } from "@/services/authService";

interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "viewer";
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

interface LoginResponse {
  user: User;
  token: string;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

export const loginThunk = createAsyncThunk<LoginResponse, { email: string; password: string }>(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await login(data);
      return res as LoginResponse;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.error || err.response?.data?.message || "Login failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
    hydrate(state) {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      if (token) state.token = token;
      if (user) state.user = JSON.parse(user);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(loginThunk.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, hydrate } = authSlice.actions;
export default authSlice.reducer;
