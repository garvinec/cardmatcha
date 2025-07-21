// API base URL - adjust this based on your environment
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

// Types for API responses
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
  rewards_type: string;
  signup_bonus?: {
    amount: number;
    requirement: string;
  };
  categories: string[];
  credit_score_required: string;
  foreign_transaction_fee: number;
  balance_transfer_fee: number;
  created_at: string;
  updated_at: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  error?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

// Generic API client with error handling
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  // GET request
  async get<T>(
    endpoint: string,
    params?: Record<string, string | number>
  ): Promise<T> {
    const url = new URL(`${this.baseUrl}${endpoint}`);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }

    return this.request<T>(url.pathname + url.search);
  }

  // POST request
  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // PUT request
  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // DELETE request
  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: "DELETE",
    });
  }
}

// Create API client instance
const apiClient = new ApiClient(API_BASE_URL);

// Credit Card API functions
export const cardApi = {
  // Get all credit cards with pagination and filtering
  getCards: async (
    page: number = 1,
    limit: number = 10,
    category?: string,
    issuer?: string
  ): Promise<PaginatedResponse<CreditCard>> => {
    const params: Record<string, string | number> = { page, limit };
    if (category) params.category = category;
    if (issuer) params.issuer = issuer;

    return apiClient.get<PaginatedResponse<CreditCard>>("/api/cards", params);
  },

  // Get a single credit card by ID
  getCardById: async (id: string): Promise<ApiResponse<CreditCard>> => {
    return apiClient.get<ApiResponse<CreditCard>>(`/api/cards/${id}`);
  },

  // Search credit cards
  searchCards: async (
    query: string
  ): Promise<PaginatedResponse<CreditCard>> => {
    return apiClient.get<PaginatedResponse<CreditCard>>("/api/cards/search", {
      q: query,
    });
  },

  // Get top rated credit cards
  getTopCards: async (): Promise<PaginatedResponse<CreditCard>> => {
    return apiClient.get<PaginatedResponse<CreditCard>>("/api/cards/top");
  },
};

// Health check
export const healthApi = {
  check: async (): Promise<{ status: string; timestamp: string }> => {
    return apiClient.get<{ status: string; timestamp: string }>("/health");
  },
};

// Export the API client for custom requests
export { apiClient };
