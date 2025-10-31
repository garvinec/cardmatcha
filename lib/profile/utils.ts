import type { BestCardRecommendation } from "@/components/profile/BestCardsByCategorySection";
import type { SpendingCategory } from "@/components/profile/EstimatedMonthlyRewardsSection";
import type {
  BestUserCardsByCategory,
  UserCardWithDetails,
} from "@/lib/actions/profile.actions";

export type BestCardsByCategoryMap = Record<string, BestCardRecommendation[]>;
export type ProfileDataSnapshot = {
  cards: UserCardWithDetails[];
  bestCardsByCategory: BestCardsByCategoryMap;
};

export const formatRewardRate = (rate: number) => {
  if (!Number.isFinite(rate)) {
    return "0x";
  }

  if (Number.isInteger(rate)) {
    return `${rate}x`;
  }

  const decimals = Math.abs(rate) < 1 ? 2 : 1;
  const formatted = Number.parseFloat(rate.toFixed(decimals));

  return `${formatted}x`;
};

export const buildBestCardRecommendations = (
  bestCards: BestUserCardsByCategory | null | undefined,
): BestCardsByCategoryMap => {
  const mapped: BestCardsByCategoryMap = {};

  for (const [category, cardEntries] of Object.entries(bestCards ?? {})) {
    if (!Array.isArray(cardEntries) || cardEntries.length === 0) {
      mapped[category] = [];
      continue;
    }

    mapped[category] = cardEntries.map((info) => {
      const numericRate =
        typeof info.rewardRate === "number"
          ? info.rewardRate
          : Number.parseFloat(String(info.rewardRate ?? 0));
      const hasValidRate = Number.isFinite(numericRate) && numericRate > 0;
      const formattedRate = hasValidRate ? formatRewardRate(numericRate) : null;
      const cardLabel = info.cardIssuer
        ? `${info.cardName} (${info.cardIssuer})`
        : info.cardName;
      const rewardDescription = info.rewardDescription?.trim();

      const fallbackReason = formattedRate
        ? `Earns ${formattedRate} on ${category}.`
        : `Earn rewards on ${category}.`;

      return {
        card: cardLabel,
        reason:
          rewardDescription && rewardDescription.length > 0
            ? rewardDescription
            : fallbackReason,
        formattedRewardRate: formattedRate,
        rewardRate: hasValidRate ? numericRate : null,
      };
    });
  }

  return mapped;
};

type MergeCategoriesParams = {
  bestCardsByCategory: BestCardsByCategoryMap;
  currentCategories: SpendingCategory[];
  defaultCategories: SpendingCategory[];
};

export const mergeSpendingCategories = ({
  bestCardsByCategory,
  currentCategories,
  defaultCategories,
}: MergeCategoriesParams): SpendingCategory[] => {
  const currentByName = new Map(
    currentCategories.map((category) => [category.name, category]),
  );
  const defaultByName = new Map(
    defaultCategories.map((category) => [category.name, category]),
  );

  const bestCategoryNames = Object.keys(bestCardsByCategory);
  const categoryNames =
    bestCategoryNames.length > 0
      ? bestCategoryNames
      : defaultCategories.map((category) => category.name);

  const sortedNames = Array.from(new Set(categoryNames)).sort((a, b) =>
    a.localeCompare(b),
  );

  let hasChanges = false;

  const updatedCategories = sortedNames.map((categoryName, index) => {
    const recommendations = bestCardsByCategory[categoryName] ?? [];
    const existing = currentByName.get(categoryName);
    const defaultCategory = defaultByName.get(categoryName);

    const derivedRewardRate =
      recommendations[0]?.formattedRewardRate ??
      existing?.rewardRate ??
      defaultCategory?.rewardRate ??
      "—";

    const amount = existing?.amount ?? defaultCategory?.amount ?? 0;

    if (
      !existing ||
      existing.id !== index + 1 ||
      existing.rewardRate !== derivedRewardRate ||
      existing.amount !== amount
    ) {
      hasChanges = true;
    }

    return {
      id: index + 1,
      name: categoryName,
      rewardRate: derivedRewardRate,
      amount,
    };
  });

  if (updatedCategories.length !== currentCategories.length) {
    hasChanges = true;
  }

  if (!hasChanges) {
    return currentCategories;
  }

  return updatedCategories;
};
