// Credit Card Types
export interface CreditCard {
  id: string; // UUID
  card_name: string;
  issuer: string;
  annual_fee: number; // numeric, defaults to 0.00
  welcome_bonus: string | null;
  url: string | null;
  image_url: string | null;
  last_updated_at: string | null; // timestamp with time zone
}

// Reward Category Types
export interface RewardCategory {
  id: string; // UUID
  category_name: string;
}

// Card Rewards Types
export interface CardReward {
  id: string; // UUID
  card_id: string; // UUID - references credit_cards.id
  category_id: string; // UUID - references reward_categories.id
  reward_rate: number; // numeric
  reward_type: string;
  reward_description: string | null;
  max_spend_limit: number | null; // numeric
  start_date: string | null; // date
  end_date: string | null; // date
}

// Card Benefits Types
export interface CardBenefit {
  id: string; // UUID
  card_id: string; // UUID - references credit_cards.id
  category_id: string; // UUID - references reward_categories.id
  benefit_type: string;
  amount: number | null; // numeric
  description: string;
  frequency: string | null;
  last_updated_at: string | null; // timestamp with time zone
}

// Extended Types with Relationships
export interface CreditCardWithRewards extends CreditCard {
  rewards: CardReward[];
  benefits: CardBenefit[];
}

export interface CreditCardWithDetails extends CreditCard {
  rewards: (CardReward & { category: RewardCategory })[];
  benefits: (CardBenefit & { category: RewardCategory })[];
}

// API Response Types
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  success: boolean;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Filter and Search Types
export interface CreditCardFilters {
  issuer?: string;
  minAnnualFee?: number;
  maxAnnualFee?: number;
  hasWelcomeBonus?: boolean;
  category?: string;
}

export interface CardRewardFilters {
  cardId?: string;
  categoryId?: string;
  minRewardRate?: number;
  rewardType?: string;
}

export interface CardBenefitFilters {
  cardId?: string;
  categoryId?: string;
  benefitType?: string;
  minAmount?: number;
}

// Form Types for Creating/Updating
export interface CreateCreditCardData {
  card_name: string;
  issuer: string;
  annual_fee: number;
  welcome_bonus?: string;
  url?: string;
  image_url?: string;
}

export interface UpdateCreditCardData extends Partial<CreateCreditCardData> {
  id: string;
}

export interface CreateCardRewardData {
  card_id: string;
  category_id: string;
  reward_rate: number;
  reward_type: string;
  reward_description?: string;
  max_spend_limit?: number;
  start_date?: string;
  end_date?: string;
}

export interface CreateCardBenefitData {
  card_id: string;
  category_id: string;
  benefit_type: string;
  amount?: number;
  description: string;
  frequency?: string;
}

// Utility Types
export type UUID = string;
export type Timestamp = string;
export type DateString = string;
export type Numeric = number;

// Enums (if you want to restrict certain fields)
export const REWARD_TYPES = [
  "points",
  "miles",
  "cashback",
  "percentage",
] as const;

export const BENEFIT_TYPES = [
  "travel_credit",
  "dining_credit",
  "lounge_access",
  "insurance",
  "concierge",
  "statement_credit",
  "fee_waiver",
] as const;

export const FREQUENCIES = [
  "annually",
  "monthly",
  "quarterly",
  "per_statement",
  "one_time",
] as const;

export type RewardType = (typeof REWARD_TYPES)[number];
export type BenefitType = (typeof BENEFIT_TYPES)[number];
export type Frequency = (typeof FREQUENCIES)[number];
