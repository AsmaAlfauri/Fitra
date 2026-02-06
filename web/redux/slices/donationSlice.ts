import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Donation } from '@/types';
import api from '@/services/api';
import { RootState } from '@/redux/store';

interface DonationState {
  list: Donation[];
  loading: boolean;
  error: string | null;
}

const initialState: DonationState = {
  list: [],
  loading: false,
  error: null,
};

// FETCH BY CAMPAIGN
export const fetchDonationsByCampaign = createAsyncThunk(
  'donations/fetchByCampaign',
  async (campaignId: number, thunkAPI) => {
    try {
      const res = await api.get(`/donations?campaign_id=${campaignId}`);
      return res.data as Donation[];
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || 'Failed to fetch donations');
    }
  }
);

// CREATE DONATION
export const createDonationThunk = createAsyncThunk<
  Donation,
  { campaign_id: number; amount: number },
  { state: RootState }
>(
  'donations/create',
  async (data, thunkAPI) => {
    try {
      const { user } = thunkAPI.getState().auth;
      const res = await api.post('/donations', {
        ...data,
        user_id: user?.id,
      });
      return res.data as Donation;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || 'Failed to create donation');
    }
  }
);

// UPDATE STATUS
export const updateDonationStatusThunk = createAsyncThunk(
  'donations/updateStatus',
  async (
    data: { id: number; status: 'pending' | 'approved' | 'rejected' },
    thunkAPI
  ) => {
    try {
      const res = await api.put(`/donations/${data.id}/status`, {
        status: data.status,
      });
      return res.data as Donation;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || 'Failed to update status');
    }
  }
);

const donationSlice = createSlice({
  name: 'donations',
  initialState,
  reducers: {
    clearDonations: (state) => {
      state.list = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchDonationsByCampaign.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDonationsByCampaign.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchDonationsByCampaign.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // CREATE
      .addCase(createDonationThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDonationThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.list.unshift(action.payload);
      })
      .addCase(createDonationThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // UPDATE STATUS
      .addCase(updateDonationStatusThunk.fulfilled, (state, action) => {
        const index = state.list.findIndex(d => d.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      });
  },
});

export const { clearDonations } = donationSlice.actions;
export default donationSlice.reducer;
