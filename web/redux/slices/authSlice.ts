import api from "@/services/api";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "viewer";
}

interface AuthState {
  loading: boolean;
  error: string | null;
  token: string | null;
  user: User | null;
}

const initialState: AuthState = {
  loading: false,
  error: null,
  token: null,
  user: null,
};

// ===== THUNK =====
export const login = createAsyncThunk(
  "auth/login",
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/login", data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue("Invalid email or password");
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    hydrate(state) {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      if (token) state.token = token;
      if (user) {
        try {
          state.user = JSON.parse(user);
        } catch {
          state.user = null;
          localStorage.removeItem("user");
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<{ token: string; user: User }>) => {
          state.loading = false;
          state.token = action.payload.token;
          state.user = action.payload.user;
          localStorage.setItem("token", action.payload.token);
          localStorage.setItem("user", JSON.stringify(action.payload.user));
        },
      )

      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, hydrate } = authSlice.actions;
export default authSlice.reducer;
