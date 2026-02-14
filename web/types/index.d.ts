
// ===== User =====
export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "viewer";
}

// ===== Campaign =====
export type CampaignStatus = "draft" | "active" | "completed";

export interface Campaign {
  id: number;
  title: string;
  description: string;
  goal_amount?: number;       // optional لو مش كل الكومبوننت محتاجه
  raised_amount?: number;     // optional
  start_date: string;         // ISO
  end_date: string;           // ISO
  status: CampaignStatus;
  created_at?: string;
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

export type CampaignStatus = "draft" | "active" | "completed";

export interface Campaign {
  id: string;
  title: string;
  description: string;
  start_date: string; // ISO
  end_date: string;   // ISO
  status: CampaignStatus;
}

export interface Donation {
  id: number;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  user_name: string;
  campaign_title?: string;
}
