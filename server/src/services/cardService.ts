import { supabase } from "@/config/supabase";
import { CreditCard, ApiResponse, PaginatedResponse } from "@/types";

export class CardService {
  /**
   * Get all credit cards with optional filtering and pagination
   */
  static async getCards(
    page: number = 1,
    limit: number = 10,
    category?: string,
    issuer?: string
  ): Promise<PaginatedResponse<CreditCard>> {
    try {
      let query = supabase.from("credit_cards").select("*", { count: "exact" });

      // Apply filters
      if (category) {
        query = query.contains("categories", [category]);
      }
      if (issuer) {
        query = query.eq("issuer", issuer);
      }

      // Apply pagination
      const offset = (page - 1) * limit;
      query = query.range(offset, offset + limit - 1);

      const { data, error, count } = await query;

      if (error) {
        throw error;
      }

      const totalPages = count ? Math.ceil(count / limit) : 0;

      return {
        success: true,
        data: data || [],
        pagination: {
          page,
          limit,
          total: count || 0,
          totalPages,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch cards",
        data: [],
        pagination: {
          page,
          limit,
          total: 0,
          totalPages: 0,
        },
      };
    }
  }

  /**
   * Get a single credit card by ID
   */
  static async getCardById(id: string): Promise<ApiResponse<CreditCard>> {
    try {
      const { data, error } = await supabase
        .from("credit_cards")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        throw error;
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch card",
      };
    }
  }

  /**
   * Search credit cards by name or issuer
   */
  static async searchCards(query: string): Promise<ApiResponse<CreditCard[]>> {
    try {
      const { data, error } = await supabase
        .from("credit_cards")
        .select("*")
        .or(`name.ilike.%${query}%,issuer.ilike.%${query}%`);

      if (error) {
        throw error;
      }

      return {
        success: true,
        data: data || [],
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to search cards",
      };
    }
  }

  /**
   * Get top rated credit cards
   */
  static async getTopCards(
    limit: number = 10
  ): Promise<ApiResponse<CreditCard[]>> {
    try {
      const { data, error } = await supabase
        .from("credit_cards")
        .select("*")
        .order("rewards_rate", { ascending: false })
        .limit(limit);

      if (error) {
        throw error;
      }

      return {
        success: true,
        data: data || [],
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to fetch top cards",
      };
    }
  }
}
