
// ===== User =====
export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "viewer";
}

// ===== Campaign =====
export interface Campaign {
  id: number;
  title: string;
  description: string;
  goal_amount: number;
  raised_amount: number;
  start_date: string;
  end_date: string;
  status: "active" | "completed" | "pending";
  created_at: string;
}

// ===== Donation =====
export interface Donation {
  id: number;
  campaign_id: number;
  user_id: number;
  amount: number;
  status: "pending" | "completed";
  created_at: string;
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
