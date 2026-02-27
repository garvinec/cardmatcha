"use server";

import { createSupabaseClient } from "@/utils/supabase/client";

interface getCardsProps {
  pageNumber?: number;
  cardsPerPage?: number;
}

export const getCards = async ({
  pageNumber = 1,
  cardsPerPage = 15,
}: getCardsProps) => {
  const supabase = createSupabaseClient();
  let query = supabase.from("credit_cards").select("*", { count: "exact" });

  const { count } = await query;
  const totalCount = count || 0;

  const { data, error } = await query.range(
    (pageNumber - 1) * cardsPerPage,
    pageNumber * cardsPerPage - 1
  );

  if (error) {
    throw new Error(error.message);
  }

  return { data, totalCount };
};

export const getMostPopularCards = async (top: number = 6) => {
  const supabase = createSupabaseClient();

  // Query to get the 6 most popular cards based on user ownership count
  // Fetches all user_cards entries, groups by card_id, counts distinct users,
  // joins with credit_cards, orders by count descending, and limits to 6
  const { data, error } = await supabase.from("user_cards").select(
    `
      card_id,
      user_id,
      credit_cards:card_id (
        id,
        card_name,
        issuer,
        annual_fee,
        welcome_bonus,
        url,
        image_url,
        category,
        issuer_code,
        last_updated_at
      )
    `
  );

  if (error) {
    throw new Error(error.message);
  }

  // Group by card_id and count distinct user_ids (each entry = one user owns the card)
  const cardCountMap = new Map<
    string,
    { count: number; userIds: Set<string>; card: any }
  >();

  if (data) {
    for (const entry of data) {
      const cardId = entry.card_id;
      const userId = entry.user_id;
      const card = Array.isArray(entry.credit_cards)
        ? entry.credit_cards[0]
        : entry.credit_cards;

      if (!card || !cardId) continue;

      if (cardCountMap.has(cardId)) {
        const existing = cardCountMap.get(cardId)!;
        // Only count distinct users
        if (userId && !existing.userIds.has(userId)) {
          existing.userIds.add(userId);
          existing.count += 1;
        }
      } else {
        const userIdSet = new Set<string>();
        if (userId) userIdSet.add(userId);
        cardCountMap.set(cardId, {
          count: userId ? 1 : 0,
          userIds: userIdSet,
          card,
        });
      }
    }
  }

  // Convert to array, sort by count descending, and take top 6
  const popularCards = Array.from(cardCountMap.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, top)
    .map((item) => item.card);

  return popularCards;
};

export const getCardsByCategory = async (
  category: string,
  {
    pageNumber = 1,
    cardsPerPage = 15,
  }: { pageNumber?: number; cardsPerPage?: number } = {}
) => {
  const supabase = createSupabaseClient();
  const from = (pageNumber - 1) * cardsPerPage;
  const to = from + cardsPerPage - 1;

  const { data, error, count } = await supabase
    .from("credit_cards")
    .select("*", { count: "exact" })
    .eq("category", category)
    .range(from, to);

  if (error) {
    throw new Error(error.message);
  }

  return {
    data: data ?? [],
    totalCount: count ?? 0,
  };
};

type CategoryRecord = {
  id?: string;
  slug?: string;
  name?: string | null;
  category_name?: string | null;
  description?: string | null;
  summary?: string | null;
  icon?: string | null;
  emoji?: string | null;
};

export const getCardsByIssuer = async (
  issuer_code: string,
  {
    pageNumber = 1,
    cardsPerPage = 15,
  }: { pageNumber?: number; cardsPerPage?: number } = {}
) => {
  const supabase = createSupabaseClient();

  const from = (pageNumber - 1) * cardsPerPage;
  const to = from + cardsPerPage - 1;

  const { data, error, count } = await supabase
    .from("credit_cards")
    .select("*", { count: "exact" })
    .eq("issuer_code", issuer_code)
    .range(from, to);

  if (error) {
    throw new Error(error.message);
  }

  return {
    data: data ?? [],
    totalCount: count ?? 0,
    issuerName: data?.[0]?.issuer ?? null,
  };
};
