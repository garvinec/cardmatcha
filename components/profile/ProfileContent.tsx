"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { Search, X } from "lucide-react";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import {
  BestCardsByCategorySection,
  type BestCardRecommendation,
} from "@/components/profile/BestCardsByCategorySection";
import {
  EstimatedMonthlyRewardsSection,
  type SpendingCategory,
} from "@/components/profile/EstimatedMonthlyRewardsSection";
import { MyCardsSection } from "@/components/profile/MyCardsSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  mergeSpendingCategories,
  type BestCardsByCategoryMap,
  type ProfileDataSnapshot,
} from "@/lib/profile/utils";
import type { UserCardWithDetails } from "@/lib/actions/profile.actions";

const DEFAULT_SPENDING_CATEGORIES: SpendingCategory[] = [
  { id: 1, name: "Everything else", rewardRate: "1%", amount: 300 },
  { id: 2, name: "Gas & fuel", rewardRate: "3%", amount: 300 },
  { id: 3, name: "Grocery stores", rewardRate: "4%", amount: 800 },
  { id: 4, name: "Online shopping", rewardRate: "2%", amount: 150 },
  { id: 5, name: "Restaurants & dining", rewardRate: "4%", amount: 400 },
  { id: 6, name: "Travel & hotels", rewardRate: "2%", amount: 200 },
];

type CardSuggestion = {
  id: string;
  card_name: string;
  issuer?: string | null;
};

type ProfileContentProps = {
  userId: string;
  initialSnapshot: ProfileDataSnapshot;
  refreshProfile: () => Promise<ProfileDataSnapshot>;
  addCardToProfile: (cardId: string) => Promise<ProfileDataSnapshot>;
  removeCardFromProfile: (cardId: string) => Promise<ProfileDataSnapshot>;
  handleSignOut: () => Promise<void>;
};

const calculateTotalEstimatedRewards = (categories: SpendingCategory[]) => {
  return categories
    .reduce((total, category) => {
      const numericPortion = category.rewardRate
        ? Number.parseFloat(category.rewardRate.replace(/[^0-9.]/g, ""))
        : 0;
      const rate = Number.isFinite(numericPortion) ? numericPortion / 100 : 0;

      return total + category.amount * rate;
    }, 0)
    .toFixed(0);
};

export function ProfileContent({
  userId,
  initialSnapshot,
  refreshProfile,
  addCardToProfile,
  removeCardFromProfile,
  handleSignOut,
}: ProfileContentProps) {
  const [userCards, setUserCards] = useState<UserCardWithDetails[]>(
    initialSnapshot.cards
  );
  const [bestCardsByCategory, setBestCardsByCategory] =
    useState<BestCardsByCategoryMap>(initialSnapshot.bestCardsByCategory);
  const [spendingCategories, setSpendingCategories] = useState<
    SpendingCategory[]
  >(
    mergeSpendingCategories({
      bestCardsByCategory: initialSnapshot.bestCardsByCategory,
      currentCategories: DEFAULT_SPENDING_CATEGORIES,
      defaultCategories: DEFAULT_SPENDING_CATEGORIES,
    })
  );

  const [isCardsLoading, setIsCardsLoading] = useState(false);
  const [cardsError, setCardsError] = useState<string | null>(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [cardSearchQuery, setCardSearchQuery] = useState("");
  const [cardSearchSuggestions, setCardSearchSuggestions] = useState<
    CardSuggestion[]
  >([]);
  const [cardSearchError, setCardSearchError] = useState<string | null>(null);
  const [addCardError, setAddCardError] = useState<string | null>(null);
  const [isSavingCard, setIsSavingCard] = useState(false);

  const [cardToRemove, setCardToRemove] = useState<UserCardWithDetails | null>(
    null
  );
  const [removeCardError, setRemoveCardError] = useState<string | null>(null);
  const [isRemovingCard, setIsRemovingCard] = useState(false);

  const searchAbortController = useRef<AbortController | null>(null);

  useEffect(() => {
    setSpendingCategories((currentCategories) =>
      mergeSpendingCategories({
        bestCardsByCategory,
        currentCategories,
        defaultCategories: DEFAULT_SPENDING_CATEGORIES,
      })
    );
  }, [bestCardsByCategory]);

  useEffect(() => {
    if (!showAddModal) {
      if (searchAbortController.current) {
        searchAbortController.current.abort();
        searchAbortController.current = null;
      }
      setCardSearchQuery("");
      setCardSearchSuggestions([]);
      setCardSearchError(null);
      setAddCardError(null);
      return;
    }
  }, [showAddModal]);

  useEffect(() => {
    if (!showAddModal) {
      return;
    }

    const trimmedQuery = cardSearchQuery.trim();

    if (trimmedQuery.length < 3) {
      if (searchAbortController.current) {
        searchAbortController.current.abort();
        searchAbortController.current = null;
      }
      setCardSearchSuggestions([]);
      setCardSearchError(null);
      return;
    }

    if (searchAbortController.current) {
      searchAbortController.current.abort();
    }

    const controller = new AbortController();
    searchAbortController.current = controller;

    const fetchSuggestions = async () => {
      try {
        const response = await fetch(
          `/api/cards/search?q=${encodeURIComponent(trimmedQuery)}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch card suggestions.");
        }

        const data = await response.json();
        setCardSearchSuggestions(
          Array.isArray(data.results) ? data.results : []
        );
        setCardSearchError(null);
      } catch (error) {
        if ((error as Error).name === "AbortError") {
          return;
        }
        console.error(error);
        setCardSearchSuggestions([]);
        setCardSearchError(
          "We couldn't load card suggestions. Please try again."
        );
      }
    };

    void fetchSuggestions();

    return () => {
      controller.abort();
    };
  }, [cardSearchQuery, showAddModal]);

  const availableSuggestions = useMemo(() => {
    const ownedCardIds = new Set(userCards.map((card) => card.cardId));

    return cardSearchSuggestions.filter(
      (suggestion) => !ownedCardIds.has(suggestion.id)
    );
  }, [cardSearchSuggestions, userCards]);

  const updateSnapshot = useCallback((snapshot: ProfileDataSnapshot) => {
    setUserCards(snapshot.cards);
    setBestCardsByCategory(snapshot.bestCardsByCategory);
  }, []);

  const refreshCards = useCallback(async () => {
    try {
      const snapshot = await refreshProfile();
      updateSnapshot(snapshot);
      setCardsError(null);
    } catch (error) {
      console.error(error);
      setCardsError("We couldn't load your cards. Please try again.");
      throw error;
    }
  }, [refreshProfile, updateSnapshot]);

  const handleAddCardFromSuggestion = async (suggestion: CardSuggestion) => {
    if (!userId || isSavingCard) {
      return;
    }

    setIsSavingCard(true);
    setAddCardError(null);

    try {
      const snapshot = await addCardToProfile(suggestion.id);
      updateSnapshot(snapshot);
      setShowAddModal(false);
    } catch (error) {
      console.error(error);
      setAddCardError(
        error instanceof Error
          ? error.message
          : "Unable to add this card right now."
      );
    } finally {
      setIsSavingCard(false);
    }
  };

  const handleRemoveCard = useCallback(
    async (event?: FormEvent) => {
      if (event) {
        event.preventDefault();
      }

      if (!userId || !cardToRemove || isRemovingCard) {
        return;
      }

      setIsRemovingCard(true);
      setRemoveCardError(null);

      try {
        const snapshot = await removeCardFromProfile(cardToRemove.cardId);
        updateSnapshot(snapshot);
        setCardToRemove(null);
      } catch (error) {
        console.error(error);
        setRemoveCardError(
          error instanceof Error
            ? error.message
            : "Unable to remove this card right now."
        );
      } finally {
        setIsRemovingCard(false);
      }
    },
    [
      cardToRemove,
      isRemovingCard,
      removeCardFromProfile,
      updateSnapshot,
      userId,
    ]
  );

  const handleRetryLoadCards = async () => {
    setIsCardsLoading(true);
    try {
      await refreshCards();
    } finally {
      setIsCardsLoading(false);
    }
  };

  const updateSpending = (categoryId: number, newAmount: number) => {
    setSpendingCategories((categories) =>
      categories.map((category) =>
        category.id === categoryId
          ? { ...category, amount: newAmount }
          : category
      )
    );
  };

  const totalEstimatedRewards = useMemo(
    () => calculateTotalEstimatedRewards(spendingCategories),
    [spendingCategories]
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-matcha-50/30 via-white to-matcha-50/20 flex flex-col">
      <Header currentPage="profile" />
      <div className="flex-1">
        <>
          <style jsx>{`
            .slider::-webkit-slider-thumb {
              appearance: none;
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background: hsl(var(--matcha-600));
              cursor: pointer;
              box-shadow: 0 2px 8px hsl(var(--matcha-600) / 0.3);
            }
            .slider::-moz-range-thumb {
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background: hsl(var(--matcha-600));
              cursor: pointer;
              border: none;
              box-shadow: 0 2px 8px hsl(var(--matcha-600) / 0.3);
            }
          `}</style>
          <main className="pt-48 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto space-y-10">
              <div className="text-center mb-12">
                <h1 className="text-5xl font-light text-matcha-900 mb-4 tracking-tight">
                  Your Profile
                </h1>
                <Button
                  type="submit"
                  className="bg-matcha-100 text-matcha-800 border border-matcha-200 hover:bg-matcha-200 hover:text-matcha-900 shadow transition-all duration-200 rounded-full px-4 py-2 font-light"
                  onClick={() => handleSignOut()}
                >
                  Sign Out
                </Button>
                <p className="text-lg text-matcha-800/80 font-light pt-6">
                  Manage your cards and optimize your rewards
                </p>
              </div>
              <MyCardsSection
                cards={userCards}
                isLoading={isCardsLoading}
                error={cardsError}
                onRetry={handleRetryLoadCards}
                onAddCardClick={() => {
                  setShowAddModal(true);
                  setAddCardError(null);
                }}
                onRemoveCardClick={setCardToRemove}
              />
              <BestCardsByCategorySection bestCards={bestCardsByCategory} />
              <EstimatedMonthlyRewardsSection
                categories={spendingCategories}
                onUpdateCategory={updateSpending}
                totalEstimatedRewards={totalEstimatedRewards}
              />
              {/* Implement later */}
              {/* <RecommendationsSection /> */}
            </div>
          </main>
          {showAddModal && (
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-matcha-50 rounded-3xl shadow-2xl w-full max-w-md">
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-light text-gray-900">
                      Add Credit Card
                    </h3>
                    <button
                      onClick={() => setShowAddModal(false)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-300"
                      aria-label="Close add card modal"
                    >
                      <X className="h-5 w-5 text-gray-500" />
                    </button>
                  </div>
                  <div className="relative">
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        type="text"
                        placeholder="Search for credit cards..."
                        value={cardSearchQuery}
                        onChange={(event) =>
                          setCardSearchQuery(event.target.value)
                        }
                        className="pl-11 pr-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-matcha-500/20 font-light"
                        autoFocus
                      />
                    </div>
                    {availableSuggestions.length > 0 && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-matcha-50 border border-gray-200 rounded-2xl shadow-xl z-10 max-h-60 overflow-y-auto">
                        {availableSuggestions.map((suggestion) => (
                          <button
                            key={suggestion.id}
                            onClick={() =>
                              handleAddCardFromSuggestion(suggestion)
                            }
                            className="w-full px-5 py-4 text-left hover:bg-matcha-50 border-b border-gray-100 last:border-b-0 transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                            disabled={isSavingCard}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-normal text-gray-900">
                                  {suggestion.card_name}
                                </p>
                                {suggestion.issuer && (
                                  <p className="text-sm text-gray-600 font-light">
                                    {suggestion.issuer}
                                  </p>
                                )}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                    {cardSearchQuery.trim().length >= 3 &&
                      availableSuggestions.length === 0 &&
                      !cardSearchError && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-matcha-50 border border-gray-200 rounded-2xl shadow-xl p-5 text-center text-gray-500 text-sm font-light">
                          {cardSearchSuggestions.length > 0
                            ? "You've already added these cards."
                            : `No cards found matching "${cardSearchQuery.trim()}"`}
                        </div>
                      )}
                    {cardSearchQuery.trim().length < 3 && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-matcha-50 border border-gray-200 rounded-2xl shadow-xl p-5 text-center text-gray-500 text-sm font-light">
                        Type at least 3 characters to search.
                      </div>
                    )}
                    {cardSearchError && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-red-50 border border-red-200 rounded-2xl shadow-xl p-5 text-center text-red-600 text-sm font-light">
                        {cardSearchError}
                      </div>
                    )}
                  </div>
                  {addCardError && (
                    <p className="mt-6 text-sm text-red-600 font-light">
                      {addCardError}
                    </p>
                  )}
                  <div className="mt-8 flex justify-end">
                    <Button
                      variant="outline"
                      onClick={() => setShowAddModal(false)}
                      className="rounded-full px-6 py-5 font-light"
                      disabled={isSavingCard}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {cardToRemove && (
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-matcha-50 rounded-3xl shadow-2xl w-full max-w-md">
                <form className="p-8" onSubmit={handleRemoveCard}>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-light text-gray-900">
                      Remove Card
                    </h3>
                    <button
                      type="button"
                      onClick={() => setCardToRemove(null)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-300"
                      aria-label="Close remove card modal"
                    >
                      <X className="h-5 w-5 text-gray-500" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-700 font-light leading-relaxed mb-6">
                    Are you sure you want to remove{" "}
                    <span className="font-normal text-gray-900">
                      {cardToRemove.card?.card_name ?? "this card"}
                    </span>{" "}
                    from your wallet?
                  </p>
                  {removeCardError && (
                    <p className="mb-4 text-sm text-red-600 font-light">
                      {removeCardError}
                    </p>
                  )}
                  <div className="mt-8 flex justify-end gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setCardToRemove(null)}
                      className="rounded-full px-6 py-5 font-light"
                      disabled={isRemovingCard}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="rounded-full px-6 py-5 font-light bg-red-600 hover:bg-red-700 text-white"
                      disabled={isRemovingCard}
                    >
                      {isRemovingCard ? "Removing..." : "Yes"}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      </div>
      <Footer />
    </div>
  );
}
