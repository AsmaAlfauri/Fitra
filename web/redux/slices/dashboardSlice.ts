import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchDashboardStats, getDonationsPerCampaign } from '@/services/dashboardService';

// Thunks
export const getStats = createAsyncThunk(
  'dashboard/getStats',
  fetchDashboardStats
);

export const getDonationsChart = createAsyncThunk(
  'dashboard/getDonationsChart',
  getDonationsPerCampaign
);

interface DashboardState {
  stats: null | {
    totalCampaigns: number;
    activeCampaigns: number;
    totalUsers: number;
    totalDonations: number;
    approvedDonations: number;
  };
  chart: { title: string; total: number }[];
  loading: boolean;
}

const initialState: DashboardState = {
  stats: null,
  chart: [],
  loading: false,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStats.fulfilled, (state, action) => {
        state.stats = action.payload;
        state.loading = false;
      })
      .addCase(getStats.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getDonationsChart.fulfilled, (state, action) => {
        state.chart = action.payload;
      });
  },
});

export default dashboardSlice.reducer;
