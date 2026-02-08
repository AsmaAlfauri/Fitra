import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/services/api";

interface SignupPayload {
  name: string;
  email: string;
  password: string;
  role: "viewer" | "admin";
}

interface SignupState {
  loading: boolean;
  error: string | null;
  token: string | null;
}

const initialState: SignupState = {
  loading: false,
  error: null,
  token: null,
};

// ===== THUNK =====
export const signupThunk = createAsyncThunk(
  "auth/signup",
  async (data: SignupPayload, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/signup", data);
      return res.data.token; // assuming API returns { token }
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
    },
    hydrate(state) {
      const token = localStorage.getItem("token");
      if (token) state.token = token;
    },
    logout(state) {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupThunk.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.token = action.payload;
        localStorage.setItem("token", action.payload);
      })
      .addCase(signupThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { reset, hydrate, logout } = signupSlice.actions;
export default signupSlice.reducer;
