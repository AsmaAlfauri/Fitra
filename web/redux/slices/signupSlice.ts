import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/services/api";
import { User } from "@/types";

interface SignupPayload {
  name: string;
  email: string;
  password: string;
  role: "viewer" | "admin";
}

interface SignupResponse {
  token: string;
  user: User;
}

interface SignupState {
  loading: boolean;
  error: string | null;
  token: string | null;
  user: User | null;
}

const initialState: SignupState = {
  loading: false,
  error: null,
  token: null,
  user: null,
};

// ===== THUNK =====
export const signupThunk = createAsyncThunk<SignupResponse, SignupPayload, { rejectValue: string }>(
  "auth/signup",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/signup", data);
      return res.data; // expecting { token, user } from API
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || "Signup failed");
    }
  }
);

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    reset(state) {
      state.loading = false;
      state.error = null;
      state.token = null;
      state.user = null;
    },
    hydrate(state) {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      if (token) state.token = token;
      if (user) state.user = JSON.parse(user);
    },
    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupThunk.fulfilled, (state, action: PayloadAction<SignupResponse>) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;

        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(signupThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Signup failed";
      });
  },
});

export const { reset, hydrate, logout } = signupSlice.actions;
export default signupSlice.reducer;
