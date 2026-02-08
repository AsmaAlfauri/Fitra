import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchUserById,
  updateUserById,
  fetchAllUsers,
  deleteUserById
} from '@/services/userService';

// ===== Async Thunks =====
export const getUserById = createAsyncThunk('user/getById', fetchUserById);
export const updateUser = createAsyncThunk(
  'user/update',
  async ({ id, data }: any) => await updateUserById(id, data)
);

export const getAllUsers = createAsyncThunk('user/getAll', fetchAllUsers);
export const deleteUser = createAsyncThunk('user/delete', async (id: number) => {
  await deleteUserById(id);
  return id; // return deleted id so we can remove from state
});

// ===== Slice =====
const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,        // single user (profile or selected)
    users: [] as any[],// all users for admin
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // --- getUserById ---
    builder
      .addCase(getUserById.pending, (state) => { state.loading = true; })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });

    // --- updateUser ---
    builder
      .addCase(updateUser.pending, (state) => { state.loading = true; })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });

    // --- getAllUsers ---
    builder
      .addCase(getAllUsers.pending, (state) => { state.loading = true; })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });

    // --- deleteUser ---
    builder
      .addCase(deleteUser.pending, (state) => { state.loading = true; })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(u => u.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default userSlice.reducer;
