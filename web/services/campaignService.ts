import api from "./api";
import { Campaign } from "@/types";

export const getCampaigns = async (): Promise<Campaign[]> => {
  const res = await api.get("/campaigns");
  return res.data;
};

export const createCampaign = async (
  data: Partial<Campaign>
): Promise<Campaign> => {
  const res = await api.post("/campaigns", data);
  return res.data;
};

export const updateCampaign = async (
  id: number,
  data: Partial<Campaign>
): Promise<Campaign> => {
  const res = await api.put(`/campaigns/${id}`, data);
  return res.data;
};

export const deleteCampaign = async (id: number): Promise<void> => {
  await api.delete(`/campaigns/${id}`);
};
