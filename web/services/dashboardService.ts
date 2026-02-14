// services/dashboardService.ts

import api from "./api";
export const fetchDashboardStats = async () => {
  try {
    const [campaignsRes, usersRes] = await Promise.all([
      api.get('/campaigns').catch(() => ({ data: [] })),
      api.get('/users').catch(() => ({ data: [] })),
    ]);

    const donationsResults = await Promise.all(
      campaignsRes.data.map((c: any) =>
        api.get(`/donations?campaign_id=${c.id}`)
           .then(res => res.data)
           .catch(() => [])
      )
    );

    const donations = donationsResults.flat();

    return {
      totalCampaigns: campaignsRes.data.length,
      activeCampaigns: campaignsRes.data.filter((c: any) => c.status === 'active').length,
      totalUsers: usersRes.data.length,
      totalDonations: donations.length,
      approvedDonations: donations
        .filter((d: any) => d.status === 'approved')
        .reduce((sum: number, d: any) => sum + parseFloat(d.amount), 0),
    };
  } catch (err) {
    console.error('Dashboard stats fetch error:', err);
    return {
      totalCampaigns: 0,
      activeCampaigns: 0,
      totalUsers: 0,
      totalDonations: 0,
      approvedDonations: 0,
    };
  }
};

export interface DonationsPerCampaign {
  title: string;
  total: number;
}

export const getDonationsPerCampaign = async (): Promise<DonationsPerCampaign[]> => {
  try {
    const res = await api.get('/dashboard/donations-per-campaign');
    return res.data.map((d: any) => ({ ...d, total: Number(d.total) }));
  } catch (err) {
    console.error('Failed to fetch donations per campaign', err);
    return [];
  }
};
