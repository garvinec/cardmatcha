"use server";

import { createSupabaseClient } from "../supabase";

export type UserCardWithDetails = {
  cardId: string;
  userId: string;
  card: {
    id: string;
    card_name: string;
    issuer: string | null;
    annual_fee: number | null;
    category: string | null;
    image_url: string | null;
  } | null;
  created_at?: string | null;
};

export const getCardsByUser = async (user_id: string) => {
  if (!user_id) {
    throw new Error("A user id is required to fetch cards.");
  }

  const supabase = createSupabaseClient();

  const { data, error, count } = await supabase
    .from("user_cards")
    .select(
      `
        id,
        user_id,
        card_id,
        created_at,
        credit_cards:card_id (
          id,
          card_name,
          issuer,
          annual_fee,
          category,
          image_url
        )
      `,
      { count: "exact" }
    )
    .eq("user_id", user_id);

  if (error) {
    throw new Error(error.message);
  }

  return {
    data:
      data?.map((entry) => ({
        userId: entry.user_id,
        cardId: entry.card_id,
        card: Array.isArray(entry.credit_cards)
          ? entry.credit_cards[0] ?? null
          : entry.credit_cards ?? null,
        created_at: entry.created_at ?? null,
      })) ?? [],
    totalCount: count ?? 0,
  };
};

export const addCardToUser = async (userId: string, cardId: string) => {
  if (!userId || !cardId) {
    throw new Error("Both userId and cardId are required to add a card.");
  }

  const supabase = createSupabaseClient();

  const { error } = await supabase
    .from("user_cards")
    .insert({ user_id: userId, card_id: cardId });

  if (error) {
    throw new Error(error.message);
  }

  return { success: true };
};

export const removeCardFromUser = async (userId: string, cardId: string) => {
  if (!userId || !cardId) {
    throw new Error("Both userId and cardId are required to remove a card.");
  }

  const supabase = createSupabaseClient();

  const { error } = await supabase
    .from("user_cards")
    .delete()
    .eq("user_id", userId)
    .eq("card_id", cardId);

  if (error) {
    throw new Error(error.message);
  }

  return { success: true };
};

type BestUserCardsByCategory = Record<
  string,
  {
    cardName: string;
    cardIssuer: string;
    rewardRate: number;
  }
>;

/**
 * Returns the highest earning card per reward category for the supplied user.
 */
export const bestUserCardsByCategory = async (
  userId: string
): Promise<BestUserCardsByCategory> => {
  if (!userId) {
    throw new Error("A user id is required to compute category insights.");
  }

  const supabase = createSupabaseClient();

  const { data: userCards, error: userCardsError } = await supabase
    .from("user_cards")
    .select("card_id")
    .eq("user_id", userId);

  if (userCardsError) {
    throw new Error(userCardsError.message);
  }

  const cardIds = Array.from(
    new Set((userCards ?? []).map((entry) => entry.card_id).filter(Boolean))
  );

  if (cardIds.length === 0) {
    return {};
  }

  const { data: rewards, error: rewardsError } = await supabase
    .from("card_rewards")
    .select(
      `
        reward_rate,
        card_id,
        credit_cards:card_id (
          card_name,
          issuer
        ),
        reward_categories:category_id (
          category_name
        )
      `
    )
    .in("card_id", cardIds);

  if (rewardsError) {
    throw new Error(rewardsError.message);
  }

  const bestByCategory: BestUserCardsByCategory = {};

  for (const reward of rewards ?? []) {
    const categoryName = reward.reward_categories?.[0]?.category_name;
    const cardName = reward.credit_cards?.[0]?.card_name;
    const cardIssuer = reward.credit_cards?.[0]?.issuer ?? "";
    const numericRewardRate =
      typeof reward.reward_rate === "number"
        ? reward.reward_rate
        : Number.parseFloat(String(reward.reward_rate ?? 0));

    if (!categoryName || !cardName) {
      continue;
    }

    const existing = bestByCategory[categoryName];

    if (!existing || numericRewardRate > existing.rewardRate) {
      bestByCategory[categoryName] = {
        cardName,
        cardIssuer,
        rewardRate: numericRewardRate,
      };
    }
  }

  return bestByCategory;
};
