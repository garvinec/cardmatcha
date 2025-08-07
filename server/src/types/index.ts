// Credit Card Types
export interface CreditCard {
  id: string;
  name: string;
  issuer: string;
  annual_fee: number;
  apr_range: {
    min: number;
    max: number;
  };
  rewards_rate: number;
  rewards_type: "cashback" | "points" | "miles";
  signup_bonus?: {
    amount: number;
    spending_requirement: number;
    time_frame_months: number;
  };
  categories: string[];
  benefits: string[];
  credit_score_required: "excellent" | "good" | "fair" | "poor";
  foreign_transaction_fee: number;
  balance_transfer_fee: number;
  created_at: string;
  updated_at: string;
}

// Category Types
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon?: string;
  created_at: string;
}

// User Types
export interface User {
  id: string;
  email: string;
  name?: string;
  created_at: string;
  updated_at: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Chat Types
export interface ChatMessage {
  id: string;
  user_id: string;
  content: string;
  role: "user" | "assistant";
  created_at: string;
}

export interface ChatSession {
  id: string;
  user_id: string;
  title: string;
  created_at: string;
  updated_at: string;
}
