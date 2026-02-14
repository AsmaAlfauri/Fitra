import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCampaigns,
  createCampaign,
  updateCampaign,
  deleteCampaign,
} from "@/services/campaignService";
import { Campaign } from "@/types";

interface CampaignState {
  list: Campaign[];
  loading: boolean;
  error: string | null;
}

const initialState: CampaignState = {
  list: [],
  loading: false,
  error: null,
};

// ===== THUNKS =====

// READ
export const fetchCampaigns = createAsyncThunk(
  "campaigns/fetch",
  async (_, { rejectWithValue }) => {
    try {
      return await getCampaigns();
    } catch {
      return rejectWithValue("Failed to fetch campaigns");
    }
  }
);

// CREATE
export const createCampaignThunk = createAsyncThunk(
  "campaigns/create",
  async (data: Partial<Campaign>, { rejectWithValue }) => {
    try {
      return await createCampaign(data);
    } catch {
      return rejectWithValue("Create failed");
    }
  }
);

// UPDATE
export const updateCampaignThunk = createAsyncThunk(
  "campaigns/update",
  async (
    { id, data }: { id: number; data: Partial<Campaign> },
    { rejectWithValue }
  ) => {
    try {
      return await updateCampaign(id, data);
    } catch {
      return rejectWithValue("Update failed");
    }
  }
);

// DELETE
export const deleteCampaignThunk = createAsyncThunk(
  "campaigns/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      await deleteCampaign(id);
      return id;
    } catch {
      return rejectWithValue("Delete failed");
    }
  }
);

const campaignSlice = createSlice({
  name: "campaigns",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // READ
      .addCase(fetchCampaigns.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCampaigns.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload as Campaign[];
      })
      .addCase(fetchCampaigns.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // CREATE
      .addCase(createCampaignThunk.fulfilled, (state, action) => {
        state.list.push(action.payload as Campaign);
      })

      // UPDATE
      .addCase(updateCampaignThunk.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (c) => c.id === (action.payload as Campaign).id
        );
        if (index !== -1) state.list[index] = action.payload as Campaign;
      })

      // DELETE
      .addCase(deleteCampaignThunk.fulfilled, (state, action) => {
        state.list = state.list.filter((c) => c.id !== action.payload);
      });
  },
});

export default campaignSlice.reducer;
