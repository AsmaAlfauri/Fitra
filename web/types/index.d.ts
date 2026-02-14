
// ===== User =====
export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "viewer";
  status?: string;
}
interface UserState {
  user: User | null;
  users: User[];
  loading: boolean;
  error: string | null;
}
// ===== Campaign =====
export type CampaignStatus = "pending" | "active" | "completed";

export interface Campaign {
  id: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  status: CampaignStatus;
}

// ===== Donation =====
export type DonationStatus = "pending" | "approved" | "rejected" | "completed";

export interface Donation {
  id: number;
  campaign_id?: number;
  user_id?: number;
  amount: number;
  status: DonationStatus;
  created_at: string;
  user_name?: string;
  campaign_title?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

interface LoginResponse {
  user: User;
  token: string;
}





