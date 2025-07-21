import { useState, useEffect, useCallback } from "react";
import {
  cardApi,
  healthApi,
  type CreditCard,
  type PaginatedResponse,
  type ApiResponse,
} from "@/lib/api";

// Generic hook for API calls
export function useApi<T>(apiCall: () => Promise<T>, dependencies: any[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiCall();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [apiCall]);

  useEffect(() => {
    execute();
  }, dependencies);

  const refetch = useCallback(() => {
    execute();
  }, [execute]);

  return { data, loading, error, refetch };
}

// Specific hooks for credit card operations
export function useCards(
  page: number = 1,
  limit: number = 10,
  category?: string,
  issuer?: string
) {
  return useApi(
    () => cardApi.getCards(page, limit, category, issuer),
    [page, limit, category, issuer]
  );
}

export function useCard(id: string) {
  return useApi(() => cardApi.getCardById(id), [id]);
}

export function useSearchCards(query: string) {
  return useApi(() => cardApi.searchCards(query), [query]);
}

export function useTopCards() {
  return useApi(() => cardApi.getTopCards(), []);
}

export function useHealthCheck() {
  return useApi(() => healthApi.check(), []);
}

// Hook for manual API calls (useful for forms, etc.)
export function useApiCall<T>() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(
    async (apiCall: () => Promise<T>): Promise<T | null> => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiCall();
        return result;
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { execute, loading, error };
}
