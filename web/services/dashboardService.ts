// services/dashboardService.ts

import api from "./api";
export const fetchDashboardStats  = async () => {
  try {
    const [campaignsRes, usersRes] = await Promise.all([
      api.get('/campaigns'),
      api.get('/users'),
    ]);

    let donations: any[] = [];
    for (const c of campaignsRes.data) {
      const res = await api.get(`/donations?campaign_id=${c.id}`);
      donations = donations.concat(res.data);
    }

    return {
      totalCampaigns: campaignsRes.data.length,
      activeCampaigns: campaignsRes.data.filter((c: any) => c.status === 'active').length,
      totalUsers: usersRes.data.length,
      totalDonations: donations.length,
      approvedDonations: donations.filter((d: any) => d.status === 'approved')
        .reduce((sum: number, d: any) => sum + parseFloat(d.amount), 0),
    };
  } catch (err) {
    console.error(err);
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
