import api from './api';
import { Donation } from '@/types';

interface CreateDonationData {
  campaign_id: number;
  amount: number;
}

interface UpdateDonationStatusData {
  id: number;
  status: 'pending' | 'approved' | 'rejected';
}

const donationService = {
  fetchByCampaign: async (campaignId: number): Promise<Donation[]> => {
    const res = await api.get(`/donations?campaign_id=${campaignId}`);
    return res.data;
  },

  createDonation: async (data: CreateDonationData): Promise<Donation> => {
    const res = await api.post('/donations', data);
    return res.data;
  },

  updateStatus: async (data: UpdateDonationStatusData): Promise<Donation> => {
    const res = await api.put(`/donations/${data.id}/status`, { status: data.status });
    return res.data;
  },

  deleteDonation: async (id: number): Promise<{ message: string; donation: Donation }> => {
    const res = await api.delete(`/donations/${id}`);
    return res.data;
  },
};

export default donationService;
