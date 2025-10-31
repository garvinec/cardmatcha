"use server";

import { createSupabaseClient } from "@/utils/supabase/client";

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

export type BestUserCardsByCategory = Record<
  string,
  Array<{
    cardName: string;
    cardIssuer: string | null;
    rewardRate: number;
    rewardDescription: string | null;
  }>
>;

type RewardQueryResult = {
  reward_rate: number | null;
  reward_description: string | null;
  card_id: string;
  credit_cards: {
    card_name: string;
    issuer: string | null;
  } | null;
  reward_categories: {
    category_name: string;
  } | null;
};

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

  const { data: rewardCategories, error: rewardCategoriesError } =
    await supabase.from("reward_categories").select("category_name");

  if (rewardCategoriesError) {
    throw new Error(rewardCategoriesError.message);
  }

  const bestByCategory: BestUserCardsByCategory = {};
  const categoryCardMap: Record<
    string,
    Map<
      string,
      {
        cardName: string;
        cardIssuer: string | null;
        rewardRate: number;
        rewardDescription: string | null;
      }
    >
  > = {};

  for (const category of rewardCategories ?? []) {
    if (!category?.category_name) {
      continue;
    }

    bestByCategory[category.category_name] = [];
    categoryCardMap[category.category_name] = new Map();
  }

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
    return bestByCategory;
  }

  const { data: rewards, error: rewardsError } = await supabase
    .from("card_rewards")
    .select(
      `
        reward_rate,
        reward_description,
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

  const typedRewards = (rewards ?? []) as unknown as RewardQueryResult[];

  for (const reward of typedRewards) {
    const categoryName = reward.reward_categories?.category_name;
    const cardName = reward.credit_cards?.card_name;
    const cardIssuer = reward.credit_cards?.issuer ?? null;
    const rewardDescription = reward.reward_description ?? null;
    const numericRewardRate =
      typeof reward.reward_rate === "number"
        ? reward.reward_rate
        : Number.parseFloat(String(reward.reward_rate ?? 0));

    if (!categoryName || !(categoryName in bestByCategory) || !cardName) {
      continue;
    }

    const cardId = String(reward.card_id ?? "").trim();

    if (!cardId) {
      continue;
    }

    const categoryCards = categoryCardMap[categoryName];

    if (!categoryCards) {
      continue;
    }

    const currentBest = categoryCards.get(cardId);

    if (!currentBest || numericRewardRate > currentBest.rewardRate) {
      categoryCards.set(cardId, {
        cardName,
        cardIssuer,
        rewardDescription,
        rewardRate: numericRewardRate,
      });
    }
  }

  for (const [categoryName, cards] of Object.entries(categoryCardMap)) {
    const sorted = Array.from(cards.values()).sort(
      (a, b) => b.rewardRate - a.rewardRate
    );

    bestByCategory[categoryName] = sorted.slice(0, 3);
  }

  return bestByCategory;
};
