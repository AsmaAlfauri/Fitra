import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/services/api";

interface SignupPayload {
  name: string;
  email: string;
  password: string;
  role: "admin" | "viewer";
}

interface SignupState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: SignupState = {
  loading: false,
  error: null,
  success: false,
};

// ===== THUNK =====
export const signupThunk = createAsyncThunk(
  "signup/register",
  async (data: SignupPayload, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/signup", data);
      return res.data;
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
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(signupThunk.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(signupThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { reset } = signupSlice.actions;
export default signupSlice.reducer;
